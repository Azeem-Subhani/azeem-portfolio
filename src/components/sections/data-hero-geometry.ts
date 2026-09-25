// Shared layout for the data hero. The SVG overlay and the WebGL glass scene
// both read these numbers so the crisp glyphs, labels, and pulses sit exactly
// on top of the rendered spheres and tubes.

export const VIEW_WIDTH = 700;
export const VIEW_HEIGHT = 540;

export const CORE = { x: 393, y: 270, r: 104 };
export const NODE_R = 34;
export const PORT_GAP = 7;

export const nodePositions = {
  postgres: { x: 393, y: 62 },
  writes: { x: 160, y: 372 },
  warehouse: { x: 626, y: 372 },
} as const;

export type RouteKey = keyof typeof nodePositions;
export type Point = { x: number; y: number };

// The three orbit rings, as their projected ellipse (rx, ry) and the 2D
// rotation the SVG fallback applies. The WebGL scene tilts a circle of radius
// rx about its horizontal axis until it projects to the same ellipse.
export const ORBIT = { rx: 205, ry: 142 } as const;
export const orbitRotations = [0, 58, -58] as const;

function edgePoint(from: Point, toward: Point, radius: number): Point {
  const dx = toward.x - from.x;
  const dy = toward.y - from.y;
  const length = Math.hypot(dx, dy);
  return { x: from.x + (dx / length) * radius, y: from.y + (dy / length) * radius };
}

const round = (n: number) => Math.round(n * 10) / 10;

function routeBetween(start: Point, startR: number, end: Point, endR: number, bend: number) {
  const a = edgePoint(start, end, startR);
  const b = edgePoint(end, start, endR);
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const nx = -(b.y - a.y);
  const ny = b.x - a.x;
  const length = Math.hypot(nx, ny) || 1;
  const control = { x: mx + (nx / length) * bend, y: my + (ny / length) * bend };
  return {
    d: `M ${round(a.x)} ${round(a.y)} Q ${round(control.x)} ${round(control.y)} ${round(b.x)} ${round(b.y)}`,
    start: a,
    control,
    end: b,
  };
}

const coreR = CORE.r + PORT_GAP;
const nodeR = NODE_R + PORT_GAP;

// Every route runs in the direction data flows: writes into the core, then the
// core out to Postgres and the warehouse.
export const routes = {
  writes: routeBetween(nodePositions.writes, nodeR, CORE, coreR, -18),
  postgres: routeBetween(CORE, coreR, nodePositions.postgres, nodeR, 0),
  warehouse: routeBetween(CORE, coreR, nodePositions.warehouse, nodeR, -18),
};

// One flow cycle: a write travels into the core, then hands off to both
// outbound routes at the same moment.
export const FLOW = { seconds: 3.6, handoff: 0.46, outboundEnd: 0.92 } as const;
