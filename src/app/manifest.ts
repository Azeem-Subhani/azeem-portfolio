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
    background_color: "#FDF6E3",
    theme_color: "#002B36",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
