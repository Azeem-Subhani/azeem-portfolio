// Diagrams for "An unexpected AWS bill investigation".
import { Arrow, Diagram, Label } from "@/components/blog/diagrams/kit";

const PASSES = [
  { title: "1 · Daily granularity", note: "find the first day of the step" },
  { title: "2 · Prior period", note: "Cost Comparison" },
  { title: "3 · Service", note: "EC2-Other is a grab bag" },
  { title: "4 · Usage type", note: "where the answer usually is" },
  { title: "5 · Charge type", note: "credit, refund, or usage" },
  { title: "6 · Resource and tags", note: "else CUR or flow logs" },
];

export function AwsBillSixPasses() {
  const id = "aws-bill-passes";
  const rowH = 44;
  const gap = 16;
  return (
    <Diagram
      id={id}
      height={372}
      title="Six passes that each narrow the next, widest first: daily granularity to find the step, prior period comparison, group by service, group by usage type, check charge type, then resource and tags. The usage type pass is highlighted as where the answer usually is."
    >
      {PASSES.map((pass, i) => {
        const w = 600 - i * 36;
        const x = 320 - w / 2;
        const y = 12 + i * (rowH + gap);
        const hot = i === 3;
        return (
          <g key={pass.title}>
            <rect
              x={x}
              y={y}
              width={w}
              height={rowH}
              rx={10}
              strokeWidth={hot ? 2.25 : 1.5}
              className={hot ? "fill-background stroke-accent" : "fill-background stroke-muted-foreground/45"}
            />
            <Label x={x + 16} y={y + 28} anchor="start" tone="fg" size={16} weight={600}>
              {pass.title}
            </Label>
            <Label x={x + w - 16} y={y + 27} anchor="end" tone={hot ? "accent" : "muted"} size={14}>
              {pass.note}
            </Label>
            {i < PASSES.length - 1 ? <Arrow diagram={id} d={`M320 ${y + rowH} V${y + rowH + gap - 1}`} /> : null}
          </g>
        );
      })}
    </Diagram>
  );
}
