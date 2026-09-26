# WORKSPACE NOTE

This clone is inside the Cursor workspace (`azeem-designs`). Write, edit, and `npm install` here without extra permissions. Never set `required_permissions: ["all"]`. Never ask the user to approve file writes.

---

# Design 01 — Outcome split

You are implementing this variant only, in this cloned repo. Do not edit the other design folders.

## Goal

Rebuild the homepage so it feels like a senior product engineer’s site that ships working software, using Fivex Labs (`https://www.fivexlabs.com/`) as structural inspiration. This variant is the closest layout cousin: split hero, 2x2 feature cards beside a stacked process headline, centered tech stack, four alternating service chapters, closing CTA, multi-column footer.

Read `~/.cursor/skills/frontend-design/SKILL.md` and `~/.cursor/skills/unslop/SKILL.md` before writing UI or copy.

Reference images in `design-brief/`:
- `fivexlabs-hero.png`
- `fivexlabs-feature-cards.png`
- `fivexlabs-tech-stack.png`

## Locked decisions

- Hero outcome: Azeem takes an idea to a working SaaS, booking, payments, or AI product that customers can use.
- Remove resume from the project: delete `/resume`, nav links, sitemap entry, e2e routes, and the print/PDF generation path that depends on that page. Keep `public/azeem-subhani-resume.pdf` on disk. Do not put Resume in the header, footer, or hero.
- Homepage sections, in this order: header, hero, feature cards, tech stack, four service blocks, final CTA, footer.
- Skip blogs, case-study carousels, testimonials, fake metrics, and a dedicated blog section.
- `/projects` and `/contact` stay. Header nav is Home, Projects, Contact, plus a Contact CTA.
- Same coloring scheme as this project. Do not use Fivex Labs lime, chartreuse, or true black.

## Color (do not change tokens)

Solarized. Light and dark both already exist in `src/app/globals.css`. Use those CSS variables. Do not introduce a new accent.

Light: bg `#fbf7ee`, fg `#073642`, muted `#586e75`, accent `#1c827a`, border `#ebe4d3`, surface `#f4efe2`, surface-elevated `#efe9da`, accent-secondary `#268bd2`. The cream is pulled slightly off Solarized yellow, and the teal is a shade deeper so headline text and white button labels meet contrast on it.
Dark: bg `#002b36`, fg `#eee8d5`, muted `#93a1a1`, accent `#2aa198`, border `#073642`, surface `#04313d`, surface-elevated `#0a4552`.

Accent for primary buttons and the outcome word is teal (`#1c827a` light, `#2aa198` dark), not lime. Dark mode stays Solarized night, not agency black.

Fonts stay Instrument Serif (display) and Inter (UI).

## This variant’s layout

Spend the boldness on a 50/50 hero and four full-bleed service chapters. Everything else stays quieter.

```
[ name                    (Projects  Contact)     Contact ]
[ stacked outcome headline     |   product window mock     ]
[ two pill buttons             |   (booking / payments UI) ]

[ 2x2 feature cards            |   plan.                   ]
[  (faint large icons)         |   build.                  ]
[                              |   ship.   <- accent       ]
[                              |   short supporting line   ]

[          covering the stack I actually ship with         ]
[          row of monochrome stack marks                   ]

[ cloud copy                         | cloud visual        ]
[ web visual                         | web copy            ]
[ mobile copy                        | phone visual        ]
[ data visual                        | data copy           ]

[              large closing CTA + contact + email         ]

[ name / email     services     work     contact / social  ]
```

### Hero

Left: large stacked headline, lowercase, one idea per line, last word is the outcome and uses accent. Something in this spirit, rewritten in Azeem’s voice, not a Fivex clone:

take
the product
to
customers

or

ship
software
people
can
use

Right: a rounded product window (traffic-light controls, title like `live_product` or a real project name such as Track Booking Platform). Inside it, a dark Solarized phone or dashboard mock: booking slots, a payment confirmation, or a live ops metric. Subtle accent glow, not magenta. Primary CTA Contact, secondary View projects. No resume download. No blog.

### Feature cards

2x2 dark-surface cards with thin borders and a large faint outlined icon in the background. Titles and copy in first person, grounded in Azeem’s work:

1. Ship an MVP — Turn a proposal into software the first users can actually book, pay, or log into.
2. Add the hard parts — Payments, real-time, and AI features dropped into a product that already exists.
3. Untangle infrastructure — Serverless AWS, auth, and data so the product holds up past launch.
4. Custom product work — White-label booking, Stripe flows, and RAG workflows built to the business, not a template.

Right column: stacked lowercase `plan. / build. / ship.` with `ship.` in accent, plus one short sentence. Not agency we-speak.

### Tech stack

Centered. Light line, then bold accent phrase “technology stack” is allowed here because the reference does it. Then a row of monochrome marks (same color as foreground, not brand colors) for tools Azeem actually uses: Docker, React, Next.js, Angular, Node.js, NestJS, GraphQL, PostgreSQL, MySQL, MongoDB, Tailwind, Ionic, AWS. Use simple SVG or existing `stack-icons`. No .NET unless you also add a disclaimer. Do not invent Elasticsearch if it is not in `src/content/skills.ts`.

### Service blocks

Four full-width chapters, alternating text/visual. Headlines can stay close to the reference because they name real capabilities, rewritten to Azeem:

- Cloud expertise at scale — AWS Lambda, Cognito, SAM, Amplify, DynamoDB. Memorial planning portal processing 500+ authenticated payments a day.
- Web design & development — Next.js and React product UIs. The Track Booking Platform’s white-label booking sites for five venues.
- Cross mobile experiences — Ionic / Angular / React Native. The Sports Team App’s web and mobile clients on one codebase.
- Enterprise data management — PostgreSQL, DynamoDB, Firestore, RAG retrieval, Stripe and Trust Commerce transaction flows.

Each visual is a small original mock (dashboard, phone, pipeline), not a stock screenshot and not a copy of Fivex art.

### Final CTA

Large type lockup. Outcome, not vibe. Primary “Start a conversation” to `/contact`, secondary mailto. No “extraordinary.”

### Footer

Multi-column: identity + email, in-page service anchors, Projects / Contact, GitHub / LinkedIn. No blog, no resume, no fake office address.

## Copy rules

Write as Azeem, first person. Specific tools and shipped products. No “fast track,” no “we have your back,” no “cutting-edge,” no “stunning.” No em dashes. Sentence case. No ALL-CAPS eyebrows unless you have a real reason; prefer no eyebrows.

## Implementation notes

- Next.js App Router, Tailwind v4, existing Button / Header / Footer primitives.
- Restyle header toward a centered pill nav on scroll if it helps this layout. Keep theme toggle.
- Remove Experience, Certificates, Capabilities, FeaturedProjects, and SystemsMap from the homepage. You may reuse `stack-icons` and motion helpers.
- Update tests that assume `/resume` or the old homepage headings.
- Respect `prefers-reduced-motion`. Keyboard focus visible. Responsive to 360px.
- Do not commit. Do not push.
- Dev server: `npm run dev -- --port 3011`. If `node_modules` is missing, `npm install` first.

## Done when

Light and dark homepage show the sections above. Resume is gone from nav and routes. `/projects` and `/contact` still work. Write `design-brief/NOTES.md` with the headline you chose, what you reused, and how to run it.
