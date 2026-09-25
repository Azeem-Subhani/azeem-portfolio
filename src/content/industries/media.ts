import type { IndustryPageContent } from "@/types/content";

/*
 * Sources: projects.ts (Gaming Global, Track Hero), experience.ts (chat scale),
 * services/cloud.ts (CloudFront media delivery). Streaming and DRM have not shipped;
 * that solution is marked as approach (no link). Do not add figures.
 */
export const mediaIndustry: IndustryPageContent = {
  slug: "media",
  label: "Media & Entertainment",
  evidence: "shipped",
  tone: "magenta",
  heroVisual: "stream",
  layout: {
    hero: "centered",
    challenges: "cards",
    solutions: "tabs",
    stack: "rows",
    practices: "checklist",
  },
  metaTitle: "Media and entertainment engineering: live communities, events, and delivery",
  metaDescription:
    "Real-time chat and communities, event and experience booking, and media delivery at the edge, from an engineer who has run chat for 1,000+ concurrent conversations.",
  kicker: "Media & Entertainment",
  title: "the big moment,",
  titleAccent: "without the lag",
  lede: "Live chat, fan communities, event bookings, and media delivery built for the spike, when everyone shows up at once and nobody waits.",
  proof: [
    { value: "1,000+", label: "concurrent live conversations" },
    { value: "10K+", label: "concurrent users on real-time systems" },
    { value: "Sub-second", label: "message delivery" },
    { value: "5", label: "venues selling events and experiences" },
  ],
  challengesTitle: "What fails when the crowd arrives",
  challengesIntro:
    "Entertainment traffic is not steady. It is quiet, then everyone at once.",
  challenges: [
    {
      icon: "message",
      title: "Chat falls over at the big moment",
      copy: "The goal, the drop, the finale: the second everyone types is the second the chat server gives up.",
    },
    {
      icon: "globe",
      title: "Media served from origin",
      copy: "Every image and clip pulled from the app server turns a busy night into a big bill and a slow page.",
    },
    {
      icon: "users",
      title: "Communities nobody can moderate",
      copy: "Without admin tools, a growing community turns into a support queue.",
    },
    {
      icon: "trophy",
      title: "Tickets and experiences sell out badly",
      copy: "A release goes live and the booking flow double-sells or times out.",
    },
  ],
  solutionsTitle: "Four parts of a live product",
  solutionsIntro: "Pick a tab. Three have run in production; the fourth is how I would add streaming.",
  solutions: [
    {
      icon: "message",
      title: "Live chat and communities",
      copy: "Real-time chat, player stats, and an admin panel for moderation, in one app.",
      features: [
        "Socket.IO chat",
        "Presence and typing",
        "Player and fan stats",
        "Admin content management",
        "User moderation",
        "MERN stack",
      ],
      link: { kind: "shipped", label: "Gaming Global", href: "/projects/gaming-global" },
    },
    {
      icon: "trophy",
      title: "Events and experiences",
      copy: "Booking for experiences and events across branded venue sites, with the promotions that sell them.",
      features: [
        "Event scheduling",
        "Experience booking",
        "Gift certificates and credits",
        "Promo codes",
        "Stripe payments",
        "Five branded venue sites",
      ],
      link: { kind: "shipped", label: "Track Hero", href: "/projects/track-hero" },
    },
    {
      icon: "globe",
      title: "Media delivery at the edge",
      copy: "Images and static content served from the CDN, so a traffic spike does not reach origin for every asset.",
      features: [
        "S3 origin",
        "CloudFront caching",
        "Image optimization",
        "Cache invalidation on publish",
        "Origin shielding",
        "Cost that follows usage",
      ],
      link: { kind: "related", label: "E-commerce migration case study", href: "/services/cloud" },
    },
    {
      icon: "film",
      title: "Streaming and DRM",
      copy: "Not shipped yet. The approach: managed live and on-demand video services, adaptive bitrate ladders, signed URLs, and DRM from a licensed provider rather than a homegrown player.",
      features: [
        "Managed live video",
        "Adaptive bitrate",
        "Signed playback URLs",
        "Provider-based DRM",
      ],
    },
  ],
  stackIntro: "Real-time and delivery first, because that is where entertainment traffic hurts.",
  stack: [
    { title: "Real-time", items: ["Socket.IO", "WebSockets", "Firebase"] },
    { title: "Apps", items: ["React", "Next.js", "Node.js", "Express", "MongoDB"] },
    { title: "Delivery", items: ["S3", "CloudFront", "AWS Lambda"] },
    { title: "Payments", items: ["Stripe", "Stripe Connect"] },
  ],
  practicesKicker: "Ready for the spike",
  practicesTitle: "Holds up when everyone shows up",
  practicesIntro: "The checks that turn a traffic spike into a good night instead of an incident.",
  practices: [
    {
      icon: "gauge",
      title: "Load tested before the release",
      copy: "Chat and booking paths are pushed past expected peak before the date is announced.",
      supports: "Fewer launch-night incidents",
    },
    {
      icon: "shield",
      title: "Rate limits on every public endpoint",
      copy: "Throttles at the gateway keep one noisy client from taking the room down.",
      supports: "Supports abuse prevention",
    },
    {
      icon: "users",
      title: "Moderation tools from day one",
      copy: "Admins can mute, remove, and review from a panel instead of the database.",
      supports: "Supports community guidelines",
    },
    {
      icon: "lock",
      title: "Private media behind signed URLs",
      copy: "Paid or unreleased content is served with expiring links, not public paths.",
      supports: "Supports content licensing terms",
    },
    {
      icon: "fingerprint",
      title: "One identity for fans and staff",
      copy: "Sign-in and roles live in one provider, so access can be revoked in one place.",
      supports: "Supports access reviews",
    },
    {
      icon: "card",
      title: "Payments with the processor",
      copy: "Tickets and experiences are paid through Stripe; card numbers never touch the app.",
      supports: "Helps keep PCI DSS scope small",
    },
  ],
  practicesNote:
    "Streaming, DRM, and licensing workflows would be new work, built on managed services. The chat, booking, and delivery patterns above have run in production.",
  ctaTitle: "Planning a launch night?",
  ctaCopy:
    "Tell me what is going live and how many people you expect at once. I will come back with where it would break first and how I would stop that.",
};
