import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";

import { getProjectBySlug, projects } from "@/content/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const title = project.title;
  const summary = project.summary;
  const stack = project.stack.join(" · ");

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
          {stack}
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
          {title}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 26,
            color: "#93A1A1",
            maxWidth: 900,
          }}
        >
          {summary}
        </div>
      </div>
    ),
    { ...size },
  );
}
