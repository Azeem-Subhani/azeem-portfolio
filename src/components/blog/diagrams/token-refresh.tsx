import { Arrow, Diagram, Label } from "@/components/blog/diagrams/kit";

// Diagrams for "Typed API clients and token refresh". The race assumes refresh
// tokens rotate (each one is single-use), which the post states as an assumption.

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

export function RefreshRace() {
  const id = "refresh-race";
  const [a, b, auth] = [90, 270, 530];
  return (
    <Diagram
      id={id}
      height={362}
      title="Without a shared refresh: requests A and B both get 401. A refreshes with token R1 and receives R2. B then refreshes with the same R1, which was already used, so the auth server rejects it and the customer is signed out mid-checkout."
    >
      <Lanes
        height={362}
        lanes={[
          { x: a, label: "Request A" },
          { x: b, label: "Request B" },
          { x: auth, label: "Auth API" },
        ]}
      />
      {/* Each request's 401, marked on its own lane. */}
      <circle cx={a} cy={80} r={4.5} className="fill-[#CB4B16]" />
      <Label x={a + 12} y={85} anchor="start" size={13}>401 · token expired</Label>
      <circle cx={b} cy={106} r={4.5} className="fill-[#CB4B16]" />
      <Label x={b + 12} y={111} anchor="start" size={13}>401 · token expired</Label>

      <Arrow diagram={id} d={`M${a} 146 H${auth - 4}`} />
      <Label x={(a + auth) / 2 + 60} y={138} size={13} tone="fg">refresh(R1)</Label>
      <Arrow diagram={id} d={`M${auth} 176 H${a + 4}`} tone="accent" />
      <Label x={(a + auth) / 2 + 60} y={168} size={13} tone="accent">new session · R2</Label>

      <Arrow diagram={id} d={`M${b} 222 H${auth - 4}`} />
      <Label x={(b + auth) / 2} y={214} size={13} tone="fg">refresh(R1)</Label>
      <Arrow diagram={id} d={`M${auth} 252 H${b + 4}`} tone="warn" />
      <Label x={(b + auth) / 2} y={244} size={13} tone="warn">rejected · R1 already used</Label>

      <rect x={b - 110} y={286} width={220} height={58} rx={10} strokeWidth={2} className="fill-background stroke-[#CB4B16]" />
      <Label x={b} y={311} tone="fg" size={15} weight={600}>Session cleared</Label>
      <Label x={b} y={332} size={13}>customer signed out at checkout</Label>
    </Diagram>
  );
}

export function RefreshSingleFlight() {
  const id = "refresh-single";
  const [a, b, shared, auth] = [80, 230, 400, 565];
  return (
    <Diagram
      id={id}
      height={326}
      title="With a shared refresh: request A's 401 starts one refresh. Request B's 401 waits on that same refresh instead of starting its own. The single refresh exchanges R1 for R2, and both requests retry with the new token and succeed."
    >
      <Lanes
        height={326}
        lanes={[
          { x: a, label: "Request A" },
          { x: b, label: "Request B" },
          { x: shared, label: "Shared refresh" },
          { x: auth, label: "Auth API" },
        ]}
      />
      <Arrow diagram={id} d={`M${a} 86 H${shared - 4}`} />
      <Label x={(a + shared) / 2 + 40} y={78} size={13} tone="fg">401 → start refresh</Label>
      <Arrow diagram={id} d={`M${b} 128 H${shared - 4}`} dashed />
      <Label x={(b + shared) / 2} y={120} size={13} tone="fg">401 → wait</Label>

      <Arrow diagram={id} d={`M${shared} 170 H${auth - 4}`} />
      <Label x={(shared + auth) / 2} y={162} size={13} tone="fg">refresh(R1)</Label>
      <Arrow diagram={id} d={`M${auth} 204 H${shared + 4}`} tone="accent" />
      <Label x={(shared + auth) / 2} y={196} size={13} tone="accent">R2</Label>

      <Arrow diagram={id} d={`M${shared} 250 H${a + 4}`} tone="accent" />
      <Arrow diagram={id} d={`M${shared} 250 H${b + 4}`} tone="accent" head={false} />
      <Label x={(a + shared) / 2 + 40} y={242} size={13} tone="accent">both resume with R2</Label>

      <Label x={a} y={300} size={14} tone="fg" weight={600}>retry → 200</Label>
      <Label x={b} y={300} size={14} tone="fg" weight={600}>retry → 200</Label>
      <Label x={(shared + auth) / 2} y={300} size={13}>one refresh, however many 401s</Label>
    </Diagram>
  );
}

export function AuthLayers() {
  const id = "auth-layers";
  const layers = [
    { title: "Route guard", when: "before the page renders", catches: "no session → sign in first, not after the form" },
    { title: "Typed API client", when: "at compile time", catches: "request and response shapes drift from the API" },
    { title: "Single refresh path", when: "at runtime, in the client", catches: "expired tokens, concurrent 401s" },
    { title: "Request validation", when: "on the Django API", catches: "malformed input, with a readable error" },
  ];
  return (
    <Diagram
      id={id}
      height={372}
      title="Four layers, outermost first: a route guard before the page renders, a typed API client at compile time, a single refresh path at runtime, and request validation on the Django API."
    >
      {layers.map((layer, i) => {
        const y = 16 + i * 88;
        return (
          <g key={layer.title}>
            <rect
              x={20}
              y={y}
              width={600}
              height={72}
              rx={10}
              strokeWidth={i === 2 ? 2.25 : 1.5}
              className={i === 2 ? "fill-background stroke-accent" : "fill-background stroke-muted-foreground/45"}
            />
            <Label x={44} y={y + 31} anchor="start" tone="fg" size={17} weight={600}>
              {layer.title}
            </Label>
            <Label x={44} y={y + 54} anchor="start" size={13}>
              {layer.when}
            </Label>
            <Label x={600} y={y + 44} anchor="end" size={13}>
              {layer.catches}
            </Label>
            {i < layers.length - 1 ? <Arrow diagram={id} d={`M320 ${y + 72} V${y + 86}`} /> : null}
          </g>
        );
      })}
    </Diagram>
  );
}
