import type { IndustryPageContent } from "@/types/content";

/*
 * Approach page: no healthcare product has shipped. Every solution links related work
 * (memorial payment portal, Smart Living, the regulated Azure platform) or none.
 * Never state or imply HIPAA compliance; the note defers that call to the client.
 */
export const healthtechIndustry: IndustryPageContent = {
  slug: "healthtech",
  label: "HealthTech",
  evidence: "approach",
  tone: "red",
  heroVisual: "care",
  layout: {
    hero: "split-reverse",
    challenges: "columns",
    solutions: "stacked",
    stack: "grid",
    practices: "checklist",
  },
  metaTitle: "HealthTech engineering: patient portals, care messaging, protected data",
  metaDescription:
    "How I would build patient portals, video visits, and protected health data handling, using patterns from authenticated portals and regulated platforms I have shipped.",
  kicker: "HealthTech · Approach",
  title: "care that connects,",
  titleAccent: "records that stay private",
  lede: "Patient portals, video visits, and care messaging where every record view is logged and every login means something. Designed around privacy first, then convenience.",
  proof: [],
  approachNote:
    "I have not shipped a healthcare product yet. This page is how I would build one, using patterns from work that has run in production: an authenticated payment portal, a community operations dashboard with calling and alerts, and a regulated financial platform with encrypted records.",
  challengesTitle: "What makes health software hard",
  challengesIntro:
    "The features look like any other app. The difference is what happens to the data around them.",
  challenges: [
    {
      icon: "database",
      title: "Health data spread across tools",
      copy: "Scheduling, messaging, and billing each keep their own copy of patient details, and each is a place to leak.",
    },
    {
      icon: "scroll",
      title: "Access nobody can explain later",
      copy: "Without a log of who opened which record, a simple question from compliance becomes an investigation.",
    },
    {
      icon: "video",
      title: "Visits that fail on bad connections",
      copy: "A video visit that drops or a message that never arrives is a missed appointment, not a bug report.",
    },
    {
      icon: "stethoscope",
      title: "Records stuck in the EHR",
      copy: "Clinical data lives in systems that only speak HL7 or FHIR, and the new app has to meet them there.",
    },
  ],
  solutionsTitle: "How I would build it",
  solutionsIntro:
    "Each solution points at the closest work I have shipped, so you can see the pattern running before it is applied to care.",
  solutions: [
    {
      icon: "lock",
      title: "Patient portals behind real sign-in",
      copy: "Customers of a regulated service signing in to see what they owe and pay it is the same shape as a patient portal: identity first, then records.",
      features: [
        "Cognito sign-in with MFA",
        "Per-record access checks",
        "Appointment and balance views",
        "Payments through the processor",
        "Automated staff notifications",
        "Serverless on AWS",
      ],
      link: { kind: "related", label: "Memorial planning portal", href: "/projects/memorial-planning" },
    },
    {
      icon: "video",
      title: "Video visits and care messaging",
      copy: "Audio and video calling, alerts, and scheduling between residents and staff, applied to patients and care teams.",
      features: [
        "Audio and video calling",
        "Scheduling and reminders",
        "Push notifications",
        "Care-team messaging",
        "Alert routing by role",
        "Serverless backend",
      ],
      link: { kind: "related", label: "Smart Living Dashboard", href: "/projects/smart-living" },
    },
    {
      icon: "shield",
      title: "Protected data at rest",
      copy: "Column-level encryption, secrets in a vault, and a gateway in front of every API, as on the regulated financial platform.",
      features: [
        "Always Encrypted columns",
        "Key Vault or KMS for keys",
        "API gateway policies",
        "Encryption in transit everywhere",
        "Cloud services covered by a BAA",
        "Access logging",
      ],
      link: { kind: "related", label: "Financial services case study", href: "/services/cloud" },
    },
    {
      icon: "stethoscope",
      title: "EHR integration over FHIR",
      copy: "Not shipped yet. The approach: an integration layer that talks FHIR to the EHR (directly or through an integration vendor), normalizes records, and keeps the app's own store to the minimum it needs.",
      features: [
        "FHIR resources in and out",
        "Integration vendor or direct API",
        "Normalized patient records",
        "Minimum necessary data kept",
      ],
    },
  ],
  stackIntro: "Tools from the related work above, plus the standards a healthcare build has to speak.",
  stack: [
    { title: "Identity", items: ["Cognito", "Azure AD", "JWT"] },
    { title: "Data", items: ["PostgreSQL", "Azure SQL", "DynamoDB", "Key Vault"] },
    { title: "Messaging", items: ["Firebase", "SNS", "SES", "Socket.IO"] },
    { title: "Integration targets", items: ["HL7", "FHIR"] },
  ],
  practicesKicker: "Privacy & security",
  practicesTitle: "Privacy is the architecture",
  practicesIntro:
    "The safeguards a health build starts with, before the first screen is designed.",
  practices: [
    {
      icon: "lock",
      title: "Encrypt health data everywhere",
      copy: "At rest with managed keys, in transit with TLS, and sensitive columns encrypted so the database cannot read them.",
      supports: "Supports HIPAA Security Rule reviews",
    },
    {
      icon: "shield",
      title: "Only BAA-covered cloud services",
      copy: "Health data only touches cloud services the provider covers under a business associate agreement.",
      supports: "Supports vendor due diligence",
    },
    {
      icon: "scroll",
      title: "Every record view logged",
      copy: "Who opened which record, when, and from where, kept where the app cannot edit it.",
      supports: "Supports access audits",
    },
    {
      icon: "fingerprint",
      title: "MFA and least privilege",
      copy: "Staff roles see only what their job needs, and sign-in requires a second factor.",
      supports: "Supports access reviews",
    },
    {
      icon: "database",
      title: "Minimum necessary data",
      copy: "The app keeps only what it needs and reads the rest from the source system on demand.",
      supports: "Reduces breach exposure",
    },
    {
      icon: "key",
      title: "Secrets in a vault",
      copy: "Keys and credentials live in Key Vault or KMS, rotated without a redeploy.",
      supports: "Supports security reviews",
    },
  ],
  practicesNote:
    "Engineering practices, not a compliance determination. Whether and how HIPAA applies depends on your role as a covered entity or business associate; your compliance team and counsel make that call.",
  ctaTitle: "Planning a health product?",
  ctaCopy:
    "Tell me who uses it and what data it touches. I will come back with how I would structure access and storage before any screen gets built, and be clear about which parts would be new for me.",
};
