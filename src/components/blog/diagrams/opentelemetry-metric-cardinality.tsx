// Diagrams for "OpenTelemetry metric cardinality and silent overflow".
import { Arrow, Box, Diagram, Label } from "@/components/blog/diagrams/kit";

export function OtelOverflowFold() {
  const id = "otel-fold";
  return (
    <Diagram
      id={id}
      height={270}
      title="One metric stream with a default limit of 2,000 attribute combinations. The first 2,000 keep their own data points with attributes. Every combination after that is folded into a single overflow data point marked otel.metric.overflow=true, with route, success, and user.id all removed. Totals stay correct, but breakdowns undercount."
    >
      <Box x={20} y={20} w={250} h={70} title="First 2,000 combinations" sub="route · success · user.id" />
      <Arrow diagram={id} d="M270 55 H356" tone="accent" />
      <Box x={360} y={20} w={260} h={70} title="Kept as they are" sub="attributes intact" tone="accent" />

      <Box x={20} y={130} w={250} h={70} title="Every combination after" sub="new user.id values keep coming" tone="warn" />
      <Arrow diagram={id} d="M270 165 H356" tone="warn" />
      <Box x={360} y={130} w={260} h={70} title="One overflow point" sub="otel.metric.overflow=true" tone="warn" />
      <Label x={490} y={224} size={13} tone="warn">route, success, user.id all removed</Label>

      <Label x={320} y={256} size={14} tone="fg" weight={600}>Totals stay correct. Breakdowns undercount.</Label>
    </Diagram>
  );
}

export function OtelQuietErrorRatio() {
  const id = "otel-quiet";
  return (
    <Diagram
      id={id}
      height={344}
      title="After overflow, failing requests are recorded in the overflow point, which has no route and no success label. The per-route error ratio never selects that point, so numerator and denominator both miss it and the ratio looks healthy while the alert stays quiet. The ungrouped total still counts it and stays correct."
    >
      <Box x={220} y={16} w={200} h={50} title="Failing requests" size="sm" tone="warn" />
      <Arrow diagram={id} d="M320 66 V104" tone="warn" />
      <Box x={190} y={110} w={260} h={60} title="Overflow point" sub="no route, no success" size="sm" tone="warn" />

      <Arrow diagram={id} d="M250 170 C 250 200, 165 190, 165 230" tone="warn" dashed />
      <Label x={150} y={202} anchor="end" size={13} tone="warn">never selected</Label>
      <Arrow diagram={id} d="M390 170 C 390 200, 485 190, 485 230" tone="accent" />
      <Label x={500} y={202} anchor="start" size={13} tone="accent">still counted</Label>

      <Box x={20} y={236} w={290} h={60} title="Per-route error ratio" sub="sees only the kept series" size="sm" tone="warn" />
      <Box x={350} y={236} w={270} h={60} title="Ungrouped total" sub="sees every point" size="sm" tone="accent" />
      <Label x={165} y={324} size={13} tone="warn">looks healthy, alert stays quiet</Label>
      <Label x={485} y={324} size={13} tone="accent">stays correct</Label>
    </Diagram>
  );
}
