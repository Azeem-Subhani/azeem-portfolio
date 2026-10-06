// Diagrams for "NAT gateway and data transfer costs".
import { Arrow, Box, Diagram, Label } from "@/components/blog/diagrams/kit";

export function NatStackedCharges() {
  const id = "nat-stacked-charges";
  return (
    <Diagram
      id={id}
      height={240}
      title="One request from a pod in zone A to S3 through a NAT gateway in zone B pays cross-AZ transfer to reach the NAT, then NAT processing per GB. A gateway endpoint from the pod straight to S3 avoids the NAT processing charge and has no hourly or processing charge."
    >
      <g>
        <rect x={10} y={26} width={138} height={130} rx={12} strokeWidth={1.5} strokeDasharray="6 5" className="fill-foreground/[0.04] stroke-muted-foreground/30" />
        <Label x={79} y={50} size={14}>Zone A</Label>
      </g>
      <g>
        <rect x={262} y={26} width={140} height={130} rx={12} strokeWidth={1.5} strokeDasharray="6 5" className="fill-foreground/[0.04] stroke-muted-foreground/30" />
        <Label x={332} y={50} size={14}>Zone B</Label>
      </g>

      <Box x={24} y={68} w={110} h={60} title="Pod" size="sm" />
      <Box x={274} y={68} w={116} h={60} title="NAT gateway" size="sm" tone="warn" />
      <Box x={520} y={68} w={100} h={60} title="S3" size="sm" />

      <Arrow diagram={id} d="M134 98 H270" tone="warn" />
      <Label x={205} y={74} size={13} tone="warn">cross-AZ</Label>
      <Label x={205} y={90} size={13} tone="warn">transfer</Label>

      <Arrow diagram={id} d="M390 98 H516" tone="warn" />
      <Label x={456} y={74} size={13} tone="warn">NAT processing</Label>
      <Label x={456} y={90} size={13} tone="warn">per GB</Label>

      <Arrow diagram={id} d="M79 128 V190 H570 V132" tone="accent" />
      <Label x={325} y={182} size={13} tone="accent">Gateway endpoint · no hourly or processing charge</Label>
      <Label x={325} y={218} size={13}>same Region only · associate every private route table</Label>
    </Diagram>
  );
}

export function NatWhichFix() {
  const id = "nat-which-fix";
  const fixes = [
    { title: "Gateway endpoint", sub: "S3 or DynamoDB in the same Region", tone: "accent" as const },
    { title: "One NAT per zone", sub: "source zone differs from its NAT", tone: "default" as const },
    { title: "Interface endpoint", sub: "meaningful bytes · price it first", tone: "default" as const },
    { title: "Send fewer bytes", sub: "images, retries, chatty calls", tone: "default" as const },
  ];
  return (
    <Diagram
      id={id}
      height={336}
      title="Rank NAT destinations by bytes from flow logs, then pick the fix by what the top rows show: S3 or DynamoDB in the same Region gets a gateway endpoint, sources in a different zone than their NAT get one NAT per zone, AWS services with meaningful bytes may justify an interface endpoint after pricing it, and other traffic is reduced at the source."
    >
      <Box x={10} y={133} w={170} h={70} title="Top rows" sub="flow logs, by bytes" />
      {fixes.map((fix, i) => {
        const y = 16 + i * 80;
        const cy = y + 32;
        return (
          <g key={fix.title}>
            <Arrow diagram={id} d={`M180 168 H214 V${cy} H246`} tone={fix.tone} />
            <Box x={250} y={y} w={380} h={64} title={fix.title} sub={fix.sub} tone={fix.tone} />
          </g>
        );
      })}
    </Diagram>
  );
}
