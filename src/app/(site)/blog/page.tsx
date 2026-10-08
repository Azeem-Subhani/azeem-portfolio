import type { Metadata } from "next";
import { BlogBrowser } from "@/components/blog/blog-browser";
import { RisingWords } from "@/components/blog/rising-words";
import { hasPublishedPosts, listedPosts } from "@/content/blog";
import { readingMinutes, readPostSource } from "@/lib/blog-source";
import { profile } from "@/content/profile";

const description = `Engineering notes from ${profile.name} on SaaS, payments, booking, and AI application work: architecture, trade-offs, and what shipped.`;

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  // An empty index is thin content; keep it out of search until a post is live.
  ...(hasPublishedPosts ? {} : { robots: { index: false, follow: true } }),
  openGraph: {
    type: "website",
    url: "/blog",
    title: `Blog | ${profile.name}`,
    description,
    siteName: profile.name,
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${profile.name}`,
    description,
    images: ["/opengraph-image"],
  },
};

export default function BlogIndexPage() {
  // Reading time needs the MDX source (node:fs), so it is computed here and handed to the client.
  const listed = listedPosts().map((post) => ({ ...post, minutes: readingMinutes(readPostSource(post.slug)) }));

  return (
    <section className="blog-hero mx-auto max-w-7xl px-6 pb-24 pt-32 sm:pt-40">
      <header>
        <p data-service-kicker className="label-eyebrow text-accent-readable">
          Blog
        </p>
        <h1 className="blog-hero-title mt-5 font-display text-[clamp(3rem,6vw,5rem)] font-normal leading-[0.95] tracking-[-0.03em]">
          <RisingWords text="Engineering notes" mask />
        </h1>
        <p className="blog-hero-lede mt-6 max-w-[60ch] text-base leading-[1.7] text-muted-foreground">
          <RisingWords text={description} />
        </p>
      </header>

      {listed.length === 0 ? (
        <p data-blog-empty className="mt-14 text-muted-foreground">
          The first posts are on their way.
        </p>
      ) : (
        <BlogBrowser posts={listed} />
      )}
    </section>
  );
}
