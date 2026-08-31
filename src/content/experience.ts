import type { EducationItem, Experience } from "@/types/content";

export const experience: Experience[] = [
  {
    company: "Cinnova Technologies, LLC",
    title: "Senior Software Engineer",
    location: "Lahore, Pakistan",
    start: "July 2023",
    end: "Present",
    bullets: [
      "Led end-to-end delivery of SaaS and smart-home product capabilities using Angular, React, Node.js, NestJS, GraphQL, PostgreSQL, and AWS, reducing average response time by 40%.",
      "Modernized high-traffic React workflows with TanStack Router and TanStack Query, cutting page-load time by 45% and improving core user journeys.",
      "Integrated Google Nest SDM APIs and Ionic mobile capabilities for smart-home monitoring, improving device visibility and reducing critical-alert response time by 65%.",
      "Optimized AWS-hosted NestJS GraphQL services and PostgreSQL access patterns, improving query performance by 35%; implemented Stripe payments, subscriptions, and production notifications.",
      "Automated GitHub Actions CI/CD workflows and supported AWS infrastructure with 99.95% uptime, reducing deployment time by 70% and release defects.",
    ],
  },
  {
    company: "Techverx",
    title: "Software Engineer",
    location: "Lahore, Pakistan",
    start: "July 2022",
    end: "May 2023",
    bullets: [
      "Developed Next.js and React applications that improved user engagement by 35% and reduced bounce rate by 20%.",
      "Built a secure payment portal with Next.js, AWS Amplify, AppSync, Cognito, Lambda, DynamoDB, and Trust Commerce, processing 500+ daily transactions.",
      "Engineered WebSocket-based chat with sub-second message delivery for 1,000+ concurrent conversations and improved reliability for AWS-backed systems serving 10K+ concurrent users.",
    ],
  },
  {
    company: "Nestosh",
    title: "Associate Backend Engineer",
    location: "Lahore, Pakistan",
    start: "January 2022",
    end: "June 2022",
    bullets: [
      "Improved Salesforce Commerce Cloud and SFRA storefront performance, increasing page speed by 40% and conversion rate by 15%.",
      "Developed custom SFCC cartridges and third-party integrations; resolved 50+ production issues while reducing production defects by 45%.",
    ],
  },
];

export const education: EducationItem[] = [
  {
    institution: "COMSATS Institute of Information Technology",
    degree: "Bachelor of Computer Science (BCompSc)",
    location: "Lahore, Pakistan",
    start: "2018",
    end: "2022",
  },
];
