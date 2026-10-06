import Link from "next/link";

import { PostCover } from "@/components/blog/post-cover";
import { blogPath, formatPostDate, listedPosts, type BlogPost } from "@/content/blog";

// Other posts, ranked by shared tags, then newest. Uses the same listing rule as
// the index, so a published page never links to a draft.
export function RelatedPosts({ post, limit = 3 }: { post: BlogPost; limit?: number }) {
  const shared = (other: BlogPost) => other.tags.filter((tag) => post.tags.includes(tag)).length;
  const related = listedPosts()
    .filter((other) => other.slug !== post.slug)
    .sort((a, b) => shared(b) - shared(a) || b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);

  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-posts" className="mt-20">
      <h2 id="related-posts" className="font-display text-3xl font-normal tracking-tight">
        Keep reading
      </h2>
      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((other) => (
          <li key={other.slug}>
            <Link href={blogPath(other.slug)} className="group block">
              <PostCover post={other} size="sm" />
              <p className="mt-3 text-xs text-muted-foreground">
                <time dateTime={other.publishedAt}>{formatPostDate(other.publishedAt)}</time>
                {other.draft ? " · Draft" : null}
              </p>
              <h3 className="mt-1 font-display text-xl leading-snug group-hover:underline group-hover:underline-offset-4">
                {other.title}
              </h3>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
