// Diagrams for "Debug poor INP: find the slow interaction in field data".
import { Arrow, Box, Diagram, Label } from "@/components/blog/diagrams/kit";

export function InpPhaseBreakdown() {
  const id = "inp-phases";
  const cols = [
    { x: 20, title: "Input delay", cause: ["Main thread was busy:", "script compiling,", "long tasks at load"], fix: "Defer or remove", fixSub: "the blocking script" },
    { x: 222, title: "Processing", cause: ["Handlers ran too long:", "loops, state fan-out,", "layout thrashing"], fix: "Do less, then yield", fixSub: "in the handler" },
    { x: 424, title: "Presentation delay", cause: ["Next frame was slow:", "large DOM, style cost,", "big injected HTML"], fix: "Reduce render work", fixSub: "per frame" },
  ];
  return (
    <Diagram
      id={id}
      height={300}
      title="One interaction split into three phases from tap to next paint: input delay, where the main thread was busy and the fix is to defer or remove the blocking script; processing duration, where handlers ran too long and the fix is to do less then yield; and presentation delay, where the next frame was slow and the fix is to reduce rendering work."
    >
      <Label x={20} y={26} anchor="start" size={13}>user taps</Label>
      <Label x={620} y={26} anchor="end" size={13}>next frame painted</Label>
      {cols.map((c) => (
        <g key={c.title}>
          <Box x={c.x} y={36} w={196} h={48} title={c.title} size="sm" tone="muted" />
          <Arrow diagram={id} d={`M${c.x + 98} 84 V104`} />
          {c.cause.map((line, i) => (
            <Label key={line} x={c.x + 98} y={124 + i * 19} size={13}>
              {line}
            </Label>
          ))}
          <Arrow diagram={id} d={`M${c.x + 98} 188 V206`} tone="accent" />
          <Box x={c.x} y={212} w={196} h={66} title={c.fix} sub={c.fixSub} size="sm" tone="accent" />
        </g>
      ))}
    </Diagram>
  );
}

export function InpFieldLabLoop() {
  const id = "inp-loop";
  return (
    <Diagram
      id={id}
      height={190}
      title="A loop: field data picks the slow interaction, a lab trace reproduces it, one phase is changed, and field data confirms the change before the next-worst interaction is chased."
    >
      <Box x={20} y={20} w={186} h={70} title="Field data" sub="find the target" />
      <Arrow diagram={id} d="M206 55 H224" />
      <Box x={227} y={20} w={186} h={70} title="Lab trace" sub="reproduce it" />
      <Arrow diagram={id} d="M413 55 H431" />
      <Box x={434} y={20} w={186} h={70} title="One fix" sub="change one phase" tone="accent" />
      <Arrow diagram={id} d="M527 90 V128 H113 V96" tone="accent" dashed />
      <Label x={320} y={156} size={13} tone="accent">
        confirm in the field, then look at the next-worst interaction
      </Label>
    </Diagram>
  );
}
