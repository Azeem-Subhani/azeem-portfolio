// Diagrams for "Serverless database connection limits".
import { Arrow, Box, Diagram, Label } from "@/components/blog/diagrams/kit";

export function ServerlessSessionMultiplication() {
  const id = "serverless-session-multiplication";
  return (
    <Diagram
      id={id}
      height={150}
      title="Direct connections from a serverless fleet. 200 concurrent function instances each hold a pool of up to 5 connections, so the fleet asks for 1,000 sessions. Postgres accepts 100 by default, so the request is ten times the limit and new connections are refused."
    >
      <Box x={12} y={24} w={168} h={70} size="sm" title="200 instances" sub="5 connections each" />
      <Arrow diagram={id} d="M180 59 H232" />
      <Box x={234} y={24} w={172} h={70} size="sm" tone="warn" title="1,000 sessions" sub="200 × 5 asked for" />
      <Arrow diagram={id} d="M406 59 H458" tone="warn" />
      <Box x={460} y={24} w={168} h={70} size="sm" title="Database" sub="default limit 100" />
      <Label x={320} y={128} tone="warn" size={13}>ten times the default limit, so new connections are refused</Label>
    </Diagram>
  );
}

export function ServerlessPoolerFunnel() {
  const id = "serverless-pooler-funnel";
  return (
    <Diagram
      id={id}
      height={150}
      title="Through a pooler in transaction mode. Many function instances open cheap client connections, up to 2,000 in the example configuration, to the pooler. The pooler multiplexes them onto 20 real sessions to the database, so the database sees the pooler's pool and not the fleet."
    >
      <Box x={12} y={30} w={134} h={70} size="sm" title="Functions" sub="many instances" />
      <Arrow diagram={id} d="M146 65 H254" />
      <Label x={200} y={55} size={13}>up to 2,000</Label>
      <Box x={256} y={30} w={150} h={70} size="sm" tone="accent" title="Pooler" sub="transaction mode" />
      <Arrow diagram={id} d="M406 65 H514" tone="accent" />
      <Label x={460} y={55} size={13} tone="accent">20 sessions</Label>
      <Box x={516} y={30} w={112} h={70} size="sm" title="Database" />
      <Label x={320} y={134} tone="accent" size={13}>the database sees 20 pooled sessions, not the fleet</Label>
    </Diagram>
  );
}
