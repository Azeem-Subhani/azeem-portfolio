// Diagrams for "Postgres migration lock queue".
import { Arrow, Box, Diagram, Label } from "@/components/blog/diagrams/kit";

export function MigrationLockQueue() {
  const id = "migration-lock-queue";
  return (
    <Diagram
      id={id}
      height={290}
      title="A long report holds ACCESS SHARE on orders. The migration requests ACCESS EXCLUSIVE, conflicts with the report, and waits. New SELECT, INSERT, and UPDATE statements queue behind the waiting migration even though it holds nothing yet, so the table is effectively offline until the report finishes."
    >
      <Box x={8} y={16} w={260} h={62} title="Long report or idle transaction" sub="holds ACCESS SHARE" size="sm" />
      <Arrow diagram={id} d="M138 78 V152" tone="warn" />
      <Label x={150} y={120} anchor="start" size={13} tone="warn">conflicts, so the migration waits</Label>
      <Box x={8} y={154} w={260} h={62} title="ALTER TABLE orders" sub="waits for ACCESS EXCLUSIVE" tone="warn" size="sm" />

      <Label x={312} y={146} anchor="start" size={13}>New queries on orders, queued behind it</Label>
      <Arrow diagram={id} d="M300 185 H274" tone="warn" />
      <Box x={304} y={154} w={96} h={62} title="SELECT" sub="waits" tone="muted" size="sm" />
      <Box x={412} y={154} w={96} h={62} title="INSERT" sub="waits" tone="muted" size="sm" />
      <Box x={520} y={154} w={96} h={62} title="UPDATE" sub="waits" tone="muted" size="sm" />

      <Label x={312} y={250} anchor="start" size={14} tone="warn" weight={600}>Table effectively offline until the report ends</Label>
      <Label x={312} y={272} anchor="start" size={13}>then the migration runs in milliseconds</Label>
    </Diagram>
  );
}
