"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import type * as THREE from "three";

import {
  CORE,
  FLOW,
  NODE_R,
  ORBIT,
  VIEW_HEIGHT,
  VIEW_WIDTH,
  nodePositions,
  orbitRotations,
  routes,
  type Point,
  type RouteKey,
} from "./data-hero-geometry";

// Shared, mutable motion state. GSAP in DataHeroVisual tweens these numbers
// with the same timings it gives the SVG, and the render loop reads them each
// frame, so the glass scene and the SVG overlay move as one.
export type DataHeroMotion = {
  pointerX: number;
  pointerY: number;
  offsetX: number;
  offsetY: number;
  float: number;
  routePostgres: number;
  routeWrites: number;
  routeWarehouse: number;
  nodePostgres: number;
  nodeWrites: number;
  nodeWarehouse: number;
  // Returns the SVG's SMIL clock so tube energy follows the SVG pulses.
  clock: (() => number) | null;
};

export function createDataHeroMotion(): DataHeroMotion {
  return {
    pointerX: 0,
    pointerY: 0,
    offsetX: 0,
    offsetY: 0,
    float: 0,
    routePostgres: 1,
    routeWrites: 1,
    routeWarehouse: 1,
    nodePostgres: 1,
    nodeWrites: 1,
    nodeWarehouse: 1,
    clock: null,
  };
}

type DataHeroTheme = "light" | "dark";

type DataHeroWebglProps = {
  reduced: boolean;
  theme: DataHeroTheme;
  motionRef: RefObject<DataHeroMotion>;
  onReadyChange: (ready: boolean) => void;
};

type Tone = "cyan" | "teal" | "violet";

const toneOf: Record<RouteKey, Tone> = {
  postgres: "cyan",
  writes: "teal",
  warehouse: "violet",
};

// Site palette only (Solarized accents plus the hero's violet). Light mode
// needs darker rims and more body so the glass still reads on cream.
const palette = {
  dark: {
    coreTint: "#135a64",
    coreRim: "#b8efe6",
    highlight: "#ffffff",
    backlight: "#b595f5",
    iris: 0.28,
    coreBody: 0.07,
    nodeBody: 0.16,
    ring: "#6cc9be",
    ringGlow: "#e6fffb",
    ringAlpha: 1,
    tones: {
      cyan: { tint: "#0e4f73", rim: "#8fd3f2", glow: "#dff4ff" },
      teal: { tint: "#0d5a55", rim: "#7fe0d4", glow: "#e0fffa" },
      violet: { tint: "#3b2a73", rim: "#c7b2ff", glow: "#f1eaff" },
    },
  },
  light: {
    coreTint: "#bfe3dc",
    coreRim: "#17666d",
    highlight: "#ffffff",
    backlight: "#7c5bd6",
    iris: 0.14,
    coreBody: 0.07,
    nodeBody: 0.16,
    ring: "#1f8f86",
    ringGlow: "#effcf9",
    ringAlpha: 0.62,
    tones: {
      cyan: { tint: "#b9dcef", rim: "#1f78b8", glow: "#0b4f80" },
      teal: { tint: "#b8e3dc", rim: "#1f8c84", glow: "#0c5a55" },
      violet: { tint: "#ddd2f6", rim: "#6f4fcf", glow: "#43288f" },
    },
  },
} as const;

// SVG space (y down, origin top-left) to world space (y up, origin centre).
function toWorld(point: Point) {
  return { x: point.x - VIEW_WIDTH / 2, y: VIEW_HEIGHT / 2 - point.y };
}

const CORE_WORLD = toWorld(CORE);
const ORBIT_TILT = Math.acos(ORBIT.ry / ORBIT.rx);
// Alternate tilt direction so each ring crosses in front of the core on a
// different side.
const orbitTiltSigns = [-1, 1, -1] as const;
const orbitTubes = [4.6, 3.4, 1.8] as const;
const orbitAlphas = [1, 0.85, 0.45] as const;
const TUBE_R = 8.5;

const sphereVertex = /* glsl */ `
  varying vec3 vNormal;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Glass sphere. The camera is orthographic, so every view ray is +z in view
// space and the facing term is just the view-space normal's z.
const sphereFragment = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform vec3 uTint;
  uniform vec3 uRim;
  uniform vec3 uHighlight;
  uniform vec3 uBacklight;
  uniform float uIris;
  uniform float uBody;
  uniform float uInner;
  uniform float uBack;
  uniform float uSpec;
  uniform float uAlpha;

  varying vec3 vNormal;

  void main() {
    vec3 n = normalize(vNormal);
    // The back pass shows the inner wall, so light it with the inward normal.
    if (uBack > 0.5) n = -n;

    float facing = clamp(abs(n.z), 0.0, 1.0);
    float edge = 1.0 - facing;
    float fresnel = pow(edge, 2.2);
    float rim = smoothstep(0.86, 0.995, edge);

    vec3 lightDir = normalize(vec3(-0.5 + uPointer.x * 0.35, 0.62 - uPointer.y * 0.3, 0.62));
    vec3 halfDir = normalize(lightDir + vec3(0.0, 0.0, 1.0));
    float nh = max(dot(n, halfDir), 0.0);
    // Bubble highlights: a small crisp glint, an inset crescent that follows
    // the lit side, and light catching the very edge.
    float spec = smoothstep(0.9935, 0.9975, nh) * uSpec;
    float gloss = pow(nh, 10.0);
    vec2 side = normalize(n.xy + 1e-5);
    float toward = dot(side, normalize(lightDir.xy));
    float band = smoothstep(0.42, 0.52, edge) * (1.0 - smoothstep(0.6, 0.72, edge));
    float crescent = (band * smoothstep(0.62, 0.95, toward) * 0.8
      + rim * smoothstep(0.1, 0.8, toward) * 0.6) * uSpec;

    // Cool back light on the lower right edge, like the reference's rim.
    vec3 backDir = normalize(vec3(0.72, -0.58, 0.32));
    float back = pow(max(dot(n, backDir), 0.0), 2.0) * fresnel;

    // Thin-film sheen: hue drifts with angle, kept to a narrow band.
    float film = edge * 1.6 + n.x * 0.22 - n.y * 0.32 + uTime * 0.018;
    vec3 iris = 0.5 + 0.5 * cos(6.28318 * (film + vec3(0.0, 0.33, 0.67)));
    float irisMask = smoothstep(0.22, 0.7, edge) * (1.0 - smoothstep(0.86, 1.0, edge));

    // Light focusing through the bottom of the bubble.
    float caustic = smoothstep(0.15, 0.95, -n.y) * pow(facing, 1.4) * uInner;

    vec3 color = mix(uTint, uRim, fresnel);
    color = mix(color, mix(iris, uRim, 0.45), irisMask * uIris);
    color = mix(color, uBacklight, back * 0.75);
    color = mix(color, uRim, caustic * 0.55);
    color = mix(color, uHighlight, clamp(spec * 0.9 + crescent * 0.8 + gloss * 0.14, 0.0, 1.0));

    float alpha = uBody
      + fresnel * 0.46
      + rim * 0.3
      + spec * 0.55
      + crescent * 0.5
      + gloss * 0.05
      + back * 0.32
      + caustic * 0.16
      + irisMask * uIris * 0.14;

    gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0) * uAlpha);
  }
`;

const tubeVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Glass pipe with particles streaming through it. uv.x runs along the route
// in the direction data flows; uActive brightens the stream while this
// route's pulse is travelling.
const tubeFragment = /* glsl */ `
  uniform float uTime;
  uniform float uReveal;
  uniform float uActive;
  uniform float uSeed;
  uniform float uLength;
  uniform float uRadius;
  uniform float uAlpha;
  uniform vec3 uColor;
  uniform vec3 uGlow;

  varying vec2 vUv;
  varying vec3 vNormal;

  float hash(float n) {
    return fract(sin(n * 127.1 + uSeed * 311.7) * 43758.5453);
  }

  void main() {
    if (vUv.x > uReveal) discard;

    vec3 n = normalize(vNormal);
    float facing = abs(n.z);
    float edge = pow(1.0 - facing, 1.8);

    // Screen direction of the pipe, so particles can sit across its width.
    vec2 grad = vec2(dFdx(vUv.x), dFdy(vUv.x));
    vec2 along = grad / max(length(grad), 1e-6);
    vec2 across = vec2(-along.y, along.x);
    float lateral = dot(n.xy, across);

    float s = vUv.x * uLength;
    float sparks = 0.0;
    for (int k = 0; k < 2; k++) {
      float fk = float(k);
      float spacing = 11.0 + fk * 7.0;
      float speed = 52.0 + fk * 24.0;
      float p = (s - uTime * speed) / spacing + fk * 0.37;
      float id = floor(p);
      float present = step(0.32, hash(id + fk * 17.0));
      float offset = (hash(id * 1.7 + 3.1 + fk * 5.0) - 0.5) * 1.3;
      float dAlong = (fract(p) - 0.5) * spacing * 0.55;
      float dAcross = (lateral - offset) * uRadius;
      float d = length(vec2(dAlong, dAcross));
      sparks += present * smoothstep(1.7, 0.2, d) * (0.65 + 0.35 * hash(id + 9.0));
    }

    float filament = pow(facing, 10.0);
    float energy = mix(0.35, 1.0, uActive);
    vec3 color = mix(uColor, uGlow, clamp(sparks + filament * 0.5 * uActive, 0.0, 1.0));
    float alpha = 0.1 + edge * 0.62 + sparks * energy + filament * 0.3 * energy;
    // Soft leading edge while the pipe draws in.
    alpha *= smoothstep(0.0, 0.03, uReveal - vUv.x);

    gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0) * uAlpha);
  }
`;

const ringVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying float vDepth;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vDepth = (modelMatrix * vec4(position, 1.0)).z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Each ring is drawn twice: the far half before the spheres and the near
// half after them, so it passes behind and in front of the glass without a
// depth buffer fighting the transparency.
const ringFragment = /* glsl */ `
  uniform float uTime;
  uniform float uSide;
  uniform float uSeed;
  uniform float uReach;
  uniform float uAlpha;
  uniform vec3 uColor;
  uniform vec3 uGlow;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying float vDepth;

  void main() {
    if (vDepth * uSide < 0.0) discard;

    vec3 n = normalize(vNormal);
    float facing = abs(n.z);
    float edge = pow(1.0 - facing, 1.6);
    float stripe = pow(facing, 16.0);
    float glint = pow(0.5 + 0.5 * cos(6.28318 * (vUv.x - uTime * 0.035 - uSeed)), 70.0);
    float depthFade = mix(0.45, 1.0, smoothstep(-uReach, uReach, vDepth));

    vec3 color = mix(uColor, uGlow, clamp(stripe * 0.6 + glint, 0.0, 1.0));
    float alpha = (0.06 + edge * 0.42 + stripe * 0.3 + glint * 0.75) * depthFade;

    gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0) * uAlpha);
  }
`;

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
}

// How lit each route's stream is at this point of the flow cycle.
function routeEnergy(cycle: number) {
  const inbound = smoothstep(0, 0.06, cycle) * (1 - smoothstep(FLOW.handoff - 0.06, FLOW.handoff + 0.02, cycle));
  const outbound =
    smoothstep(FLOW.handoff - 0.02, FLOW.handoff + 0.04, cycle) *
    (1 - smoothstep(FLOW.outboundEnd - 0.05, FLOW.outboundEnd + 0.03, cycle));
  return { inbound, outbound };
}

export function DataHeroWebgl({
  reduced,
  theme,
  motionRef,
  onReadyChange,
}: DataHeroWebglProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const reducedRef = useRef(reduced);
  const themeRef = useRef(theme);
  const applyThemeRef = useRef<((theme: DataHeroTheme) => void) | null>(null);
  const renderRef = useRef<(() => void) | null>(null);
  const startLoopRef = useRef<(() => void) | null>(null);
  const stopLoopRef = useRef<(() => void) | null>(null);
  const onReadyRef = useRef(onReadyChange);

  useEffect(() => {
    onReadyRef.current = onReadyChange;
  }, [onReadyChange]);

  useEffect(() => {
    reducedRef.current = reduced;

    if (reduced) {
      stopLoopRef.current?.();
      renderRef.current?.();
      return;
    }

    startLoopRef.current?.();
  }, [reduced]);

  useEffect(() => {
    themeRef.current = theme;
    applyThemeRef.current?.(theme);
    renderRef.current?.();
  }, [theme]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    const disposables: { dispose: () => void }[] = [];
    let teardown: (() => void) | undefined;

    const clearRefs = () => {
      renderRef.current = null;
      startLoopRef.current = null;
      stopLoopRef.current = null;
      applyThemeRef.current = null;
    };

    const initialize = async () => {
      let renderer: THREE.WebGLRenderer | undefined;
      try {
        const three = await import("three");
        if (cancelled) return;

        renderer = new three.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
        disposables.push(renderer);
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.outputColorSpace = three.SRGBColorSpace;
        renderer.domElement.className = "data-hero-webgl-canvas";
        renderer.domElement.setAttribute("aria-hidden", "true");
        host.appendChild(renderer.domElement);
        const glRenderer = renderer;

        const scene = new three.Scene();
        // World units are SVG viewBox units, so the overlay lines up 1:1.
        const camera = new three.OrthographicCamera(
          -VIEW_WIDTH / 2,
          VIEW_WIDTH / 2,
          VIEW_HEIGHT / 2,
          -VIEW_HEIGHT / 2,
          0.1,
          2000,
        );
        camera.position.z = 800;
        camera.lookAt(0, 0, 0);

        const system = new three.Group();
        scene.add(system);

        // Every layer is transparent and ordered explicitly by renderOrder.
        const makeMaterial = (
          vertexShader: string,
          fragmentShader: string,
          uniforms: Record<string, THREE.IUniform>,
          side: THREE.Side = three.FrontSide,
        ) => {
          const material = new three.ShaderMaterial({
            uniforms,
            vertexShader,
            fragmentShader,
            transparent: true,
            depthTest: false,
            depthWrite: false,
            side,
          });
          disposables.push(material);
          return material;
        };

        const track = <T extends { dispose: () => void }>(item: T) => {
          disposables.push(item);
          return item;
        };

        const ORDER = { ringsBack: 0, tubes: 1, sphereBack: 2, sphereFront: 3, ringsFront: 4 };
        const sphereMaterials: THREE.ShaderMaterial[] = [];
        const tubeMaterials: THREE.ShaderMaterial[] = [];
        const ringMaterials: THREE.ShaderMaterial[] = [];

        const sphereUniforms = (back: boolean) => ({
          uTime: { value: 0 },
          uPointer: { value: new three.Vector2() },
          uTint: { value: new three.Color() },
          uRim: { value: new three.Color() },
          uHighlight: { value: new three.Color() },
          uBacklight: { value: new three.Color() },
          uIris: { value: 0 },
          uBody: { value: 0 },
          uInner: { value: 0 },
          uBack: { value: back ? 1 : 0 },
          uSpec: { value: 0 },
          uAlpha: { value: 1 },
        });

        // A glass sphere is a back-face pass (inner wall) plus a front pass.
        const makeSphere = (radius: number, detail: [number, number], tone: Tone | "core") => {
          const geometry = track(new three.SphereGeometry(radius, detail[0], detail[1]));
          const holder = new three.Group();
          for (const back of [true, false]) {
            const material = makeMaterial(
              sphereVertex,
              sphereFragment,
              sphereUniforms(back),
              back ? three.BackSide : three.FrontSide,
            );
            material.userData = { tone, back };
            sphereMaterials.push(material);
            const mesh = new three.Mesh(geometry, material);
            mesh.renderOrder = back ? ORDER.sphereBack : ORDER.sphereFront;
            holder.add(mesh);
          }
          return holder;
        };

        const core = makeSphere(CORE.r, [72, 48], "core");
        core.position.set(CORE_WORLD.x, CORE_WORLD.y, 0);
        system.add(core);

        const nodeKeys = ["postgres", "writes", "warehouse"] as const;
        const nodes = nodeKeys.map((key) => {
          const sphere = makeSphere(NODE_R, [40, 28], toneOf[key]);
          const at = toWorld(nodePositions[key]);
          sphere.position.set(at.x, at.y, 0);
          system.add(sphere);
          return { key, sphere };
        });

        const tubes = nodeKeys.map((key, index) => {
          const route = routes[key];
          const [start, control, end] = [route.start, route.control, route.end].map(toWorld);
          const curve = new three.QuadraticBezierCurve3(
            new three.Vector3(start.x, start.y, 0),
            new three.Vector3(control.x, control.y, 0),
            new three.Vector3(end.x, end.y, 0),
          );
          const geometry = track(new three.TubeGeometry(curve, 80, TUBE_R, 18, false));
          const material = makeMaterial(tubeVertex, tubeFragment, {
            uTime: { value: 0 },
            uReveal: { value: 1 },
            uActive: { value: 0 },
            uSeed: { value: index * 1.37 + 0.4 },
            uLength: { value: curve.getLength() },
            uRadius: { value: TUBE_R },
            uAlpha: { value: 1 },
            uColor: { value: new three.Color() },
            uGlow: { value: new three.Color() },
          });
          material.userData = { tone: toneOf[key] };
          tubeMaterials.push(material);
          const mesh = new three.Mesh(geometry, material);
          mesh.renderOrder = ORDER.tubes;
          system.add(mesh);
          return { key, material };
        });

        // Rings: tilt the parent with the pointer, spin inside it, then give
        // each ring its own in-plane angle and tilt.
        const ringTilt = new three.Group();
        ringTilt.position.set(CORE_WORLD.x, CORE_WORLD.y, 0);
        const ringSpin = new three.Group();
        ringTilt.add(ringSpin);
        system.add(ringTilt);

        orbitRotations.forEach((degrees, index) => {
          const holder = new three.Group();
          holder.rotation.z = (-degrees * Math.PI) / 180;
          const geometry = track(new three.TorusGeometry(ORBIT.rx, orbitTubes[index], 14, 220));
          for (const side of [-1, 1]) {
            const material = makeMaterial(ringVertex, ringFragment, {
              uTime: { value: 0 },
              uSide: { value: side },
              uSeed: { value: index * 0.31 },
              uReach: { value: ORBIT.rx * Math.sin(ORBIT_TILT) },
              uAlpha: { value: 1 },
              uColor: { value: new three.Color() },
              uGlow: { value: new three.Color() },
            });
            material.userData = { index };
            ringMaterials.push(material);
            const mesh = new three.Mesh(geometry, material);
            mesh.rotation.x = orbitTiltSigns[index] * ORBIT_TILT;
            mesh.renderOrder = side < 0 ? ORDER.ringsBack : ORDER.ringsFront;
            holder.add(mesh);
          }
          ringSpin.add(holder);
        });

        const applyTheme = (next: DataHeroTheme) => {
          const colors = palette[next];
          for (const material of sphereMaterials) {
            const { tone, back } = material.userData as { tone: Tone | "core"; back: boolean };
            const u = material.uniforms;
            const isCore = tone === "core";
            const tones = isCore ? null : colors.tones[tone];
            (u.uTint.value as THREE.Color).set(isCore ? colors.coreTint : tones!.tint);
            (u.uRim.value as THREE.Color).set(isCore ? colors.coreRim : tones!.rim);
            (u.uHighlight.value as THREE.Color).set(colors.highlight);
            (u.uBacklight.value as THREE.Color).set(isCore ? colors.backlight : tones!.glow);
            u.uIris.value = (isCore ? colors.iris : colors.iris * 0.5) * (back ? 0.5 : 1);
            u.uBody.value = back ? 0.015 : isCore ? colors.coreBody : colors.nodeBody;
            u.uInner.value = back ? 0 : isCore ? 1 : 0.6;
            u.uSpec.value = back ? 0 : isCore ? 1 : 0.45;
            u.uAlpha.value = back ? 0.5 : 1;
          }
          for (const material of tubeMaterials) {
            const tones = colors.tones[(material.userData as { tone: Tone }).tone];
            (material.uniforms.uColor.value as THREE.Color).set(tones.rim);
            (material.uniforms.uGlow.value as THREE.Color).set(tones.glow);
          }
          for (const material of ringMaterials) {
            (material.uniforms.uColor.value as THREE.Color).set(colors.ring);
            (material.uniforms.uGlow.value as THREE.Color).set(colors.ringGlow);
            const { index } = material.userData as { index: number };
            material.uniforms.uAlpha.value = orbitAlphas[index] * colors.ringAlpha;
          }
        };
        applyTheme(themeRef.current);

        let animationFrame: number | null = null;
        let lastFrame = 0;
        let latestTime = 0;
        let visible = true;
        let active = true;

        const routeReveal = (motion: DataHeroMotion, key: RouteKey) =>
          key === "postgres" ? motion.routePostgres : key === "writes" ? motion.routeWrites : motion.routeWarehouse;
        const nodeReveal = (motion: DataHeroMotion, key: RouteKey) =>
          key === "postgres" ? motion.nodePostgres : key === "writes" ? motion.nodeWrites : motion.nodeWarehouse;

        const render = (time = latestTime) => {
          if (!active) return;
          latestTime = time;

          const motion = motionRef.current;
          const still = reducedRef.current;
          const seconds = still ? 0 : time / 1000;

          system.position.set(motion.offsetX, -motion.offsetY, 0);
          core.position.y = CORE_WORLD.y - motion.float;

          ringSpin.rotation.z = still ? 0 : -(seconds / 48) * Math.PI * 2;
          ringTilt.rotation.x = -(motion.offsetY / 7) * 0.12;
          ringTilt.rotation.y = (motion.offsetX / 10) * 0.16;

          for (const material of sphereMaterials) {
            material.uniforms.uTime.value = seconds;
            (material.uniforms.uPointer.value as THREE.Vector2).set(motion.pointerX, motion.pointerY);
          }

          for (const { key, sphere } of nodes) {
            const reveal = nodeReveal(motion, key);
            sphere.scale.setScalar(0.82 + reveal * 0.18);
            for (const child of sphere.children) {
              const material = (child as THREE.Mesh).material as THREE.ShaderMaterial;
              const back = (material.userData as { back: boolean }).back;
              material.uniforms.uAlpha.value = reveal * (back ? 0.5 : 1);
            }
          }

          // Energy follows the SVG pulses when their clock is available.
          const flowSeconds = motion.clock?.() ?? seconds;
          const cycle = (flowSeconds % FLOW.seconds) / FLOW.seconds;
          const energy = still ? { inbound: 0.6, outbound: 0.6 } : routeEnergy(cycle);
          for (const { key, material } of tubes) {
            material.uniforms.uTime.value = seconds;
            material.uniforms.uReveal.value = routeReveal(motion, key) * 1.03;
            material.uniforms.uActive.value = key === "writes" ? energy.inbound : energy.outbound;
          }

          for (const material of ringMaterials) {
            material.uniforms.uTime.value = seconds;
          }

          glRenderer.render(scene, camera);
        };

        const stopLoop = () => {
          if (animationFrame === null) return;
          window.cancelAnimationFrame(animationFrame);
          animationFrame = null;
        };

        const tick = (time: number) => {
          if (!active || reducedRef.current || !visible || document.hidden) {
            animationFrame = null;
            return;
          }

          // Cap at roughly 30fps; the motion is slow and this halves GPU work.
          if (time - lastFrame >= 32) {
            render(time);
            lastFrame = time;
          }
          animationFrame = window.requestAnimationFrame(tick);
        };

        const startLoop = () => {
          if (animationFrame !== null || reducedRef.current || !visible || document.hidden) {
            return;
          }
          animationFrame = window.requestAnimationFrame(tick);
        };

        const resize = () => {
          const rect = host.getBoundingClientRect();
          const width = Math.max(rect.width, 1);
          const height = Math.max(rect.height, 1);
          glRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
          glRenderer.setSize(width, height, false);
          render();
        };

        renderRef.current = render;
        startLoopRef.current = startLoop;
        stopLoopRef.current = stopLoop;
        applyThemeRef.current = applyTheme;

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(host);

        const intersectionObserver = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
            if (visible) {
              render();
              startLoop();
            } else {
              stopLoop();
            }
          },
          { rootMargin: "120px" },
        );
        intersectionObserver.observe(host);

        const onVisibilityChange = () => {
          if (document.hidden) {
            stopLoop();
          } else {
            render();
            startLoop();
          }
        };
        document.addEventListener("visibilitychange", onVisibilityChange);

        resize();
        if (reducedRef.current) {
          render();
        } else {
          startLoop();
        }

        host.dataset.webglStatus = "ready";
        onReadyRef.current(true);

        return () => {
          active = false;
          stopLoop();
          resizeObserver.disconnect();
          intersectionObserver.disconnect();
          document.removeEventListener("visibilitychange", onVisibilityChange);
          for (const item of disposables) item.dispose();
          disposables.length = 0;
          glRenderer.domElement.remove();
          clearRefs();
        };
      } catch {
        for (const item of disposables) item.dispose();
        disposables.length = 0;
        renderer?.domElement.remove();
        clearRefs();
        if (!cancelled) {
          host.dataset.webglStatus = "fallback";
          onReadyRef.current(false);
        }
      }
    };

    void initialize().then((cleanup) => {
      if (cancelled) {
        cleanup?.();
      } else {
        teardown = cleanup;
      }
    });

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, [motionRef]);

  return (
    <div
      ref={hostRef}
      className="data-hero-webgl"
      data-data-hero-webgl
      data-webgl-status="loading"
      aria-hidden="true"
    />
  );
}
