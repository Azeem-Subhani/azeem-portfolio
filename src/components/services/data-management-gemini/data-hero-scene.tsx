"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type AnchorPosition = {
  x: number;
  y: number;
};

export type AnchorPositions = {
  postgres: AnchorPosition;
  writes: AnchorPosition;
  warehouse: AnchorPosition;
};

type DataHeroSceneProps = {
  reduced: boolean;
  pointer: { x: number; y: number };
  onAnchorsUpdate?: (anchors: AnchorPositions) => void;
  onReadyChange?: (ready: boolean) => void;
};

type ScenePalette = {
  ambient: number;
  key: number;
  rim: number;
  under: number;
  violet: number;
  coreLight: number;
  top: number;
  topAttenuation: number;
  middle: number;
  middleAttenuation: number;
  bottom: number;
  bottomAttenuation: number;
  cyanRim: number;
  violetRim: number;
  dbGlass: number;
  dbAttenuation: number;
  dbInner: number;
  dbEmissive: number;
  ring: number;
  ringEmissive: number;
  cap: number;
  conduit: number;
  conduitEmissive: number;
  particle: number;
  particleEmissive: number;
  grid: number;
  flare: string;
  cyanFlare: string;
  floorGlow: string;
};

const palette: ScenePalette = {
    ambient: 0x0a2226,
    key: 0xf2fbf9,
    rim: 0x5eead4,
    under: 0x0f766e,
    violet: 0xa855f7,
    coreLight: 0x2dd4bf,
    top: 0x78ebe1,
    topAttenuation: 0x2f948a,
    middle: 0x5eead4,
    middleAttenuation: 0x238279,
    bottom: 0x9585f2,
    bottomAttenuation: 0x5c4ac4,
    cyanRim: 0xa7f3d0,
    violetRim: 0xd8b4fe,
    dbGlass: 0xa7f3e8,
    dbAttenuation: 0x2d9487,
    dbInner: 0x2dd4bf,
    dbEmissive: 0x14b8a6,
    ring: 0x5eead4,
    ringEmissive: 0x2dd4bf,
    cap: 0xccfbf1,
    conduit: 0x5eead4,
    conduitEmissive: 0x2dd4bf,
    particle: 0xa7f3d0,
    particleEmissive: 0x5eead4,
    grid: 0x195754,
    flare: "rgba(235, 215, 255, 0.95)",
    cyanFlare: "rgba(204, 251, 241, 0.85)",
    floorGlow: "rgba(45, 212, 191, 0.75)",
};

// Generates a rounded rectangle 2D shape for the extruded glass slabs
function createRoundedRectShape(
  width: number,
  height: number,
  radius: number,
): THREE.Shape {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;

  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.absarc(x + width - radius, y + radius, radius, -Math.PI / 2, 0, false);
  shape.lineTo(x + width, y + height - radius);
  shape.absarc(x + width - radius, y + height - radius, radius, 0, Math.PI / 2, false);
  shape.lineTo(x + radius, y + height);
  shape.absarc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI, false);
  shape.lineTo(x, y + radius);
  shape.absarc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5, false);

  return shape;
}

// Procedural environment map for rich physical glass reflections & refractions
function createStudioEnvironment(
  renderer: THREE.WebGLRenderer,
): THREE.Texture {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Dark midnight teal studio gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 256);
    bgGrad.addColorStop(0, "#031518");
    bgGrad.addColorStop(0.5, "#061b1e");
    bgGrad.addColorStop(1, "#031114");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 512, 256);

    // Key softbox (top-left) - soft warm cyan
    const key = ctx.createRadialGradient(130, 60, 0, 130, 60, 130);
    key.addColorStop(0, "rgba(255, 255, 255, 0.95)");
    key.addColorStop(0.25, "rgba(180, 248, 240, 0.85)");
    key.addColorStop(0.6, "rgba(56, 178, 172, 0.35)");
    key.addColorStop(1, "rgba(3, 21, 24, 0)");
    ctx.fillStyle = key;
    ctx.fillRect(0, 0, 320, 200);

    // Rim softbox (right) - crisp cyan-teal
    const rim = ctx.createRadialGradient(390, 85, 0, 390, 85, 120);
    rim.addColorStop(0, "rgba(167, 243, 235, 0.85)");
    rim.addColorStop(0.35, "rgba(45, 212, 191, 0.45)");
    rim.addColorStop(1, "rgba(3, 21, 24, 0)");
    ctx.fillStyle = rim;
    ctx.fillRect(260, 0, 252, 200);

    // Bottom bounce (subtle violet reflection)
    const bounce = ctx.createRadialGradient(256, 210, 0, 256, 210, 130);
    bounce.addColorStop(0, "rgba(192, 132, 252, 0.55)");
    bounce.addColorStop(0.4, "rgba(124, 58, 237, 0.25)");
    bounce.addColorStop(1, "rgba(3, 17, 20, 0)");
    ctx.fillStyle = bounce;
    ctx.fillRect(100, 130, 312, 126);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  const envMap = pmremGenerator.fromEquirectangular(texture).texture;

  texture.dispose();
  pmremGenerator.dispose();

  return envMap;
}

// Generates soft radial glow texture for corner glints and floor light pool
function createRadialGlowTexture(color: string, size = 128): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const center = size / 2;
    const grad = ctx.createRadialGradient(center, center, 0, center, center, center);
    grad.addColorStop(0, color);
    grad.addColorStop(0.2, color);
    grad.addColorStop(0.5, "rgba(56, 178, 172, 0.35)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

export function DataHeroScene({
  reduced,
  pointer,
  onAnchorsUpdate,
  onReadyChange,
}: DataHeroSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef(pointer);
  const reducedRef = useRef(reduced);
  const onAnchorsUpdateRef = useRef(onAnchorsUpdate);
  const onReadyChangeRef = useRef(onReadyChange);

  useEffect(() => {
    pointerRef.current = pointer;
  }, [pointer]);

  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  useEffect(() => {
    onAnchorsUpdateRef.current = onAnchorsUpdate;
  }, [onAnchorsUpdate]);

  useEffect(() => {
    onReadyChangeRef.current = onReadyChange;
  }, [onReadyChange]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let animationFrameId: number | null = null;
    let isVisible = true;
    let renderer: THREE.WebGLRenderer | undefined;
    const disposables: Array<{ dispose: () => void }> = [];

    const init = () => {
      const rect = host.getBoundingClientRect();
      const width = Math.max(rect.width, 320);
      const height = Math.max(rect.height, 320);

      // Renderer setup
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
      renderer.setSize(width, height, false);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.domElement.className = "w-full h-full block";
      renderer.domElement.setAttribute("aria-hidden", "true");
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
      camera.position.set(0.15, 2.65, 6.4);
      camera.lookAt(0, -0.05, 0);

      // Studio Environment
      const envMap = createStudioEnvironment(renderer);
      scene.environment = envMap;
      disposables.push(envMap);

      // Lighting setup
      const ambientLight = new THREE.AmbientLight(palette.ambient, 1.3);
      scene.add(ambientLight);

      // Key light - crisp cool white/cyan from top left
      const keyLight = new THREE.DirectionalLight(palette.key, 2.4);
      keyLight.position.set(-3.5, 6.5, 4.5);
      scene.add(keyLight);

      // Rim light - sharp teal edge accent from right back
      const rimLight = new THREE.DirectionalLight(palette.rim, 2.2);
      rimLight.position.set(4.8, 4.8, -3.5);
      scene.add(rimLight);

      // Subtle under-fill light
      const underLight = new THREE.DirectionalLight(palette.under, 0.7);
      underLight.position.set(0, -4.5, 3.5);
      scene.add(underLight);

      // Restrained violet accent point light near bottom layer
      const violetPointLight = new THREE.PointLight(palette.violet, 2.1, 6, 1.2);
      violetPointLight.position.set(0.6, -0.7, 1.4);
      scene.add(violetPointLight);

      // Internal database core point light (cyan glow)
      const dbCoreLight = new THREE.PointLight(palette.coreLight, 3.2, 5, 1.1);
      dbCoreLight.position.set(0, 1.15, 0);
      scene.add(dbCoreLight);

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 3D OBJECT STACK GROUP
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      const stackGroup = new THREE.Group();
      // Base isometric-style tilt: looking slightly down and rotated
      const baseRotX = 0.44;
      const baseRotY = -0.72;
      stackGroup.rotation.x = baseRotX;
      stackGroup.rotation.y = baseRotY;
      scene.add(stackGroup);

      // ── Slabs Geometry ──
      const slabSize = 3.1;
      const slabDepth = 0.085;
      const slabShape = createRoundedRectShape(slabSize, slabSize, 0.45);
      const slabGeom = new THREE.ExtrudeGeometry(slabShape, {
        depth: slabDepth,
        bevelEnabled: true,
        bevelSegments: 5,
        steps: 1,
        bevelSize: 0.035,
        bevelThickness: 0.035,
      });
      slabGeom.center();
      disposables.push(slabGeom);

      // Rim edge lines to catch frosted edge highlights
      const rimPoints = slabShape.getPoints(42);
      const topRimPoints = rimPoints.map(
        (p) => new THREE.Vector3(p.x, p.y, slabDepth / 2 + 0.034),
      );
      const bottomRimPoints = rimPoints.map(
        (p) => new THREE.Vector3(p.x, p.y, -(slabDepth / 2 + 0.034)),
      );
      const topRimGeom = new THREE.BufferGeometry().setFromPoints(topRimPoints);
      const bottomRimGeom = new THREE.BufferGeometry().setFromPoints(bottomRimPoints);
      disposables.push(topRimGeom, bottomRimGeom);

      // Materials
      // Top Layer: Postgres / source of truth (Translucent sea-glass cyan)
      const topMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(palette.top),
        transmission: 0.9,
        opacity: 1,
        transparent: true,
        roughness: 0.12,
        metalness: 0.04,
        ior: 1.48,
        thickness: 1.05,
        attenuationColor: new THREE.Color(palette.topAttenuation),
        attenuationDistance: 1.3,
        specularIntensity: 1.0,
      });
      disposables.push(topMaterial);

      // Middle Layer: Live writes (Translucent aqua / sea-glass)
      const midMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(palette.middle),
        transmission: 0.88,
        opacity: 1,
        transparent: true,
        roughness: 0.14,
        metalness: 0.04,
        ior: 1.48,
        thickness: 1.05,
        attenuationColor: new THREE.Color(palette.middleAttenuation),
        attenuationDistance: 1.3,
        specularIntensity: 1.0,
      });
      disposables.push(midMaterial);

      // Bottom Layer: Warehouse (Restrained violet / indigo accent)
      const bottomMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(palette.bottom),
        transmission: 0.84,
        opacity: 1,
        transparent: true,
        roughness: 0.16,
        metalness: 0.06,
        ior: 1.48,
        thickness: 1.1,
        attenuationColor: new THREE.Color(palette.bottomAttenuation),
        attenuationDistance: 1.1,
        specularIntensity: 1.0,
      });
      disposables.push(bottomMaterial);

      // Edge line materials (additive frosted rim highlight)
      const cyanRimMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(palette.cyanRim),
        transparent: true,
        opacity: 0.62,
        blending: THREE.AdditiveBlending,
      });
      const violetRimMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(palette.violetRim),
        transparent: true,
        opacity: 0.72,
        blending: THREE.AdditiveBlending,
      });
      disposables.push(cyanRimMaterial, violetRimMaterial);

      // Helper to build a slab sub-assembly
      const createSlabMesh = (
        mat: THREE.Material,
        rimMat: THREE.Material,
      ) => {
        const group = new THREE.Group();
        const mesh = new THREE.Mesh(slabGeom, mat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.rotation.z = Math.PI / 4;
        group.add(mesh);

        const topRim = new THREE.LineLoop(topRimGeom, rimMat);
        topRim.rotation.x = -Math.PI / 2;
        topRim.rotation.z = Math.PI / 4;
        group.add(topRim);

        const botRim = new THREE.LineLoop(bottomRimGeom, rimMat);
        botRim.rotation.x = -Math.PI / 2;
        botRim.rotation.z = Math.PI / 4;
        group.add(botRim);

        return group;
      };

      // Create 3 layers
      const topSlab = createSlabMesh(topMaterial, cyanRimMaterial);
      topSlab.position.y = 0.68;
      stackGroup.add(topSlab);

      const midSlab = createSlabMesh(midMaterial, cyanRimMaterial);
      midSlab.position.y = 0.04;
      stackGroup.add(midSlab);

      const bottomSlab = createSlabMesh(bottomMaterial, violetRimMaterial);
      bottomSlab.position.y = -0.60;
      stackGroup.add(bottomSlab);

      // ── Front Corner Flare/Glint on Bottom Violet Slab ──
      const flareTex = createRadialGlowTexture(palette.flare, 128);
      disposables.push(flareTex);
      const flareMat = new THREE.SpriteMaterial({
        map: flareTex,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.85,
      });
      disposables.push(flareMat);
      const bottomCornerGlint = new THREE.Sprite(flareMat);
      // Front corner in slab coordinates after 45 deg rotation is at (0, y, +1.85)
      bottomCornerGlint.position.set(0, -0.58, 1.95);
      bottomCornerGlint.scale.set(0.65, 0.65, 0.65);
      stackGroup.add(bottomCornerGlint);

      // Smaller glint on middle slab front corner
      const cyanFlareTex = createRadialGlowTexture(palette.cyanFlare, 128);
      disposables.push(cyanFlareTex);
      const midFlareMat = new THREE.SpriteMaterial({
        map: cyanFlareTex,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.65,
      });
      disposables.push(midFlareMat);
      const midCornerGlint = new THREE.Sprite(midFlareMat);
      midCornerGlint.position.set(0, 0.06, 1.95);
      midCornerGlint.scale.set(0.48, 0.48, 0.48);
      stackGroup.add(midCornerGlint);

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // DATABASE CORE (Top Cylinder)
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      const dbGroup = new THREE.Group();
      dbGroup.position.set(0, 1.18, 0);
      stackGroup.add(dbGroup);

      // Outer glass cylinder
      const dbCylGeom = new THREE.CylinderGeometry(0.66, 0.66, 0.94, 64, 1, false);
      disposables.push(dbCylGeom);
      const dbGlassMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(palette.dbGlass),
        transmission: 0.92,
        opacity: 1,
        transparent: true,
        roughness: 0.09,
        metalness: 0.02,
        ior: 1.5,
        thickness: 0.9,
        attenuationColor: new THREE.Color(palette.dbAttenuation),
        attenuationDistance: 1.2,
        specularIntensity: 1.0,
      });
      disposables.push(dbGlassMat);
      const dbOuterMesh = new THREE.Mesh(dbCylGeom, dbGlassMat);
      dbGroup.add(dbOuterMesh);

      // Inner glowing core
      const dbInnerGeom = new THREE.CylinderGeometry(0.52, 0.52, 0.80, 32, 1, false);
      disposables.push(dbInnerGeom);
      const dbInnerMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(palette.dbInner),
        emissive: new THREE.Color(palette.dbEmissive),
        emissiveIntensity: 0.75,
        transparent: true,
        opacity: 0.45,
        roughness: 0.3,
      });
      disposables.push(dbInnerMat);
      const dbInnerMesh = new THREE.Mesh(dbInnerGeom, dbInnerMat);
      dbGroup.add(dbInnerMesh);

      // Horizontal storage rings (subtle glowing disk grooves)
      const ringGeom = new THREE.TorusGeometry(0.66, 0.015, 16, 64);
      disposables.push(ringGeom);
      const ringMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(palette.ring),
        emissive: new THREE.Color(palette.ringEmissive),
        emissiveIntensity: 1.2,
        roughness: 0.2,
      });
      disposables.push(ringMat);

      // Top ring, mid dividing ring, lower dividing ring
      const ringYPositions = [0.44, 0.08, -0.38];
      ringYPositions.forEach((yPos) => {
        const ring = new THREE.Mesh(ringGeom, ringMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = yPos;
        dbGroup.add(ring);
      });

      // Top reflective cap disc
      const capGeom = new THREE.CircleGeometry(0.64, 48);
      disposables.push(capGeom);
      const capMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(palette.cap),
        transmission: 0.85,
        roughness: 0.08,
        ior: 1.45,
        transparent: true,
        opacity: 0.9,
      });
      disposables.push(capMat);
      const capMesh = new THREE.Mesh(capGeom, capMat);
      capMesh.rotation.x = -Math.PI / 2;
      capMesh.position.y = 0.47;
      dbGroup.add(capMesh);

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // CENTRAL DATA CONDUIT & STREAM PARTICLES
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      const conduitGeom = new THREE.CylinderGeometry(0.045, 0.045, 2.25, 16);
      disposables.push(conduitGeom);
      const conduitMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(palette.conduit),
        emissive: new THREE.Color(palette.conduitEmissive),
        emissiveIntensity: 0.9,
        transparent: true,
        opacity: 0.38,
      });
      disposables.push(conduitMat);
      const conduitMesh = new THREE.Mesh(conduitGeom, conduitMat);
      conduitMesh.position.set(0, 0.05, 0);
      stackGroup.add(conduitMesh);

      // Moving glowing data particles traveling down
      const particleCount = 7;
      const particleGeom = new THREE.SphereGeometry(0.038, 12, 12);
      disposables.push(particleGeom);
      const particleMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(palette.particle),
        emissive: new THREE.Color(palette.particleEmissive),
        emissiveIntensity: 1.8,
        transparent: true,
        opacity: 0.9,
      });
      disposables.push(particleMat);

      const particles: Array<{
        mesh: THREE.Mesh;
        speed: number;
        y: number;
      }> = [];

      for (let i = 0; i < particleCount; i++) {
        const pMesh = new THREE.Mesh(particleGeom, particleMat);
        const startY = 1.15 - (i / particleCount) * 2.0;
        pMesh.position.set(0, startY, 0);
        stackGroup.add(pMesh);
        particles.push({
          mesh: pMesh,
          speed: 0.28 + (i % 3) * 0.08,
          y: startY,
        });
      }

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // GROUND PLANE (Isometric Grid & Floor Light Pool)
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      const groundY = -1.62;

      // Floor radial light pool
      const floorGlowTex = createRadialGlowTexture(palette.floorGlow, 256);
      disposables.push(floorGlowTex);
      const floorGlowMat = new THREE.MeshBasicMaterial({
        map: floorGlowTex,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.38,
        depthWrite: false,
      });
      disposables.push(floorGlowMat);
      const floorGlowGeom = new THREE.PlaneGeometry(5.2, 5.2);
      disposables.push(floorGlowGeom);
      const floorGlowMesh = new THREE.Mesh(
        floorGlowGeom,
        floorGlowMat,
      );
      floorGlowMesh.rotation.x = -Math.PI / 2;
      floorGlowMesh.position.set(0, groundY + 0.01, 0);
      scene.add(floorGlowMesh);

      // Floor Isometric Perspective Grid
      const gridLines: THREE.Vector3[] = [];
      const gridExtent = 6.8;
      const gridStep = 0.68;
      for (let i = -gridExtent; i <= gridExtent; i += gridStep) {
        // Lines along X
        gridLines.push(new THREE.Vector3(i, 0, -gridExtent));
        gridLines.push(new THREE.Vector3(i, 0, gridExtent));
        // Lines along Z
        gridLines.push(new THREE.Vector3(-gridExtent, 0, i));
        gridLines.push(new THREE.Vector3(gridExtent, 0, i));
      }
      const gridGeom = new THREE.BufferGeometry().setFromPoints(gridLines);
      disposables.push(gridGeom);
      const gridMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(palette.grid),
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      });
      disposables.push(gridMat);
      const gridMesh = new THREE.LineSegments(gridGeom, gridMat);
      // Align with isometric diamond orientation
      gridMesh.rotation.y = Math.PI / 4;
      gridMesh.position.set(0, groundY, 0);
      scene.add(gridMesh);

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 3D ANCHOR VECTORS FOR LABELS
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      const postgresLocalPos = new THREE.Vector3(0.5, 0.88, 0.45);
      const writesLocalPos = new THREE.Vector3(1.75, 0.04, 0.0);
      const warehouseLocalPos = new THREE.Vector3(1.65, -0.60, 0.0);

      const tempVec = new THREE.Vector3();
      const projectToScreen = (worldPos: THREE.Vector3) => {
        tempVec.copy(worldPos);
        tempVec.project(camera);
        return {
          x: (tempVec.x * 0.5 + 0.5) * host.clientWidth,
          y: (-tempVec.y * 0.5 + 0.5) * host.clientHeight,
        };
      };

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // RENDER & ANIMATION LOOP
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      let currentPointerX = 0;
      let currentPointerY = 0;
      let lastTime = performance.now();
      let particlesHidden = false;

      const render = (time: number) => {
        if (cancelled || !renderer) return;

        const dt = Math.min((time - lastTime) / 1000, 0.1);
        lastTime = time;

        const isReduced = reducedRef.current;
        const targetPointer = pointerRef.current;

        // Smooth pointer interpolation
        currentPointerX += (targetPointer.x - currentPointerX) * 0.06;
        currentPointerY += (targetPointer.y - currentPointerY) * 0.06;

        if (!isReduced) {
          const t = time / 1000;

          if (particlesHidden) {
            particles.forEach((p) => {
              p.mesh.visible = true;
            });
            particlesHidden = false;
          }

          // Gentle breathing float
          stackGroup.position.y = Math.sin(t * 0.75) * 0.045;
          const topRest = 0.68;
          const middleRest = 0.04;
          const bottomRest = -0.6;
          topSlab.position.y = topRest + Math.sin(t * 0.75) * 0.012;
          midSlab.position.y = middleRest + Math.sin(t * 0.75 + 0.6) * 0.01;
          bottomSlab.position.y = bottomRest + Math.sin(t * 0.75 + 1.2) * 0.008;

          // Parallax tilt responding to cursor
          stackGroup.rotation.x = baseRotX + currentPointerY * 0.07;
          stackGroup.rotation.y = baseRotY + currentPointerX * 0.09;

          // Database core subtle glow pulsation
          const coreGlowPulse = 0.95 + 0.15 * Math.sin(t * 1.6);
          dbCoreLight.intensity = 3.2 * coreGlowPulse;

          // Violet corner sparkle pulsation
          const glintPulse = 0.8 + 0.25 * Math.sin(t * 2.0);
          bottomCornerGlint.scale.set(
            0.65 * glintPulse,
            0.65 * glintPulse,
            0.65 * glintPulse,
          );

          // Animate data stream particles flowing downwards
          particles.forEach((p) => {
            p.y -= p.speed * dt;
            if (p.y < -0.85) {
              p.y = 1.15;
            }
            p.mesh.position.y = p.y;
            // Fade alpha at top and bottom limits
            const normY = (p.y + 0.85) / 2.0;
            const alpha = Math.sin(Math.PI * Math.max(0, Math.min(1, normY)));
            (p.mesh.material as THREE.MeshStandardMaterial).opacity =
              0.2 + alpha * 0.75;
          });
        } else {
          // Static resting positions
          stackGroup.position.y = 0;
          topSlab.position.y = 0.68;
          midSlab.position.y = 0.04;
          bottomSlab.position.y = -0.60;
          stackGroup.rotation.x = baseRotX;
          stackGroup.rotation.y = baseRotY;
          if (!particlesHidden) {
            particles.forEach((p) => {
              p.mesh.visible = false;
            });
            particlesHidden = true;
          }
        }

        renderer.render(scene, camera);

        // Update 2D screen positions of the 3 anchor points for annotations
        if (onAnchorsUpdateRef.current) {
          const pgWorld = postgresLocalPos
            .clone()
            .applyMatrix4(stackGroup.matrixWorld);
          const wrWorld = writesLocalPos
            .clone()
            .applyMatrix4(stackGroup.matrixWorld);
          const whWorld = warehouseLocalPos
            .clone()
            .applyMatrix4(stackGroup.matrixWorld);

          onAnchorsUpdateRef.current({
            postgres: projectToScreen(pgWorld),
            writes: projectToScreen(wrWorld),
            warehouse: projectToScreen(whWorld),
          });
        }
      };

      const loop = (time: number) => {
        if (cancelled) return;
        if (isVisible && !document.hidden) {
          render(time);
        }
        if (!reducedRef.current) {
          animationFrameId = requestAnimationFrame(loop);
        }
      };

      // Resize handling
      const handleResize = () => {
        if (!renderer || !host) return;
        const r = host.getBoundingClientRect();
        const w = Math.max(r.width, 320);
        const h = Math.max(r.height, 320);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
        render(performance.now());
      };

      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(host);

      const intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            render(performance.now());
            if (!reducedRef.current && animationFrameId === null) {
              animationFrameId = requestAnimationFrame(loop);
            }
          } else if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        },
        { rootMargin: "100px" },
      );
      intersectionObserver.observe(host);

      const onVisibilityChange = () => {
        if (document.hidden) {
          if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        } else {
          render(performance.now());
          if (!reducedRef.current && animationFrameId === null) {
            animationFrameId = requestAnimationFrame(loop);
          }
        }
      };
      document.addEventListener("visibilitychange", onVisibilityChange);

      // Start initial render and animation
      render(performance.now());
      if (!reducedRef.current) {
        animationFrameId = requestAnimationFrame(loop);
      }

      host.dataset.webglStatus = "ready";
      onReadyChangeRef.current?.(true);

      return () => {
        cancelled = true;
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
        }
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        document.removeEventListener("visibilitychange", onVisibilityChange);

        disposables.forEach((d) => d.dispose());
        renderer?.dispose();
        renderer?.domElement.remove();
      };
    };

    let cleanupFn: (() => void) | undefined;
    try {
      cleanupFn = init();
    } catch {
      if (!cancelled) {
        host.dataset.webglStatus = "fallback";
        onReadyChangeRef.current?.(false);
      }
    }

    return () => {
      cancelled = true;
      cleanupFn?.();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="data-hero-scene-host relative w-full h-full"
      data-data-hero-webgl
      data-webgl-status="loading"
      data-scene-variant="gemini"
      data-motion={reduced ? "reduced" : "full"}
      aria-hidden="true"
    />
  );
}
