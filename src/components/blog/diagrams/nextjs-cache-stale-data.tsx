// Diagrams for "Next.js cache serving stale data: which layer and how to fix it".
import { Arrow, Box, Diagram, Label } from "@/components/blog/diagrams/kit";

export function NextCacheInvalidationReach() {
  const id = "nextcache-reach";
  const cols = [
    { x: 20, title: "Browser", sub: "client cache" },
    { x: 176, title: "CDN", sub: "s-maxage copy" },
    { x: 332, title: "Next server", sub: "server caches" },
    { x: 488, title: "Data source", sub: "database, API" },
  ];
  return (
    <Diagram
      id={id}
      height={300}
      title="A request passes through the browser client cache, a CDN, the Next.js server caches, and the data source. A revalidation call invalidates the Next.js server cache. It does not reach the CDN, which needs its own purge. A Server Action in the same session also clears that session's client cache."
    >
      {cols.map((c, i) => (
        <g key={c.title}>
          <Box x={c.x} y={20} w={130} h={64} title={c.title} sub={c.sub} size="sm" tone={i === 2 ? "accent" : "default"} />
          {i < cols.length - 1 ? <Arrow diagram={id} d={`M${c.x + 133} 52 H${c.x + 153}`} /> : null}
        </g>
      ))}

      <Arrow diagram={id} d="M397 214 V90" tone="accent" />
      <Label x={405} y={134} anchor="start" size={13} tone="accent">invalidated</Label>

      <Arrow diagram={id} d="M340 214 V176 H241 V90" tone="warn" dashed />
      <Label x={249} y={118} anchor="start" size={13} tone="warn">not reached:</Label>
      <Label x={249} y={137} anchor="start" size={13} tone="warn">purge it too</Label>

      <Arrow diagram={id} d="M290 214 V196 H85 V90" dashed />
      <Label x={93} y={110} anchor="start" size={13}>cleared only by a</Label>
      <Label x={93} y={129} anchor="start" size={13}>Server Action in</Label>
      <Label x={93} y={148} anchor="start" size={13}>the same session</Label>

      <Box x={252} y={220} w={290} h={60} title="Revalidation call" sub="revalidateTag · revalidatePath" size="sm" />
    </Diagram>
  );
}
