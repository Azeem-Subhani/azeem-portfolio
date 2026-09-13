import type { Variants } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Used only for interaction-driven states (hover, and add/remove inside
 * AnimatePresence after a user-triggered filter change). Never applied as an
 * unconditional `initial` value, so it can't get baked into server-rendered
 * HTML as a permanently hidden state. See `useReveal` for mount animations.
 */
export const projectCard: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease,
    },
  },
  hover: {
    y: -4,
    transition: {
      duration: 0.2,
      ease,
    },
  },
};
