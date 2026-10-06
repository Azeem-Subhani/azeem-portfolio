// Diagrams for "Idempotency key race conditions".
import { Arrow, Diagram, Label } from "@/components/blog/diagrams/kit";

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

const LANES = [
  { x: 76, label: "Request A" },
  { x: 232, label: "Request B" },
  { x: 400, label: "Key table" },
  { x: 560, label: "Provider" },
];

export function IdempotencyCheckThenInsert() {
  const id = "idem-check-then-insert";
  const [a, b, table, provider] = [76, 232, 400, 560];
  return (
    <Diagram
      id={id}
      height={338}
      title="Check then insert: requests A and B with the same key both look up the key and find nothing. Both charge the card at the provider. Then A inserts the key successfully and B hits the unique constraint, but the card has already been charged twice."
    >
      <Lanes lanes={LANES} height={338} />
      <Arrow diagram={id} d={`M${a} 84 H${table - 4}`} />
      <Label x={table - 10} y={76} anchor="end" size={13} tone="fg">SELECT K · not found</Label>
      <Arrow diagram={id} d={`M${b} 114 H${table - 4}`} />
      <Label x={table - 10} y={106} anchor="end" size={13} tone="fg">SELECT K · not found</Label>

      <Arrow diagram={id} d={`M${a} 152 H${provider - 4}`} tone="warn" />
      <Label x={480} y={144} size={13} tone="warn">charge card</Label>
      <Arrow diagram={id} d={`M${b} 182 H${provider - 4}`} tone="warn" />
      <Label x={480} y={174} size={13} tone="warn">charge card</Label>

      <Arrow diagram={id} d={`M${a} 220 H${table - 4}`} />
      <Label x={table - 10} y={212} anchor="end" size={13} tone="fg">INSERT K · ok</Label>
      <Arrow diagram={id} d={`M${b} 250 H${table - 4}`} />
      <Label x={table - 10} y={242} anchor="end" size={13} tone="fg">INSERT K · violation</Label>

      <rect x={170} y={278} width={300} height={48} rx={10} strokeWidth={2} className="fill-background stroke-[#CB4B16]" />
      <Label x={320} y={299} size={15} weight={600} tone="fg">Two charges, one key</Label>
      <Label x={320} y={318} size={13}>the constraint fired after the work</Label>
    </Diagram>
  );
}

export function IdempotencyClaimFirst() {
  const id = "idem-claim-first";
  const [a, b, table, provider] = [76, 232, 400, 560];
  return (
    <Diagram
      id={id}
      height={338}
      title="Claim first: request A inserts the key as in_progress and wins. Request B tries to insert the same key, conflicts, and receives a 409 telling it to retry later with the same key. A charges the card once, then marks the key completed with the stored response."
    >
      <Lanes lanes={LANES} height={338} />
      <Arrow diagram={id} d={`M${a} 84 H${table - 4}`} tone="accent" />
      <Label x={table - 10} y={76} anchor="end" size={13} tone="accent">claim K · in_progress</Label>
      <Arrow diagram={id} d={`M${b} 114 H${table - 4}`} />
      <Label x={table - 10} y={106} anchor="end" size={13} tone="fg">claim K · conflict</Label>
      <Arrow diagram={id} d={`M${table} 144 H${b + 4}`} />
      <Label x={table - 10} y={136} anchor="end" size={13} tone="fg">409 · retry, same key</Label>

      <Arrow diagram={id} d={`M${a} 188 H${provider - 4}`} tone="accent" />
      <Label x={480} y={180} size={13} tone="accent">charge card</Label>
      <Arrow diagram={id} d={`M${provider} 218 H${a + 4}`} />
      <Label x={480} y={210} size={13}>result</Label>

      <Arrow diagram={id} d={`M${a} 252 H${table - 4}`} tone="accent" />
      <Label x={table - 10} y={244} anchor="end" size={13} tone="accent">mark completed</Label>

      <rect x={170} y={278} width={300} height={48} rx={10} strokeWidth={2.25} className="fill-background stroke-accent" />
      <Label x={320} y={299} size={15} weight={600} tone="fg">One charge, outcome stored</Label>
      <Label x={320} y={318} size={13}>replays return the stored response</Label>
    </Diagram>
  );
}

export function IdempotencyRecordTooLate() {
  const id = "idem-record-too-late";
  const [req, table, provider] = [100, 330, 540];
  const lanes = [
    { x: req, label: "Request A" },
    { x: table, label: "Key table" },
    { x: provider, label: "Provider" },
  ];
  return (
    <Diagram
      id={id}
      height={412}
      title="Recorded after the side effect: request A checks key K and finds nothing, charges the card, then crashes before inserting K. The retry with the same key checks K, still finds nothing, and charges the card a second time."
    >
      <Lanes lanes={lanes} height={412} />
      <Arrow diagram={id} d={`M${req} 84 H${table - 4}`} />
      <Label x={(req + table) / 2} y={76} size={13} tone="fg">check K · not found</Label>
      <Arrow diagram={id} d={`M${req} 120 H${provider - 4}`} tone="warn" />
      <Label x={(table + provider) / 2} y={112} size={13} tone="warn">charge card</Label>

      {/* The crash lands between the charge and the insert. */}
      <circle cx={req} cy={152} r={4.5} className="fill-[#CB4B16]" />
      <Label x={req + 12} y={157} anchor="start" size={13} tone="warn">crash or timeout</Label>
      <Arrow diagram={id} d={`M${req} 186 H${table - 4}`} tone="muted" dashed />
      <Label x={(req + table) / 2} y={178} size={13}>insert K · never happens</Label>

      <path d="M24 214 H616" strokeWidth={1} strokeDasharray="2 4" className="stroke-muted-foreground/30" />
      <Label x={24} y={238} anchor="start" size={13} tone="fg" weight={600}>Retry with the same key K</Label>

      <Arrow diagram={id} d={`M${req} 266 H${table - 4}`} />
      <Label x={(req + table) / 2} y={258} size={13} tone="fg">check K · not found</Label>
      <Arrow diagram={id} d={`M${req} 302 H${provider - 4}`} tone="warn" />
      <Label x={(table + provider) / 2} y={294} size={13} tone="warn">charge card again</Label>

      <rect x={170} y={338} width={300} height={56} rx={10} strokeWidth={2} className="fill-background stroke-[#CB4B16]" />
      <Label x={320} y={362} size={15} weight={600} tone="fg">Two charges</Label>
      <Label x={320} y={382} size={13}>the key was written after the side effect</Label>
    </Diagram>
  );
}
