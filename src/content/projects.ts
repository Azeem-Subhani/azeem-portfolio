import type { Project } from "@/types/content";

function screens(
  slug: string,
  backdrop: string,
  webAlt: string,
  phoneAlt?: string,
  liveWeb = false,
  livePhone = false,
) {
  return {
    web: { alt: webAlt },
    ...(phoneAlt ? { phone: { alt: phoneAlt } } : {}),
    backdrop,
    ...(liveWeb ? { liveWeb: true as const } : {}),
    ...(livePhone ? { livePhone: true as const } : {}),
  };
}

export const projects: Project[] = [
  {
    slug: "track-hero",
    title: "Track Hero",
    summary:
      "A motorsports booking and operations platform running white-label reservation experiences for five race tracks.",
    context:
      "Track Hero runs the booking and back-office operations for motorsports venues that sell track time, driving experiences, and events. Each venue needed its own branded booking site backed by one shared reservation and payments engine.",
    role: "Full-stack engineer building customer booking flows and the operator-facing back office.",
    approach: [
      "Built customer booking and operator workflows spanning reservations, CRM, fleet management, event scheduling, payments, and operational reporting.",
      "Delivered white-label booking experiences for five venues: Sonoma Raceway, Monticello Motor Club, The Motor Enclave, Skip Barber, and Spring Mountain.",
      "Integrated Stripe for reservations, stored cards, gift certificates, credits, and promo codes.",
      "Improved reliability with typed API clients, token refresh, route guards, and request validation across the Django API.",
    ],
    outcomes: [
      "Five venues running independently branded booking sites on one shared platform.",
      "Stripe covers the full transaction surface: reservations, stored cards, gift certificates, credits, and promo codes.",
      "Typed API clients and token refresh removed a class of auth-expiry bugs from the booking flow.",
    ],
    stack: ["React", "Next.js", "TypeScript", "Django", "Stripe"],
    categories: ["Full-Stack", "Payments", "Cloud"],
    screens: screens(
      "track-hero",
      "#07080A",
      "Track Hero operator console with group revenue, fleet, and session capacity.",
      "Track Hero customer booking on iPhone.",
      true,
      true,
    ),
    metrics: [
      { value: "5", label: "white-label venues" },
      { value: "1", label: "shared payments engine" },
    ],
    productPath: "www.trackhero.com",
    featured: true,
    visibility: "anonymized",
  },
  {
    slug: "oxym",
    title: "Oxym",
    summary:
      "A cross-platform team management app with real-time messaging, in-app invoicing, and RAG-generated game-day emails.",
    context:
      "Oxym serves sports teams, coaches, and players who need scheduling, payments, and communication in one app across web and mobile.",
    role: "Full-stack engineer across the Angular/Ionic client, NestJS backend, and the email automation workflow.",
    approach: [
      "Developed a cross-platform web and mobile client with Socket.IO live updates and Firebase/Firestore real-time messaging for teams, coaches, and players.",
      "Built scheduling and wallet modules and integrated Stripe Connect for in-app invoicing and payments between platform users.",
      "Implemented a RAG-powered email workflow that retrieves team-specific context to generate and schedule pre-game and post-game communications.",
    ],
    outcomes: [
      "One codebase serves web and mobile clients with live scheduling and messaging updates.",
      "Stripe Connect handles invoicing and payment transfers directly between teams and players.",
      "Pre-game and post-game emails generate automatically from retrieved team context instead of manual drafting.",
    ],
    stack: [
      "Angular",
      "Ionic",
      "NestJS",
      "Firebase",
      "Firestore",
      "Socket.IO",
      "Stripe Connect",
    ],
    categories: ["AI & RAG", "Full-Stack", "Mobile", "Real-Time", "Payments"],
    screens: screens(
      "oxym",
      "#1a1d21",
      "Oxym team dashboard with the next fixture, squad availability, invoices, and matchday email.",
      "Oxym First Team chat on iPhone.",
      true,
      true,
    ),
    metrics: [
      { value: "Web + mobile", label: "one codebase" },
      { value: "RAG", label: "game-day emails" },
    ],
    productPath: "app.oxym.com",
    featured: true,
    visibility: "anonymized",
  },
  {
    slug: "memorial-planning",
    title: "Memorial Planning Payment Portal",
    summary:
      "A serverless AWS payment portal processing 500+ authenticated transactions a day with automated notification follow-up.",
    context:
      "A memorial planning provider needed a secure portal for customers to make authenticated payments toward pre-arranged services, with staff notified automatically as payments completed.",
    role: "Built the payment portal and its serverless notification workflows.",
    approach: [
      "Built a secure payment portal using Next.js, AWS Amplify, AppSync, Cognito, Lambda, DynamoDB, and Trust Commerce.",
      "Implemented serverless payment and notification workflows to support authenticated customer transactions and operational follow-up.",
    ],
    outcomes: [
      "Processes 500+ daily transactions in production.",
      "Lambda-driven notifications keep operations staff informed without manual follow-up.",
    ],
    stack: [
      "Next.js",
      "AWS Amplify",
      "AppSync",
      "Cognito",
      "Lambda",
      "DynamoDB",
      "Trust Commerce",
    ],
    categories: ["Full-Stack", "Payments", "Cloud"],
    screens: screens(
      "memorial-planning",
      "#16362F",
      "Memorial planning payment portal with remaining-balance overview.",
      "Make-a-payment screen on iPhone.",
      true,
      true,
    ),
    metrics: [
      { value: "500+", label: "transactions a day" },
      { value: "0", label: "manual follow-up" },
    ],
    productPath: "memorialplan.com/account",
    featured: true,
    visibility: "anonymized",
  },
  {
    slug: "gaming-global",
    title: "Gaming Global",
    summary:
      "A MERN gaming utility combining sensitivity conversion, player stats, and real-time chat behind an admin panel.",
    context:
      "Personal project built for competitive FPS players who switch between games with different aim-sensitivity scales and want their stats and social features in one place.",
    role: "Built the full MERN stack, front to back, independently.",
    approach: [
      "Built a sensitivity-conversion tool so players can translate aim settings across different games.",
      "Added gamer statistics tracking and social features, including real-time chat built on Socket.IO.",
      "Built an admin panel for user and content management.",
    ],
    outcomes: [
      "Shipped a working MERN application combining conversion tooling, stats tracking, and real-time chat under one admin-managed system.",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Socket.IO"],
    categories: ["Full-Stack", "Real-Time"],
    screens: screens(
      "gaming-global",
      "#12110F",
      "Gaming Global player stats dashboard with rating, map pool, and recent matches.",
      "Gaming Global admin panel on iPhone.",
      true,
      true,
    ),
    metrics: [
      { value: "Cross-game", label: "sensitivity conversion" },
      { value: "Live", label: "Socket.IO chat" },
    ],
    productPath: "app.gamingglobal.com",
    featured: false,
    visibility: "public",
  },
  {
    slug: "woody-shop",
    title: "Woody Shop",
    summary:
      "An e-commerce storefront with a persisted Redux cart and Stripe checkout.",
    context: "Personal e-commerce project built to practice cart state management and payment integration end to end.",
    role: "Built the storefront, cart logic, and checkout independently.",
    approach: [
      "Built a shopping cart and checkout flow with Redux for state management, including local storage persistence across sessions.",
      "Integrated Firebase for data storage and the Stripe API for checkout payments.",
    ],
    outcomes: [
      "Complete cart-to-checkout flow with state that survives a page reload and working Stripe payments.",
    ],
    stack: ["React", "Redux", "Firebase", "Stripe API"],
    categories: ["Full-Stack", "Payments"],
    screens: screens(
      "woody-shop",
      "#FFFFFF",
      "Woody Shop walnut coffee table product page.",
      "Woody Shop Discover feed on iPhone.",
      true,
      true,
    ),
    metrics: [
      { value: "Persisted", label: "cart across reloads" },
      { value: "Stripe", label: "checkout" },
    ],
    productPath: "woody.shop",
    featured: false,
    visibility: "public",
  },
  {
    slug: "real-time-chat",
    title: "Real-Time Chat Application",
    summary: "A WebSocket chat server with a server-rendered Handlebars front end.",
    context: "A standalone messaging module built to learn raw WebSocket handling without a framework like Socket.IO.",
    role: "Built the chat server and front end independently.",
    approach: [
      "Built a WebSocket-based chat server in Node.js with a Handlebars-rendered front end.",
      "Used Moment.js to format and display message timestamps.",
    ],
    outcomes: [
      "Working real-time messaging between multiple connected clients over raw WebSockets, with no framework abstraction between the socket layer and the app.",
    ],
    stack: ["Node.js", "WebSockets", "JavaScript", "Handlebars", "Moment.js"],
    categories: ["Full-Stack", "Real-Time"],
    screens: screens(
      "real-time-chat",
      "#14110E",
      "Relay chat desktop with conversation list and open thread.",
      "Relay chat on iPhone.",
      true,
      true,
    ),
    metrics: [
      { value: "Raw", label: "WebSockets" },
      { value: "Multi-client", label: "messaging" },
    ],
    productPath: "relay.local",
    featured: false,
    visibility: "public",
  },
  {
    slug: "task-manager",
    title: "Task Manager",
    summary: "An authenticated task-management API with JWT sessions and SendGrid email verification.",
    context: "A backend service built to practice authenticated REST API design ahead of pairing it with a client application.",
    role: "Built the API, authentication, and email verification independently.",
    approach: [
      "Built JWT-based authentication and session handling.",
      "Built task CRUD and per-user task-management endpoints.",
      "Integrated SendGrid for email verification and account notifications.",
    ],
    outcomes: [
      "Complete authenticated backend with email verification, ready to back a task-management client.",
    ],
    stack: ["Node.js", "MongoDB", "JWT", "Express.js", "SendGrid"],
    categories: ["Full-Stack"],
    screens: screens(
      "task-manager",
      "#FBF5F1",
      "Posy task studio Today list for Mira Kapoor.",
      "Posy Today list on iPhone.",
      true,
      true,
    ),
    metrics: [
      { value: "JWT", label: "authenticated API" },
      { value: "SendGrid", label: "email verification" },
    ],
    productPath: "posy.app",
    featured: false,
    visibility: "public",
  },
  {
    slug: "smart-living",
    title: "Smart Living Dashboard",
    summary: "An Angular operations portal for smart-living communities with alerts, scheduling, and calling.",
    context: "An operations dashboard for staff managing smart-living communities, covering resident groups, emergency alerts, and communication.",
    role: "Built the Angular portal and its serverless backend independently.",
    approach: [
      "Built an Angular admin portal for managing resident groups, emergency alerts, and event scheduling.",
      "Used Firebase for push notifications and AWS SAM for serverless backend infrastructure.",
      "Added audio and video calling for resident and staff communication.",
    ],
    outcomes: [
      "One operations dashboard covering alerts, scheduling, and audio/video communication for smart-living staff.",
    ],
    stack: ["Angular", "PostgreSQL", "Firebase", "Stripe", "AWS SAM"],
    categories: ["Full-Stack", "Real-Time", "Cloud"],
    screens: screens(
      "smart-living",
      "#F7F9FC",
      "Smart Living operations overview with live alerts and community status.",
      "Smart Living overview on iPhone.",
      true,
      true,
    ),
    metrics: [
      { value: "Alerts", label: "scheduling and calling" },
      { value: "AWS SAM", label: "serverless backend" },
    ],
    productPath: "ops.smartliving.app",
    featured: false,
    visibility: "public",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
