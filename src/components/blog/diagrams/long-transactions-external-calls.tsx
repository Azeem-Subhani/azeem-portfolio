// Diagrams for "Long transactions and external calls".
import { Arrow, Box, Diagram, Label } from "@/components/blog/diagrams/kit";

type SegTone = "warn" | "accent" | "query" | "idle";

const segClass: Record<SegTone, string> = {
  warn: "fill-background stroke-[#CB4B16]",
  accent: "fill-background stroke-accent",
  query: "fill-background stroke-muted-foreground/45",
  idle: "fill-foreground/[0.04] stroke-muted-foreground/25",
};

// One labeled bar segment on a timeline, grouped so the text stays tied to its rect.
function Seg({ x, w, y, text, tone }: { x: number; w: number; y: number; text: string; tone: SegTone }) {
  const strong = tone !== "idle";
  return (
    <g>
      <rect x={x} y={y} width={w} height={44} rx={8} strokeWidth={tone === "accent" ? 2.25 : 1.5} className={segClass[tone]} />
      <Label x={x + w / 2} y={y + 27} size={13} weight={strong ? 600 : undefined} tone={tone === "warn" ? "warn" : strong ? "fg" : "muted"}>
        {text}
      </Label>
    </g>
  );
}

export function LongTxnHeldVsSplit() {
  return (
    <Diagram
      id="long-txn-held-vs-split"
      height={244}
      title="Two versions of one handler, left to right in time, not to scale. Held across the call: a 3 millisecond query, then a 1.85 second HTTP call, then a 2 millisecond update, all inside one transaction, so the connection and row lock are held for nearly 1.9 seconds. Split around the call: a short transaction, then the HTTP call with no transaction open, then a short transaction, so the connection is returned to the pool during the call."
    >
      <Label x={24} y={22} anchor="start" size={14} weight={600} tone="fg">Transaction held across the call</Label>
      <Seg x={24} w={56} y={32} text="3 ms" tone="query" />
      <Seg x={80} w={460} y={32} text="HTTP call · 1.85 s" tone="warn" />
      <Seg x={540} w={76} y={32} text="2 ms" tone="query" />
      <path d="M24 86 V92 H616 V86" strokeWidth={1.5} className="fill-none stroke-[#CB4B16]" />
      <Label x={320} y={112} tone="warn" size={13}>one open transaction · connection and row lock held</Label>

      <Label x={24} y={152} anchor="start" size={14} weight={600} tone="fg">Transaction split around the call</Label>
      <Seg x={24} w={90} y={162} text="short tx" tone="accent" />
      <Seg x={114} w={412} y={162} text="HTTP call · no transaction open" tone="idle" />
      <Seg x={526} w={90} y={162} text="short tx" tone="accent" />
      <Label x={320} y={230} tone="accent" size={13}>the connection goes back to the pool during the call</Label>
    </Diagram>
  );
}

export function LongTxnOrderStates() {
  const id = "long-txn-order-states";
  return (
    <Diagram
      id={id}
      height={280}
      title="Order status as the split handler runs. A pending order moves to charging in a short transaction that stores the idempotency key. After the remote call, a second short transaction moves it to paid on success or payment_failed on a decline. If the call got no response or a server error, the row stays in charging, and a reconciler claims stuck rows and finishes them."
    >
      <Box x={12} y={70} w={100} h={56} size="sm" title="pending" />
      <Arrow diagram={id} d="M112 98 H220" />
      <Label x={166} y={88} size={13}>short tx 1</Label>
      <Box x={222} y={70} w={150} h={56} size="sm" tone="accent" title="charging" sub="key saved" />

      <Arrow diagram={id} d="M372 88 H396 V35 H484" tone="accent" />
      <Label x={404} y={27} anchor="start" size={13} tone="accent">succeeded</Label>
      <Arrow diagram={id} d="M372 108 H396 V138 H484" />
      <Label x={404} y={131} anchor="start" size={13}>declined</Label>
      <Box x={486} y={10} w={142} h={50} size="sm" tone="accent" title="paid" />
      <Box x={486} y={112} w={142} h={52} size="sm" title="payment_failed" />

      <Box x={192} y={204} w={210} h={56} size="sm" tone="muted" title="Reconciler" sub="finds stuck rows" />
      <Arrow diagram={id} d="M270 126 V202" dashed />
      <Label x={262} y={170} anchor="end" size={13}>stuck rows</Label>
      <Arrow diagram={id} d="M324 202 V128" dashed tone="accent" />
      <Label x={332} y={170} anchor="start" size={13} tone="accent">finishes them</Label>
    </Diagram>
  );
}
