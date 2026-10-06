// Diagrams for "Retry storms, backoff, and jitter".
import { Arrow, Box, Diagram, Label } from "@/components/blog/diagrams/kit";

export function RetryLayerAmplification() {
  const id = "retry-amplification";
  const xs = [8, 166, 324, 482];
  const w = 140;
  const names = [
    { t: "Client", s: "retries 3 times", n: "1" },
    { t: "API gateway", s: "retries 3 times", n: "3" },
    { t: "Service + SDK", s: "retries 3 times", n: "9" },
    { t: "Database", s: "fails every query", n: "27" },
  ];
  return (
    <Diagram
      id={id}
      height={190}
      title="One user click passes through a client, an API gateway, and a service with an SDK, each making 3 attempts, before reaching a failing database. The attempts multiply: 1 click becomes 3 requests at the gateway, 9 at the service, and 27 at the database."
    >
      {names.map((box, i) => (
        <g key={box.t}>
          <Box
            x={xs[i]}
            y={16}
            w={w}
            h={62}
            title={box.t}
            sub={box.s}
            size="sm"
            tone={i === 3 ? "warn" : "default"}
          />
          <Label x={xs[i] + w / 2} y={128} size={22} weight={600} tone={i === 3 ? "warn" : "fg"}>
            {box.n}
          </Label>
          {i < 3 ? <Arrow diagram={id} d={`M${xs[i] + w + 2} 47 H${xs[i + 1] - 2}`} /> : null}
        </g>
      ))}
      <Label x={xs[0] + w / 2} y={152} size={13}>user click</Label>
      <Label x={xs[1] + w / 2} y={152} size={13}>requests in</Label>
      <Label x={xs[2] + w / 2} y={152} size={13}>requests in</Label>
      <Label x={xs[3] + w / 2} y={152} size={13}>attempts in</Label>
      <Label x={320} y={180} size={13}>3 × 3 × 3 = 27 attempts per click, when the database has the least capacity</Label>
    </Diagram>
  );
}

export function JitterSpreadsRetries() {
  const id = "jitter-spread";
  const centers = [140, 320, 500];
  const rows = ["retry 1 · 100 ms", "retry 2 · 200 ms", "retry 3 · 400 ms"];
  // Fixed, illustrative heights for the jittered retries.
  const heights = [
    [14, 22, 10, 18, 26, 12, 20, 16],
    [20, 12, 24, 14, 10, 22, 16, 18],
    [12, 18, 14, 24, 20, 10, 22, 14],
  ];
  return (
    <Diagram
      id={id}
      height={350}
      title="Top: after a stall, every client waits the same 100, 200, and 400 milliseconds, so the dependency sees three tall synchronized spikes. Bottom: with full jitter, each client sleeps a random time, so the same retries spread into many small bars."
    >
      <Label x={8} y={26} anchor="start" size={15} tone="warn" weight={600}>Backoff without jitter</Label>
      <path d="M8 132 H632" strokeWidth={1.5} className="stroke-muted-foreground/45" />
      {centers.map((c, i) => (
        <g key={`sync-${c}`}>
          <rect x={c - 20} y={48} width={40} height={84} rx={4} className="fill-[#CB4B16]" />
          <Label x={c} y={154} size={13}>{rows[i]}</Label>
        </g>
      ))}

      <Label x={8} y={206} anchor="start" size={15} tone="accent" weight={600}>Full jitter</Label>
      <path d="M8 312 H632" strokeWidth={1.5} className="stroke-muted-foreground/45" />
      {centers.map((c, i) => (
        <g key={`jit-${c}`}>
          {heights[i].map((h, j) => (
            <rect key={j} x={c - 70 + j * 19} y={312 - h} width={11} height={h} rx={2} className="fill-accent" />
          ))}
          <Label x={c} y={334} size={13}>{`retry ${i + 1} window`}</Label>
        </g>
      ))}
    </Diagram>
  );
}
