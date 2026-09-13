import type { MetadataRoute } from "next";

import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: profile.siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${profile.siteUrl}/projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${profile.siteUrl}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${profile.siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${profile.siteUrl}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${profile.siteUrl}/projects/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...routes, ...projectRoutes];
}
