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
          background: "#002B36",
          color: "#EEE8D5",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#2AA198",
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
            color: "#93A1A1",
          }}
        >
          {profile.name}
        </div>
      </div>
    ),
    { ...size },
  );
}
