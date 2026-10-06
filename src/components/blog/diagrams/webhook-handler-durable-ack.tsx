// Diagrams for "Webhook handler durable ack".
import { Arrow, Box, Diagram, Label } from "@/components/blog/diagrams/kit";

export function WebhookInboxFlow() {
  const id = "webhook-inbox-flow";
  return (
    <Diagram
      id={id}
      height={264}
      title="The handler verifies the signature, inserts the event into the webhook inbox keyed by event id, commits, and only then returns 200 to the provider. A background worker later claims pending inbox rows and applies the business write and the processed marker in one transaction."
    >
      <Box x={8} y={20} w={130} h={62} title="Provider" size="sm" />
      <Arrow diagram={id} d="M140 40 H216" />
      <Label x={178} y={32} size={13}>event</Label>
      <Arrow diagram={id} d="M216 66 H142" tone="accent" />
      <Label x={178} y={98} size={13} tone="accent">200 after commit</Label>
      <Box x={220} y={20} w={190} h={62} title="Handler" sub="verify, insert, commit" size="sm" tone="accent" />
      <Arrow diagram={id} d="M412 51 H486" />
      <Label x={450} y={43} size={13}>insert</Label>
      <Box x={490} y={20} w={142} h={62} title="webhook_inbox" sub="dedupes by id" size="sm" />

      <path d="M8 124 H632" strokeWidth={1} strokeDasharray="3 5" className="stroke-muted-foreground/40" />
      <Label x={8} y={146} anchor="start" size={13}>Background, off the request path</Label>

      <Arrow diagram={id} d="M561 84 V160" />
      <Label x={551} y={112} anchor="end" size={13}>claims pending</Label>
      <Box x={490} y={162} w={142} h={62} title="Worker" size="sm" />
      <Arrow diagram={id} d="M486 193 H414" tone="accent" />
      <Box x={220} y={162} w={190} h={62} title="Business write" sub="plus processed marker" size="sm" tone="accent" />
      <Label x={315} y={250} size={13} tone="accent">marker commits in the same transaction as the write</Label>
    </Diagram>
  );
}

export function WebhookAckWindows() {
  const id = "webhook-ack-windows";
  const xs = [8, 170, 332, 494];
  const w = 138;
  const rows: {
    head: string;
    tone: "warn" | "accent";
    steps: { t: string; s: string; tone?: "warn" | "accent" }[];
  }[] = [
    {
      head: "200 before the event is durable: lost event",
      tone: "warn",
      steps: [
        { t: "Verify", s: "signature" },
        { t: "Send 200", s: "before storing" },
        { t: "Crash", s: "or deploy, OOM", tone: "warn" },
        { t: "Event gone", s: "no retry", tone: "warn" },
      ],
    },
    {
      head: "200 after the business work: duplicate apply",
      tone: "warn",
      steps: [
        { t: "Verify", s: "signature" },
        { t: "Business work", s: "slow call" },
        { t: "Timeout", s: "delivers again", tone: "warn" },
        { t: "Work repeats", s: "second delivery", tone: "warn" },
      ],
    },
    {
      head: "Store, then 200, then work: neither window",
      tone: "accent",
      steps: [
        { t: "Verify", s: "signature" },
        { t: "Store event", s: "insert, commit", tone: "accent" },
        { t: "Send 200", s: "event is safe", tone: "accent" },
        { t: "Do the work", s: "from the inbox" },
      ],
    },
  ];
  return (
    <Diagram
      id={id}
      height={350}
      title="Three places to put the 200. Sending 200 before storing the event means a crash loses it and the provider never retries. Sending 200 only after the slow business work means the provider times out and delivers again, so the work repeats. Storing the event durably, then sending 200, then doing the work closes both windows."
    >
      {rows.map((row, r) => {
        const y = 36 + r * 114;
        return (
          <g key={row.head}>
            <Label x={8} y={y - 10} anchor="start" size={15} weight={600} tone={row.tone}>
              {row.head}
            </Label>
            {row.steps.map((step, i) => (
              <g key={step.t}>
                <Box x={xs[i]} y={y} w={w} h={58} title={step.t} sub={step.s} size="sm" tone={step.tone} />
                {i < 3 ? <Arrow diagram={id} d={`M${xs[i] + w + 2} ${y + 29} H${xs[i + 1] - 2}`} /> : null}
              </g>
            ))}
          </g>
        );
      })}
    </Diagram>
  );
}
