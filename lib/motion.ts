/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Motion language
 *
 * One idea: the page behaves like an instrument coming online.
 * Nothing slides in from off-screen. Things *settle into calibration* —
 * short travel, a blur that resolves, an exponential ease-out that decelerates
 * hard at the end, the way a needle finds its reading.
 *
 * Five gestures, each with one job. If a section needs a sixth, it probably
 * needs less motion instead.
 *
 *   rise     section entrance      — 24px, resolves from blur
 *   settle   instrument panels     — scale lock-on, reads as a gauge finding zero
 *   sweep    readouts & rows       — clip-path fill, left to right
 *   stack    lists & grids         — accelerating stagger, not a linear conveyor
 *   press    interactive controls  — the only gesture that responds to input
 *
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">
 * in MotionProvider: travel and scale are dropped, opacity and colour survive,
 * so hierarchy and state changes stay legible. Anything driven by rAF,
 * setInterval or canvas must gate on useReducedMotion() itself.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import type { Variants, Transition } from "framer-motion";

/* ━━━ Easing: one family. Exponential out — hard deceleration at the end. ━━━ */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const DUR = {
  fast: 0.18,
  base: 0.42,
  slow: 0.9,
} as const;

/** Viewport trigger used by every scroll-revealed section. */
export const VIEWPORT = { once: true, margin: "-12% 0px -12% 0px" } as const;

const base: Transition = { duration: 0.7, ease: EASE_OUT_EXPO };

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   1 · rise — the default section entrance
   Short travel. The blur is what makes it read as focus rather than slide.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export const rise: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: base,
  },
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   2 · settle — instrument panels locking on
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export const settle: Variants = {
  hidden: { opacity: 0, scale: 0.965, y: 16, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE_OUT_EXPO },
  },
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   3 · sweep — a readout filling left to right
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export const sweep: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1.1, ease: EASE_OUT_EXPO },
  },
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   4 · stack — accelerating stagger
   Children speed up rather than marching at a fixed interval, so a long list
   never feels like a conveyor belt.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export const stack: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.06, staggerChildren: 0.055 },
  },
};

export const stackItem: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
};

/** Denser variant for tight rows (exercise lists, macro bars). */
export const stackTight: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   5 · press — the only gesture that answers input
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export const press = {
  whileHover: { y: -2, transition: { duration: DUR.fast, ease: EASE_OUT_EXPO } },
  whileTap: { scale: 0.975, transition: { duration: 0.09 } },
} as const;

/* ━━━ Spring used by counters and anything that should feel weighted. ━━━ */
export const COUNTER_SPRING = {
  stiffness: 90,
  damping: 24,
  mass: 1.1,
} as const;

/* ━━━ Helper: delay a variant without redefining it. ━━━ */
export const withDelay = (v: Variants, delay: number): Variants => ({
  hidden: v.hidden,
  visible: {
    ...(v.visible as object),
    transition: {
      ...((v.visible as { transition?: Transition })?.transition ?? base),
      delay,
    },
  },
});
