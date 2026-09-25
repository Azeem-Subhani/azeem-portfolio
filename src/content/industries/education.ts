import type { IndustryPageContent } from "@/types/content";

/*
 * Approach page: no education product has shipped. Solutions link related work
 * (Task Manager, Smart Living, Track Hero, Oxym). Never state FERPA or COPPA compliance.
 */
export const educationIndustry: IndustryPageContent = {
  slug: "education",
  label: "Education",
  evidence: "approach",
  tone: "violet",
  heroVisual: "course",
  layout: {
    hero: "centered",
    challenges: "list",
    solutions: "alternating",
    stack: "grid",
    practices: "grid",
  },
  metaTitle: "Education engineering: courses, live classes, and enrollment",
  metaDescription:
    "How I would build course platforms, live classes, enrollment, and AI-assisted course communication, using patterns from scheduling, messaging, and RAG work I have shipped.",
  kicker: "Education · Approach",
  title: "learning that sticks,",
  titleAccent: "progress you can see",
  lede: "Course platforms where learners always know what is next, instructors are not buried in messages, and enrollment runs without a spreadsheet.",
  proof: [],
  approachNote:
    "I have not shipped an education product yet. This page is how I would build one, from patterns that have run in production: per-user APIs, scheduling and live calling, booking and payments, and a RAG workflow that writes messages from context.",
  challengesTitle: "Where learning platforms lose people",
  challengesIntro: "Learners rarely quit loudly. They just stop showing up.",
  challenges: [
    {
      icon: "gauge",
      title: "Drop-off nobody sees",
      copy: "Without progress data per learner, the first sign someone is stuck is that they are gone.",
    },
    {
      icon: "video",
      title: "Live sessions on a separate tool",
      copy: "Classes happen in one app, materials in another, and the link is always in an email somewhere.",
    },
    {
      icon: "card",
      title: "Enrollment by hand",
      copy: "Seats, payments, and access are matched manually, so the first week starts with support tickets.",
    },
    {
      icon: "message",
      title: "Instructors answering the same question",
      copy: "Reminders and follow-ups are written one by one instead of from the course itself.",
    },
  ],
  solutionsTitle: "How I would build it",
  solutionsIntro:
    "Each piece maps to work that has run in production, so the pattern is proven even where the subject is new.",
  solutions: [
    {
      icon: "book",
      title: "Courses and progress tracking",
      copy: "Per-learner progress, modules, and quizzes behind an authenticated API, with email for verification and nudges.",
      features: [
        "Per-learner progress",
        "Modules and quizzes",
        "JWT-authenticated API",
        "Email verification and nudges",
        "Instructor dashboards",
        "Completion certificates",
      ],
      link: { kind: "related", label: "Task Manager", href: "/projects/task-manager" },
    },
    {
      icon: "video",
      title: "Live classes and scheduling",
      copy: "Audio and video calling, scheduling, and alerts in one portal, so a class and its materials live in the same place.",
      features: [
        "Audio and video calling",
        "Class scheduling",
        "Push reminders",
        "Group management",
        "Web and mobile",
        "Serverless backend",
      ],
      link: { kind: "related", label: "Smart Living Dashboard", href: "/projects/smart-living" },
    },
    {
      icon: "card",
      title: "Enrollment and payments",
      copy: "Seats, cohorts, and payments on one booking engine, with credits and promo codes for scholarships and early enrollment.",
      features: [
        "Cohort and seat booking",
        "Stripe payments and subscriptions",
        "Credits and promo codes",
        "Automatic access on payment",
        "Waitlists",
        "Operator back office",
      ],
      link: { kind: "related", label: "Track Hero", href: "/projects/track-hero" },
    },
    {
      icon: "sparkles",
      title: "Course messages written from context",
      copy: "The same RAG workflow that writes game-day emails from team context, pointed at course material and learner progress.",
      features: [
        "Retrieval from course content",
        "Progress-aware reminders",
        "Scheduled sends",
        "Instructor review before send",
        "Web and mobile delivery",
        "Real-time messaging",
      ],
      link: { kind: "related", label: "Oxym", href: "/projects/oxym" },
    },
  ],
  stackIntro: "The tools behind the related work, ready to carry over.",
  stack: [
    { title: "Web & mobile", items: ["Angular", "Ionic", "React", "Next.js"] },
    { title: "Backend", items: ["NestJS", "Node.js", "PostgreSQL", "Firestore"] },
    { title: "Real-time", items: ["Socket.IO", "Firebase", "SendGrid"] },
    { title: "AI & payments", items: ["RAG", "OpenAI API", "Stripe"] },
  ],
  practicesKicker: "Privacy & security",
  practicesTitle: "Learner data treated carefully",
  practicesIntro: "Education data is often about minors and always about people. These come first.",
  practices: [
    {
      icon: "database",
      title: "Collect the minimum",
      copy: "Only the data the course needs, with retention set up front instead of kept forever.",
      supports: "Supports student-privacy reviews",
    },
    {
      icon: "fingerprint",
      title: "Roles for learners, guardians, and staff",
      copy: "Each role sees its own slice, enforced at the API rather than hidden in the UI.",
      supports: "Supports access reviews",
    },
    {
      icon: "scroll",
      title: "A log of record access",
      copy: "Who viewed or changed a learner's record, and when.",
      supports: "Supports FERPA-style audits",
    },
    {
      icon: "lock",
      title: "Encryption at rest and in transit",
      copy: "Managed encryption on storage and TLS everywhere, including internal calls.",
      supports: "Supports security questionnaires",
    },
    {
      icon: "key",
      title: "Secrets out of the repo",
      copy: "Keys for payments, email, and AI providers live in a secret store.",
      supports: "Supports vendor reviews",
    },
    {
      icon: "sparkles",
      title: "AI output reviewed before send",
      copy: "Generated messages go to an instructor queue first; nothing auto-sends to learners.",
      supports: "Keeps a person accountable",
    },
  ],
  practicesNote:
    "Engineering practices, not a compliance determination. Whether FERPA, COPPA, or state student-privacy laws apply is for your compliance team and counsel.",
  ctaTitle: "Building a course platform?",
  ctaCopy:
    "Tell me who the learners are and how classes run today. I will come back with a plan, and be clear about which parts would be new for me.",
};
