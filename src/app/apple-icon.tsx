import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same mark as icon.svg, drawn full-bleed because iOS applies its own rounded mask.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <svg width="180" height="180" viewBox="0 0 64 64">
        <rect width="64" height="64" fill="#002b36" />
        <path d="M25.6 12.5h6L44.4 47h-7.8z" fill="#fdf6e3" />
        <path d="M25.6 12.5l2.7 4.1L18.6 47h-3.8z" fill="#fdf6e3" />
        <path d="M19.4 33.4h14.8v2.8H18.5z" fill="#fdf6e3" />
        <path d="M10.5 47h11.8v2.6H10.5zM33.2 47h14.3v2.6H33.2z" fill="#fdf6e3" />
        <circle cx="53" cy="46.2" r="4" fill="#2aa198" />
      </svg>
    ),
    { ...size },
  );
}
