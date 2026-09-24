import { StackIcon } from "@/components/projects/stack-icons";
import type { StackIconId } from "@/types/content";

type ProjectStackProps = {
  items: string[];
};

type StackMark = {
  id: StackIconId;
  ink: string;
};

const MARKS: Record<string, StackMark> = {
  angular: { id: "angular", ink: "#dd0031" },
  ionic: { id: "ionic", ink: "#3880ff" },
  nestjs: { id: "nestjs", ink: "#e0234e" },
  firebase: { id: "firebase", ink: "#ffa000" },
  firestore: { id: "firestore", ink: "#ffca28" },
  socketio: { id: "socketio", ink: "#93a1a1" },
  stripe: { id: "stripe", ink: "#635bff" },
  stripeconnect: { id: "stripe", ink: "#635bff" },
  stripeapi: { id: "stripe", ink: "#635bff" },
  react: { id: "react", ink: "#61dafb" },
  nextjs: { id: "nextjs", ink: "#93a1a1" },
  typescript: { id: "typescript", ink: "#3178c6" },
  // Django's mark is #44b78b; its near-black brand green turned the tile muddy.
  django: { id: "django", ink: "#44b78b" },
  postgresql: { id: "postgresql", ink: "#336791" },
  nodejs: { id: "nodejs", ink: "#5fa04e" },
  express: { id: "express", ink: "#93a1a1" },
  expressjs: { id: "express", ink: "#93a1a1" },
  mongodb: { id: "mongodb", ink: "#47a248" },
  aws: { id: "aws", ink: "#ff9900" },
  awsamplify: { id: "aws", ink: "#ff9900" },
  awssam: { id: "aws", ink: "#ff9900" },
  appsync: { id: "graphql", ink: "#e10098" },
  redux: { id: "redux", ink: "#764abc" },
  graphql: { id: "graphql", ink: "#e10098" },
  javascript: { id: "javascript", ink: "#f7df1e" },
  jwt: { id: "jwt", ink: "#d63aff" },
  websockets: { id: "socketio", ink: "#93a1a1" },
  cognito: { id: "aws", ink: "#ff9900" },
  lambda: { id: "aws", ink: "#ff9900" },
  dynamodb: { id: "aws", ink: "#ff9900" },
  trustcommerce: { id: "text", ink: "var(--accent)" },
  handlebars: { id: "text", ink: "#f0772b" },
  momentjs: { id: "text", ink: "#118c4e" },
  sendgrid: { id: "text", ink: "#1a82e2" },
};

function markFor(label: string): StackMark {
  const key = label.toLowerCase().replace(/[^a-z0-9]/g, "");
  return MARKS[key] ?? { id: "text", ink: "var(--accent)" };
}

export function ProjectStack({ items }: ProjectStackProps) {
  return (
    <ul data-project-stack="" className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((tech) => {
        const mark = markFor(tech);
        return (
          <li
            key={tech}
            className="flex items-center gap-3 rounded-2xl border px-3 py-2.5"
            style={{
              borderColor: `color-mix(in srgb, ${mark.ink} 34%, var(--border))`,
              background: `color-mix(in srgb, ${mark.ink} 12%, var(--surface))`,
            }}
          >
            <span
              className="grid size-11 shrink-0 place-items-center rounded-xl"
              style={{
                background: `color-mix(in srgb, ${mark.ink} 18%, transparent)`,
              }}
            >
              <StackIcon id={mark.id} label={tech} />
            </span>
            <span className="font-mono text-sm text-foreground">{tech}</span>
          </li>
        );
      })}
    </ul>
  );
}
