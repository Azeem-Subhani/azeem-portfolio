// Diagrams for "Read your writes and replica lag".
import { Arrow, Box, Diagram, Label } from "@/components/blog/diagrams/kit";

function Lanes({ lanes, height }: { lanes: { x: number; label: string }[]; height: number }) {
  return (
    <>
      {lanes.map((lane) => (
        <g key={lane.label}>
          <rect
            x={lane.x - 62}
            y={12}
            width={124}
            height={34}
            rx={8}
            strokeWidth={1.5}
            className="fill-background stroke-muted-foreground/45"
          />
          <text x={lane.x} y={34} textAnchor="middle" fontSize={14} fontWeight={600} className="fill-foreground">
            {lane.label}
          </text>
          <path d={`M${lane.x} 46 V${height - 12}`} strokeWidth={1} strokeDasharray="3 5" className="stroke-muted-foreground/40" />
        </g>
      ))}
    </>
  );
}

export function ReplicaStaleReadTimeline() {
  const id = "replica-stale-read";
  const [app, primary, replica] = [100, 320, 540];
  return (
    <Diagram
      id={id}
      height={310}
      title="The app saves to the primary and gets a success. The primary ships its WAL to the replica asynchronously. The app's next read goes to the replica, which has not applied the write yet, and returns the old address. The replica applies the write only after that read."
    >
      <Lanes
        height={310}
        lanes={[
          { x: app, label: "App" },
          { x: primary, label: "Primary" },
          { x: replica, label: "Replica" },
        ]}
      />
      <Arrow diagram={id} d={`M${app} 90 H${primary - 4}`} />
      <Label x={210} y={82} size={13} tone="fg">save address</Label>
      <Arrow diagram={id} d={`M${primary} 122 H${app + 4}`} tone="accent" />
      <Label x={210} y={114} size={13} tone="accent">committed · success</Label>

      <Arrow diagram={id} d={`M${primary} 160 H${replica - 4}`} dashed />
      <Label x={430} y={152} size={13}>WAL, asynchronous</Label>

      <Arrow diagram={id} d={`M${app} 204 H${replica - 4}`} />
      <Label x={430} y={196} size={13} tone="fg">read next page</Label>
      <Arrow diagram={id} d={`M${replica} 236 H${app + 4}`} tone="warn" />
      <Label x={430} y={228} size={13} tone="warn">old address</Label>

      <circle cx={replica} cy={276} r={4.5} className="fill-accent" />
      <Label x={replica - 12} y={281} anchor="end" size={13}>write applied, too late</Label>
    </Diagram>
  );
}

export function ReplicaPositionTokenRouting() {
  const id = "replica-token-routing";
  return (
    <Diagram
      id={id}
      height={330}
      title="Routing a read with a position token. If the user has no recent write token, read from a replica. If they do, check whether the replica has replayed at least that position. If yes, read from the replica. If not after a short wait, fall back to the primary."
    >
      <Box x={8} y={20} w={150} h={56} title="Read request" size="sm" />
      <Arrow diagram={id} d="M158 48 H196" />
      <Box x={200} y={20} w={190} h={56} title="Recent write token?" size="sm" />
      <Arrow diagram={id} d="M390 48 H466" />
      <Label x={428} y={40} size={13}>no</Label>
      <Box x={470} y={20} w={162} h={56} title="Replica read" sub="source: replica" tone="accent" size="sm" />

      <Arrow diagram={id} d="M295 76 V140" />
      <Label x={305} y={114} anchor="start" size={13}>yes</Label>
      <Box x={170} y={144} w={250} h={56} title="Replica caught up?" sub="replay LSN reached token" size="sm" />
      <Arrow diagram={id} d="M420 172 H551 V80" tone="accent" />
      <Label x={485} y={164} size={13} tone="accent">yes</Label>

      <Arrow diagram={id} d="M295 200 V254" tone="warn" />
      <Label x={305} y={232} anchor="start" size={13} tone="warn">no, after a short wait</Label>
      <Box x={170} y={258} w={250} h={56} title="Primary read" sub="source: primary-fallback" tone="warn" size="sm" />
    </Diagram>
  );
}
