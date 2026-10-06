import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

import { describe, expect, it, vi } from "vitest";

import { getPost, hasPublishedPosts, listedPosts, posts, publishedPosts } from "@/content/blog";
import { extractHeadings, readingMinutes, readPostSource } from "@/lib/blog-source";
import { slugify } from "@/lib/slug";
import { getProjectBySlug } from "@/content/projects";
import { getService } from "@/content/services";
import sitemap from "@/app/sitemap";

const bodiesDir = path.resolve(__dirname, "../../src/content/blog");

describe("blog content", () => {
  it("has exactly one MDX body per registered post", () => {
    const bodies = readdirSync(bodiesDir)
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""))
      .sort();
    expect(bodies).toEqual(posts.map((post) => post.slug).sort());
  });

  it("uses unique, URL-safe slugs", () => {
    const slugs = posts.map((post) => post.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(getPost(slug)?.slug).toBe(slug);
    }
  });

  it("keeps titles and descriptions within search snippet lengths", () => {
    for (const post of posts) {
      expect(post.title.length).toBeLessThanOrEqual(70);
      expect(post.description.length).toBeGreaterThanOrEqual(70);
      expect(post.description.length).toBeLessThanOrEqual(160);
    }
  });

  it("uses valid ISO dates and links only to real projects and services", () => {
    for (const post of posts) {
      expect(post.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(post.publishedAt))).toBe(false);
      if (post.updatedAt) expect(post.updatedAt >= post.publishedAt).toBe(true);
      for (const slug of post.relatedProjects) expect(getProjectBySlug(slug)).toBeDefined();
      for (const slug of post.relatedServices) expect(getService(slug)).toBeDefined();
    }
  });

  it("lists published posts in the sitemap and leaves drafts out", () => {
    const urls = sitemap().map((entry) => entry.url);
    for (const post of posts) {
      const listed = urls.some((url) => url.endsWith(`/blog/${post.slug}`));
      expect(listed).toBe(!post.draft);
    }
    expect(urls.some((url) => url.endsWith("/blog"))).toBe(hasPublishedPosts);
    expect(publishedPosts.every((post) => !post.draft)).toBe(true);
  });

  it("gives every post unique, plain-text h2 anchors for the TOC", () => {
    for (const post of posts) {
      const headings = extractHeadings(readPostSource(post.slug));
      const ids = headings.map((h) => h.id);
      expect(new Set(ids).size).toBe(ids.length);
      for (const heading of headings) {
        // Leftover Markdown would make the TOC text and the rendered id disagree.
        expect(heading.text).not.toMatch(/[`*_[\]]/);
        expect(heading.id).toBe(slugify(heading.text));
        expect(heading.id.length).toBeGreaterThan(0);
      }
      expect(readingMinutes(readPostSource(post.slug))).toBeGreaterThan(0);
    }
  });

  it("only references images that exist in public/", () => {
    for (const post of posts) {
      const srcs = [...readPostSource(post.slug).matchAll(/src="(\/[^"]+)"/g)].map(([, src]) => src);
      if (post.cover) srcs.push(post.cover.src);
      for (const src of srcs) {
        expect(existsSync(path.resolve(__dirname, "../../public", `.${src}`)), src).toBe(true);
      }
    }
  });

  it("hides the nav link in production until a post is published", async () => {
    // showBlogNav is fixed at module load, so re-import under a production NODE_ENV.
    vi.stubEnv("NODE_ENV", "production");
    vi.resetModules();
    try {
      const blog = await import("@/content/blog");
      expect(blog.showBlogNav).toBe(blog.hasPublishedPosts);
    } finally {
      vi.unstubAllEnvs();
      vi.resetModules();
    }
  });

  it("never lists drafts in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    try {
      expect(listedPosts().every((post) => !post.draft)).toBe(true);
    } finally {
      vi.unstubAllEnvs();
    }
  });
});
