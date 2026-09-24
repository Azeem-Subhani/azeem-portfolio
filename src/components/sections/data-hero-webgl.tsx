"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import type * as THREE from "three";

export type DataHeroPointer = {
  x: number;
  y: number;
};

type DataHeroTheme = "light" | "dark";

type DataHeroWebglProps = {
  reduced: boolean;
  theme: DataHeroTheme;
  pointerRef: RefObject<DataHeroPointer | null>;
  onReadyChange: (ready: boolean) => void;
};

const VIEW_WIDTH = 700;
const VIEW_HEIGHT = 540;
const ORB_X = 393 - VIEW_WIDTH / 2;
const ORB_Y = VIEW_HEIGHT / 2 - 270;

const palette = {
  dark: {
    base: "#4f9ca2",
    accent: "#a5f3e9",
    glow: "#bd92ff",
  },
  light: {
    base: "#88c8c0",
    accent: "#176f78",
    glow: "#7752c9",
  },
} as const;

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vViewDirection;

  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);

    vNormal = normalize(normalMatrix * normal);
    vWorldPosition = worldPosition.xyz;
    vViewDirection = normalize(-viewPosition.xyz);

    gl_Position = projectionMatrix * viewPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform vec3 uBaseColor;
  uniform vec3 uAccentColor;
  uniform vec3 uGlowColor;

  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vViewDirection;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(vViewDirection);
    vec3 lightDirection = normalize(vec3(
      -0.36 + uPointer.x * 0.28,
      0.52 - uPointer.y * 0.2,
      0.92
    ));

    float facing = max(dot(normal, viewDirection), 0.0);
    float fresnel = pow(1.0 - facing, 2.15);
    float highlight = pow(
      max(dot(reflect(-lightDirection, normal), viewDirection), 0.0),
      8.0
    );
    float movingBand = 0.5 + 0.5 * sin(
      vWorldPosition.y * 0.06 + vWorldPosition.x * 0.035 + uTime * 0.82
    );

    vec3 color = mix(uBaseColor, uAccentColor, fresnel * 0.74);
    color = mix(color, uGlowColor, highlight * 0.34 + fresnel * 0.12);

    float alpha = 0.16 + fresnel * 0.44 + highlight * 0.11 + movingBand * 0.035;
    gl_FragColor = vec4(color, alpha);
  }
`;

export function DataHeroWebgl({
  reduced,
  theme,
  pointerRef,
  onReadyChange,
}: DataHeroWebglProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const reducedRef = useRef(reduced);
  const themeRef = useRef(theme);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
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
    const material = materialRef.current;
    if (!material) return;

    const colors = palette[theme];
    (material.uniforms.uBaseColor.value as THREE.Color).set(colors.base);
    (material.uniforms.uAccentColor.value as THREE.Color).set(colors.accent);
    (material.uniforms.uGlowColor.value as THREE.Color).set(colors.glow);
    renderRef.current?.();
  }, [theme]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let rendererForCleanup: THREE.WebGLRenderer | undefined;
    let geometryForCleanup: THREE.SphereGeometry | undefined;
    let materialForCleanup: THREE.ShaderMaterial | undefined;
    let resizeObserverForCleanup: ResizeObserver | undefined;
    let intersectionObserverForCleanup: IntersectionObserver | undefined;
    let visibilityHandlerForCleanup: (() => void) | undefined;

    const initialize = async () => {
      try {
        const three = await import("three");
        if (cancelled) return;

        const renderer = new three.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
        rendererForCleanup = renderer;
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.outputColorSpace = three.SRGBColorSpace;
        renderer.domElement.className = "data-hero-webgl-canvas";
        renderer.domElement.setAttribute("aria-hidden", "true");
        host.appendChild(renderer.domElement);

        const scene = new three.Scene();
        const camera = new three.OrthographicCamera(
          -VIEW_WIDTH / 2,
          VIEW_WIDTH / 2,
          VIEW_HEIGHT / 2,
          -VIEW_HEIGHT / 2,
          0.1,
          1000,
        );
        camera.position.z = 500;
        camera.lookAt(0, 0, 0);

        const colors = palette[themeRef.current];
        const material = new three.ShaderMaterial({
          uniforms: {
            uTime: { value: 0 },
            uPointer: { value: new three.Vector2() },
            uResolution: { value: new three.Vector2(1, 1) },
            uBaseColor: { value: new three.Color(colors.base) },
            uAccentColor: { value: new three.Color(colors.accent) },
            uGlowColor: { value: new three.Color(colors.glow) },
          },
          vertexShader,
          fragmentShader,
          transparent: true,
          depthWrite: false,
          side: three.FrontSide,
        });
        materialForCleanup = material;
        const geometry = new three.SphereGeometry(104, 48, 32);
        geometryForCleanup = geometry;
        const orb = new three.Mesh(geometry, material);
        orb.position.set(ORB_X, ORB_Y, 0);
        scene.add(orb);

        materialRef.current = material;

        let animationFrame: number | null = null;
        let lastFrame = 0;
        let visible = true;
        let latestTime = 0;
        let active = true;

        const render = (time = latestTime) => {
          if (!active) return;

          latestTime = time;
          const pointer = pointerRef.current;
          material.uniforms.uTime.value = reducedRef.current ? 0 : time / 1000;
          material.uniforms.uPointer.value.set(pointer?.x ?? 0, pointer?.y ?? 0);

          const phase = (time / 1000) * ((Math.PI * 2) / 5.8);
          orb.position.y = ORB_Y + (reducedRef.current ? 0 : Math.sin(phase) * 5);
          orb.rotation.y = reducedRef.current ? 0 : time / 1000 * 0.1;
          orb.rotation.x = reducedRef.current ? 0 : (pointer?.y ?? 0) * 0.025;
          orb.rotation.z = reducedRef.current ? 0 : (pointer?.x ?? 0) * 0.018;

          renderer.render(scene, camera);
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

          if (time - lastFrame >= 32) {
            render(time);
            lastFrame = time;
          }
          animationFrame = window.requestAnimationFrame(tick);
        };

        const startLoop = () => {
          if (
            animationFrame !== null ||
            reducedRef.current ||
            !visible ||
            document.hidden
          ) {
            return;
          }
          animationFrame = window.requestAnimationFrame(tick);
        };

        const resize = () => {
          const rect = host.getBoundingClientRect();
          const width = Math.max(rect.width, 1);
          const height = Math.max(rect.height, 1);
          const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

          renderer.setPixelRatio(pixelRatio);
          renderer.setSize(width, height, false);
          material.uniforms.uResolution.value.set(
            width * pixelRatio,
            height * pixelRatio,
          );
          render();
        };

        renderRef.current = render;
        startLoopRef.current = startLoop;
        stopLoopRef.current = stopLoop;

        const resizeObserver = new ResizeObserver(resize);
        resizeObserverForCleanup = resizeObserver;
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
        intersectionObserverForCleanup = intersectionObserver;
        intersectionObserver.observe(host);

        const onVisibilityChange = () => {
          if (document.hidden) {
            stopLoop();
          } else {
            render();
            startLoop();
          }
        };
        visibilityHandlerForCleanup = onVisibilityChange;
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
          geometry.dispose();
          material.dispose();
          renderer.dispose();
          renderer.domElement.remove();
          renderRef.current = null;
          startLoopRef.current = null;
          stopLoopRef.current = null;
          materialRef.current = null;
          rendererForCleanup = undefined;
          geometryForCleanup = undefined;
          materialForCleanup = undefined;
          resizeObserverForCleanup = undefined;
          intersectionObserverForCleanup = undefined;
          visibilityHandlerForCleanup = undefined;
        };
      } catch {
        resizeObserverForCleanup?.disconnect();
        intersectionObserverForCleanup?.disconnect();
        if (visibilityHandlerForCleanup) {
          document.removeEventListener("visibilitychange", visibilityHandlerForCleanup);
        }
        geometryForCleanup?.dispose();
        materialForCleanup?.dispose();
        rendererForCleanup?.dispose();
        rendererForCleanup?.domElement.remove();
        renderRef.current = null;
        startLoopRef.current = null;
        stopLoopRef.current = null;
        materialRef.current = null;
        rendererForCleanup = undefined;
        geometryForCleanup = undefined;
        materialForCleanup = undefined;
        resizeObserverForCleanup = undefined;
        intersectionObserverForCleanup = undefined;
        visibilityHandlerForCleanup = undefined;
        if (!cancelled) {
          host.dataset.webglStatus = "fallback";
          onReadyRef.current(false);
        }
      }
    };

    let dispose: (() => void) | undefined;
    const cleanupPromise = initialize();
    void cleanupPromise.then((cleanup) => {
      if (cancelled) {
        cleanup?.();
      } else {
        dispose = cleanup;
      }
    });

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [pointerRef]);

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
