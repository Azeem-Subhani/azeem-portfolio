# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

[Inferred from the cancelled init round, the existing cloud service copy, and the v3 brief.] Technically literate visitors: founders, product leads, and engineering leads who can judge an AWS / Azure / GCP stack. They arrive to see whether Azeem can design and operate production infrastructure, then start a conversation.

## Product Purpose

This site is Azeem Subhani’s portfolio. The cloud service page sells operated infrastructure: multi-cloud systems that ship as one stack, with cost and traces treated as part of the deploy. Success on `/services/cloud` and its preview routes is a contact conversation, not a self-serve signup.

## Positioning

Azeem designs and runs the stack. The claim a neighboring portfolio cannot copy is the operated record: fifty-plus production AWS apps, a 40% average infrastructure cost cut, 99.95% uptime on the stacks he runs, and a memorial portal that is Lambda, Cognito, Amplify, and DynamoDB as one SAM stack.

## Operating Context

Visitors read service pages and project case studies, then use `/contact`. Preview routes (`/services/cloud/v2`, `/services/cloud/v3`) are isolated visual experiments and must not replace the canonical `/services/cloud` page. The site already ships a cream Solarized system on most routes; v2/v3 are dark teal landings that hide the default chrome.

## Capabilities and Constraints

- Confirmed platforms: AWS, Azure, GCP; Terraform; SAM and Serverless Framework; DigitalOcean, Heroku, Render, Vercel, Netlify, Cloudinary, Firebase, Supabase when a full cloud is too much.
- Confirmed proof: 50+ production apps on AWS; 40% average infrastructure cost cut; 99.95% uptime on stacks he runs.
- Case studies exist (e-commerce ECS migration, hybrid Azure financial platform, GCP analytics) with client names withheld. Do not invent customer names, extra benchmarks, or testimonials.
- `/services/cloud/v3` is a preview landing. Keep it noindex. Do not change the canonical service page unless asked.

## Brand Commitments

- Name: Azeem Subhani.
- Voice: specific, operational, no puffery. Prefer what ran over what is promised.
- Binding visual brief for v3: `/Users/woody/Documents/Codex/2026-09-20/ca/outputs/design.md` and its reference image. Dark teal canvas, Instrument Serif display, aqua as live signal only.
- Legal: Privacy and Terms links already exist.

## Evidence on Hand

- Service copy: `src/content/services/cloud.ts`
- Profile: `src/content/profile.ts`
- Canonical page: `/services/cloud` via `src/app/services/[slug]/page.tsx`
- v2 hero preview: `src/app/services/cloud/v2/`
- v3 visual brief and screenshot (sample interface copy in the image is garbled; treat `design.md` as the copy source, the image as composition)

Do not fabricate customers, pricing, or uptime the content does not already state.

## Product Principles

- Show a connected stack, not a logo wall.
- Proof numbers stay the ones already published.
- One action: start a conversation.
- Preview routes can replace the look; they cannot replace product facts.
- Keep the canonical service page indexed and unchanged unless the user asks.

## Accessibility & Inclusion

WCAG AA contrast on body text and controls. Visible keyboard focus. Diagram nodes need text equivalents. Theme control needs an accessible name. Honor `prefers-reduced-motion`.
