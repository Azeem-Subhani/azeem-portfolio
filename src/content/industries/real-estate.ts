import type { IndustryPageContent } from "@/types/content";

/*
 * Approach page: no real-estate product has shipped. Solutions link related work
 * (Smart Living, Track Booking Platform, device monitoring) or none (listings and MLS feeds).
 */
export const realEstateIndustry: IndustryPageContent = {
  slug: "real-estate",
  label: "Real Estate",
  evidence: "approach",
  tone: "orange",
  heroVisual: "listings",
  layout: {
    hero: "split-reverse",
    challenges: "columns",
    solutions: "tabs",
    stack: "rows",
    practices: "checklist",
  },
  metaTitle: "Real estate engineering: resident portals, tours, and smart buildings",
  metaDescription:
    "How I would build resident portals, tour scheduling, smart-building monitoring, and listing search, using community, booking, and device work I have shipped.",
  kicker: "Real Estate · Approach",
  title: "every property,",
  titleAccent: "one front door",
  lede: "Listings, tours, residents, and the devices in the building, on one system instead of a phone tree and five logins.",
  proof: [],
  approachNote:
    "I have not shipped a listings or MLS product yet. This page is how I would build one, using work that has run in production: a community operations portal for residents and staff, a booking engine, and smart-home device monitoring.",
  challengesTitle: "Where property teams lose time",
  challengesIntro: "The listing is the easy part. Everything after the first inquiry is where the hours go.",
  challenges: [
    {
      icon: "map",
      title: "Listings out of date everywhere",
      copy: "The same property shows different prices and statuses on every site that syndicates it.",
    },
    {
      icon: "calendar",
      title: "Tours booked by phone tag",
      copy: "Showings are scheduled over calls and texts, and the calendar is right about half the time.",
    },
    {
      icon: "building",
      title: "Residents without one channel",
      copy: "Notices, maintenance, and emergencies go out by email, paper, and group chat, and nobody knows who saw what.",
    },
    {
      icon: "home",
      title: "Devices nobody watches",
      copy: "Smart locks, thermostats, and sensors are installed, then only checked when a resident complains.",
    },
  ],
  solutionsTitle: "How I would build it",
  solutionsIntro:
    "Pick a tab. Three map to work that has run in production; listings and MLS feeds would be new work.",
  solutions: [
    {
      icon: "building",
      title: "Resident and community portals",
      copy: "A staff portal for resident groups, alerts, events, and calling, applied to buildings and their residents.",
      features: [
        "Resident groups",
        "Emergency alerts",
        "Event scheduling",
        "Audio and video calling",
        "Push notifications",
        "Serverless backend",
      ],
      link: { kind: "related", label: "Smart Living Dashboard", href: "/projects/smart-living" },
    },
    {
      icon: "calendar",
      title: "Tour and showing scheduling",
      copy: "A booking engine with slots, confirmations, and deposits, applied to showings instead of track time.",
      features: [
        "Self-serve tour slots",
        "Agent calendars",
        "Confirmations and reminders",
        "Deposits through Stripe",
        "Several branded sites, one engine",
        "Back-office reporting",
      ],
      link: { kind: "related", label: "Track Booking Platform", href: "/projects/track-booking" },
    },
    {
      icon: "home",
      title: "Smart-building monitoring",
      copy: "Device APIs wired into a mobile app, so a fault raises an alert before a resident has to call.",
      features: [
        "Device API integration",
        "Status and alert history",
        "Critical-alert escalation",
        "Mobile apps for staff",
        "Push to the on-call phone",
        "Resident-facing status",
      ],
      link: { kind: "related", label: "Mobile development service", href: "/services/mobile-development" },
    },
    {
      icon: "map",
      title: "Listings search and MLS feeds",
      copy: "Not shipped yet. The approach: ingest the MLS feed on a schedule, normalize it into Postgres, and serve server-rendered listing pages and map search from that one copy.",
      features: [
        "Scheduled feed ingestion",
        "Normalized listings store",
        "Map and filter search",
        "Server-rendered listing pages",
      ],
    },
  ],
  stackIntro: "What the related work runs on, and what a listings build would add.",
  stack: [
    { title: "Portals", items: ["Angular", "Next.js", "React", "Ionic"] },
    { title: "Backend", items: ["NestJS", "Django", "PostgreSQL", "AWS SAM"] },
    { title: "Devices & alerts", items: ["Google Nest SDM APIs", "Firebase", "OneSignal"] },
    { title: "Payments", items: ["Stripe"] },
  ],
  practicesKicker: "Privacy & security",
  practicesTitle: "Residents' data, handled like it matters",
  practicesIntro: "Property systems hold addresses, schedules, and door access. These come first.",
  practices: [
    {
      icon: "fingerprint",
      title: "Roles for residents, staff, and agents",
      copy: "Each role sees its own slice, enforced at the API.",
      supports: "Supports access reviews",
    },
    {
      icon: "lock",
      title: "Device access is audited",
      copy: "Every lock or device command is logged with who sent it.",
      supports: "Supports incident reviews",
    },
    {
      icon: "card",
      title: "Payments with the processor",
      copy: "Deposits and rent go through Stripe; card and bank details never touch the app.",
      supports: "Helps keep PCI DSS scope small",
    },
    {
      icon: "database",
      title: "Resident data kept to the minimum",
      copy: "Only what operations need, with retention set when the lease ends.",
      supports: "Supports privacy requests",
    },
    {
      icon: "key",
      title: "Secrets out of the repo",
      copy: "Device and feed credentials live in a secret store, never in an app bundle.",
      supports: "Supports security reviews",
    },
    {
      icon: "bell",
      title: "Alerts with an owner",
      copy: "Emergencies route to a person and escalate if nobody acknowledges them.",
      supports: "Faster incident response",
    },
  ],
  practicesNote:
    "Engineering practices, not legal advice. MLS data licensing, fair-housing rules, and local privacy laws are for your broker and counsel to confirm.",
  ctaTitle: "Running more doors than your tools can handle?",
  ctaCopy:
    "Tell me how tours, residents, and devices are managed today. I will come back with what I would connect first, and be clear about which parts would be new for me.",
};
