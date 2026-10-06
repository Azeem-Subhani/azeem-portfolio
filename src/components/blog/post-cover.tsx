import Image from "next/image";

import type { BlogPost } from "@/content/blog";
import { cn } from "@/lib/utils";

// A post's cover image when it has one; otherwise generated art (a gradient and
// grid seeded from the slug) so each post still gets a stable, distinct cover.

const PALETTES = [
  ["#002B36", "#2AA198", "#268BD2"],
  ["#073642", "#B58900", "#CB4B16"],
  ["#002B36", "#6C71C4", "#D33682"],
  ["#073642", "#859900", "#2AA198"],
] as const;

function hash(text: string) {
  let h = 2166136261;
  for (const char of text) h = Math.imul(h ^ char.charCodeAt(0), 16777619);
  return h >>> 0;
}

export function PostCover({
  post,
  size = "lg",
  priority = false,
}: {
  post: BlogPost;
  // sm: list thumbnail; md: index card (overlay shows the lead topic only; the card lists the rest); lg: post header.
  size?: "sm" | "md" | "lg";
  priority?: boolean;
}) {
  if (post.cover) {
    return (
      <div
        className={cn(
          "overflow-hidden bg-[#002B36]",
          // md sits flush at the top of a card, which draws the frame.
          size === "md"
            ? "border-b border-border"
            : "rounded-lg border border-border",
        )}
      >
        <Image
          src={post.cover.src}
          // The card's title already names the post, so its thumbnail is decorative.
          alt={size === "lg" ? post.cover.alt : ""}
          width={post.cover.width}
          height={post.cover.height}
          priority={priority}
          quality={90}
          sizes={
            size === "lg"
              ? "(min-width: 1024px) 896px, 100vw"
              : size === "md"
                ? "(min-width: 1280px) 440px, (min-width: 768px) 50vw, 100vw"
                : "(min-width: 640px) 224px, 100vw"
          }
          className={cn(
            "h-auto w-full",
            size !== "lg" && "aspect-[16/9] object-cover object-left-top",
          )}
        />
      </div>
    );
  }

  const seed = hash(post.slug);
  const [base, a, b] = PALETTES[seed % PALETTES.length];
  const x = 15 + (seed % 70);
  const y = 10 + ((seed >> 8) % 60);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative isolate overflow-hidden",
        size === "md"
          ? "border-b border-border"
          : "rounded-lg border border-border",
        size === "lg" ? "aspect-[3/1]" : "aspect-[16/9]",
      )}
      style={{
        background: `radial-gradient(70% 90% at ${x}% ${y}%, ${a}cc, transparent 60%), radial-gradient(60% 80% at ${100 - x}% ${100 - y / 2}%, ${b}99, transparent 65%), ${base}`,
      }}
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(#EEE8D522 1px, transparent 1px), linear-gradient(90deg, #EEE8D522 1px, transparent 1px)",
          backgroundSize: size === "lg" ? "48px 48px" : "28px 28px",
        }}
      />
      <div
        className={cn(
          "absolute flex flex-wrap gap-2",
          size === "lg" ? "bottom-6 left-6" : size === "md" ? "bottom-5 left-5" : "bottom-3 left-3",
        )}
      >
        {post.tags
          .slice(0, size === "lg" ? 3 : size === "md" ? 1 : 2)
          .map((tag) => (
            <span
              key={tag}
              className={cn(
                "rounded-full border border-[#EEE8D533] bg-[#002B36]/60 font-medium uppercase tracking-[0.14em] text-[#EEE8D5] backdrop-blur-sm",
                size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs",
              )}
            >
              {tag}
            </span>
          ))}
      </div>
    </div>
  );
}
