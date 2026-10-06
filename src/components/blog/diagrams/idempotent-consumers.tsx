// Diagrams for "At-least-once delivery and idempotent consumers".
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

export function IdempotentRedeliveryTimeline() {
  const id = "idempotent-redelivery";
  const [broker, consumer, db] = [90, 320, 550];
  return (
    <Diagram
      id={id}
      height={450}
      title="Timeline of one event delivered twice. The broker delivers it, the consumer commits the state change and a dedup row in one transaction, then crashes before acknowledging. The visibility timeout expires and the broker delivers again. The dedup insert conflicts, so the consumer applies nothing and acknowledges, which deletes the message."
    >
      <Lanes
        height={450}
        lanes={[
          { x: broker, label: "Broker" },
          { x: consumer, label: "Consumer" },
          { x: db, label: "Database" },
        ]}
      />
      <Arrow diagram={id} d={`M${broker} 90 H${consumer - 4}`} />
      <Label x={(broker + consumer) / 2} y={82} size={13} tone="fg">deliver</Label>

      <Arrow diagram={id} d={`M${consumer} 130 H${db - 4}`} />
      <Label x={(consumer + db) / 2} y={122} size={13} tone="fg">state change + dedup row</Label>
      <Arrow diagram={id} d={`M${db} 170 H${consumer + 4}`} tone="accent" />
      <Label x={(consumer + db) / 2} y={162} size={13} tone="accent">COMMIT</Label>

      <circle cx={consumer} cy={212} r={4.5} className="fill-[#CB4B16]" />
      <Label x={consumer - 12} y={217} anchor="end" size={13} tone="warn">crash before ack</Label>

      <circle cx={broker} cy={256} r={4.5} className="fill-[#CB4B16]" />
      <Label x={broker + 12} y={261} anchor="start" size={13} tone="warn">visibility timeout expires</Label>

      <Arrow diagram={id} d={`M${broker} 306 H${consumer - 4}`} />
      <Label x={(broker + consumer) / 2} y={298} size={13} tone="fg">deliver again</Label>

      <Arrow diagram={id} d={`M${consumer} 346 H${db - 4}`} />
      <Label x={(consumer + db) / 2} y={338} size={13} tone="fg">insert dedup row</Label>
      <Arrow diagram={id} d={`M${db} 386 H${consumer + 4}`} tone="accent" />
      <Label x={(consumer + db) / 2} y={378} size={13} tone="accent">conflict · already applied</Label>

      <Arrow diagram={id} d={`M${consumer} 426 H${broker + 4}`} tone="accent" />
      <Label x={(broker + consumer) / 2} y={418} size={13} tone="accent">ack · message deleted</Label>
    </Diagram>
  );
}

export function IdempotentTransactionBoundary() {
  const id = "idempotent-boundary";
  return (
    <Diagram
      id={id}
      height={350}
      title="The consumer's work split by transaction boundary. Inside one Postgres transaction sit the dedup row and the seat update, which commit together or not at all, so the reservation is safe. The payment provider call sits outside the transaction, so a crash before commit followed by redelivery can charge twice."
    >
      <Box x={20} y={106} w={120} h={70} title="Consumer" size="sm" />
      <Arrow diagram={id} d="M140 141 H176" tone="accent" />

      <rect
        x={180}
        y={36}
        width={260}
        height={236}
        rx={12}
        strokeWidth={2.25}
        strokeDasharray="6 5"
        className="fill-foreground/[0.04] stroke-accent"
      />
      <Label x={310} y={62} tone="fg" size={15} weight={600}>One Postgres transaction</Label>
      <Box x={200} y={80} w={220} h={64} title="Dedup row" sub="processed_events" tone="accent" />
      <Box x={200} y={158} w={220} h={64} title="Seat update" sub="seats" tone="accent" />
      <Label x={310} y={254} tone="accent" size={13}>reservation is safe</Label>

      <Box x={480} y={106} w={140} h={70} title="Card charge" sub="payment provider" tone="warn" size="sm" />
      <Arrow diagram={id} d="M80 176 V316 H550 V180" tone="warn" />
      <Label x={315} y={308} tone="warn" size={13}>outside the transaction · can still happen twice</Label>
    </Diagram>
  );
}
