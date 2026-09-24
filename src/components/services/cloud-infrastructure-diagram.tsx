"use client";

const stroke = "rgb(72 230 210 / 0.88)";
const strokeSoft = "rgb(72 230 210 / 0.52)";
const fillPanel = "rgb(6 32 34 / 0.82)";
const iconStroke = "rgb(56 214 194 / 0.92)";

function AwsLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className} fill="none">
      <path
        d="M8 12.5 16 9l8 3.5V19l-8 4.5L8 19z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M10.5 21.5c2.2 2.4 8.8 3 11.7-.2"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AzureLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className} fill="currentColor">
      <path d="M6.5 24.5 16 6.5l9.5 18H6.5zm3.2-3.2h12.6L16 10.8l-6.3 10.5z" />
    </svg>
  );
}

function GcpLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className} fill="none">
      <path
        d="M16 8.5 22.8 12.5v6L16 22.5 9.2 18.5v-6L16 8.5z"
        stroke="currentColor"
        strokeWidth="1.35"
      />
      <circle cx="16" cy="15.5" r="2.5" fill="currentColor" />
    </svg>
  );
}

function BrandAwsGlyph() {
  return (
    <g stroke={iconStroke} fill="none">
      <path d="M8 12.5 16 9l8 3.5V19l-8 4.5L8 19z" strokeWidth="1.4" />
      <path d="M10.5 21.5c2.2 2.4 8.8 3 11.7-.2" strokeWidth="1.45" strokeLinecap="round" />
    </g>
  );
}

function BrandAzureGlyph() {
  return (
    <path fill={iconStroke} d="M16 7 21.5 20H10.5L16 7zm0 2.8-3.2 8.4h6.4L16 9.8z" />
  );
}

function BrandGcpGlyph() {
  return (
    <g stroke={iconStroke} fill="none">
      <path d="M16 8.5 22.8 12.5v6L16 22.5 9.2 18.5v-6L16 8.5z" strokeWidth="1.35" />
      <circle cx="16" cy="15.5" r="2.5" fill={iconStroke} />
    </g>
  );
}

const tiles = [
  { x: 48, label: "Compute", kind: "compute" as const },
  { x: 148, label: "Databases", kind: "database" as const },
  { x: 248, label: "Security", kind: "security" as const },
  { x: 348, label: "Networking", kind: "network" as const },
];

function TileIcon({ kind }: { kind: (typeof tiles)[number]["kind"] }) {
  if (kind === "compute") {
    return (
      <g>
        <circle cx="12" cy="12" r="3" fill="none" stroke={iconStroke} strokeWidth="1.25" />
        <circle cx="12" cy="12" r="5.8" fill="none" stroke={iconStroke} strokeWidth="1.25" opacity="0.55" />
        <circle cx="12" cy="12" r="8.6" fill="none" stroke={iconStroke} strokeWidth="1.25" opacity="0.32" />
      </g>
    );
  }

  if (kind === "database") {
    return (
      <g>
        <ellipse cx="12" cy="7.2" rx="6.2" ry="2.2" fill="none" stroke={iconStroke} strokeWidth="1.25" />
        <path
          d="M5.8 7.2v9.6c0 1.2 2.8 2.2 6.2 2.2s6.2-1 6.2-2.2V7.2"
          fill="none"
          stroke={iconStroke}
          strokeWidth="1.25"
        />
        <path
          d="M5.8 12c0 1.2 2.8 2.2 6.2 2.2s6.2-1 6.2-2.2"
          fill="none"
          stroke={iconStroke}
          strokeWidth="1.25"
          opacity="0.45"
        />
      </g>
    );
  }

  if (kind === "security") {
    return (
      <path
        d="M12 5 17.8 7.2v5.2c0 3.6-2.4 5.9-5.8 7.1-3.4-1.2-5.8-3.5-5.8-7.1V7.2L12 5z"
        fill="none"
        stroke={iconStroke}
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    );
  }

  return (
    <g>
      <circle cx="12" cy="6.2" r="1.8" fill="none" stroke={iconStroke} strokeWidth="1.25" />
      <circle cx="6.4" cy="16.8" r="1.8" fill="none" stroke={iconStroke} strokeWidth="1.25" />
      <circle cx="17.6" cy="16.8" r="1.8" fill="none" stroke={iconStroke} strokeWidth="1.25" />
      <path
        d="M12 8v2.8M10.4 12.2 8 14.4M13.6 12.2l2.4 2.2"
        fill="none"
        stroke={iconStroke}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </g>
  );
}

export function CloudInfrastructureDiagram() {
  return (
    <div className="cloud-v2-diagram" aria-hidden>
      <svg viewBox="0 0 520 300" className="cloud-v2-diagram__svg" role="presentation">
        <defs>
          <radialGradient id="cloud-v2-halo" cx="50%" cy="40%" r="48%">
            <stop offset="0%" stopColor="rgb(56 214 194 / 0.28)" />
            <stop offset="55%" stopColor="rgb(56 214 194 / 0.06)" />
            <stop offset="100%" stopColor="rgb(56 214 194 / 0)" />
          </radialGradient>
          <linearGradient id="cloud-v2-edge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(120 245 224 / 0.95)" />
            <stop offset="100%" stopColor="rgb(42 161 152 / 0.45)" />
          </linearGradient>
          <filter id="cloud-v2-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>

        <ellipse
          cx="260"
          cy="96"
          rx="150"
          ry="78"
          fill="url(#cloud-v2-halo)"
          filter="url(#cloud-v2-blur)"
        />

        <path
          d="M124 128c0-28 22-52 50-52 8.5 0 16.5 2.2 23.5 6C216 58 238 44 264 44c36 0 65 29 65 65 0 2.8-.12 5.5-.48 8.2H388c17 0 30.8 13.8 30.8 30.8S405 178 388 178H134c-14 0-25-11-25-25v-2.5c0-22 18-40 40-40z"
          fill={fillPanel}
          stroke="url(#cloud-v2-edge)"
          strokeWidth="1.5"
        />

        <g transform="translate(176 82)">
          <g transform="translate(8 2)">
            <BrandAwsGlyph />
          </g>
          <text x="16" y="34" textAnchor="middle" className="cloud-v2-diagram__brand-label">
            AWS
          </text>
        </g>
        <g transform="translate(256 82)">
          <g transform="translate(8 2)">
            <BrandAzureGlyph />
          </g>
          <text x="16" y="34" textAnchor="middle" className="cloud-v2-diagram__brand-label">
            Azure
          </text>
        </g>
        <g transform="translate(336 82)">
          <g transform="translate(8 2)">
            <BrandGcpGlyph />
          </g>
          <text x="16" y="34" textAnchor="middle" className="cloud-v2-diagram__brand-label">
            GCP
          </text>
        </g>

        <g stroke={strokeSoft} strokeWidth="1.25" fill="none" strokeLinecap="round">
          <path d="M260 178 V208" />
          <path d="M260 208 H92 V238" />
          <path d="M260 208 H192 V238" />
          <path d="M260 208 H328 V238" />
          <path d="M260 208 H428 V238" />
        </g>

        {tiles.map(({ x, label, kind }) => (
          <g key={label} transform={`translate(${x} 205)`}>
            <rect
              width="88"
              height="58"
              rx="11"
              fill={fillPanel}
              stroke={stroke}
              strokeWidth="1.1"
            />
            <g transform="translate(32 12)">
              <TileIcon kind={kind} />
            </g>
            <text x="44" y="50" textAnchor="middle" className="cloud-v2-diagram__tile-text">
              {label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function CloudProviderRow() {
  const providers = [
    { Logo: AwsLogo, label: "AWS" },
    { Logo: AzureLogo, label: "Azure" },
    { Logo: GcpLogo, label: "GCP" },
  ] as const;

  return (
    <ul className="cloud-v2-providers" aria-label="Cloud platforms">
      {providers.map(({ Logo, label }) => (
        <li key={label}>
          <Logo className="cloud-v2-providers__mark" />
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
}
