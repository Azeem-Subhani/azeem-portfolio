import { Arrow, Box, Diagram, Label } from "@/components/blog/diagrams/kit";

// Diagrams for "Next.js product sites that search engines can actually read".
// Both describe this site's own App Router setup.

export function CrawlerView() {
  const id = "crawler-view";
  const head = ["<title> from metadata", "<link rel=canonical>", "og:* and twitter:* tags", "JSON-LD (BlogPosting)"];
  return (
    <Diagram
      id={id}
      height={420}
      title="At build time, Next.js renders each route to static HTML. The first response a crawler gets already contains the title, canonical link, Open Graph tags, JSON-LD, and the page content. The crawler finds routes through robots.txt and sitemap.xml, both generated from the same content files."
    >
      <Box x={20} y={20} w={250} h={64} title="src/content/*.ts" sub="projects, services, posts" size="sm" />
      <Arrow diagram={id} d="M145 84 V122" />
      <Box x={20} y={128} w={250} h={64} title="next build" sub="static HTML per route" tone="accent" />
      <Arrow diagram={id} d="M270 160 H330" tone="accent" />

      <rect x={336} y={20} width={284} height={272} rx={10} strokeWidth={2.25} className="fill-background stroke-accent" />
      <Label x={356} y={48} anchor="start" tone="fg" size={16} weight={600}>
        First HTML response
      </Label>
      <Label x={356} y={74} anchor="start" size={13}>
        {"<head>"}
      </Label>
      {head.map((line, i) => (
        <Label key={line} x={372} y={100 + i * 26} anchor="start" size={13} tone="fg">
          {line}
        </Label>
      ))}
      <Label x={356} y={210} anchor="start" size={13}>
        {"<body>"}
      </Label>
      <Label x={372} y={236} anchor="start" size={13} tone="fg">
        h1, prose, internal links
      </Label>
      <Label x={356} y={268} anchor="start" size={12}>
        no client JavaScript needed to read it
      </Label>

      <Arrow diagram={id} d="M145 192 V230" dashed />
      <Box x={20} y={236} w={250} h={56} title="sitemap.xml · robots.txt" sub="generated, drafts left out" size="sm" />

      <Arrow diagram={id} d="M478 292 V340" tone="accent" />
      <Arrow diagram={id} d="M145 292 V320 Q145 360 260 360 H350" dashed />
      <Box x={356} y={346} w={244} h={56} title="Crawler" sub="discovers, then reads the HTML" size="sm" />
    </Diagram>
  );
}

export function OgImageUrl() {
  const id = "og-image-url";
  return (
    <Diagram
      id={id}
      height={300}
      title="A hand-written og:image path of /blog/post/opengraph-image overrides the file-based image and returns 404, because Next.js serves the generated image at a hashed path such as /blog/post/opengraph-image-fx5gi7. Removing the hand-written path lets Next.js emit the hashed URL, which returns 200."
    >
      <Box x={150} y={16} w={340} h={56} title="opengraph-image.tsx" sub="next to page.tsx in the route folder" size="sm" tone="accent" />

      <Arrow diagram={id} d="M240 72 Q 160 100, 160 128" tone="warn" />
      <Arrow diagram={id} d="M400 72 Q 480 100, 480 128" tone="accent" />

      <Label x={160} y={154} tone="warn" size={14} weight={600}>
        Hand-written in metadata
      </Label>
      <Box x={20} y={166} w={280} h={64} title="…/opengraph-image" sub="the path you'd guess" size="sm" tone="warn" />
      <Label x={160} y={260} tone="warn" size={22} weight={700}>
        404
      </Label>
      <Label x={160} y={286} size={13}>
        overrides the file convention
      </Label>

      <Label x={480} y={154} tone="accent" size={14} weight={600}>
        Left to the file convention
      </Label>
      <Box x={340} y={166} w={280} h={64} title="…/opengraph-image-fx5gi7" sub="hashed at build time" size="sm" tone="accent" />
      <Label x={480} y={260} tone="accent" size={22} weight={700}>
        200
      </Label>
      <Label x={480} y={286} size={13}>
        og:image and twitter:image
      </Label>
    </Diagram>
  );
}
