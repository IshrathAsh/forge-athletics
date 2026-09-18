import type { Transition, Variants } from "motion/react";

/**
 * Shared motion vocabulary.
 *
 * Section 10 of the brief asks for fast and purposeful motion and bans slow
 * transitions, excessive bouncing and random animation. So: short durations,
 * one easing curve, and springs only where a user is directly manipulating
 * something.
 */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN = [0.7, 0, 0.84, 0] as const;

export const DURATION = { fast: 0.14, base: 0.22, slow: 0.38 } as const;

export const SPRING: Transition = { type: "spring", stiffness: 320, damping: 28, mass: 0.7 };

export const TRANSITION = {
  fast: { duration: DURATION.fast, ease: EASE_OUT },
  base: { duration: DURATION.base, ease: EASE_OUT },
  slow: { duration: DURATION.slow, ease: EASE_OUT },
} satisfies Record<string, Transition>;

/** Viewport trigger, shared so every reveal fires at the same point. */
export const IN_VIEW = { once: true, amount: 0.3, margin: "0px 0px -12% 0px" } as const;

export const riseIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: TRANSITION.slow },
};
