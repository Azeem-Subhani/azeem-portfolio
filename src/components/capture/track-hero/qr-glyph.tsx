const GRID = 11;

// A fixed, deterministic module pattern that reads as a scan code without
// needing to encode or decode anything real — this is a mockup screen, not
// a functioning ticket.
const FILLED = new Set([
  "0,0","0,1","0,2","0,8","0,9","0,10",
  "1,0","1,2","1,4","1,6","1,8","1,10",
  "2,0","2,1","2,2","2,4","2,6","2,8","2,9","2,10",
  "3,4","3,6",
  "4,0","4,1","4,3","4,4","4,7","4,9","4,10",
  "5,1","5,2","5,5","5,6","5,8",
  "6,0","6,3","6,4","6,6","6,9","6,10",
  "7,2","7,5","7,7",
  "8,0","8,1","8,2","8,4","8,6","8,8","8,9","8,10",
  "9,0","9,2","9,4","9,7",
  "10,0","10,1","10,2","10,5","10,8","10,9","10,10",
]);

function isFinder(row: number, col: number) {
  const inCorner = (r: number, c: number) =>
    row >= r && row < r + 3 && col >= c && col < c + 3;
  return inCorner(0, 0) || inCorner(0, GRID - 3) || inCorner(GRID - 3, 0);
}

/** Static, decorative scan-code mark for the ticket screen — not a real QR code. */
export function QrGlyph({ size = 200 }: { size?: number }) {
  const cell = size / GRID;

  return (
    <div
      role="img"
      aria-label="Ticket scan code"
      className="rounded-2xl bg-white p-3 shadow-[0_12px_28px_-12px_rgba(0,0,0,0.55)]"
      style={{ width: size + 24, height: size + 24 }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {Array.from({ length: GRID }).map((_, row) =>
          Array.from({ length: GRID }).map((_, col) => {
            const filled = isFinder(row, col) || FILLED.has(`${row},${col}`);
            if (!filled) return null;
            return (
              <rect
                key={`${row}-${col}`}
                x={col * cell}
                y={row * cell}
                width={cell}
                height={cell}
                fill="#141414"
              />
            );
          }),
        )}
      </svg>
    </div>
  );
}
