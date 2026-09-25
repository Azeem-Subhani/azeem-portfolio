export type WhyFigure = {
  value: string;
  label: string;
};

export type WhyDifferentiator = WhyFigure & { copy: string };

export type WhyStep = {
  title: string;
  timing: string;
  copy: string;
};

export type WhyArea = WhyFigure & {
  title: string;
  tags: string[];
};

export type WhyResult = WhyFigure & { copy: string };

export const differentiators: WhyDifferentiator[] = [
  {
    value: "3–4 weeks",
    label: "to a working build",
    copy: "Ideas get prototyped in real code early, so you react to something you can click instead of a static mockup.",
  },
  {
    value: "Custom",
    label: "built for the product",
    copy: "Layout, components, and flows are built for the product. Nothing starts from a theme you have to fight later.",
  },
  {
    value: "Full-stack",
    label: "across the stack",
    copy: "Angular, React, Next.js, NestJS, Django, Ionic. The stack is picked for the project, not out of habit.",
  },
  {
    value: "End-to-end",
    label: "one person across the stack",
    copy: "Interface, API, database, and the AWS account underneath. Nothing has to change hands between vendors.",
  },
  {
    value: "Modern",
    label: "stack from day one",
    copy: "Typed clients, serverless backends, and CI from the first commit, so there is no legacy layer to unwind later.",
  },
  {
    value: "99.95%",
    label: "uptime",
    copy: "Monitoring, alerting, and least-privilege access are part of the build, not an add-on after launch.",
  },
];

export const steps: WhyStep[] = [
  {
    title: "Discovery",
    timing: "Start",
    copy: "Goals, users, and constraints first. The plan fits the product rather than a stock process.",
  },
  {
    title: "Prototype in code",
    timing: "Within days",
    copy: "A few clickable variations of the core flow, built on the real stack so the winner carries straight into the build.",
  },
  {
    title: "Build and test",
    timing: "Every week",
    copy: "Short cycles with a preview deploy on every change. Automated tests run on each push.",
  },
  {
    title: "Launch",
    timing: "3–4 weeks",
    copy: "Zero-downtime release, monitoring in place, and a watch on performance in the first days.",
  },
  {
    title: "Iterate",
    timing: "Ongoing",
    copy: "Real usage decides the next round. I stay on as the technical partner after launch.",
  },
];

export const timeline: WhyFigure & { copy: string } = {
  value: "3–4 weeks",
  label: "typical timeline",
  copy: "From kickoff to a production-ready first release, compared with the 8–12 weeks a traditional agency quotes.",
};

export const areas: WhyArea[] = [
  {
    title: "Cloud architecture",
    value: "50+",
    label: "production apps",
    tags: ["AWS", "Lambda", "Cognito", "SAM", "Serverless"],
  },
  {
    title: "Web development",
    value: "30+",
    label: "projects",
    tags: ["Next.js", "React", "Angular", "Headless CMS", "SEO"],
  },
  {
    title: "Mobile apps",
    value: "25+",
    label: "apps shipped",
    tags: ["Ionic", "React Native", "iOS", "Android"],
  },
  {
    title: "Data engineering",
    value: "500+",
    label: "authenticated payments a day",
    tags: ["PostgreSQL", "DynamoDB", "Firestore", "ETL/ELT", "Real-time sync"],
  },
];

export const depthStats: WhyFigure[] = [
  { value: "95+", label: "Lighthouse scores I ship to" },
  { value: "50+", label: "production apps" },
  { value: "5", label: "booking platforms" },
  { value: "500+", label: "authenticated payments a day" },
];

export const results: WhyResult[] = [
  {
    value: "5",
    label: "venue booking sites on one codebase",
    copy: "Five race-track venues share one reservation and payments engine.",
  },
  {
    value: "3–4 weeks",
    label: "to a working release",
    copy: "First users see a working site within a month, with feedback coming from use rather than a slide deck.",
  },
  {
    value: "60%",
    label: "off building native twice",
    copy: "One cross-platform app replaces separate native builds for iOS, Android, and web.",
  },
  {
    value: "500+",
    label: "authenticated payments a day",
    copy: "Processed by the serverless memorial planning payment portal in production.",
  },
  {
    value: "95+",
    label: "Lighthouse scores I ship to",
    copy: "The performance bar every web build is held to before it goes live.",
  },
  {
    value: "99.9%",
    label: "uptime after cutover",
    copy: "Delivered as a measurable production outcome with monitoring in place.",
  },
];
