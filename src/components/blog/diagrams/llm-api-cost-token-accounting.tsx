// Diagrams for "LLM API cost and token accounting".
import { Arrow, Box, Diagram, Label } from "@/components/blog/diagrams/kit";

export function LlmCostInvestigationOrder() {
  const id = "llm-api-cost-token-accounting-order";
  const steps = [
    ["1 · Find the feature", "Group spend by feature and day"],
    ["2 · Find the call pattern", "Fan-out, retries, loop steps"],
    ["3 · Find the token type", "Input vs output, cached vs uncached"],
    ["4 · Look at the tail", "p95 and p99 tokens and calls per request"],
    ["5 · Check what changed", "Deploys, prompt edits, model config"],
  ];
  return (
    <Diagram
      id={id}
      height={356}
      title="The investigation order for a high LLM bill, top to bottom: find the feature, find the call pattern, find the token type, look at the tail, then check what changed."
    >
      {steps.map(([title, note], i) => (
        <g key={title}>
          <Box x={16} y={12 + i * 70} w={260} h={48} title={title} size="sm" tone={i < 3 ? "accent" : "default"} />
          <Label x={304} y={41 + i * 70} anchor="start" tone="fg">{note}</Label>
          {i < steps.length - 1 ? (
            <Arrow diagram={id} d={`M146 ${60 + i * 70} V${82 + i * 70}`} tone="accent" />
          ) : null}
        </g>
      ))}
    </Diagram>
  );
}

export function LlmCostResentContext() {
  const id = "llm-api-cost-token-accounting-resent";
  const turns = [1, 2, 3, 4];
  return (
    <Diagram
      id={id}
      height={252}
      title="Four turns of a chat. Each turn sends the system prompt plus the whole history again, plus the new message, so each turn's input is longer than the last."
    >
      {turns.map((n, row) => (
        <g key={n}>
          <Label x={16} y={37 + row * 52} anchor="start" tone="fg" size={15}>{`Turn ${n}`}</Label>
          <Box x={92} y={14 + row * 52} w={96} h={40} title="system" size="sm" tone="muted" />
          {turns.slice(0, n).map((t) => (
            <Box
              key={t}
              x={92 + t * 100}
              y={14 + row * 52}
              w={96}
              h={40}
              title={`turn ${t}`}
              size="sm"
              tone={t === n ? "accent" : "muted"}
            />
          ))}
        </g>
      ))}
      <Label x={16} y={238} anchor="start">Accent: new this turn · grey: the same history, sent again</Label>
    </Diagram>
  );
}
