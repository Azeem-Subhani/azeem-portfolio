// Diagrams for "Offset vs keyset pagination".
import { Diagram, Label } from "@/components/blog/diagrams/kit";

type CellTone = "plain" | "warn" | "accent" | "gap";

const cellClass: Record<CellTone, string> = {
  plain: "fill-background stroke-muted-foreground/45",
  warn: "fill-background stroke-[#CB4B16]",
  accent: "fill-background stroke-accent",
  gap: "fill-foreground/[0.04] stroke-muted-foreground/25",
};

// One row in the ordered list. Grouped so the text stays tied to its rect.
function Cell({ x, y, w, text, tone = "plain" }: { x: number; y: number; w: number; text: string; tone?: CellTone }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={40} rx={8} strokeWidth={tone === "plain" || tone === "gap" ? 1.5 : 2.25} className={cellClass[tone]} />
      <Label x={x + w / 2} y={y + 25} size={13} weight={tone === "gap" ? undefined : 600} tone={tone === "warn" ? "warn" : tone === "gap" ? "muted" : "fg"}>
        {text}
      </Label>
    </g>
  );
}

// Square bracket under a span of cells.
function Bracket({ x1, x2, y, tone }: { x1: number; x2: number; y: number; tone: "warn" | "accent" | "muted" }) {
  const cls = { warn: "stroke-[#CB4B16]", accent: "stroke-accent", muted: "stroke-muted-foreground/60" }[tone];
  return <path d={`M${x1} ${y} V${y + 6} H${x2} V${y}`} strokeWidth={1.5} className={`fill-none ${cls}`} />;
}

export function OffsetShiftsRows() {
  return (
    <Diagram
      id="offset-shifts-rows"
      height={296}
      title="Two ways offset pagination goes wrong between page requests, 20 rows per page. Insert: a new row sorts first, so every row shifts down one position. OFFSET 20 skips the first 20 positions, and page 2 starts at R20, which page 1 already showed, so R20 appears twice. Delete: a row on page 1 is removed, so every later row shifts up one position. OFFSET 20 skips R1 through R21, and page 2 starts at R22, so R21 is never shown."
    >
      <Label x={24} y={22} anchor="start" size={14} weight={600} tone="fg">Insert: a new row sorts first</Label>
      <Cell x={24} y={34} w={64} text="new" tone="gap" />
      <Cell x={92} y={34} w={150} text="R1 … R19" />
      <Cell x={246} y={34} w={64} text="R20" tone="warn" />
      <Cell x={314} y={34} w={64} text="R21" />
      <Cell x={382} y={34} w={64} text="R22" />
      <Bracket x1={24} x2={242} y={82} tone="muted" />
      <Label x={133} y={110} size={13}>OFFSET 20 skips these 20</Label>
      <Bracket x1={246} x2={446} y={82} tone="accent" />
      <Label x={346} y={110} size={13} tone="accent">page 2 starts here</Label>
      <Label x={24} y={134} anchor="start" size={13} tone="warn">R20 closed page 1 and now opens page 2, so it shows twice</Label>

      <Label x={24} y={178} anchor="start" size={14} weight={600} tone="fg">Delete: a row on page 1 is removed</Label>
      <Cell x={24} y={190} w={64} text="R1" />
      <Cell x={92} y={190} w={170} text="… one row deleted" tone="gap" />
      <Cell x={266} y={190} w={64} text="R20" />
      <Cell x={334} y={190} w={64} text="R21" tone="warn" />
      <Cell x={402} y={190} w={64} text="R22" />
      <Bracket x1={24} x2={398} y={238} tone="muted" />
      <Label x={211} y={266} size={13}>OFFSET 20 skips these 20</Label>
      <Bracket x1={402} x2={466} y={238} tone="accent" />
      <Label x={434} y={266} size={13} tone="accent" anchor="start">page 2 starts</Label>
      <Label x={24} y={290} anchor="start" size={13} tone="warn">R21 moved up into the skipped range and is never shown</Label>
    </Diagram>
  );
}

export function KeysetSeekVsOffsetScan() {
  return (
    <Diagram
      id="keyset-seek-vs-offset-scan"
      height={236}
      title="Index entries touched to return one page of 20 rows, not to scale. Offset, page 50 with OFFSET 980: the database reads 980 entries and discards them, then returns 20. Keyset: the database seeks straight to the cursor, reads none of the skipped entries, and returns 20. Offset cost grows with the page number; keyset cost stays the same."
    >
      <Label x={24} y={22} anchor="start" size={14} weight={600} tone="fg">Offset: page 50, OFFSET 980</Label>
      <g>
        <rect x={24} y={32} width={480} height={44} rx={8} strokeWidth={1.5} className="fill-background stroke-[#CB4B16]" />
        <Label x={264} y={59} size={13} weight={600} tone="warn">980 entries read, then discarded</Label>
      </g>
      <g>
        <rect x={504} y={32} width={112} height={44} rx={8} strokeWidth={2.25} className="fill-background stroke-accent" />
        <Label x={560} y={59} size={13} weight={600} tone="fg">20 returned</Label>
      </g>
      <Label x={24} y={102} anchor="start" size={13} tone="warn">page 500 would read 10,000 first</Label>

      <Label x={24} y={146} anchor="start" size={14} weight={600} tone="fg">Keyset: any page</Label>
      <g>
        <rect x={24} y={156} width={480} height={44} rx={8} strokeWidth={1.5} strokeDasharray="5 5" className="fill-none stroke-muted-foreground/40" />
        <Label x={264} y={183} size={13}>seek to the cursor · skipped entries never read</Label>
      </g>
      <g>
        <rect x={504} y={156} width={112} height={44} rx={8} strokeWidth={2.25} className="fill-background stroke-accent" />
        <Label x={560} y={183} size={13} weight={600} tone="fg">20 returned</Label>
      </g>
      <Label x={24} y={226} anchor="start" size={13} tone="accent">page 500 costs about the same as page 2</Label>
    </Diagram>
  );
}
