// Diagrams for "N+1 queries in Postgres".
import { Diagram, Label } from "@/components/blog/diagrams/kit";

type StepTone = "warn" | "accent" | "plain";

const stepClass: Record<StepTone, string> = {
  warn: "fill-background stroke-[#CB4B16]",
  accent: "fill-background stroke-accent",
  plain: "fill-background stroke-muted-foreground/45",
};

// One labeled box. Grouped so the text stays tied to its rect.
function Step({ x, y, w, h = 44, text, tone = "plain" }: { x: number; y: number; w: number; h?: number; text: string; tone?: StepTone }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} strokeWidth={tone === "accent" ? 2.25 : 1.5} className={stepClass[tone]} />
      <Label x={x + w / 2} y={y + h / 2 + 5} size={13} weight={600} tone={tone === "warn" ? "warn" : "fg"}>
        {text}
      </Label>
    </g>
  );
}

export function NPlusOneRoundTrips() {
  return (
    <Diagram
      id="n-plus-one-round-trips"
      height={232}
      title="The same page loaded two ways, statements in sequence from left to right. N+1: one statement for the orders, then one items statement per order, such as items for order 99120, 99117 and 99102, and 197 more, for 201 round trips. Batched: one statement for the orders and one items statement for all of them, for 2 round trips however many orders are on the page."
    >
      <Label x={24} y={22} anchor="start" size={14} weight={600} tone="fg">N+1: one statement per parent</Label>
      <Step x={24} y={32} w={84} text="orders" />
      <Step x={116} y={32} w={116} text="items 99120" />
      <Step x={240} y={32} w={116} text="items 99117" />
      <Step x={364} y={32} w={116} text="items 99102" />
      <Step x={488} y={32} w={128} text="… 197 more" />
      <Label x={24} y={102} anchor="start" tone="warn" size={13}>1 + 200 round trips, one after another</Label>

      <Label x={24} y={146} anchor="start" size={14} weight={600} tone="fg">Batched: one statement for all children</Label>
      <Step x={24} y={156} w={84} text="orders" />
      <Step x={116} y={156} w={260} tone="accent" text="items for all orders" />
      <Label x={24} y={226} anchor="start" tone="accent" size={13}>2 round trips, however many orders are on the page</Label>
    </Diagram>
  );
}

export function NPlusOneJoinVsBatched() {
  const joinRows = ["item 1", "item 2", "item 3", "… item 40"];
  return (
    <Diagram
      id="n-plus-one-join-vs-batched"
      height={258}
      title="One order with 40 line items, loaded two ways. A join returns 40 rows and repeats the order columns on every one. Batched loading returns one order row and then 40 item rows in a second result, with no repetition."
    >
      <Label x={24} y={22} anchor="start" size={14} weight={600} tone="fg">Join: one result</Label>
      {joinRows.map((item, i) => {
        const y = 40 + i * 36;
        return (
          <g key={item}>
            <g>
              <rect x={24} y={y} width={140} height={30} rx={6} strokeWidth={1.5} className="fill-background stroke-[#CB4B16]" />
              <Label x={94} y={y + 20} size={13} tone="warn" weight={600}>order 99120</Label>
            </g>
            <g>
              <rect x={164} y={y} width={124} height={30} rx={6} strokeWidth={1.5} className="fill-background stroke-muted-foreground/45" />
              <Label x={226} y={y + 20} size={13} tone="fg" weight={600}>{item}</Label>
            </g>
          </g>
        );
      })}
      <Label x={24} y={226} anchor="start" tone="warn" size={13}>order columns repeat on all 40 rows</Label>

      <Label x={344} y={22} anchor="start" size={14} weight={600} tone="fg">Batched: two results</Label>
      <Label x={344} y={56} anchor="start" size={13}>orders</Label>
      <g>
        <rect x={344} y={64} width={140} height={30} rx={6} strokeWidth={2.25} className="fill-background stroke-accent" />
        <Label x={414} y={84} size={13} tone="fg" weight={600}>order 99120</Label>
      </g>
      <Label x={344} y={122} anchor="start" size={13}>items</Label>
      {["item 1", "item 2", "… item 40"].map((item, i) => {
        const y = 130 + i * 34;
        return (
          <g key={item}>
            <rect x={344} y={y} width={124} height={28} rx={6} strokeWidth={2.25} className="fill-background stroke-accent" />
            <Label x={406} y={y + 19} size={13} tone="fg" weight={600}>{item}</Label>
          </g>
        );
      })}
      <Label x={344} y={246} anchor="start" tone="accent" size={13}>no repetition, two round trips</Label>
    </Diagram>
  );
}
