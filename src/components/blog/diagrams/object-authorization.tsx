// Diagrams for "Broken object level authorization".
import { Arrow, Box, Diagram, Label } from "@/components/blog/diagrams/kit";

export function BolaMissingDecision() {
  const id = "bola-missing-decision";
  const xs = [10, 230, 450];
  return (
    <Diagram
      id={id}
      height={250}
      title="Two versions of the same invoice request. Before: a valid session, then a lookup by id alone, so any invoice is returned, including other tenants. After: a valid session, then a lookup scoped to the session's organization, so only that organization's invoices are returned and anything else is a 404."
    >
      <Label x={10} y={26} anchor="start" tone="warn" size={14} weight={600}>Before · no object-level decision</Label>
      <Box x={xs[0]} y={40} w={180} h={64} title="Request" sub="session valid" />
      <Arrow diagram={id} d="M190 72 H226" />
      <Box x={xs[1]} y={40} w={180} h={64} title="Load by id" sub="WHERE id = $1" tone="warn" />
      <Arrow diagram={id} d="M410 72 H446" tone="warn" />
      <Box x={xs[2]} y={40} w={180} h={64} title="Any invoice" sub="other tenants too" tone="warn" />

      <Label x={10} y={152} anchor="start" tone="accent" size={14} weight={600}>After · scoped to the session</Label>
      <Box x={xs[0]} y={166} w={180} h={64} title="Request" sub="session valid" />
      <Arrow diagram={id} d="M190 198 H226" tone="accent" />
      <Box x={xs[1]} y={166} w={180} h={64} title="Scoped lookup" sub="AND org_id = session" tone="accent" />
      <Arrow diagram={id} d="M410 198 H446" tone="accent" />
      <Box x={xs[2]} y={166} w={180} h={64} title="Own org only" sub="anything else: 404" tone="accent" />
    </Diagram>
  );
}

export function BolaNestedChecks() {
  const id = "bola-nested-checks";
  const rows = [
    { seg: "orgId", check: "1 · the caller belongs to the org" },
    { seg: "projectId", check: "2 · the project belongs to that org" },
    { seg: "fileId", check: "3 · the file belongs to that project" },
  ];
  return (
    <Diagram
      id={id}
      height={290}
      title="For the route orgs, projects, files, three checks are needed in a chain: the caller belongs to the org, the project belongs to that org, and the file belongs to that project. Checking only the first segment lets a caller pair their own org id with someone else's file id."
    >
      {rows.map((row, i) => {
        const y = 20 + i * 80;
        return (
          <g key={row.seg}>
            <Box x={20} y={y} w={150} h={52} title={row.seg} size="sm" tone="accent" />
            {i < rows.length - 1 ? <Arrow diagram={id} d={`M95 ${y + 52} V${y + 78}`} /> : null}
            <Arrow diagram={id} d={`M174 ${y + 26} H212`} tone="accent" />
            <Label x={222} y={y + 31} anchor="start" tone="fg" size={15}>
              {row.check}
            </Label>
          </g>
        );
      })}
      <Label x={20} y={276} anchor="start" tone="warn" size={13}>
        {"Check only the first segment: your own org id plus someone else's file id passes"}
      </Label>
    </Diagram>
  );
}
