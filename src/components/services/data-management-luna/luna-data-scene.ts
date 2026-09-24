import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export type LunaAnchorPosition = {
  x: number;
  y: number;
};

export type LunaAnchorPositions = {
  postgres: LunaAnchorPosition;
  writes: LunaAnchorPosition;
  warehouse: LunaAnchorPosition;
};

export type LunaDataSceneOptions = {
  host: HTMLDivElement;
  reducedMotion: boolean;
  getPointer: () => { x: number; y: number };
  onAnchorsUpdate?: (anchors: LunaAnchorPositions) => void;
  onReadyChange?: (ready: boolean) => void;
};

export type LunaDataSceneHandle = {
  dispose: () => void;
};

type Disposable = { dispose: () => void };

const MAX_DRAWING_BUFFER_PIXELS = 1_800_000;
const MAX_DEVICE_PIXEL_RATIO = 1.5;

const palette = {
  ambient: 0x0b2527,
  key: 0xf3f2e8,
  rim: 0x75cfc3,
  fill: 0x1b6666,
  indigo: 0x6d659e,
  top: 0x8dd6ce,
  topAttenuation: 0x2d6f70,
  middle: 0x62bdb6,
  middleAttenuation: 0x255b60,
  bottom: 0x7b71aa,
  bottomAttenuation: 0x4a467b,
  edge: 0xb7eee5,
  indigoEdge: 0xb7ade8,
  core: 0xa8e1d9,
  coreAttenuation: 0x326c6d,
  coreInner: 0x4faea8,
  coreEmissive: 0x257d78,
  ring: 0x77d2c7,
  ringEmissive: 0x3c9b94,
  conduit: 0x74c5bc,
  particle: 0xbfeee5,
  ground: "rgba(70, 166, 158, 0.44)",
  studioBounce: "rgba(112, 99, 164, 0.28)",
};

function createRadialTexture(color: string, size: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");
  if (context) {
    const center = size / 2;
    const gradient = context.createRadialGradient(
      center,
      center,
      0,
      center,
      center,
      center,
    );
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.26, color);
    gradient.addColorStop(0.68, "rgba(70, 166, 158, 0.12)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
  }

  return new THREE.CanvasTexture(canvas);
}

function createStudioEnvironment(renderer: THREE.WebGLRenderer) {
  const generator = new THREE.PMREMGenerator(renderer);
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const context = canvas.getContext("2d");

  if (context) {
    const background = context.createLinearGradient(0, 0, 0, canvas.height);
    background.addColorStop(0, "#071e20");
    background.addColorStop(0.55, "#0a2628");
    background.addColorStop(1, "#041315");
    context.fillStyle = background;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const key = context.createRadialGradient(66, 28, 0, 66, 28, 72);
    key.addColorStop(0, "rgba(255, 255, 249, 0.84)");
    key.addColorStop(0.3, "rgba(184, 239, 229, 0.5)");
    key.addColorStop(1, "rgba(0, 0, 0, 0)");
    context.fillStyle = key;
    context.fillRect(0, 0, 170, 110);

    const rim = context.createRadialGradient(204, 54, 0, 204, 54, 62);
    rim.addColorStop(0, "rgba(126, 215, 204, 0.54)");
    rim.addColorStop(0.36, "rgba(62, 144, 143, 0.22)");
    rim.addColorStop(1, "rgba(0, 0, 0, 0)");
    context.fillStyle = rim;
    context.fillRect(140, 0, 116, 128);

    const bounce = context.createRadialGradient(138, 112, 0, 138, 112, 78);
    bounce.addColorStop(0, palette.studioBounce);
    bounce.addColorStop(1, "rgba(0, 0, 0, 0)");
    context.fillStyle = bounce;
    context.fillRect(54, 58, 170, 70);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;

  try {
    return generator.fromEquirectangular(texture);
  } finally {
    texture.dispose();
    generator.dispose();
  }
}

function setRendererSize(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  width: number,
  height: number,
) {
  const safeWidth = Math.max(1, Math.floor(width));
  const safeHeight = Math.max(1, Math.floor(height));
  const deviceRatio = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO);
  const pixelBudgetRatio = Math.sqrt(
    MAX_DRAWING_BUFFER_PIXELS / (safeWidth * safeHeight),
  );
  const pixelRatio = Math.min(deviceRatio, pixelBudgetRatio);

  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(safeWidth, safeHeight, false);
  camera.aspect = safeWidth / safeHeight;
  camera.updateProjectionMatrix();
}

function projectAnchor(
  localPosition: THREE.Vector3,
  assembly: THREE.Group,
  camera: THREE.PerspectiveCamera,
  width: number,
  height: number,
) {
  const worldPosition = localPosition.clone();
  assembly.localToWorld(worldPosition);
  worldPosition.project(camera);

  return {
    x: (worldPosition.x * 0.5 + 0.5) * width,
    y: (-worldPosition.y * 0.5 + 0.5) * height,
  };
}

export function mountLunaDataScene({
  host,
  reducedMotion,
  getPointer,
  onAnchorsUpdate,
  onReadyChange,
}: LunaDataSceneOptions): LunaDataSceneHandle {
  let renderer: THREE.WebGLRenderer | null = null;
  let scene: THREE.Scene | null = null;
  let resizeObserver: ResizeObserver | null = null;
  let intersectionObserver: IntersectionObserver | null = null;
  let animationRunning = false;
  let visible = true;
  let disposed = false;
  const resources = new Set<Disposable>();

  const addResource = <T extends Disposable>(resource: T) => {
    resources.add(resource);
    return resource;
  };

  const markFallback = (reason: string) => {
    host.dataset.webglStatus = "fallback";
    host.dataset.lunaFallback = "true";
    host.dataset.lunaFallbackReason = reason;
    onReadyChange?.(false);
  };

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    animationRunning = false;

    resizeObserver?.disconnect();
    intersectionObserver?.disconnect();
    document.removeEventListener("visibilitychange", onVisibilityChange);

    renderer?.setAnimationLoop(null);
    resources.forEach((resource) => resource.dispose());
    resources.clear();
    renderer?.renderLists.dispose();
    renderer?.dispose();
    renderer?.forceContextLoss();
    renderer?.domElement.remove();
    renderer = null;
    scene = null;
  };

  const onVisibilityChange = () => {
    if (disposed || !renderer) return;

    if (document.hidden) {
      stopAnimation();
      return;
    }

    render(performance.now());
    startAnimation();
  };

  const startAnimation = () => {
    if (disposed || !renderer || reducedMotion || !visible || document.hidden) {
      return;
    }
    if (!animationRunning) {
      animationRunning = true;
      renderer.setAnimationLoop(render);
    }
  };

  const stopAnimation = () => {
    if (!renderer || !animationRunning) return;
    animationRunning = false;
    renderer.setAnimationLoop(null);
  };

  let render: (time: number) => void = () => undefined;

  try {
    const rect = host.getBoundingClientRect();
    const width = Math.max(rect.width, 1);
    const height = Math.max(rect.height, 1);

    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.04;
    renderer.domElement.className = "data-luna-canvas";
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0.08, 2.55, 6.6);
    camera.lookAt(0, -0.16, 0);

    const environment = addResource(createStudioEnvironment(renderer));
    scene.environment = environment.texture;

    const ambientLight = new THREE.AmbientLight(palette.ambient, 1.15);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(palette.key, 2.1);
    keyLight.position.set(-3.7, 6.2, 4.4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(palette.rim, 1.85);
    rimLight.position.set(4.6, 4.2, -3.1);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(palette.fill, 0.55);
    fillLight.position.set(0, -3.6, 3.6);
    scene.add(fillLight);

    const indigoLight = new THREE.PointLight(palette.indigo, 1.15, 5.5, 1.6);
    indigoLight.position.set(0.8, -0.7, 1.2);
    scene.add(indigoLight);

    const assembly = new THREE.Group();
    const baseRotationX = 0.3;
    const baseRotationY = -0.52;
    assembly.rotation.set(baseRotationX, baseRotationY, 0);
    scene.add(assembly);

    const slabGeometry = addResource(
      new RoundedBoxGeometry(3.15, 0.12, 3.15, 2, 0.18),
    );
    const slabEdgeGeometry = addResource(new THREE.EdgesGeometry(slabGeometry, 28));

    const topMaterial = addResource(
      new THREE.MeshPhysicalMaterial({
        color: palette.top,
        transmission: 0.88,
        opacity: 1,
        transparent: true,
        roughness: 0.17,
        metalness: 0.02,
        ior: 1.46,
        thickness: 0.18,
        attenuationColor: palette.topAttenuation,
        attenuationDistance: 1.2,
        clearcoat: 0.18,
        clearcoatRoughness: 0.24,
        specularIntensity: 0.82,
      }),
    );
    const middleMaterial = addResource(
      new THREE.MeshPhysicalMaterial({
        color: palette.middle,
        transmission: 0.84,
        opacity: 1,
        transparent: true,
        roughness: 0.2,
        metalness: 0.02,
        ior: 1.46,
        thickness: 0.18,
        attenuationColor: palette.middleAttenuation,
        attenuationDistance: 1.2,
        clearcoat: 0.14,
        clearcoatRoughness: 0.26,
        specularIntensity: 0.76,
      }),
    );
    const bottomMaterial = addResource(
      new THREE.MeshPhysicalMaterial({
        color: palette.bottom,
        transmission: 0.78,
        opacity: 1,
        transparent: true,
        roughness: 0.24,
        metalness: 0.03,
        ior: 1.46,
        thickness: 0.2,
        attenuationColor: palette.bottomAttenuation,
        attenuationDistance: 1.05,
        clearcoat: 0.1,
        clearcoatRoughness: 0.3,
        specularIntensity: 0.7,
      }),
    );
    const cyanEdgeMaterial = addResource(
      new THREE.LineBasicMaterial({
        color: palette.edge,
        transparent: true,
        opacity: 0.5,
      }),
    );
    const indigoEdgeMaterial = addResource(
      new THREE.LineBasicMaterial({
        color: palette.indigoEdge,
        transparent: true,
        opacity: 0.58,
      }),
    );

    const createSlab = (material: THREE.Material, edgeMaterial: THREE.Material) => {
      const slab = new THREE.Group();
      const mesh = new THREE.Mesh(slabGeometry, material);
      const edge = new THREE.LineSegments(slabEdgeGeometry, edgeMaterial);
      mesh.rotation.y = Math.PI / 4;
      edge.rotation.y = Math.PI / 4;
      slab.add(mesh, edge);
      return slab;
    };

    const topSlab = createSlab(topMaterial, cyanEdgeMaterial);
    const middleSlab = createSlab(middleMaterial, cyanEdgeMaterial);
    const bottomSlab = createSlab(bottomMaterial, indigoEdgeMaterial);
    topSlab.position.y = 0.72;
    middleSlab.position.y = 0.03;
    bottomSlab.position.y = -0.66;
    assembly.add(topSlab, middleSlab, bottomSlab);

    const coreGroup = new THREE.Group();
    coreGroup.position.y = 1.28;
    assembly.add(coreGroup);

    const coreGeometry = addResource(new THREE.CylinderGeometry(0.64, 0.64, 1.06, 32));
    const coreMaterial = addResource(
      new THREE.MeshPhysicalMaterial({
        color: palette.core,
        transmission: 0.9,
        opacity: 1,
        transparent: true,
        roughness: 0.13,
        metalness: 0.01,
        ior: 1.5,
        thickness: 0.62,
        attenuationColor: palette.coreAttenuation,
        attenuationDistance: 1.1,
        clearcoat: 0.28,
        clearcoatRoughness: 0.2,
        specularIntensity: 0.9,
        side: THREE.DoubleSide,
      }),
    );
    coreGroup.add(new THREE.Mesh(coreGeometry, coreMaterial));

    const innerCoreGeometry = addResource(
      new THREE.CylinderGeometry(0.47, 0.47, 0.92, 24),
    );
    const innerCoreMaterial = addResource(
      new THREE.MeshStandardMaterial({
        color: palette.coreInner,
        emissive: palette.coreEmissive,
        emissiveIntensity: 0.48,
        transparent: true,
        opacity: 0.36,
        roughness: 0.34,
      }),
    );
    coreGroup.add(new THREE.Mesh(innerCoreGeometry, innerCoreMaterial));

    const ringGeometry = addResource(new THREE.TorusGeometry(0.65, 0.014, 8, 32));
    const ringMaterial = addResource(
      new THREE.MeshStandardMaterial({
        color: palette.ring,
        emissive: palette.ringEmissive,
        emissiveIntensity: 0.72,
        roughness: 0.24,
      }),
    );
    for (const y of [-0.34, 0, 0.34]) {
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = y;
      coreGroup.add(ring);
    }

    const coreLight = new THREE.PointLight(palette.ring, 1.55, 3.8, 1.35);
    coreLight.position.y = 0.08;
    coreGroup.add(coreLight);

    const conduitGeometry = addResource(new THREE.CylinderGeometry(0.034, 0.034, 2.35, 10));
    const conduitMaterial = addResource(
      new THREE.MeshStandardMaterial({
        color: palette.conduit,
        emissive: palette.ringEmissive,
        emissiveIntensity: 0.72,
        transparent: true,
        opacity: 0.44,
      }),
    );
    const conduit = new THREE.Mesh(conduitGeometry, conduitMaterial);
    conduit.position.y = 0.05;
    assembly.add(conduit);

    const particleGeometry = addResource(new THREE.SphereGeometry(0.043, 10, 10));
    const particleMaterial = addResource(
      new THREE.MeshStandardMaterial({
        color: palette.particle,
        emissive: palette.ring,
        emissiveIntensity: 1.05,
        transparent: true,
        opacity: 0.84,
      }),
    );
    const particles = Array.from({ length: 5 }, (_, index) => {
      const mesh = new THREE.Mesh(particleGeometry, particleMaterial);
      const startY = 1.05 - index * 0.43;
      mesh.position.set(0, startY, 0);
      assembly.add(mesh);
      return {
        mesh,
        y: startY,
        speed: 0.2 + (index % 2) * 0.06,
      };
    });

    const groundTexture = addResource(createRadialTexture(palette.ground, 192));
    const groundMaterial = addResource(
      new THREE.MeshBasicMaterial({
        map: groundTexture,
        transparent: true,
        opacity: 0.38,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    const groundGeometry = addResource(new THREE.PlaneGeometry(5.2, 5.2));
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.74;
    scene.add(ground);

    const postgresAnchor = new THREE.Vector3(0.46, 1.85, 0.34);
    const writesAnchor = new THREE.Vector3(1.62, 0.08, 0.2);
    const warehouseAnchor = new THREE.Vector3(1.62, -0.66, 0.04);
    const initialWidth = Math.max(host.clientWidth, width);
    const initialHeight = Math.max(host.clientHeight, height);
    let sceneWidth = initialWidth;
    let sceneHeight = initialHeight;
    let previousTime = performance.now();
    let currentPointerX = 0;
    let currentPointerY = 0;

    const updateAnchors = () => {
      assembly.updateMatrixWorld(true);
      onAnchorsUpdate?.({
        postgres: projectAnchor(
          postgresAnchor,
          assembly,
          camera,
          sceneWidth,
          sceneHeight,
        ),
        writes: projectAnchor(
          writesAnchor,
          assembly,
          camera,
          sceneWidth,
          sceneHeight,
        ),
        warehouse: projectAnchor(
          warehouseAnchor,
          assembly,
          camera,
          sceneWidth,
          sceneHeight,
        ),
      });
    };

    render = (time) => {
      if (disposed || !renderer || !scene) return;

      const delta = Math.min((time - previousTime) / 1000, 0.1);
      previousTime = time;

      if (reducedMotion) {
        assembly.position.y = 0;
        assembly.rotation.x = baseRotationX;
        assembly.rotation.y = baseRotationY;
        coreLight.intensity = 1.55;
        particles.forEach(({ mesh }) => {
          mesh.visible = false;
        });
      } else {
        const pointer = getPointer();
        currentPointerX += (pointer.x - currentPointerX) * 0.045;
        currentPointerY += (pointer.y - currentPointerY) * 0.045;
        const seconds = time / 1000;

        assembly.position.y = Math.sin(seconds * 0.62) * 0.035;
        assembly.rotation.x = baseRotationX + currentPointerY * 0.045;
        assembly.rotation.y = baseRotationY + currentPointerX * 0.06;
        coreLight.intensity = 1.55 + Math.sin(seconds * 1.2) * 0.12;

        particles.forEach((particle, index) => {
          particle.y -= particle.speed * delta;
          if (particle.y < -0.84) particle.y = 1.06 + index * 0.04;
          particle.mesh.position.y = particle.y;
        });
      }

      renderer.render(scene, camera);
      updateAnchors();
    };

    const handleResize = () => {
      if (disposed || !renderer) return;
      const nextRect = host.getBoundingClientRect();
      sceneWidth = Math.max(nextRect.width, 1);
      sceneHeight = Math.max(nextRect.height, 1);
      setRendererSize(renderer, camera, sceneWidth, sceneHeight);
      render(performance.now());
    };

    resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(host);

    intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          render(performance.now());
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { rootMargin: "120px" },
    );
    intersectionObserver.observe(host);
    document.addEventListener("visibilitychange", onVisibilityChange);

    setRendererSize(renderer, camera, sceneWidth, sceneHeight);
    render(performance.now());
    host.dataset.webglStatus = "ready";
    delete host.dataset.lunaFallback;
    delete host.dataset.lunaFallbackReason;
    host.dataset.lunaStatic = reducedMotion ? "true" : "false";
    onReadyChange?.(true);
    startAnimation();
  } catch {
    dispose();
    markFallback("initialization");
  }

  return { dispose };
}
