export function GamingGlobalMark({
  size = 26,
  strokeWidth = 1.4,
}: {
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      className="gg-mark"
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="26"
        height="26"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth={strokeWidth} />
      <path
        d="M14 0v7M14 21v7M0 14h7M21 14h7"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
