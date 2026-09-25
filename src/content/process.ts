import type { WhyFigure } from "@/content/why";

export type ProcessStep = {
  title: string;
  copy: string;
  items: string[];
};

export type ProcessNote = {
  title: string;
  copy: string;
};

/** Activity kinds drive the bar styling in the sprint chart; the label is always shown as text. */
export type SprintActivity = "planning" | "build" | "review" | "qa" | "deploy";

export type SprintBar = {
  label: string;
  activity: SprintActivity;
  /** Working-day index across the two weeks, 0 (Mon, week 1) to 9 (Fri, week 2), inclusive. */
  start: number;
  end: number;
};

export type Environment = {
  name: string;
  role: string;
  copy: string;
};

export type ChangePath = {
  title: string;
  copy: string;
  examples: string[];
  outcome: string;
  formal: boolean;
};

export const preProjectSteps: ProcessStep[] = [
  {
    title: "Discovery session",
    copy: "We start with the goals, the constraints, and what the product has to do on day one.",
    items: ["Requirements", "Technical feasibility", "Timeline estimate", "Resourcing and tooling"],
  },
  {
    title: "Stakeholder interviews",
    copy: "I talk to the people who own the business and the people who will use the product.",
    items: ["Business interviews", "User research", "Pain points", "Competitor review"],
  },
  {
    title: "Documentation",
    copy: "Scope, deliverables, and cost go on paper, so everyone signs off on the same plan.",
    items: [
      "Software requirements (SRS)",
      "Statement of work (SOW)",
      "Work breakdown (WBS)",
      "Execution plan and budget",
    ],
  },
  {
    title: "Sign-off and kickoff",
    copy: "Agreements are reviewed and signed, and the first sprint goes on the calendar.",
    items: ["Contract review", "Budget approval", "Timeline confirmed", "Project kickoff"],
  },
];

export const preProjectTimeline: WhyFigure = {
  value: "1–2 weeks",
  label: "from first call to kickoff, with scope, cost, and dates agreed",
  lowerIsBetter: true,
};

export const sprintBars: SprintBar[] = [
  { label: "Sprint planning", activity: "planning", start: 0, end: 0 },
  { label: "Development", activity: "build", start: 1, end: 6 },
  { label: "Code review", activity: "review", start: 7, end: 7 },
  { label: "Testing and QA", activity: "qa", start: 8, end: 8 },
  { label: "UAT deploy", activity: "deploy", start: 9, end: 9 },
];

export const closureDeliverables: ProcessNote[] = [
  { title: "Sprint closure report", copy: "What shipped, what got blocked, and why." },
  { title: "Progress tracker", copy: "Timeline, budget, and milestones, updated." },
  { title: "Next sprint plan", copy: "Priorities and goals for the next two weeks." },
];

export const sprintRituals: ProcessNote[] = [
  {
    title: "Weekly check-ins",
    copy: "A standing sync to review progress, clear blockers, and agree on what matters next.",
  },
  {
    title: "Sprint health checks",
    copy: "Velocity, blockers, and capacity are tracked through the sprint, so slippage shows up early.",
  },
  {
    title: "Priorities can move",
    copy: "Anything not yet started can be reordered at the next planning session.",
  },
];

export const rolloverNote =
  "If a task will not finish inside a sprint, you hear about it before the review, not at it. It either rolls into the next sprint or the sprint is extended, depending on what matters more to you.";

export const environments: Environment[] = [
  { name: "Local", role: "My workstation", copy: "Features are built and tested first." },
  { name: "Development", role: "Integration", copy: "Merged work runs together, with automated tests on every push." },
  { name: "UAT", role: "Acceptance testing", copy: "You click through each feature and approve it." },
  { name: "Production", role: "Live", copy: "Approved releases reach real users with zero downtime." },
];

export const changeSteps: ProcessNote[] = [
  { title: "You raise it", copy: "New work that sits outside the agreed SOW." },
  { title: "I size it", copy: "Effort, complexity, and the effect on the current sprint." },
  { title: "We decide", copy: "Fit it into this sprint, or treat it as a formal change request." },
  { title: "It ships", copy: "Inside the sprint, or as its own scoped and approved change." },
];

export const changePaths: ChangePath[] = [
  {
    title: "Minor adjustment",
    copy: "Small enough to fit the current sprint without moving its commitments.",
    examples: ["UI tweaks", "Copy changes", "Small bug fixes", "Configuration updates"],
    outcome: "Absorbed into the current sprint",
    formal: false,
  },
  {
    title: "Formal change request",
    copy: "Larger work that gets its own estimate and your approval before it starts.",
    examples: ["New features", "Architecture changes", "Third-party integrations", "Major refactoring"],
    outcome: "Scoped and approved as its own change",
    formal: true,
  },
];
