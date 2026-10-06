import type { MetadataRoute } from "next";

import { blogPath, hasPublishedPosts, publishedPosts } from "@/content/blog";
import { industries, industryPath } from "@/content/industries";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: profile.siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${profile.siteUrl}/projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${profile.siteUrl}/why-me`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${profile.siteUrl}/process`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${profile.siteUrl}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${profile.siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${profile.siteUrl}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${profile.siteUrl}/services/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const industryRoutes: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${profile.siteUrl}${industryPath(industry.slug)}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${profile.siteUrl}/projects/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Drafts are noindex, so only published posts (and the index once it has any) are listed.
  const blogRoutes: MetadataRoute.Sitemap = hasPublishedPosts
    ? [
        {
          url: `${profile.siteUrl}/blog`,
          lastModified: publishedPosts[0].updatedAt ?? publishedPosts[0].publishedAt,
          changeFrequency: "weekly",
          priority: 0.6,
        },
        ...publishedPosts.map((post) => ({
          url: `${profile.siteUrl}${blogPath(post.slug)}`,
          lastModified: post.updatedAt ?? post.publishedAt,
          changeFrequency: "yearly" as const,
          priority: 0.6,
        })),
      ]
    : [];

  return [...routes, ...serviceRoutes, ...industryRoutes, ...projectRoutes, ...blogRoutes];
}
