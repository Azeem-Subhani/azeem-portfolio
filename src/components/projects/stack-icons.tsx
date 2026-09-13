import type { ReactNode } from "react";
import type { StackIconId } from "@/types/content";

type StackIconProps = {
  id: StackIconId;
  label: string;
};

function monogram(label: string) {
  const parts = label.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function Mark({
  children,
  color,
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="project-workflow-mark"
      style={color ? { color } : undefined}
    >
      {children}
    </svg>
  );
}

export function StackIcon({ id, label }: StackIconProps) {
  switch (id) {
    case "react":
      return (
        <Mark color="#61dafb">
          <circle cx="12" cy="12" r="2.2" fill="currentColor" />
          <g fill="none" stroke="currentColor" strokeWidth="1.4">
            <ellipse cx="12" cy="12" rx="10" ry="4.2" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
          </g>
        </Mark>
      );
    case "nextjs":
      return (
        <Mark>
          <circle cx="12" cy="12" r="10" fill="currentColor" />
          <path
            fill="var(--surface-elevated)"
            d="M10.2 7.6h1.7l5.3 8.2c.5-.2.9-.4 1.3-.7V7.6h1.6v9.8h-1.6l-5.4-8.4c-.4.2-.9.5-1.3.8v7.6H10.2z"
          />
        </Mark>
      );
    case "typescript":
      return (
        <Mark color="#3178c6">
          <rect width="24" height="24" rx="3" fill="currentColor" />
          <path
            fill="#fff"
            d="M7.4 12.2h4.1v1.2H10v5.1H8.6v-5.1H7.4zm7.2 1.3c.4-.3.9-.5 1.6-.5.7 0 1.2.2 1.6.5.3.3.5.8.5 1.4v2.2c0 .2 0 .4.1.6h-1.4c0-.1 0-.3-.1-.5-.2.3-.6.6-1.2.6-.6 0-1.1-.4-1.1-1 0-.7.6-1 1.4-1.2l.8-.2v-.3c0-.3-.2-.5-.6-.5-.4 0-.6.2-.7.5l-1.3-.5c.3-.8 1.1-1.1 2-1.1zm.9 3.2c.3 0 .5-.1.6-.3v-.6l-.6.2c-.3.1-.4.2-.4.4s.2.3.4.3z"
          />
        </Mark>
      );
    case "django":
      return (
        <Mark color="#092e20">
          <rect width="24" height="24" rx="3" fill="currentColor" />
          <text
            x="12"
            y="16.2"
            textAnchor="middle"
            fill="#fff"
            fontSize="9"
            fontWeight="700"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            dj
          </text>
        </Mark>
      );
    case "stripe":
      return (
        <Mark color="#635bff">
          <rect width="24" height="24" rx="3" fill="currentColor" />
          <path
            fill="#fff"
            d="M10.1 10.6c0-.6.5-1 1.4-1 1.3 0 2.9.4 4.1 1.1V7.6C14.4 7.1 13 6.8 11.5 6.8c-2.9 0-4.8 1.5-4.8 4 0 3.1 4.3 3.7 4.3 5.6 0 .7-.6 1.1-1.6 1.1-1.4 0-3.2-.6-4.6-1.4v3.2c1.4.6 3 1 4.7 1 3 0 5.1-1.5 5.1-4.1-.1-3.3-4.5-3.8-4.5-5.6z"
          />
        </Mark>
      );
    case "postgresql":
      return (
        <Mark color="#336791">
          <rect width="24" height="24" rx="3" fill="currentColor" />
          <text
            x="12"
            y="16.2"
            textAnchor="middle"
            fill="#fff"
            fontSize="9"
            fontWeight="700"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            PG
          </text>
        </Mark>
      );
    case "angular":
      return (
        <Mark color="#dd0031">
          <path fill="currentColor" d="M12 2.2 3.6 5.2l1.3 11.2L12 21.8l7.1-5.4 1.3-11.2z" />
          <path fill="#fff" d="m12 5.4 4.4 10.2h-1.8l-.9-2.2H10.3l-.9 2.2H7.6L12 5.4zm0 3.2-1.4 3.4h2.8z" />
        </Mark>
      );
    case "ionic":
      return (
        <Mark color="#3880ff">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="4.2" fill="currentColor" />
        </Mark>
      );
    case "nestjs":
      return (
        <Mark color="#e0234e">
          <rect width="24" height="24" rx="3" fill="currentColor" />
          <text
            x="12"
            y="16.2"
            textAnchor="middle"
            fill="#fff"
            fontSize="11"
            fontWeight="700"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            N
          </text>
        </Mark>
      );
    case "nodejs":
      return (
        <Mark color="#5fa04e">
          <path
            fill="currentColor"
            d="M12 2.2 3.8 6.9v10.2L12 21.8l8.2-4.7V6.9zm5.4 13.3-5.4 3.1-5.4-3.1V8.5L12 5.4l5.4 3.1z"
          />
        </Mark>
      );
    case "express":
      return (
        <Mark>
          <text
            x="12"
            y="16"
            textAnchor="middle"
            fill="currentColor"
            fontSize="9"
            fontWeight="700"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            ex
          </text>
        </Mark>
      );
    case "mongodb":
      return (
        <Mark color="#47a248">
          <path
            fill="currentColor"
            d="M12.4 2.2s.3 2.4-.6 4.1c-.8 1.6-2.2 2.5-2.4 4.3-.2 1.6.6 3.1 1.8 4 .3.2.5.4.5.7v.3c0 .3-.1.6-.4.8-.2.1-.3.3-.3.5 0 .2.1.4.3.5.1.1.2.3.2.5 0 .3-.2.5-.5.6-.6.2-1.3.2-1.9 0 1.6 1.1 3.6 1.5 5.5.9 1.6-.5 2.8-1.8 3.2-3.5.4-1.6 0-3.2-.9-4.6-1.1-1.6-2.2-3.1-2.1-5.1 0-1.2.4-2.4 1.2-3.4-.8.1-1.5.5-2.1 1.1-.3-.8-.6-1.6-.5-2.5z"
          />
        </Mark>
      );
    case "firebase":
      return (
        <Mark>
          <path fill="#ffa000" d="m5.4 17.8 5.3-10.3 2.2 4.2z" />
          <path fill="#f57c00" d="m5.4 17.8 7.5-6.1 2.4 2.1z" />
          <path fill="#ffca28" d="m5.4 17.8 12.2.1L12.9 4.4 10.7 8.6z" />
        </Mark>
      );
    case "socketio":
      return (
        <Mark>
          <circle cx="12" cy="12" r="10" fill="currentColor" />
          <path fill="var(--surface-elevated)" d="M8.2 14.8 14.6 6v3.2H16l-6.4 8.8V14.8z" />
        </Mark>
      );
    case "aws":
      return (
        <Mark color="#232f3e">
          <rect width="24" height="24" rx="3" fill="currentColor" />
          <text
            x="12"
            y="15.4"
            textAnchor="middle"
            fill="#ff9900"
            fontSize="8"
            fontWeight="700"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            aws
          </text>
        </Mark>
      );
    case "redux":
      return (
        <Mark color="#764abc">
          <path
            fill="currentColor"
            d="M16.6 15.2c.5-1 .7-2 .6-3.1-.2-1.7-1.1-3.2-2.5-4.2.2-.4.3-.8.3-1.2 0-1.6-1.3-2.9-2.9-2.9S8.6 5.1 8.6 6.7c0 .3.1.6.2.9C7.1 8.6 6 10.3 5.8 12.2c-.2 1.6.2 3.2 1.1 4.5-.3.3-.4.7-.4 1.1 0 1.6 1.3 2.9 2.9 2.9 1.3 0 2.5-.9 2.8-2.1 1.1.3 2.2.3 3.3 0 .4 1.2 1.5 2.1 2.8 2.1 1.6 0 2.9-1.3 2.9-2.9-.1-1.1-.7-2.1-1.7-2.6z"
          />
        </Mark>
      );
    case "graphql":
      return (
        <Mark color="#e10098">
          <path
            fill="currentColor"
            d="m12 3.2 7.3 4.2v9.2L12 20.8 4.7 16.6V7.4zm0 1.8L6.4 8.3v7.4L12 18.9l5.6-3.2V8.3z"
          />
          <circle cx="12" cy="4.4" r="1.4" fill="currentColor" />
          <circle cx="18.7" cy="8.2" r="1.4" fill="currentColor" />
          <circle cx="18.7" cy="15.8" r="1.4" fill="currentColor" />
          <circle cx="12" cy="19.6" r="1.4" fill="currentColor" />
          <circle cx="5.3" cy="15.8" r="1.4" fill="currentColor" />
          <circle cx="5.3" cy="8.2" r="1.4" fill="currentColor" />
        </Mark>
      );
    case "text":
      return (
        <span className="project-workflow-mono" aria-hidden="true">
          {monogram(label)}
        </span>
      );
  }
}
