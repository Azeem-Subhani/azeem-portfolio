import type { MetadataRoute } from "next";

import { profile } from "@/content/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} | Full-Stack & AI Application Engineer`,
    short_name: profile.name,
    description:
      "Senior full-stack engineer building SaaS, payments, booking, real-time, and AI-enabled applications.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0f17",
    theme_color: "#0b0f17",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
