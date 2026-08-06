"use client";

import { MotionConfig } from "framer-motion";

/**
 * reducedMotion="user" makes Framer drop transform and layout animations for
 * anyone who asks the OS for reduced motion, while opacity and colour keep
 * animating: so state changes and hierarchy stay readable instead of being
 * flattened by a blanket 0.01ms kill.
 *
 * rAF / setInterval / canvas work is not covered here and gates on
 * useReducedMotion() at its own call site.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </MotionConfig>
  );
}
