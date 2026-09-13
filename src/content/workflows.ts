import type { ProjectWorkflow } from "@/types/content";

export const workflows: Record<string, ProjectWorkflow> = {
  "track-hero": {
    description:
      "Stack constellation for Track Hero: Next.js at the center, with React, TypeScript, Django, Stripe, PostgreSQL, and five white-label venues in orbit.",
    hub: { id: "hub", label: "Next.js", icon: "nextjs" },
    orbit: [
      { id: "react", label: "React", icon: "react" },
      { id: "typescript", label: "TypeScript", icon: "typescript" },
      { id: "django", label: "Django", icon: "django" },
      { id: "stripe", label: "Stripe", icon: "stripe" },
      { id: "postgres", label: "PostgreSQL", icon: "postgresql" },
      { id: "venues", label: "5 venues", icon: "text" },
    ],
  },

  oxym: {
    description:
      "Stack constellation for Oxym: NestJS at the center, with Angular, Ionic, Firebase, Stripe, Socket.IO, and Node.js in orbit.",
    hub: { id: "hub", label: "NestJS", icon: "nestjs" },
    orbit: [
      { id: "angular", label: "Angular", icon: "angular" },
      { id: "ionic", label: "Ionic", icon: "ionic" },
      { id: "firebase", label: "Firebase", icon: "firebase" },
      { id: "stripe", label: "Stripe", icon: "stripe" },
      { id: "socket", label: "Socket.IO", icon: "socketio" },
      { id: "node", label: "Node.js", icon: "nodejs" },
    ],
  },

  "memorial-planning": {
    description:
      "Stack constellation for the memorial planning portal: Next.js at the center, with AWS, AppSync, Cognito, DynamoDB, and Trust Commerce in orbit.",
    hub: { id: "hub", label: "Next.js", icon: "nextjs" },
    orbit: [
      { id: "aws", label: "AWS", icon: "aws" },
      { id: "appsync", label: "AppSync", icon: "graphql" },
      { id: "cognito", label: "Cognito", icon: "text" },
      { id: "dynamo", label: "DynamoDB", icon: "text" },
      { id: "trust", label: "Trust Commerce", icon: "text" },
    ],
  },

  "gaming-global": {
    description:
      "Stack constellation for Gaming Global: Node.js at the center, with React, Express, MongoDB, and Socket.IO in orbit.",
    hub: { id: "hub", label: "Node.js", icon: "nodejs" },
    orbit: [
      { id: "react", label: "React", icon: "react" },
      { id: "express", label: "Express", icon: "express" },
      { id: "mongo", label: "MongoDB", icon: "mongodb" },
      { id: "socket", label: "Socket.IO", icon: "socketio" },
      { id: "js", label: "JavaScript", icon: "text" },
    ],
  },

  "woody-shop": {
    description:
      "Stack constellation for Woody Shop: React at the center, with Redux, Firebase, Stripe, and local storage in orbit.",
    hub: { id: "hub", label: "React", icon: "react" },
    orbit: [
      { id: "redux", label: "Redux", icon: "redux" },
      { id: "firebase", label: "Firebase", icon: "firebase" },
      { id: "stripe", label: "Stripe", icon: "stripe" },
      { id: "js", label: "JavaScript", icon: "text" },
      { id: "storage", label: "Local storage", icon: "text" },
    ],
  },

  "real-time-chat": {
    description:
      "Stack constellation for the real-time chat app: Node.js at the center, with Handlebars, WebSockets, JavaScript, Moment.js, and chat clients in orbit.",
    hub: { id: "hub", label: "Node.js", icon: "nodejs" },
    orbit: [
      { id: "handlebars", label: "Handlebars", icon: "text" },
      { id: "ws", label: "WebSockets", icon: "text" },
      { id: "js", label: "JavaScript", icon: "text" },
      { id: "moment", label: "Moment.js", icon: "text" },
      { id: "clients", label: "Chat clients", icon: "text" },
    ],
  },

  "task-manager": {
    description:
      "Stack constellation for Task Manager: Express at the center, with Node.js, MongoDB, JWT, and SendGrid in orbit.",
    hub: { id: "hub", label: "Express", icon: "express" },
    orbit: [
      { id: "node", label: "Node.js", icon: "nodejs" },
      { id: "mongo", label: "MongoDB", icon: "mongodb" },
      { id: "jwt", label: "JWT", icon: "text" },
      { id: "sendgrid", label: "SendGrid", icon: "text" },
      { id: "express-api", label: "REST API", icon: "text" },
    ],
  },

  "smart-living": {
    description:
      "Stack constellation for Smart Living: Angular at the center, with AWS, Firebase, Stripe, and PostgreSQL in orbit.",
    hub: { id: "hub", label: "Angular", icon: "angular" },
    orbit: [
      { id: "aws", label: "AWS SAM", icon: "aws" },
      { id: "firebase", label: "Firebase", icon: "firebase" },
      { id: "stripe", label: "Stripe", icon: "stripe" },
      { id: "postgres", label: "PostgreSQL", icon: "postgresql" },
      { id: "calling", label: "A/V calling", icon: "text" },
    ],
  },
};

export function getWorkflow(slug: string): ProjectWorkflow | undefined {
  return workflows[slug];
}
