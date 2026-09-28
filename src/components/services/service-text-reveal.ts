"use client";

import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

/**
 * The text reveal the web, cloud and mobile service pages share: masked title
 * lines with a word shimmer, and blurred word-by-word copy. Each page passes its
 * own class prefix ("web", "cloud", "mobile") so the split words pick up that
 * page's `-title-word` and `-copy-word` styles. Cards just lift in as a unit.
 */
gsap.registerPlugin(SplitText);

export type RevealPrefix = "web" | "cloud" | "mobile";

export type Playable = { play(): void; kill(): void };

const ease = "power3.out";

export function splitTitle(
  title: HTMLElement,
  origin: "left bottom" | "right bottom",
  prefix: RevealPrefix,
): Playable {
  let timeline: gsap.core.Timeline | null = null;
  let started = false;

  const split = SplitText.create(title, {
    type: "lines,words",
    mask: "lines",
    linesClass: `${prefix}-title-line`,
    wordsClass: `${prefix}-title-word`,
    autoSplit: true,
    onSplit: (self) => {
      timeline = gsap
        .timeline({ paused: true, defaults: { ease } })
        .fromTo(
          self.lines,
          { yPercent: 112, rotate: origin === "right bottom" ? -0.7 : 0.7, transformOrigin: origin },
          { yPercent: 0, rotate: 0, duration: 0.72, stagger: 0.085 },
        )
        // Words shimmer in just after their line lands: opacity + tiny rise.
        .fromTo(
          self.words,
          { opacity: 0.12, y: 6 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.02 },
          0.18,
        );
      // A re-split (resize) after the reveal has started must not hide the text again.
      if (started) timeline.progress(1);
    },
  });

  return {
    play() {
      if (!started) {
        started = true;
        timeline?.play(0);
      }
    },
    kill() {
      timeline?.kill();
      split.revert();
    },
  };
}

export function copyTimeline(
  nodes: NodeListOf<HTMLElement> | HTMLElement[],
  prefix: RevealPrefix,
): Playable {
  const items = Array.from(nodes);
  let started = false;

  const anims = items.map((node) => {
    let timeline: gsap.core.Timeline | null = null;
    const split = SplitText.create(node, {
      type: "words",
      wordsClass: `${prefix}-copy-word`,
      autoSplit: true,
      onSplit: (self) => {
        timeline = gsap.timeline({ paused: true, defaults: { ease } }).fromTo(
          self.words,
          { opacity: 0, yPercent: 40, filter: "blur(4px)" },
          {
            opacity: 1,
            yPercent: 0,
            filter: "blur(0px)",
            duration: 0.6,
            stagger: Math.min(0.022, 0.5 / Math.max(self.words.length, 1)),
            clearProps: "filter",
          },
        );
        if (started) timeline.progress(1);
      },
    });
    return {
      play: () => timeline?.play(0),
      kill: () => {
        timeline?.kill();
        split.revert();
      },
    };
  });

  return {
    play() {
      if (started) return;
      started = true;
      anims.forEach((anim, index) => gsap.delayedCall(0.12 + index * 0.08, anim.play));
    },
    kill() {
      anims.forEach((anim) => anim.kill());
    },
  };
}

/** Cards lift in one after another. Their text arrives with the card, not word by word. */
export function listTimeline(nodes: NodeListOf<HTMLElement> | HTMLElement[]): Playable | null {
  const items = Array.from(nodes);
  if (!items.length) return null;

  gsap.set(items, { opacity: 0, y: 14 });
  const tl = gsap
    .timeline({ paused: true, defaults: { ease } })
    .to(items, { opacity: 1, y: 0, duration: 0.5, stagger: 0.09 }, 0);

  return {
    play: () => {
      tl.play();
    },
    kill: () => {
      tl.kill();
    },
  };
}
