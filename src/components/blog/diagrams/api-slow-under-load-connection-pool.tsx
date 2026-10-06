// Diagrams for "API slow under load: connection pool waits".
import { Arrow, Box, Diagram, Label } from "@/components/blog/diagrams/kit";

type SegTone = "warn" | "accent" | "query" | "idle" | "empty";

const segClass: Record<SegTone, string> = {
  warn: "fill-background stroke-[#CB4B16]",
  accent: "fill-background stroke-accent",
  query: "fill-background stroke-muted-foreground/45",
  idle: "fill-foreground/[0.04] stroke-muted-foreground/25",
  empty: "fill-none stroke-muted-foreground/40",
};

// One labeled bar segment on the timeline. Grouped so the text stays tied to its rect.
function Seg({ x, w, y, text, tone }: { x: number; w: number; y: number; text: string; tone: SegTone }) {
  const strong = tone === "warn" || tone === "accent" || tone === "query";
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={44}
        rx={8}
        strokeWidth={tone === "accent" ? 2.25 : 1.5}
        strokeDasharray={tone === "empty" ? "5 5" : undefined}
        className={segClass[tone]}
      />
      <Label x={x + w / 2} y={y + 27} size={tone === "query" ? 13 : 14} weight={strong ? 600 : undefined} tone={tone === "warn" ? "warn" : strong ? "fg" : "muted"}>
        {text}
      </Label>
    </g>
  );
}

export function PoolWaitVsUse() {
  const id = "pool-wait-vs-use";
  return (
    <Diagram
      id={id}
      height={226}
      title="One request seen two ways, left to right in time. The pool sees the request wait for a connection, then hold it for 400 milliseconds. The database sees only a 3 millisecond query, a long idle stretch while the application does other work, and a second 3 millisecond query. Wait time and use time are the two numbers to measure; query time is a small part of use time. Not to scale."
    >
      <Label x={24} y={22} anchor="start" size={14} weight={600} tone="fg">What the pool sees</Label>
      <Seg x={24} w={170} y={32} text="Wait for a slot" tone="warn" />
      <Seg x={194} w={422} y={32} text="Connection checked out · 400 ms" tone="accent" />

      <Label x={24} y={116} anchor="start" size={14} weight={600} tone="fg">What the database sees</Label>
      <Seg x={24} w={170} y={126} text="nothing yet" tone="empty" />
      <Seg x={194} w={56} y={126} text="3 ms" tone="query" />
      <Seg x={250} w={310} y={126} text="other work · session idle" tone="idle" />
      <Seg x={560} w={56} y={126} text="3 ms" tone="query" />

      <Label x={109} y={198} tone="warn" size={13}>wait time</Label>
      <Label x={405} y={198} tone="accent" size={13}>use time (hold) · query time is only the 3 ms blocks</Label>
    </Diagram>
  );
}

export function PoolDiagnosisTree() {
  const id = "pool-diagnosis-tree";
  return (
    <Diagram
      id={id}
      height={322}
      title="Diagnosis decision tree. Ask whether pool wait is a large share of request latency. If not, the pool is not the problem, so check the next bounded resource. If yes, ask whether hold time is far above query time. If yes, the connection is held across other work such as an HTTP call, upload, or serialization. If no, arrivals have crossed the pool ceiling of N divided by H."
    >
      <Box x={190} y={14} w={260} h={56} size="sm" title="Pool wait p99 high?" sub="vs. total request latency" />
      <Box x={16} y={130} w={250} h={56} size="sm" tone="muted" title="Not the pool" sub="check the next resource" />
      <Box x={346} y={130} w={270} h={56} size="sm" title="Hold far above query time?" sub="compare per route" />
      <Box x={16} y={248} w={290} h={56} size="sm" title="Ceiling crossed" sub="arrivals above N / H" />
      <Box x={334} y={248} w={290} h={56} size="sm" tone="accent" title="Held across other work" sub="HTTP call, upload, serialization" />

      <Arrow diagram={id} d="M190 42 H141 V128" />
      <Label x={152} y={96} anchor="start" size={13}>no</Label>
      <Arrow diagram={id} d="M450 42 H481 V128" />
      <Label x={492} y={96} anchor="start" size={13}>yes</Label>
      <Arrow diagram={id} d="M346 158 H306 V218 H161 V246" />
      <Label x={318} y={176} anchor="start" size={13}>no</Label>
      <Arrow diagram={id} d="M481 186 V246" tone="accent" />
      <Label x={492} y={222} anchor="start" size={13} tone="accent">yes</Label>
    </Diagram>
  );
}
