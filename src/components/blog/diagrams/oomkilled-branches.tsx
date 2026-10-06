// Diagrams for "Kubernetes OOMKilled causes".
import { Arrow, Box, Diagram, Label } from "@/components/blog/diagrams/kit";

const BRANCHES = [
  {
    title: "Container limit",
    signal: ["OOMKilled, usage", "near its limit"],
    fix: ["Fix the leak or", "bound the peak"],
  },
  {
    title: "Node ran out",
    signal: ["Evicted, or OOMKilled", "well under its limit"],
    fix: ["Realistic requests,", "Guaranteed QoS"],
  },
  {
    title: "Runtime heap",
    signal: ["OutOfMemoryError", "in logs, reason Error"],
    fix: ["Size the heap from", "the limit, with headroom"],
  },
];

export function OomThreeBranches() {
  const id = "oom-three-branches";
  const cardW = 190;
  const xs = [10, 225, 440];
  return (
    <Diagram
      id={id}
      height={312}
      title="A container restart splits into three incidents. Container limit: reason OOMKilled with usage near its limit, fixed by closing the leak or bounding the peak. Node ran out: evicted, or OOMKilled while well under the limit, fixed with realistic requests and Guaranteed QoS. Runtime heap: OutOfMemoryError in the logs with reason Error, fixed by sizing the heap from the limit with headroom."
    >
      <Box x={170} y={14} w={300} h={58} title="Container restarted" sub="read reason, status, QoS" />
      {BRANCHES.map((b, i) => {
        const x = xs[i];
        const cx = x + cardW / 2;
        return (
          <g key={b.title}>
            <Arrow diagram={id} d={i === 1 ? `M320 72 V118` : `M320 72 V94 H${cx} V118`} />
            <rect x={x} y={120} width={cardW} height={176} rx={10} strokeWidth={1.5} className="fill-background stroke-muted-foreground/45" />
            <Label x={cx} y={150} tone="fg" size={17} weight={600}>{b.title}</Label>
            <Label x={x + 14} y={182} anchor="start" tone="fg" size={13} weight={600}>Signal</Label>
            <Label x={x + 14} y={201} anchor="start" size={13}>{b.signal[0]}</Label>
            <Label x={x + 14} y={219} anchor="start" size={13}>{b.signal[1]}</Label>
            <Label x={x + 14} y={248} anchor="start" tone="accent" size={13} weight={600}>Fix</Label>
            <Label x={x + 14} y={267} anchor="start" size={13}>{b.fix[0]}</Label>
            <Label x={x + 14} y={285} anchor="start" size={13}>{b.fix[1]}</Label>
          </g>
        );
      })}
    </Diagram>
  );
}
