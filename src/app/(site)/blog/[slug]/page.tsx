import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AuthorCard } from "@/components/blog/author-card";
import { BlogPostMotion } from "@/components/blog/blog-post-motion";
import { PostCover } from "@/components/blog/post-cover";
import { PostToc } from "@/components/blog/post-toc";
import { RelatedPosts } from "@/components/blog/related-posts";
import { RisingWords } from "@/components/blog/rising-words";
import { blogPath, formatPostDate, getPost, posts } from "@/content/blog";
import { profile } from "@/content/profile";
import { getProjectBySlug } from "@/content/projects";
import { getService, servicePath } from "@/content/services";
import { extractHeadings, readingMinutes, readPostSource } from "@/lib/blog-source";

import "@/components/blog/blog.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = blogPath(post.slug);
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    // Drafts stay reachable for review but out of search results.
    ...(post.draft ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      siteName: profile.name,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [profile.siteUrl],
      tags: post.tags,
      // og:image and twitter:image come from ./opengraph-image.tsx. Its URL carries a
      // build hash, so a hand-written "/opengraph-image" path here would 404.
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Body } = await import(`@/content/blog/${post.slug}.mdx`);
  const source = readPostSource(post.slug);
  const minutes = readingMinutes(source);
  const headings = extractHeadings(source);

  const related = [
    ...post.relatedProjects.flatMap((projectSlug) => {
      const project = getProjectBySlug(projectSlug);
      return project
        ? [{ href: `/projects/${project.slug}`, kind: "Case study", label: project.title }]
        : [];
    }),
    ...post.relatedServices.flatMap((serviceSlug) => {
      const service = getService(serviceSlug);
      return service
        ? [{ href: servicePath(service.slug), kind: "Service", label: service.label }]
        : [];
    }),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    url: `${profile.siteUrl}${blogPath(post.slug)}`,
    mainEntityOfPage: `${profile.siteUrl}${blogPath(post.slug)}`,
    keywords: post.tags.join(", "),
    timeRequired: `PT${minutes}M`,
    author: { "@type": "Person", name: profile.name, url: profile.siteUrl },
  };

  return (
    <BlogPostMotion>
    <article className="blog-post mx-auto max-w-6xl px-6 pb-24 pt-32 sm:pt-40">
      <script
        type="application/ld+json"
        // Escape "<" so post text can never close the script tag early.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <header className="blog-hero mx-auto max-w-3xl">
        <p data-service-kicker className="label-eyebrow text-accent-readable">
          <Link href="/blog" className="hover:text-foreground">
            Blog
          </Link>
          {post.draft ? " · Draft" : null}
        </p>
        <h1 className="blog-hero-title mt-5 font-display text-[clamp(2.75rem,6vw,4.5rem)] font-normal leading-[1] tracking-[-0.03em]">
          <RisingWords text={post.title} mask />
        </h1>
        <p className="blog-hero-lede mt-6 max-w-[60ch] text-lg leading-[1.6] text-muted-foreground">
          <RisingWords text={post.description} />
        </p>
        <p data-blog-meta className="mt-6 text-sm text-muted-foreground">
          {profile.name}
          {" · "}
          <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
          {post.updatedAt ? (
            <>
              {" · Updated "}
              <time dateTime={post.updatedAt}>{formatPostDate(post.updatedAt)}</time>
            </>
          ) : null}
          {` · ${minutes} min read`}
        </p>
      </header>

      <div data-blog-cover className="mx-auto mt-10 max-w-4xl">
        <PostCover post={post} priority />
      </div>

      {/* Text column, plus a sticky TOC beside it on wide screens. */}
      <div className="mx-auto mt-14 max-w-3xl xl:grid xl:max-w-none xl:grid-cols-[minmax(0,48rem)_14rem] xl:justify-center xl:gap-16">
        <div className="min-w-0">
          <div className="blog-prose max-w-[65ch] text-base leading-[1.7] text-muted-foreground">
            <Body />
          </div>

          {related.length > 0 ? (
            <aside data-blog-reveal aria-label="Related work" className="mt-20 border-t border-border pt-10">
              <h2 data-blog-reveal-title className="text-sm font-medium">Related work</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {related.map((item) => (
                  <li key={item.href} data-blog-reveal-item>
                    <Link
                      href={item.href}
                      className="flex flex-col rounded-md border border-border p-5 transition-colors hover:border-foreground/30"
                    >
                      <span className="text-xs text-muted-foreground">{item.kind}</span>
                      <span className="mt-1 font-display text-xl">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}

          <div data-blog-reveal>
            <AuthorCard />
          </div>
        </div>

        {headings.length > 1 ? (
          <div className="hidden xl:block">
            <div className="sticky top-32">
              <PostToc headings={headings} />
            </div>
          </div>
        ) : null}
      </div>

      <div className="mx-auto max-w-5xl">
        <RelatedPosts post={post} />
      </div>
    </article>
    </BlogPostMotion>
  );
}
