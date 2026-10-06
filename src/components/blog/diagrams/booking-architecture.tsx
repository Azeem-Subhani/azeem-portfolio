import { Arrow, Box, Diagram, Label } from "@/components/blog/diagrams/kit";

// Diagrams for "Five branded booking sites on one payments engine".
// Facts drawn here come from the track-booking entry in src/content/projects.ts;
// the decision flow and checkout picture are the post's own advice, not claims
// about the client build.

const VENUES = ["Venue A", "Venue B", "Venue C", "Venue D", "Venue E"];

export function BookingArchitecture() {
  const id = "booking-arch";
  const venueW = 108;
  const gap = (600 - venueW * VENUES.length) / (VENUES.length - 1);
  return (
    <Diagram
      id={id}
      height={480}
      title="Five white-label venue sites share one frontend codebase and one Django booking API, which writes to PostgreSQL and takes payments through Stripe."
    >
      {VENUES.map((venue, i) => {
        const x = 20 + i * (venueW + gap);
        return (
          <g key={venue}>
            <Box x={x} y={20} w={venueW} h={48} title={venue} size="sm" />
            <Arrow diagram={id} d={`M${x + venueW / 2} 68 V112`} />
          </g>
        );
      })}
      <Box x={20} y={118} w={600} h={70} title="White-label frontend" sub="React · Next.js · TypeScript" />
      <Arrow diagram={id} d="M320 188 V242" tone="accent" />
      <Box x={20} y={248} w={600} h={70} title="Booking & ops API" sub="Django · reservations, CRM, fleet, events" tone="accent" />
      <Arrow diagram={id} d="M165 318 V372" tone="accent" />
      <Arrow diagram={id} d="M475 318 V372" tone="accent" />
      <Box x={20} y={378} w={290} h={70} title="PostgreSQL" sub="reservations · CRM · reporting" />
      <Box x={330} y={378} w={290} h={70} title="Stripe" sub="cards · gift certs · credits · promos" />
      <Label x={320} y={472} size={13}>
        One codebase, one database, one Stripe integration
      </Label>
    </Diagram>
  );
}

export function StacksVsEngine() {
  const id = "stacks-engine";
  const chipW = 48;
  const chipGap = (280 - chipW * 5) / 4;
  return (
    <Diagram
      id={id}
      height={380}
      title="Left: five separate stacks, each with its own site, API, database, and Stripe setup, so every fix ships five times. Right: five venues on one shared engine with per-venue configuration, so every fix ships once."
    >
      <Label x={160} y={24} tone="fg" size={16} weight={600}>
        Five stacks
      </Label>
      {VENUES.map((venue, i) => (
        <Box
          key={venue}
          x={20}
          y={42 + i * 58}
          w={280}
          h={46}
          title={venue}
          sub="site · API · database · Stripe"
          size="sm"
          tone="muted"
        />
      ))}
      <Label x={160} y={350} tone="warn" size={14} weight={600}>
        Every fix ships five times
      </Label>

      <Label x={480} y={24} tone="fg" size={16} weight={600}>
        One engine
      </Label>
      {["A", "B", "C", "D", "E"].map((letter, i) => {
        const x = 340 + i * (chipW + chipGap);
        return (
          <g key={letter}>
            <Box x={x} y={42} w={chipW} h={40} title={letter} size="sm" />
            <Arrow diagram={id} d={`M${x + chipW / 2} 82 V128`} tone="accent" />
          </g>
        );
      })}
      <Box x={340} y={134} w={280} h={86} title="Shared engine" sub="availability · checkout · reporting" tone="accent" />
      <Arrow diagram={id} d="M480 220 V262" dashed />
      <Box x={340} y={268} w={280} h={56} title="Per-venue config" sub="brand · catalog · operations" size="sm" />
      <Label x={480} y={350} tone="accent" size={14} weight={600}>
        Every fix ships once
      </Label>
    </Diagram>
  );
}

export function CheckoutInstruments() {
  const id = "checkout-instruments";
  const inputs = [
    { title: "Session price", sub: "track time, experience, event" },
    { title: "Promo code", sub: "discount rules" },
    { title: "Gift certificate", sub: "prepaid balance" },
    { title: "Account credit", sub: "refunds, goodwill" },
  ];
  return (
    <Diagram
      id={id}
      height={300}
      title="Simplified checkout: the session price, promo codes, gift certificates, and account credit all resolve to one amount due, which is charged to a stored or new card through Stripe."
    >
      {inputs.map((input, i) => (
        <g key={input.title}>
          <Box x={20} y={20 + i * 72} w={250} h={56} title={input.title} sub={input.sub} size="sm" />
          <Arrow diagram={id} d={`M270 ${48 + i * 72} C 310 ${48 + i * 72}, 300 158, 334 158`} />
        </g>
      ))}
      <Box x={340} y={118} w={130} h={80} title="Amount due" sub="one total" tone="accent" />
      <Arrow diagram={id} d="M470 158 H514" tone="accent" />
      <Box x={520} y={108} w={100} h={100} title="Stripe" sub="stored card" size="sm" />
      <Label x={570} y={232} size={13}>
        or a new card
      </Label>
    </Diagram>
  );
}

export function ConfigOrFork() {
  const id = "config-or-fork";
  return (
    <Diagram
      id={id}
      height={386}
      title="Decision flow for a venue-specific request: if it can be configuration, add a setting. If not, and other venues would use it, build it as a feature that is off by default. Otherwise push back or isolate it as an extension, never a fork."
    >
      <Box x={170} y={16} w={300} h={50} title="A venue asks for a change" size="sm" />
      <Arrow diagram={id} d="M320 66 V100" />
      <Box x={170} y={106} w={300} h={56} title="Can it be configuration?" sub="copy, pricing, rules, branding" size="sm" tone="accent" />
      <Arrow diagram={id} d="M470 134 H514" tone="accent" />
      <Label x={492} y={124} size={13} tone="accent">
        yes
      </Label>
      <Box x={520} y={106} w={100} h={56} title="Add a" sub="setting" size="sm" />
      <Arrow diagram={id} d="M320 162 V202" />
      <Label x={334} y={188} size={13} anchor="start">
        no
      </Label>
      <Box x={170} y={208} w={300} h={56} title="Would other venues use it?" size="sm" tone="accent" />
      <Arrow diagram={id} d="M470 236 H514" tone="accent" />
      <Label x={492} y={226} size={13} tone="accent">
        yes
      </Label>
      <Box x={520} y={208} w={100} h={56} title="Feature," sub="off by default" size="sm" />
      <Arrow diagram={id} d="M320 264 V304" tone="warn" />
      <Label x={334} y={290} size={13} anchor="start">
        no
      </Label>
      <Box x={120} y={310} w={400} h={60} title="Push back, or isolate it as an extension" sub="never a branch in the shared code" size="sm" tone="warn" />
    </Diagram>
  );
}
