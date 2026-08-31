import { ImageResponse } from "next/og";

import { profile } from "@/content/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0b0f17",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#6e8bff",
          }}
        >
          {profile.location}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 72,
            fontWeight: 600,
            lineHeight: 1.05,
            maxWidth: 980,
          }}
        >
          {profile.title}
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 30,
            color: "#9ca7b8",
          }}
        >
          {profile.name}
        </div>
      </div>
    ),
    { ...size },
  );
}
