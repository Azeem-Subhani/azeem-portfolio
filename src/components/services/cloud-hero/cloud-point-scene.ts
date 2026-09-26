import * as THREE from "three";

/**
 * A cumulus made of points. It forms by streaming up three wires (one per
 * provider) and blooming into a single cloud, then idles with a slow boil.
 *
 * Kept free of React so the hero can load it with a dynamic import and keep
 * three.js off the page's first paint.
 */

export type CloudSceneOptions = {
  canvas: HTMLCanvasElement;
  /** Horizontal stage fractions (0 = left edge) where the DOM wires sit. */
  wireX: readonly number[];
  /** Vertical stage fraction (0 = top) the flat base of the cloud lines up with. */
  baseY: number;
  /** Vertical stage fraction where the wires end at each provider. */
  terminalY: number;
  dark: boolean;
  /** Render the finished cloud once, with no intro, boil, or pointer response. */
  reduced: boolean;
  onConverged?: () => void;
};

export type CloudScene = {
  resize(width: number, height: number): void;
  /** Pointer in normalized device coordinates, or null when it leaves the stage. */
  setPointer(point: { x: number; y: number } | null): void;
  setDark(dark: boolean): void;
  startIntro(): void;
  play(): void;
  pause(): void;
  dispose(): void;
};

// The cloud in its own space: a flat base at CLOUD_BASE, bumps on top, some
// depth so the slow sway reads as volume. Units are arbitrary world units.
const CLOUD_BASE = -0.72;
const CLOUD_WIDTH = 4.7;
const CLOUD_HEIGHT = 2.35;
const SPHERES: [x: number, y: number, z: number, r: number][] = [
  // A cumulus: one tall crown, two lower shoulders, tapering ends.
  [0, 0.3, 0, 0.95],
  [0.15, 1.0, 0, 0.6],
  [-0.95, 0.15, 0.1, 0.72],
  [-0.7, 0.72, -0.1, 0.5],
  [1.0, 0.05, -0.05, 0.75],
  [0.9, 0.62, 0.1, 0.48],
  [-1.75, -0.3, 0, 0.48],
  [1.8, -0.3, 0.05, 0.5],
  // Depth, so the sway shows volume instead of a cut-out.
  [0.1, 0.1, -0.5, 0.8],
  [0, -0.1, 0.45, 0.7],
  // A low row so the underside is one continuous flat base.
  [-1.5, -0.45, 0, 0.5],
  [-0.75, -0.45, 0.05, 0.55],
  [0, -0.45, 0, 0.55],
  [0.75, -0.45, -0.05, 0.55],
  [1.5, -0.45, 0, 0.5],
];

const SUN = new THREE.Vector3(-0.45, 0.85, 0.35).normalize();
const FOV = 30;
const TAN_HALF = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
/** Share of the stage width the cloud fills. */
const WIDTH_SHARE = 0.8;
/** How far past 1 the intro runs so the last-delayed points can land. */
const INTRO_END = 1.1;
const INTRO_SECONDS = 2.6;
/** World size of one point before per-point variation. */
const POINT_SIZE = 0.022;

const palettes = {
  dark: {
    lit: new THREE.Color("#fdf6e3"),
    shade: new THREE.Color("#5aa8a8"),
    accent: new THREE.Color("#6ff0e2"),
    opacity: 0.8,
    haze: new THREE.Color("#4fa3a3"),
    hazeOpacity: 0.12,
    blending: THREE.AdditiveBlending,
  },
  light: {
    lit: new THREE.Color("#6f9a9a"),
    shade: new THREE.Color("#073642"),
    accent: new THREE.Color("#1c827a"),
    opacity: 0.46,
    // On paper the haze reads as smudges above a whisper.
    haze: new THREE.Color("#2a6f73"),
    hazeOpacity: 0.018,
    blending: THREE.NormalBlending,
  },
} as const;

/** Seeded so the cloud has the same shape on every visit. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Signed distance to the cloud (negative inside) and the surface normal nearest p. */
function sampleField(x: number, y: number, z: number) {
  let nearest = Infinity;
  let normal: [number, number, number] = [0, 1, 0];
  for (const [cx, cy, cz, r] of SPHERES) {
    const dx = x - cx;
    const dy = y - cy;
    const dz = z - cz;
    const len = Math.hypot(dx, dy, dz);
    const d = len - r;
    if (d < nearest) {
      nearest = d;
      normal = len > 1e-6 ? [dx / len, dy / len, dz / len] : [0, 1, 0];
    }
  }
  // Clip everything below the base plane so the underside is flat.
  const below = CLOUD_BASE - y;
  if (below > nearest) return { sdf: below, normal: [0, -1, 0] as [number, number, number] };
  return { sdf: nearest, normal };
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function buildGeometry(count: number, wireX: readonly number[]) {
  const random = mulberry32(20260925);
  const ends = new Float32Array(count * 3);
  const jitter = new Float32Array(count * 3);
  const cluster = new Float32Array(count);
  const delay = new Float32Array(count);
  const seed = new Float32Array(count);
  const light = new Float32Array(count);
  const size = new Float32Array(count);
  const accent = new Float32Array(count);

  // Wires split the cloud into thirds: each point streams up the wire under it.
  const splitLeft = (wireX[0] + wireX[1] - 1) * (CLOUD_WIDTH / 2) / WIDTH_SHARE;
  const splitRight = (wireX[1] + wireX[2] - 1) * (CLOUD_WIDTH / 2) / WIDTH_SHARE;

  let i = 0;
  let guard = 0;
  while (i < count && guard < count * 60) {
    guard++;
    const x = (random() - 0.5) * CLOUD_WIDTH;
    const y = CLOUD_BASE + random() * CLOUD_HEIGHT;
    const z = (random() - 0.5) * 2.6;
    const { sdf, normal } = sampleField(x, y, z);
    if (sdf > 0) continue;
    // Favor the surface so the silhouette stays crisp while the inside stays soft.
    const surface = smoothstep(-0.28, 0, sdf);
    if (random() > 0.1 + 0.9 * surface) continue;

    ends.set([x, y, z], i * 3);
    jitter.set([random() - 0.5, random() - 0.5, random() - 0.5], i * 3);
    cluster[i] = x < splitLeft ? 0 : x > splitRight ? 2 : 1;
    const heightShare = (y - CLOUD_BASE) / CLOUD_HEIGHT;
    // The cloud fills from the base up, like condensation rising.
    delay[i] = 0.4 * heightShare + 0.25 * random();
    seed[i] = random();
    const lambert = normal[0] * SUN.x + normal[1] * SUN.y + normal[2] * SUN.z;
    light[i] = (lambert * 0.5 + 0.5) * (0.45 + 0.55 * surface);
    size[i] = 0.7 + random() * 0.55;
    accent[i] = random() < 0.025 ? 1 : 0;
    i++;
  }

  const geometry = new THREE.BufferGeometry();
  // `position` only exists so three can compute bounds; the shader uses aEnd.
  geometry.setAttribute("position", new THREE.BufferAttribute(ends, 3));
  geometry.setAttribute("aEnd", new THREE.BufferAttribute(ends, 3));
  geometry.setAttribute("aJitter", new THREE.BufferAttribute(jitter, 3));
  geometry.setAttribute("aCluster", new THREE.BufferAttribute(cluster, 1));
  geometry.setAttribute("aDelay", new THREE.BufferAttribute(delay, 1));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
  geometry.setAttribute("aLight", new THREE.BufferAttribute(light, 1));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
  geometry.setAttribute("aAccent", new THREE.BufferAttribute(accent, 1));
  geometry.setDrawRange(0, i);
  return geometry;
}

/** A few large, faint blobs deep inside the cloud give it body between the points. */
function buildHaze(count: number) {
  const random = mulberry32(7);
  const ends = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  let i = 0;
  let guard = 0;
  while (i < count && guard < count * 200) {
    guard++;
    const x = (random() - 0.5) * CLOUD_WIDTH;
    const y = CLOUD_BASE + random() * CLOUD_HEIGHT;
    const z = (random() - 0.5) * 2.6;
    if (sampleField(x, y, z).sdf > -0.18) continue;
    ends.set([x, y, z], i * 3);
    seed[i] = random();
    i++;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(ends, 3));
  geometry.setAttribute("aEnd", new THREE.BufferAttribute(ends, 3));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
  geometry.setDrawRange(0, i);
  return geometry;
}

const hazeVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uBoil;
  uniform mat3 uRot;
  uniform vec3 uOffset;
  uniform float uSize;

  attribute vec3 aEnd;
  attribute float aSeed;

  void main() {
    vec3 home = aEnd + uBoil * 0.06 * vec3(sin(uTime * 0.3 + aSeed * 6.2831), sin(uTime * 0.25 + aSeed * 3.1), 0.0);
    vec4 mv = modelViewMatrix * vec4(uRot * home + uOffset, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (18.0 + aSeed * 14.0) / -mv.z;
  }
`;

const hazeFragmentShader = /* glsl */ `
  uniform vec3 uHaze;
  uniform float uHazeOpacity;
  uniform float uProgress;

  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    // Gaussian falloff so overlapping blobs never show an edge.
    float glow = exp(-r * r * 14.0);
    gl_FragColor = vec4(uHaze, uHazeOpacity * glow * smoothstep(0.6, 1.1, uProgress));
  }
`;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uBoil;
  uniform mat3 uRot;
  uniform vec3 uOffset;
  uniform vec3 uTerminals[3];
  uniform float uBaseWorldY;
  uniform vec2 uPointer;
  uniform float uPointerForce;
  uniform float uAspect;
  uniform float uSize;

  attribute vec3 aEnd;
  attribute vec3 aJitter;
  attribute float aCluster;
  attribute float aDelay;
  attribute float aSeed;
  attribute float aLight;
  attribute float aSize;
  attribute float aAccent;

  varying float vLight;
  varying float vAccent;
  varying float vAlpha;

  vec3 terminalFor(float c) {
    return c < 0.5 ? uTerminals[0] : (c < 1.5 ? uTerminals[1] : uTerminals[2]);
  }

  void main() {
    // Slow boil: each point drifts on its own phase so the edge never looks cut.
    vec3 home = aEnd + uBoil * 0.035 * vec3(
      sin(uTime * 0.55 + aEnd.y * 3.1 + aSeed * 6.2831),
      sin(uTime * 0.45 + aEnd.z * 2.7 + aSeed * 4.1),
      sin(uTime * 0.5 + aEnd.x * 2.9 + aSeed * 2.3)
    );
    home = uRot * home + uOffset;

    // Intro: start in a tight bundle at the provider, rise up the wire to the
    // base, then curve out to the point's place in the cloud.
    vec3 terminal = terminalFor(aCluster);
    vec3 start = terminal + aJitter * vec3(0.05, 0.02, 0.05);
    vec3 control = vec3(terminal.x, uBaseWorldY, 0.0);
    float t = clamp((uProgress - aDelay) / 0.45, 0.0, 1.0);
    t = 1.0 - pow(1.0 - t, 3.0);
    float it = 1.0 - t;
    vec3 pos = it * it * start + 2.0 * it * t * control + t * t * home;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);

    // Points near the cursor ease out of its way.
    vec4 clip = projectionMatrix * mv;
    vec2 d = clip.xy / clip.w - uPointer;
    d.x *= uAspect;
    float dist2 = dot(d, d);
    float push = uPointerForce * exp(-dist2 / 0.03) * t;
    if (dist2 > 1e-6) mv.xy += normalize(d) * push * 0.28;

    gl_Position = projectionMatrix * mv;
    float transit = 1.0 - t;
    gl_PointSize = max(1.0, uSize * aSize * (1.0 + 0.5 * transit) / -mv.z);

    vLight = mix(aLight, 1.0, transit);
    vAccent = aAccent;
    vAlpha = smoothstep(0.0, 0.05, t);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uLit;
  uniform vec3 uShade;
  uniform vec3 uAccent;
  uniform float uOpacity;
  uniform float uDark;

  varying float vLight;
  varying float vAccent;
  varying float vAlpha;

  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    float soft = smoothstep(0.5, 0.18, r);
    vec3 color = mix(mix(uShade, uLit, vLight), uAccent, vAccent);
    // Dark: lit points shine. Light: shadowed points carry more ink, like stipple.
    float lit = pow(vLight, 1.4);
    float strength = uDark > 0.5 ? 0.3 + 0.7 * lit : 0.3 + 0.7 * (1.0 - lit * 0.75);
    gl_FragColor = vec4(color, uOpacity * strength * soft * vAlpha);
  }
`;

export function createCloudScene(options: CloudSceneOptions): CloudScene {
  const { canvas, wireX, baseY, terminalY, reduced, onConverged } = options;

  // Throws when WebGL is unavailable; the caller falls back to the static stage.
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
  renderer.setPixelRatio(pixelRatio);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);

  // Fewer points on narrow stages; the silhouette holds up well below 5k.
  const count = canvas.clientWidth < 520 ? 12000 : 16000;
  const geometry = buildGeometry(count, wireX);
  const uniforms = {
    uTime: { value: 0 },
    uProgress: { value: reduced ? INTRO_END : 0 },
    uBoil: { value: reduced ? 0 : 1 },
    uRot: { value: new THREE.Matrix3() },
    uOffset: { value: new THREE.Vector3() },
    uTerminals: { value: [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()] },
    uBaseWorldY: { value: 0 },
    uPointer: { value: new THREE.Vector2(9, 9) },
    uPointerForce: { value: 0 },
    uAspect: { value: 1 },
    uSize: { value: 1 },
    uLit: { value: new THREE.Color() },
    uShade: { value: new THREE.Color() },
    uAccent: { value: new THREE.Color() },
    uOpacity: { value: 0.5 },
    uDark: { value: 1 },
    uHaze: { value: new THREE.Color() },
    uHazeOpacity: { value: 0.06 },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
  });
  const points = new THREE.Points(geometry, material);
  // Points move in the shader, so three's bounds are meaningless here.
  points.frustumCulled = false;
  points.renderOrder = 1;

  // The haze shares the cloud's uniforms so it sways and forms with it.
  const hazeGeometry = buildHaze(canvas.clientWidth < 520 ? 140 : 220);
  const hazeMaterial = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: hazeVertexShader,
    fragmentShader: hazeFragmentShader,
    transparent: true,
    depthWrite: false,
  });
  const haze = new THREE.Points(hazeGeometry, hazeMaterial);
  haze.frustumCulled = false;
  haze.renderOrder = 0;
  scene.add(haze, points);

  const rotation = new THREE.Matrix4();
  const euler = new THREE.Euler();
  const pointer = { x: 0, y: 0, tx: 0, ty: 0, force: 0, targetForce: 0 };
  let introPlaying = false;
  let converged = reduced;
  let running = false;
  let frame = 0;
  let last = 0;
  let width = 1;
  let height = 1;

  const applyTheme = (dark: boolean) => {
    const p = dark ? palettes.dark : palettes.light;
    uniforms.uLit.value.copy(p.lit);
    uniforms.uShade.value.copy(p.shade);
    uniforms.uAccent.value.copy(p.accent);
    uniforms.uOpacity.value = p.opacity;
    uniforms.uDark.value = dark ? 1 : 0;
    uniforms.uHaze.value.copy(p.haze);
    uniforms.uHazeOpacity.value = p.hazeOpacity;
    material.blending = p.blending;
    hazeMaterial.blending = p.blending;
    material.needsUpdate = true;
    hazeMaterial.needsUpdate = true;
  };

  const updateRotation = (time: number) => {
    // A slow sway plus a little lean toward the pointer. Never a full spin.
    const sway = reduced ? 0 : Math.sin(time * 0.07) * 0.22;
    euler.set(0.05 - pointer.y * 0.06, sway + pointer.x * 0.18, 0);
    rotation.makeRotationFromEuler(euler);
    uniforms.uRot.value.setFromMatrix4(rotation);
  };

  const render = () => renderer.render(scene, camera);

  const tick = (now: number) => {
    frame = requestAnimationFrame(tick);
    // Capped so a stalled tab resumes smoothly, loose enough that slow GPUs still finish the intro on time.
    const dt = Math.min(0.1, last ? (now - last) / 1000 : 0);
    last = now;
    uniforms.uTime.value += dt;

    if (introPlaying) {
      uniforms.uProgress.value = Math.min(
        INTRO_END,
        uniforms.uProgress.value + (dt * INTRO_END) / INTRO_SECONDS,
      );
      if (uniforms.uProgress.value >= INTRO_END) {
        introPlaying = false;
        if (!converged) {
          converged = true;
          onConverged?.();
        }
      }
    }

    // Ease the pointer so the cloud leans instead of snapping.
    pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 3);
    pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 3);
    pointer.force += (pointer.targetForce - pointer.force) * Math.min(1, dt * 4);
    uniforms.uPointerForce.value = pointer.force;

    updateRotation(uniforms.uTime.value);
    render();
  };

  applyTheme(options.dark);

  return {
    resize(w, h) {
      width = Math.max(1, w);
      height = Math.max(1, h);
      renderer.setSize(width, height, false);
      const aspect = width / height;
      camera.aspect = aspect;

      // Back the camera off until the cloud fits both ways: WIDTH_SHARE of the
      // width, and its full height above the base line.
      const byWidth = CLOUD_WIDTH / WIDTH_SHARE / (2 * TAN_HALF * aspect);
      const byHeight = CLOUD_HEIGHT / (baseY - 0.08) / (2 * TAN_HALF);
      const distance = Math.max(byWidth, byHeight);
      camera.position.set(0, 0, distance);
      camera.updateProjectionMatrix();

      // Map stage fractions onto the z = 0 plane so the scene meets the DOM wires.
      const viewHeight = 2 * distance * TAN_HALF;
      const viewWidth = viewHeight * aspect;
      const baseWorldY = (0.5 - baseY) * viewHeight;
      uniforms.uBaseWorldY.value = baseWorldY;
      uniforms.uOffset.value.set(0, baseWorldY - CLOUD_BASE, 0);
      wireX.forEach((fx, index) => {
        uniforms.uTerminals.value[index]?.set(
          (fx - 0.5) * viewWidth,
          (0.5 - terminalY) * viewHeight,
          0,
        );
      });
      uniforms.uAspect.value = aspect;
      uniforms.uSize.value = POINT_SIZE * ((height * pixelRatio) / (2 * TAN_HALF));

      if (!running) {
        updateRotation(uniforms.uTime.value);
        render();
      }
    },
    setPointer(point) {
      if (reduced) return;
      if (point) {
        pointer.tx = point.x;
        pointer.ty = point.y;
        pointer.targetForce = 1;
        uniforms.uPointer.value.set(point.x, point.y);
      } else {
        pointer.tx = 0;
        pointer.ty = 0;
        pointer.targetForce = 0;
      }
    },
    setDark(dark) {
      applyTheme(dark);
      if (!running) render();
    },
    startIntro() {
      if (reduced || converged) return;
      introPlaying = true;
    },
    play() {
      if (reduced || running) return;
      running = true;
      last = 0;
      frame = requestAnimationFrame(tick);
    },
    pause() {
      running = false;
      cancelAnimationFrame(frame);
    },
    dispose() {
      running = false;
      cancelAnimationFrame(frame);
      geometry.dispose();
      material.dispose();
      hazeGeometry.dispose();
      hazeMaterial.dispose();
      renderer.dispose();
    },
  };
}
