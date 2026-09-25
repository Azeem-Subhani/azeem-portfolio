import type { IndustryPageContent } from "@/types/content";

/*
 * Sources: projects.ts (Track Hero fleet and scheduling, Smart Living alerts),
 * experience.ts (real-time scale, device monitoring). Route optimization has not
 * shipped; that solution is marked as approach (no link). Do not add figures.
 */
export const logisticsIndustry: IndustryPageContent = {
  slug: "logistics",
  label: "Logistics",
  evidence: "shipped",
  tone: "blue",
  heroVisual: "routes",
  layout: {
    hero: "split",
    challenges: "list",
    solutions: "alternating",
    stack: "rows",
    practices: "grid",
  },
  metaTitle: "Logistics engineering: fleet operations, live status, and alerts",
  metaDescription:
    "Fleet and scheduling operations, real-time status and alerting, and device monitoring, from an engineer who has run real-time systems for 10K+ concurrent users.",
  kicker: "Logistics",
  title: "every vehicle,",
  titleAccent: "live on one screen",
  lede: "Operations software where dispatch, the fleet, and the people waiting on them see the same status at the same time. Built for the moment something goes wrong.",
  proof: [
    { value: "10K+", label: "concurrent users on real-time systems" },
    { value: "−65%", label: "critical-alert response time" },
    { value: "1,000+", label: "concurrent live conversations" },
    { value: "5", label: "venues running fleet and scheduling ops" },
  ],
  challengesTitle: "Where operations lose the thread",
  challengesIntro:
    "Logistics problems are rarely about the map. They are about who knew what, and when.",
  challenges: [
    {
      icon: "radio",
      title: "Dispatch works from stale status",
      copy: "Positions and job states update on a refresh, so decisions are made on where things were, not where they are.",
    },
    {
      icon: "bell",
      title: "Alerts arrive after the problem",
      copy: "A failed delivery or a device fault reaches the right person by phone call, long after it could have been fixed.",
    },
    {
      icon: "calendar",
      title: "Schedules live in spreadsheets",
      copy: "Vehicles, drivers, and time slots are balanced by hand, and double bookings are found on the day.",
    },
    {
      icon: "truck",
      title: "Crews on patchy connections",
      copy: "Field apps that assume a perfect signal lose updates exactly where the work happens.",
    },
  ],
  solutionsTitle: "What I have built for operations",
  solutionsIntro:
    "Three pieces of operational software that ran in production, plus the one I would add next.",
  solutions: [
    {
      icon: "truck",
      title: "Fleet and scheduling operations",
      copy: "A back office that owns the fleet, the calendar, and the reporting, so the operator stops reconciling three tools.",
      features: [
        "Fleet management",
        "Event and slot scheduling",
        "Operational reporting",
        "CRM alongside bookings",
        "Typed API clients",
        "Route guards and validation",
      ],
      link: { kind: "shipped", label: "Track Hero", href: "/projects/track-hero" },
    },
    {
      icon: "radio",
      title: "Real-time status and alerts",
      copy: "Status changes pushed to every screen that cares, with emergency alerts routed to the right people.",
      features: [
        "Socket.IO live updates",
        "Push notifications",
        "Emergency alert routing",
        "Audio and video calling",
        "Serverless backend on AWS SAM",
        "Sub-second message delivery",
      ],
      link: { kind: "shipped", label: "Smart Living Dashboard", href: "/projects/smart-living" },
    },
    {
      icon: "bell",
      title: "Device and sensor monitoring",
      copy: "Device APIs wired into mobile apps so faults raise an alert instead of waiting for someone to notice.",
      features: [
        "Device API integration",
        "Mobile monitoring apps",
        "Critical-alert escalation",
        "Device status history",
        "Ionic cross-platform clients",
        "Push to the on-call phone",
      ],
      link: { kind: "related", label: "Mobile development service", href: "/services/mobile-development" },
    },
    {
      icon: "route",
      title: "Route planning and ETAs",
      copy: "Not shipped yet. The approach: a maps provider for routing, geofenced stop events, and ETAs recalculated from live positions on the same real-time channel as status.",
      features: [
        "Maps provider routing",
        "Geofenced arrivals",
        "Live ETA updates",
        "Customer tracking links",
      ],
    },
  ],
  stackIntro: "Real-time transport first, then the services and apps that sit on it.",
  stack: [
    { title: "Real-time", items: ["Socket.IO", "WebSockets", "Firebase", "OneSignal"] },
    { title: "Backend", items: ["Node.js", "NestJS", "Django", "PostgreSQL", "Celery"] },
    { title: "Mobile & devices", items: ["Ionic", "Angular", "Google Nest SDM APIs"] },
    { title: "Cloud", items: ["AWS Lambda", "SNS", "SES", "AWS SAM", "CloudWatch"] },
  ],
  practicesKicker: "Reliability & security",
  practicesTitle: "Keeps working when the signal does not",
  practicesIntro:
    "Operations software is judged on its worst day. These are built in from the start.",
  practices: [
    {
      icon: "key",
      title: "Tokens that refresh themselves",
      copy: "Long shifts do not end in a surprise sign-out; sessions refresh in the background.",
      supports: "Fewer lost updates in the field",
    },
    {
      icon: "bell",
      title: "Alerts with an owner",
      copy: "Every alert routes to a role, and escalates if nobody acknowledges it.",
      supports: "Faster incident response",
    },
    {
      icon: "scroll",
      title: "A history of every status change",
      copy: "Who changed what and when, kept with the job, so disputes are settled from the record.",
      supports: "Supports audit and claims reviews",
    },
    {
      icon: "fingerprint",
      title: "Scoped access per role",
      copy: "Drivers, dispatch, and customers each see their slice, enforced at the API.",
      supports: "Supports access reviews",
    },
    {
      icon: "gauge",
      title: "Monitoring from the first deploy",
      copy: "Queues, sockets, and API latency are on a dashboard with alerts before launch.",
      supports: "Supports availability targets",
    },
    {
      icon: "lock",
      title: "Secrets out of the repo",
      copy: "Device and provider keys live in the cloud's secret store, never in the app bundle.",
      supports: "Supports security reviews",
    },
  ],
  practicesNote:
    "Route optimization and carrier integrations would be new work. Everything else on this page has run in production.",
  ctaTitle: "Need operations to see the same thing at once?",
  ctaCopy:
    "Tell me what dispatch uses today and where the updates get lost. I will come back with what I would make real-time first.",
};
