import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type AnchorName = "postgres" | "writes" | "warehouse";

export type GlassStack = {
  resize: (width: number, height: number) => void;
  render: (time: number, reduced: boolean) => void;
  project: (
    name: AnchorName,
    width: number,
    height: number,
  ) => { x: number; y: number; visible: boolean };
  dispose: () => void;
};

const FIELD = 0x02181b;

function washTexture(inner: string, outer: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const gradient = ctx.createRadialGradient(128, 128, 8, 128, 128, 124);
  gradient.addColorStop(0, inner);
  gradient.addColorStop(0.55, outer);
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function sparkTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.22, "rgba(214,255,248,0.85)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function frostMaterial(body: number, rim: number, alpha: number) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.FrontSide,
    uniforms: {
      uBody: { value: new THREE.Color(body) },
      uRim: { value: new THREE.Color(rim) },
      uAlpha: { value: alpha },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vNormal = normalize(mat3(modelMatrix) * normal);
        vView = normalize(cameraPosition - world.xyz);
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vView;
      uniform vec3 uBody;
      uniform vec3 uRim;
      uniform float uAlpha;
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 view = normalize(vView);
        float fresnel = pow(1.0 - max(dot(normal, view), 0.0), 2.2);
        float top = smoothstep(0.05, 0.8, normal.y);
        vec3 color = mix(uBody * 0.45, uBody, top);
        color += uRim * fresnel * 0.55;
        color += uRim * top * 0.08;
        float alpha = uAlpha * (0.42 + top * 0.35) + fresnel * 0.38;
        gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.94));
      }
    `,
  });
}

export function createGlassStack(canvas: HTMLCanvasElement): GlassStack {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(FIELD, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(FIELD);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envScene = new RoomEnvironment();
  const envMap = pmrem.fromScene(envScene, 0.04);
  scene.environment = envMap.texture;
  pmrem.dispose();

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 40);

  const stack = new THREE.Group();
  scene.add(stack);

  const plateGeometry = new RoundedBoxGeometry(2.2, 0.09, 2.2, 5, 0.18);
  const topMat = frostMaterial(0xc9fff8, 0xf4fffd, 0.46);
  const midMat = frostMaterial(0xb7efe8, 0xe5fffb, 0.38);
  const botMat = frostMaterial(0xc3b0ff, 0xf0e9ff, 0.5);

  const top = new THREE.Mesh(plateGeometry, topMat);
  const mid = new THREE.Mesh(plateGeometry, midMat);
  const bot = new THREE.Mesh(plateGeometry, botMat);
  top.position.y = 0.72;
  mid.position.y = -0.08;
  bot.position.y = -0.88;
  top.renderOrder = 3;
  mid.renderOrder = 2;
  bot.renderOrder = 1;
  stack.add(top, mid, bot);

  const drum = new THREE.Group();
  drum.position.y = 0.72 + 0.045 + 0.32;
  drum.renderOrder = 4;
  stack.add(drum);

  const drumGlass = frostMaterial(0xe9fffd, 0xffffff, 0.28);
  drumGlass.side = THREE.DoubleSide;
  drumGlass.depthWrite = false;
  const wall = new THREE.Mesh(
    new THREE.CylinderGeometry(0.42, 0.42, 0.64, 72, 1, true),
    drumGlass,
  );
  drum.add(wall);

  const core = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.26, 0.46, 48),
    new THREE.MeshBasicMaterial({
      color: 0x9ef3ec,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  drum.add(core);

  const rimMat = new THREE.MeshBasicMaterial({
    color: 0xf4fffd,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.01, 10, 72), rimMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.32;
  const foot = rim.clone();
  foot.position.y = -0.32;
  drum.add(rim, foot);

  const seatTex = washTexture("rgba(230,255,252,0.95)", "rgba(140,240,230,0)");
  if (seatTex) {
    const seat = new THREE.Mesh(
      new THREE.CircleGeometry(0.62, 48),
      new THREE.MeshBasicMaterial({
        map: seatTex,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    seat.rotation.x = -Math.PI / 2;
    seat.position.y = 0.72 + 0.05;
    stack.add(seat);
  }

  const spark = sparkTexture();
  const glints: THREE.Sprite[] = [];
  if (spark) {
    const spots: Array<[number, number, number, number]> = [
      [0.62, 0.86, 0.28, 0.11],
      [-0.48, 0.86, -0.22, 0.07],
      [0.18, 0.16, -0.55, 0.08],
      [-0.72, 0.16, 0.34, 0.06],
      [0.78, -0.54, 0.42, 0.12],
      [-0.22, -0.54, -0.66, 0.07],
      [0.05, 1.22, 0.12, 0.09],
    ];
    for (const [x, y, z, size] of spots) {
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: spark,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          toneMapped: false,
          opacity: 0.85,
        }),
      );
      sprite.position.set(x, y, z);
      sprite.scale.setScalar(size);
      stack.add(sprite);
      glints.push(sprite);
    }
  }

  const anchors: Record<AnchorName, THREE.Object3D> = {
    postgres: new THREE.Object3D(),
    writes: new THREE.Object3D(),
    warehouse: new THREE.Object3D(),
  };
  anchors.postgres.position.set(0.52, 0.22, 0.05);
  drum.add(anchors.postgres);
  anchors.writes.position.set(1.16, -0.04, 0.12);
  stack.add(anchors.writes);
  anchors.warehouse.position.set(1.18, -0.82, 0.16);
  stack.add(anchors.warehouse);

  const under = new THREE.PointLight(0x9ffff2, 8, 7.5, 2);
  under.position.set(0, -1.15, 0.15);
  scene.add(under);

  const violet = new THREE.PointLight(0xc4b0ff, 10, 3.2, 2);
  violet.position.set(0.1, -0.85, 0.35);
  scene.add(violet);

  const coreLight = new THREE.PointLight(0xe8fffb, 6, 2.4, 2);
  coreLight.position.set(0, 1.2, 0);
  stack.add(coreLight);

  const grid = new THREE.Mesh(
    new THREE.PlaneGeometry(46, 46, 1, 1),
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uCenter: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        varying vec2 vFloor;
        void main() {
          vFloor = position.xy;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vFloor;
        uniform vec2 uCenter;
        float gridLine(vec2 uv, float scale, float width) {
          vec2 cell = abs(fract(uv * scale + 0.5) - 0.5);
          float dist = min(cell.x, cell.y);
          return 1.0 - smoothstep(width, width + 0.018, dist);
        }
        void main() {
          vec2 delta = vFloor - uCenter;
          float dist = length(delta);
          float minor = gridLine(vFloor, 0.38, 0.015);
          float major = gridLine(vFloor, 0.095, 0.028);
          float lines = max(minor * 0.35, major * 0.7);
          float pool = exp(-dist * dist * 0.07);
          float fade = smoothstep(20.0, 5.0, length(vFloor));
          vec3 ink = vec3(0.16, 0.55, 0.52);
          vec3 glow = vec3(0.55, 0.95, 0.9);
          vec3 color = ink * lines * (0.22 + pool * 1.4) + glow * pool * 0.28;
          float alpha = clamp((lines * 0.62 + pool * 0.22) * fade, 0.0, 0.75);
          gl_FragColor = vec4(color, alpha);
        }
      `,
    }),
  );
  grid.rotation.x = -Math.PI / 2;
  grid.position.y = -1.42;
  scene.add(grid);

  const pool = new THREE.Mesh(
    new THREE.CircleGeometry(0.72, 64),
    new THREE.MeshBasicMaterial({
      color: 0xc8fff6,
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    }),
  );
  pool.rotation.x = -Math.PI / 2;
  pool.position.y = -1.62;
  pool.position.z = -0.45;
  scene.add(pool);

  const pointer = new THREE.Vector3();
  const rests = {
    top: top.position.y,
    mid: mid.position.y,
    bot: bot.position.y,
  };

  function frame(width: number, height: number) {
    const aspect = width / Math.max(height, 1);
    const wide = width >= 980;
    stack.position.x = wide ? -0.05 : 0;
    pool.position.x = stack.position.x;
    grid.position.x = stack.position.x;
    const center = (
      grid.material as THREE.ShaderMaterial
    ).uniforms.uCenter.value as THREE.Vector2;
    center.set(0, 0);
    camera.fov = 27;
    camera.position.set(0.7, 3.45, 6.15);
    camera.lookAt(wide ? 0.05 : 0.1, -0.05, 0);
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    under.position.x = stack.position.x;
    violet.position.x = stack.position.x + 0.1;
  }

  function resize(width: number, height: number) {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, width < 800 ? 1.35 : 1.75);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height, false);
    frame(width, height);
  }

  function render(time: number, reduced: boolean) {
    const settle = reduced ? 1 : Math.min(1, time / 1.15);
    const ease = 1 - (1 - settle) ** 3;
    const breath = reduced ? 0 : Math.sin(time * 0.72) * 0.04 * ease;
    stack.position.y = (1 - ease) * -0.42 + breath;
    stack.rotation.y = 0.38 + (reduced ? 0 : Math.sin(time * 0.28) * 0.05 * ease);
    top.position.y = rests.top + (reduced ? 0 : Math.sin(time * 0.9) * 0.012);
    mid.position.y = rests.mid + (reduced ? 0 : Math.sin(time * 0.9 + 0.8) * 0.016);
    bot.position.y = rests.bot + (reduced ? 0 : Math.sin(time * 0.9 + 1.7) * 0.014);
    glints.forEach((sprite, index) => {
      const material = sprite.material as THREE.SpriteMaterial;
      material.opacity = reduced
        ? 0.7
        : 0.45 + Math.sin(time * 1.6 + index * 1.3) * 0.35;
    });
    (core.material as THREE.MeshBasicMaterial).opacity = reduced
      ? 0.26
      : 0.2 + Math.sin(time * 1.1) * 0.06;
    renderer.render(scene, camera);
  }

  function project(name: AnchorName, width: number, height: number) {
    anchors[name].getWorldPosition(pointer);
    pointer.project(camera);
    return {
      x: (pointer.x * 0.5 + 0.5) * width,
      y: (-pointer.y * 0.5 + 0.5) * height,
      visible: pointer.z < 1,
    };
  }

  function dispose() {
    renderer.dispose();
    envMap.texture.dispose();
    plateGeometry.dispose();
    topMat.dispose();
    midMat.dispose();
    botMat.dispose();
    drumGlass.dispose();
    (core.material as THREE.Material).dispose();
    rimMat.dispose();
    wall.geometry.dispose();
    core.geometry.dispose();
    rim.geometry.dispose();
    grid.geometry.dispose();
    (grid.material as THREE.Material).dispose();
    pool.geometry.dispose();
    (pool.material as THREE.Material).dispose();
    scene.traverse((object) => {
      const mesh = object as THREE.Mesh;
      if (mesh.geometry && mesh.geometry !== plateGeometry) {
        mesh.geometry.dispose?.();
      }
      const material = mesh.material as THREE.Material | THREE.Material[] | undefined;
      const list = Array.isArray(material) ? material : material ? [material] : [];
      for (const item of list) {
        const mapped = item as THREE.Material & { map?: THREE.Texture | null };
        mapped.map?.dispose();
        item.dispose();
      }
    });
    envScene.traverse((object) => {
      const mesh = object as THREE.Mesh;
      mesh.geometry?.dispose?.();
      const material = mesh.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(material)) material.forEach((item) => item.dispose());
      else material?.dispose();
    });
  }

  return { resize, render, project, dispose };
}
