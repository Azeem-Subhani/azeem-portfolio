import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";

import { getPost, posts } from "@/content/blog";
import { profile } from "@/content/profile";

// Same card as the project share images, with the author in the eyebrow.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

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
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#2AA198",
          }}
        >
          {`${profile.name} · Blog`}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 64,
            fontWeight: 600,
            lineHeight: 1.05,
            maxWidth: 980,
          }}
        >
          {post.title}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 26,
            color: "#93A1A1",
            maxWidth: 900,
          }}
        >
          {post.description}
        </div>
      </div>
    ),
    { ...size },
  );
}
