// Diagrams for "Late arriving data pipelines".
import { Arrow, Box, Diagram, Label } from "@/components/blog/diagrams/kit";

export function LateEventTimeline() {
  const id = "late-arriving-data-pipelines-timeline";
  return (
    <Diagram
      id={id}
      height={166}
      title="A timeline. Yesterday's total is published at 6 a.m. By noon, events stamped with yesterday's date arrive. Either the dashboard changes under someone who already quoted the number, or it stays put and now disagrees with the source system."
    >
      <rect x={24} y={48} width={206} height={30} rx={8} strokeWidth={1.5} className="fill-foreground/[0.04] stroke-muted-foreground/25" />
      <Label x={127} y={68} size={14} tone="fg">Events stamped yesterday</Label>
      <Arrow diagram={id} d="M230 63 H620" tone="default" />
      <circle cx={310} cy={63} r={5} className="fill-accent" />
      <Label x={310} y={38} tone="accent">6 a.m. · total published</Label>
      <circle cx={520} cy={63} r={5} className="fill-[#CB4B16]" />
      <Label x={520} y={38} tone="warn">noon · late events arrive</Label>

      <Arrow diagram={id} d="M520 74 V90 H169 V106" tone="warn" />
      <Arrow diagram={id} d="M520 90 H471 V106" tone="warn" />
      <Box x={24} y={108} w={290} h={52} title="Dashboard changes" sub="someone already quoted it" tone="warn" size="sm" />
      <Box x={326} y={108} w={290} h={52} title="Dashboard stays" sub="now disagrees with the source" tone="warn" size="sm" />
    </Diagram>
  );
}

export function LateEventPolicies() {
  const id = "late-arriving-data-pipelines-policies";
  return (
    <Diagram
      id={id}
      height={296}
      title="A late event can follow one of three chosen policies: restate the period's value, land it aside and reconcile later, or ignore it on purpose while counting. A fourth, unlisted policy is ignoring it by accident, with no counter, so the dashboard looks final."
    >
      <Box x={200} y={12} w={240} h={44} title="Late event arrives" size="sm" />
      <Arrow diagram={id} d="M320 56 V83 H114 V108" tone="accent" />
      <Arrow diagram={id} d="M320 83 H524 V108" tone="accent" />
      <Arrow diagram={id} d="M320 83 V108" tone="accent" />
      <Box x={16} y={110} w={196} h={70} title="Restate" sub="number is updated" tone="accent" size="sm" />
      <Box x={222} y={110} w={196} h={70} title="Land and reconcile" sub="late pile kept apart" tone="accent" size="sm" />
      <Box x={428} y={110} w={196} h={70} title="Ignore on purpose" sub="dropped, but counted" tone="accent" size="sm" />
      <Label x={114} y={204}>needs an &quot;as of&quot; marker</Label>
      <Label x={320} y={204}>late pile stays visible</Label>
      <Label x={526} y={204}>only if measured</Label>

      <Arrow diagram={id} d="M440 34 H630 V252 H452" tone="warn" dashed />
      <Box x={190} y={226} w={260} h={52} title="Ignore by accident" sub="no counter, looks final" tone="warn" size="sm" />
    </Diagram>
  );
}
