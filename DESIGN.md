---
name: Cloud v3
description: Complex infrastructure made readable as one connected stack
colors:
  ink-950: "#032e32"
  ink-900: "#07393c"
  ink-700: "#155158"
  aqua-500: "#2ccfc9"
  aqua-300: "#69e4dc"
  paper-100: "#f3f0e8"
  mist-300: "#9db7b9"
typography:
  display:
    fontFamily: "Instrument Serif, ui-serif, Georgia, serif"
    fontSize: "clamp(2.875rem, 6.4vw, 4.85rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Instrument Serif, ui-serif, Georgia, serif"
    fontSize: "clamp(2.75rem, 5vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Instrument Serif, ui-serif, Georgia, serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "normal"
  body:
    fontFamily: "Manrope, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Manrope, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.18em"
rounded:
  full: "999px"
  node: "20px"
  menu: "16px"
  icon: "12px"
  item: "10px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "28px"
  lg: "40px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.aqua-500}"
    textColor: "{colors.ink-950}"
    rounded: "{rounded.full}"
    padding: "0 18px"
    height: "40px"
  button-primary-hover:
    backgroundColor: "{colors.aqua-300}"
    textColor: "{colors.ink-950}"
    rounded: "{rounded.full}"
    padding: "0 18px"
    height: "40px"
  button-cta:
    backgroundColor: "{colors.aqua-500}"
    textColor: "{colors.ink-950}"
    rounded: "{rounded.full}"
    padding: "0 22px"
    height: "48px"
  button-nav:
    backgroundColor: "transparent"
    textColor: "{colors.mist-300}"
    padding: "0 10px"
    height: "36px"
  button-icon:
    backgroundColor: "transparent"
    textColor: "{colors.mist-300}"
    rounded: "{rounded.full}"
    padding: "0"
    height: "36px"
    width: "36px"
  header-capsule:
    backgroundColor: "transparent"
    textColor: "{colors.paper-100}"
    rounded: "{rounded.full}"
    padding: "8px 22px 8px 26px"
    height: "56px"
  capability-icon:
    backgroundColor: "transparent"
    textColor: "{colors.aqua-300}"
    rounded: "{rounded.icon}"
    padding: "0"
    height: "40px"
    width: "40px"
  menu:
    backgroundColor: "{colors.ink-900}"
    textColor: "{colors.paper-100}"
    rounded: "{rounded.menu}"
    padding: "8px"
  menu-item-hover:
    backgroundColor: "rgb(44 207 201 / 10%)"
    textColor: "{colors.aqua-300}"
    rounded: "{rounded.item}"
    padding: "8px 10px"
---

# Design System: Cloud v3

## Overview

**Creative North Star: "The Readable Stack"**

This system lives on `/services/cloud/v3` only. The cream Solarized site stays the incumbent on every other route. New work on those routes keeps cream paper, Solarized ink, and the existing chrome. These tokens do not travel.

The page is one almost-black ocean-green field. Type carries the claim a product grid would fake. Instrument Serif states the line. Manrope keeps the reading quiet. Aqua appears only when something is live: the Contact pill, the kicker tick, the cloud stroke, the joints on the diagram.

It refuses SaaS card grids, logo walls, and dashboard chrome. Proof sits on the field between two hairline rules. Capabilities are an outlined icon and a sentence. One topology diagram explains the stack. There are no shipping rasters. The cloud, the marks, and the nodes are SVG and CSS.

**Key Characteristics:**
- Ink-950 field with 1px ink-700 rules
- Instrument Serif for claims and operated numbers
- Manrope for body, nav, and labels
- Aqua as live signal, never a wash
- Outlined capsule header
- Icon-and-copy pairs with no filled cards
- One topology diagram, four orthogonal connectors

## Colors

The palette is a dark ocean with one live wire. Warm paper for speech, mist for reading, aqua for the pulse.

### Primary
- **Live Aqua** (`aqua-500`): Contact, the closer action, the kicker tick, the cloud stroke, and the joints. If a screen has aqua in more than those places, it has too much.
- **Signal Aqua** (`aqua-300`): Kicker text, hover on the action, hot diagram nodes, and the focus ring. The brighter twin of Live Aqua, used when the signal needs to lift.

### Neutral
- **Ocean Ink** (`ink-950`): The field. Page background, action text on aqua, selection text.
- **Tide Well** (`ink-900`): Cloud fill, the services menu, diagram node fills. One step up so a surface can exist without becoming a card.
- **Harbor Rule** (`ink-700`): Every divider. Header outline, proof rules, provider ticks, footer rule, route strokes. If you need a box, start here, not with a fill.
- **Warm Paper** (`paper-100`): Headlines, the wordmark, proof numbers, capability titles. The only color allowed to shout.
- **Harbor Mist** (`mist-300`): Body, lede, nav, proof labels, footer. Reading color. If mist starts filling shapes, it has left its job.

### Named Rules
**The Live Signal Rule.** Aqua is a pulse, not a theme. It marks Contact, the kicker, the cloud stroke, joints, and hover. A filled aqua card or a teal wash is a miss.

**The Field Rule.** The page is one ink-950 field. Proof, capabilities, and the closer sit on that field. They do not sit on cards.

## Typography

**Display Font:** Instrument Serif (Georgia)
**Body Font:** Manrope (Inter, system sans)

**Character:** The serif is warm and a little old. The sans is a notebook. Together they read as an operated system, not a splash page.

### Hierarchy
- **Display** (400, `clamp(2.875rem, 6.4vw, 4.85rem)`, 0.88): Hero only. Two short lines, each on its own row. Letter-spacing sits tight (`-0.035em`). On small viewports the clamp floors at `2.75rem`.
- **Headline** (400, `clamp(2.75rem, 5vw, 3.5rem)`, 0.95): Operated numbers in the proof row. The closer headline uses the same face at `clamp(2rem, 3.4vw, 2.6rem)` and a 14ch max on desktop.
- **Title** (400, 20px, 1.1): Capability headings. One or two words. Never a sentence in the serif at this size.
- **Body** (400, 16px, 1.6): Page default. The lede drops to 15.5px / 1.65 and caps at 36rem. Capability and closer copy sit at 15px. Measure stays short.
- **Label** (600, 11px, 0.18em, uppercase): The kicker. Proof labels use 12px, 0.14em, same case. Provider names stay 13px / 500 and sentence case. Nav and Contact sit at 14px.

### Named Rules
**The Warm Display Rule.** Instrument Serif owns headlines and proof numbers. Manrope owns everything you read at 14 to 16px. Body copy in the serif is a miss.

## Layout

A centered shell, `min(100%, 1104px)`, padded `28px 48px 40px`. The first viewport is a 5/7 split. Copy on the left, the topology on the right, `40px 32px` between them, `72px 0 36px` around them.

Proof is three equal columns, centered, with `36px 0 40px` and a 1px ink-700 rule above and below. A 1px rule also splits the columns. Capabilities are three columns, `40px 28px` gutters, `64px 0 24px` padding. Five items. The last row is short and stays short. The closer is title, sentence, action in one row, `40px 0 36px`, under one more hairline.

At 900px the hero stacks and the diagram loses its right-edge lock. At 720px proof and the closer stack. At 640px the capsule keeps Contact and the theme control, the rest of the nav drops into a reveal, and capabilities become one column. Shell padding steps to `22px 24px 32px`, then `16px 20px 28px`.

Rhythm is 8, 16, 28, 40, 48. The kicker and lede use a 22px offset. That offset is local, not a new scale step.

## Elevation & Depth

The system is flat. Depth is a glow on the cloud and a 1px rule everywhere else. Surfaces do not lift.

The cloud uses two drop-shadows, `0 0 16px rgb(44 207 201 / 0.55)` and `0 0 36px rgb(105 228 220 / 0.28)`, plus a soft radial halo under it. Diagram nodes sit on ink-900 with a `#1d646b` stroke. The services menu is ink-900 with an ink-700 border. That fill shift is the only "raised" surface, and it is still a panel, not a card with a shadow.

Focus is a 2px aqua-300 ring, offset 3px. Selection inverts to aqua-500 on ink-950.

### Shadow Vocabulary
- **Cloud glow** (`filter: drop-shadow(0 0 16px rgb(44 207 201 / 0.55)) drop-shadow(0 0 36px rgb(105 228 220 / 0.28))`): The topology cloud only.
- **Cloud halo** (`radial-gradient` from `rgb(105 228 220 / 0.55)` through `rgb(44 207 201 / 0.22)` to transparent, blur 22): Sits under the cloud. Do not reuse as a page background.

### Named Rules
**The Glow-Not-Lift Rule.** Depth is the aqua halo on the cloud and a 1px rule. Boxes do not cast shadows.

## Shapes

Chrome is a pill. The header is a 56px capsule with a 1px ink-700 stroke and no fill. Contact and the closer action are filled capsules (`999px`). The theme control is a 36px circle.

The services menu is the first departure, 16px corners on an ink-900 panel. Menu rows round to 10px. Capability icons are 40px squares with 12px corners and a 1px aqua-500 stroke, empty inside. Diagram nodes are 88 by 62, 20px corners, the only soft rectangles on the page.

Routes in the diagram are orthogonal. Vertical, then horizontal, then vertical. No diagonal wires. Joints are 2.5px aqua dots.

### Named Rules
**The Capsule Chrome Rule.** The header is an outlined pill. Actions are filled capsules. Nodes are the only soft rectangles (`20px`). An 8px card radius does not belong here.

## Components

### Buttons
- **Shape:** Full capsule (`999px`).
- **Primary:** Aqua-500 fill, ink-950 text, 14px / 600, `40px` tall, `0 18px`. Used for Contact in the header.
- **Closer action:** Same fill, `48px` tall, `0 22px`, with a 14px stroke arrow.
- **Hover:** Aqua-300 fill. Transition is `180ms ease` on background only.
- **Focus:** 2px aqua-300 ring, offset 3px.
- **Ghost nav:** No fill, mist-300, `36px` tall, `0 10px`. Hover lifts toward `#d5e6e6`.
- **Icon button:** 36px circle, 16px stroke icon, same mist-to-paper hover.

### Cards / Containers
There are no cards. Capabilities, proof, and the closer sit on the field. The services menu is a bordered panel, not a content card. If a new block needs a box, give it a 1px ink-700 rule or nothing.

### Navigation
The header is an outlined capsule. Name at 15px / 500 on the left. Services, Portfolio, theme, and the aqua Contact pill on the right, 6px apart. Services opens an ink-900 menu with 10px-radius rows. Hover on a row is a 10% aqua wash and aqua-300 text.

Below 640px the right cluster becomes theme, Contact, and a menu button. The reveal is a plain list. No second capsule.

The default site header, footer, and contact shortcut are inert on this route. This page draws its own chrome.

### Capability pair
An outlined 40px icon, a 20px serif title, a 15px mist sentence. Max width 20rem on desktop. No fill, no border around the article, no hover card.

### Proof row
Three numbers on the field. 12px uppercase labels in mist. Instrument Serif values. A 1px ink-700 rule above, below, and between. The cost cell may carry a 12px "average" note. That is the only annotation.

### Topology diagram
One SVG, viewBox `0 0 560 340`. A glowing cloud in ink-900 with an aqua-500 stroke holds AWS, Azure, and GCP. Azure's mark uses aqua-300. Four independent orthogonal routes drop to Compute, Databases, Security, and Networking. Paths draw once (`1.05s`, delay `0.28s`, `cubic-bezier(0.16, 1, 0.3, 1)`). The cloud and marks fade in first. Hover on a node brightens its route and stroke. `prefers-reduced-motion` cancels the draw and the fades.

### Kicker
11px / 600, 0.18em, uppercase, aqua-300. A 36 by 1px aqua-500 tick trails the words.

## Do's and Don'ts

### Do:
- **Do** keep this world on `/services/cloud/v3`. Cream Solarized stays everywhere else.
- **Do** put proof and capabilities on the ink-950 field, split by 1px ink-700 rules.
- **Do** use aqua only as live signal. Contact, kicker, cloud stroke, joints, hover, focus.
- **Do** pair an outlined icon with a short serif title and a mist sentence.
- **Do** keep one topology diagram with four orthogonal connectors.
- **Do** honor `prefers-reduced-motion` by dropping the draw and the fades.

### Don't:
- **Don't** carry these tokens onto `/services/cloud` or any cream Solarized route.
- **Don't** build a SaaS card grid, a logo wall, or dashboard chrome.
- **Don't** fill capability icons or wrap them in cards.
- **Don't** add a second diagram, a metrics dashboard, or vendor lockup art.
- **Don't** set body copy in Instrument Serif.
- **Don't** introduce a shipping raster. The diagram stays SVG.
