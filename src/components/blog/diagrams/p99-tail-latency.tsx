// Diagrams for "p99 tail latency: why the average hides the problem".
import { Arrow, Box, Diagram, Label } from "@/components/blog/diagrams/kit";

export function TailFanOutPage() {
  const id = "p99-fanout";
  const calls = [
    { y: 16, title: "Call 1", sub: "fast", tone: "default" as const },
    { y: 74, title: "Call 2", sub: "the 1 in 100", tone: "warn" as const },
    { y: 168, title: "Call 100", sub: "fast", tone: "default" as const },
  ];
  return (
    <Diagram
      id={id}
      height={252}
      title="A page that makes 100 backend calls. Each call has a 1 percent chance of being slow. The page is as slow as its slowest call, so about 63 percent of page loads include at least one slow call."
    >
      <Box x={20} y={86} w={130} h={64} title="Page" sub="100 calls" size="sm" />
      {calls.map((c) => (
        <g key={c.title}>
          <Box x={260} y={c.y} w={150} h={52} title={c.title} sub={c.sub} size="sm" tone={c.tone} />
          <Arrow diagram={id} d={`M150 118 C 205 118, 205 ${c.y + 26}, 256 ${c.y + 26}`} tone={c.tone === "warn" ? "warn" : "default"} />
          <Arrow diagram={id} d={`M410 ${c.y + 26} C 450 ${c.y + 26}, 450 118, 480 118`} tone={c.tone === "warn" ? "warn" : "default"} head={false} />
        </g>
      ))}
      <Label x={335} y={148} size={20} tone="fg">· · ·</Label>
      <Box x={484} y={86} w={136} h={64} title="Slowest call" sub="sets page time" size="sm" tone="warn" />
      <Label x={630} y={190} anchor="end" size={13} tone="warn">100 calls, 1% slow each:</Label>
      <Label x={630} y={209} anchor="end" size={13} tone="warn">about 63% of pages hit one</Label>
    </Diagram>
  );
}

function Histogram({
  x0,
  heights,
  warnFrom,
  title,
  notes,
}: {
  x0: number;
  heights: number[];
  warnFrom: number;
  title: string;
  notes: string[];
}) {
  const base = 190;
  return (
    <g>
      <Label x={x0 + 141} y={24} tone="fg" size={16} weight={600}>{title}</Label>
      {heights.map((h, i) => (
        <rect
          key={i}
          x={x0 + i * 24}
          y={base - Math.max(h, 2)}
          width={18}
          height={Math.max(h, 2)}
          rx={2}
          strokeWidth={1.5}
          className={i >= warnFrom ? "fill-[#CB4B16] stroke-[#CB4B16]" : "fill-foreground/[0.04] stroke-muted-foreground/60"}
        />
      ))}
      <path d={`M${x0 - 4} ${base + 2} H${x0 + 284}`} strokeWidth={1.5} className="stroke-muted-foreground/60" />
      <Label x={x0 + 284} y={base + 22} anchor="end" size={13}>latency →</Label>
      {notes.map((n, i) => (
        <Label key={n} x={x0 + 141} y={base + 52 + i * 19} size={13}>{n}</Label>
      ))}
    </g>
  );
}

export function TailQueueVsBimodal() {
  return (
    <Diagram
      id="p99-shapes"
      height={282}
      title="Two latency histograms. The queueing tail is a single mode that smears to the right as load rises. The bimodal tail has a fast hump and a separate second hump at a roughly fixed distance, often equal to a timeout, a retry interval, or a cold cache miss."
    >
      <Histogram
        x0={22}
        heights={[30, 70, 104, 92, 74, 58, 46, 36, 28, 20, 14, 10]}
        warnFrom={7}
        title="Queueing tail"
        notes={["one mode, smears right", "as load rises"]}
      />
      <Histogram
        x0={334}
        heights={[26, 72, 104, 84, 40, 12, 4, 2, 2, 24, 40, 22]}
        warnFrom={9}
        title="Bimodal tail"
        notes={["second hump at a fixed distance:", "a timeout, retry, or cold miss"]}
      />
    </Diagram>
  );
}
