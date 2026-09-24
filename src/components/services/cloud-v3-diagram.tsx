"use client";

import { useState } from "react";

const nodes = [
  { id: "compute", label: "Compute", x: 46 },
  { id: "databases", label: "Databases", x: 172 },
  { id: "security", label: "Security", x: 298 },
  { id: "networking", label: "Networking", x: 424 },
] as const;

type NodeId = (typeof nodes)[number]["id"];

type ConnectorTune = {
  cloudExitX: number;
  lineTrimFromCloud: number;
  packetDropX: number;
  packetPathYOffset: number;
};

/** Locked compute connector line (cloud exit + trim from cloud end). */
const SAVED_COMPUTE_LINE = {
  cloudExitX: 200,
  lineTrimFromCloud: 7,
} as const;

/** Locked compute packet path (animation only). */
const SAVED_COMPUTE_PACKET = {
  packetDropX: 90,
  packetPathYOffset: 0,
} as const;

const SAVED_COMPUTE_TUNE: ConnectorTune = {
  ...SAVED_COMPUTE_LINE,
  ...SAVED_COMPUTE_PACKET,
};

/** Locked databases connector (line + packet path). */
const SAVED_DATABASE_TUNE: ConnectorTune = {
  cloudExitX: 252,
  lineTrimFromCloud: 7,
  packetDropX: 216,
  packetPathYOffset: 0,
};

/** Locked security connector (line + packet path). */
const SAVED_SECURITY_TUNE: ConnectorTune = {
  cloudExitX: 308,
  lineTrimFromCloud: 7,
  packetDropX: 342,
  packetPathYOffset: 0,
};

/** Locked networking connector (line + packet path). */
const SAVED_NETWORKING_TUNE: ConnectorTune = {
  cloudExitX: 360,
  lineTrimFromCloud: 7,
  packetDropX: 468,
  packetPathYOffset: 0,
};

const SAVED_TUNES: Record<NodeId, ConnectorTune> = {
  compute: SAVED_COMPUTE_TUNE,
  databases: SAVED_DATABASE_TUNE,
  security: SAVED_SECURITY_TUNE,
  networking: SAVED_NETWORKING_TUNE,
};

const PACKET_MOTION = {
  beginSec: 0.9,
  durSec: 2.55,
  /** Shared hook arrival beat (matches opacity keyTimes). */
  arriveKeyTime: 0.82,
} as const;

const CLOUD = {
  x: 110,
  y: 8,
  width: 340,
  height: 272,
};

const FA = {
  w: 640,
  h: 512,
  floorLeft: 144,
  floorRight: 512,
  floorY: 480,
};

const CLOUD_FA_PATH =
  "M0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160c0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336";

const CLOUD_SHAPE_TRANSFORM = `translate(${CLOUD.x} ${CLOUD.y}) scale(${CLOUD.width / FA.w} ${CLOUD.height / FA.h})`;

const BRAND_H = 41;
const BRAND_GAP = 40;
const BRAND_MID_Y = 176;
const BRAND_CENTER_X = 280;
const NODE_Y = 322;

const brandSources = [
  // AWS ships a light wordmark for dark mode and squid-ink text for light mode.
  {
    href: "/images/cloud-v3/amazonaws.svg",
    lightHref: "/images/cloud-v3/amazonaws-light.svg",
    ratio: 304 / 182,
  },
  { href: "/images/cloud-v3/microsoftazure.svg", ratio: 1 },
  { href: "/images/cloud-v3/googlecloud.svg", ratio: 28 / 24.5 },
] as const;

function layoutBrands(height: number) {
  const brands = brandSources.map((brand) => ({
    href: brand.href,
    lightHref: "lightHref" in brand ? brand.lightHref : undefined,
    w: Math.round(height * brand.ratio),
  }));
  const rowWidth =
    brands.reduce((sum, brand) => sum + brand.w, 0) + BRAND_GAP * (brands.length - 1);
  const rowX = BRAND_CENTER_X - rowWidth / 2;
  const y = BRAND_MID_Y - height / 2;

  return brands.map((brand, index) => ({
    ...brand,
    x: rowX + brands.slice(0, index).reduce((sum, item) => sum + item.w + BRAND_GAP, 0),
    y,
    h: height,
  }));
}

const brandLayout = layoutBrands(BRAND_H);

function faToParent(faX: number, faY: number) {
  return {
    x: CLOUD.x + (faX / FA.w) * CLOUD.width,
    y: CLOUD.y + (faY / FA.h) * CLOUD.height,
  };
}

function cloudFloorSpan() {
  const floor = faToParent(FA.floorLeft, FA.floorY);
  const right = faToParent(FA.floorRight, FA.floorY);
  return { min: floor.x, max: right.x, y: floor.y };
}

const CLOUD_FLOOR = cloudFloorSpan();
/** Shared horizontal rail: every connector leaves the cloud floor and turns here. */
const RAIL_Y = Math.round(CLOUD_FLOOR.y + (NODE_Y - CLOUD_FLOOR.y) / 2);

function nodeX(node: (typeof nodes)[number]) {
  return node.x + 44;
}

function floorCloudAttach(exitX: number) {
  return {
    x: Math.min(Math.max(exitX, CLOUD_FLOOR.min), CLOUD_FLOOR.max),
    y: CLOUD_FLOOR.y,
  };
}

function attachForNode(node: (typeof nodes)[number], cloudExitX: number) {
  const hookX = nodeX(node);
  return { hookX, at: floorCloudAttach(cloudExitX) };
}

function connectorTuneForNode(node: (typeof nodes)[number]): ConnectorTune {
  return SAVED_TUNES[node.id];
}

function clampLineTrim(
  tune: ConnectorTune,
  hookX: number,
  at: { x: number; y: number },
  forPacket: boolean,
) {
  const pathHookX = forPacket ? tune.packetDropX : hookX;
  const pathYOffset = forPacket ? tune.packetPathYOffset : 0;
  const max = routeTrimMax(hookX, at, pathHookX, pathYOffset);
  return Math.min(tune.lineTrimFromCloud, max);
}

function routeTrimMax(
  hookX: number,
  at: { x: number; y: number },
  pathHookX = hookX,
  pathYOffset = 0,
) {
  const railY = RAIL_Y + pathYOffset;
  const endY = NODE_Y + pathYOffset;
  const total = railY - (at.y + pathYOffset) + Math.abs(pathHookX - at.x) + Math.max(0, endY - railY);
  return Math.max(0, Math.floor(total - 1));
}

function routePath(
  hookX: number,
  at: { x: number; y: number },
  trimFromStart = 0,
  pathHookX = hookX,
  pathYOffset = 0,
) {
  const startY = at.y + pathYOffset;
  const railY = RAIL_Y + pathYOffset;
  const endY = NODE_Y + pathYOffset;
  const stem = railY - startY;
  const horiz = Math.abs(pathHookX - at.x);
  const drop = Math.max(0, endY - railY);
  let trim = Math.max(0, trimFromStart);

  if (trim <= stem) {
    const y = startY + trim;
    return `M${at.x} ${y} V${railY} H${pathHookX} V${endY}`;
  }
  trim -= stem;

  if (trim <= horiz) {
    const x = at.x + Math.sign(pathHookX - at.x) * trim;
    return `M${x} ${railY} H${pathHookX} V${endY}`;
  }
  trim -= horiz;

  if (trim <= drop) {
    const y = railY + trim;
    return `M${pathHookX} ${y} V${endY}`;
  }

  return `M${pathHookX} ${endY}`;
}

function NodeIcon({ id }: { id: NodeId }) {
  if (id === "compute") {
    return (
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="12" cy="7" r="2.1" />
        <circle cx="5.2" cy="16.4" r="2.1" />
        <circle cx="18.8" cy="16.4" r="2.1" />
        <path d="M12 9.2v2.2M10.2 13.2 7.1 15M13.8 13.2 16.9 15" strokeLinecap="round" />
      </g>
    );
  }

  if (id === "databases") {
    return (
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <ellipse cx="12" cy="6.6" rx="6.4" ry="2.3" />
        <path d="M5.6 6.6v10.2c0 1.3 2.9 2.3 6.4 2.3s6.4-1 6.4-2.3V6.6" />
        <path d="M5.6 11.4c0 1.3 2.9 2.3 6.4 2.3s6.4-1 6.4-2.3" opacity="0.55" />
      </g>
    );
  }

  if (id === "security") {
    return (
      <path
        d="M12 4.4 18.6 6.8v5.4c0 3.7-2.6 6.2-6.6 7.4-4-1.2-6.6-3.7-6.6-7.4V6.8L12 4.4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    );
  }

  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="12" r="2.2" />
      <circle cx="12" cy="12" r="6.4" />
      <path d="M12 5.6v2.2M12 16.2v2.2M5.6 12h2.2M16.2 12h2.2" strokeLinecap="round" />
    </g>
  );
}

export function CloudV3Diagram() {
  const [hot, setHot] = useState<NodeId | null>(null);
  const packetBegin = `${PACKET_MOTION.beginSec}s`;
  const packetDur = `${PACKET_MOTION.durSec}s`;
  const packetArriveKeyTime = PACKET_MOTION.arriveKeyTime;

  return (
    <figure className="cloud-v3-diagram">
      <div className="cloud-v3-diagram__stage">
      <svg
        viewBox="0 0 560 400"
        className="cloud-v3-diagram__svg"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-labelledby="cloud-v3-diagram-title cloud-v3-diagram-desc"
      >
        <title id="cloud-v3-diagram-title">Cloud topology</title>
        <desc id="cloud-v3-diagram-desc">
          AWS, Azure, and GCP inside one cloud, connected to compute, databases,
          security, and networking.
        </desc>

        <defs>
          <radialGradient id="cloud-v3-halo" cx="50%" cy="42%" r="48%">
            <stop offset="0%" stopColor="rgb(105 228 220 / 0.5)" />
            <stop offset="40%" stopColor="rgb(44 207 201 / 0.18)" />
            <stop offset="100%" stopColor="rgb(44 207 201 / 0)" />
          </radialGradient>
          <filter id="cloud-v3-soft" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <mask
            id="cloud-v3-outline-mask"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="560"
            height="400"
          >
            <rect width="560" height="400" fill="black" />
            <path
              d={CLOUD_FA_PATH}
              transform={CLOUD_SHAPE_TRANSFORM}
              fill="none"
              stroke="white"
              strokeWidth="8"
              strokeLinejoin="round"
            />
          </mask>
        </defs>

        <ellipse
          className="cloud-v3-diagram__halo"
          cx="280"
          cy="130"
          rx="176"
          ry="96"
          fill="url(#cloud-v3-halo)"
          filter="url(#cloud-v3-soft)"
        />

        <svg
          className="cloud-v3-diagram__cloud"
          x={CLOUD.x}
          y={CLOUD.y}
          width={CLOUD.width}
          height={CLOUD.height}
          viewBox="0 0 640 512"
          overflow="visible"
        >
          <defs>
            <radialGradient id="cloud-v3-body" cx="50%" cy="58%" r="68%">
              {/* Theme-aware fill: see --cloud-v3-body-* in cloud-v3.css. */}
              <stop offset="0%" style={{ stopColor: "var(--cloud-v3-body-0, #12686b)" }} />
              <stop offset="42%" style={{ stopColor: "var(--cloud-v3-body-1, #0a4a4e)" }} />
              <stop offset="100%" style={{ stopColor: "var(--cloud-v3-body-2, #07393C)" }} />
            </radialGradient>
          </defs>
          <path
            d={CLOUD_FA_PATH}
            fill="url(#cloud-v3-body)"
            stroke="#2CCFC9"
            style={{ stroke: "var(--cloud-v3-stroke, #2CCFC9)" }}
            strokeWidth="8"
            strokeLinejoin="round"
          />
        </svg>

        <g className="cloud-v3-diagram__brands">
          {brandLayout.map((brand) =>
            brand.lightHref ? (
              <g key={brand.href}>
                <image
                  className="svgl-light"
                  href={brand.lightHref}
                  x={brand.x}
                  y={brand.y}
                  width={brand.w}
                  height={brand.h}
                  preserveAspectRatio="xMidYMid meet"
                />
                <image
                  className="svgl-dark"
                  href={brand.href}
                  x={brand.x}
                  y={brand.y}
                  width={brand.w}
                  height={brand.h}
                  preserveAspectRatio="xMidYMid meet"
                />
              </g>
            ) : (
              <image
                key={brand.href}
                href={brand.href}
                x={brand.x}
                y={brand.y}
                width={brand.w}
                height={brand.h}
                preserveAspectRatio="xMidYMid meet"
              />
            ),
          )}
        </g>

        <g className="cloud-v3-diagram__routes" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {nodes.map((node) => {
            const tune = connectorTuneForNode(node);
            const { hookX, at } = attachForNode(node, tune.cloudExitX);
            const trim = clampLineTrim(tune, hookX, at, false);
            const d = routePath(hookX, at, trim);
            const dropClass = `cloud-v3-diagram__drop${hot === node.id ? " is-hot" : ""}`;
            return (
              <g key={node.id}>
                <path className={dropClass} d={d} />
                <path
                  className={`${dropClass} cloud-v3-diagram__drop--on-cloud`}
                  d={d}
                  mask="url(#cloud-v3-outline-mask)"
                />
              </g>
            );
          })}
        </g>

        <g className="cloud-v3-diagram__joints">
          {nodes.map((node) => {
            const tune = connectorTuneForNode(node);
            const { hookX } = attachForNode(node, tune.cloudExitX);
            return (
              <circle
                key={node.id}
                className={hot === node.id ? "is-hot" : undefined}
                cx={hookX}
                cy={NODE_Y}
                r="2.5"
              />
            );
          })}
        </g>

        {nodes.map((node) => (
          <g
            key={node.id}
            className={`cloud-v3-diagram__node${hot === node.id ? " is-hot" : ""}`}
            transform={`translate(${node.x} ${NODE_Y})`}
            onPointerEnter={() => setHot(node.id)}
            onPointerLeave={() => setHot(null)}
          >
            <rect width="88" height="62" rx="20" />
            <g transform="translate(32 10)" className="cloud-v3-diagram__node-icon">
              <NodeIcon id={node.id} />
            </g>
            <text x="44" y="50">
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      <svg
        viewBox="0 0 560 400"
        className="cloud-v3-diagram__packets"
        aria-hidden
        preserveAspectRatio="xMidYMid meet"
      >
        {nodes.map((node) => {
          const tune = connectorTuneForNode(node);
          const { hookX, at } = attachForNode(node, tune.cloudExitX);
          const packetTrim = clampLineTrim(tune, hookX, at, true);
          const packetPath = routePath(
            hookX,
            at,
            packetTrim,
            tune.packetDropX,
            tune.packetPathYOffset,
          );
          const packetClass = `cloud-v3-diagram__packet${hot === node.id ? " is-hot" : ""}`;

          return (
            <g key={node.id} className={packetClass}>
              <path
                id={`cloud-v3-packet-path-${node.id}`}
                d={packetPath}
                fill="none"
                stroke="none"
              />
              <circle className="cloud-v3-diagram__packet-ring" r="3.2" />
              <circle className="cloud-v3-diagram__packet-core" r="2.35" />
              <animate
                attributeName="opacity"
                dur={packetDur}
                begin={packetBegin}
                repeatCount="indefinite"
                values="0;1;1;0"
                keyTimes={`0;0.08;${packetArriveKeyTime};1`}
              />
              <animateMotion
                dur={packetDur}
                begin={packetBegin}
                repeatCount="indefinite"
                rotate="0"
                calcMode="linear"
                keyPoints="0;1;1"
                keyTimes={`0;${packetArriveKeyTime};1`}
              >
                <mpath href={`#cloud-v3-packet-path-${node.id}`} />
              </animateMotion>
            </g>
          );
        })}
      </svg>
      </div>

      <figcaption className="sr-only">
        One cloud platform spanning AWS, Azure, and GCP, wired to compute,
        databases, security, and networking.
      </figcaption>
    </figure>
  );
}
