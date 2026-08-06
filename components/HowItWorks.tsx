/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO: How it works
 *
 * Fixed here: the closing CTA pointed at "#waitlist", an anchor that exists
 * nowhere on this page: the button silently did nothing. Every conversion
 * path on the site lands on "#download".
 *
 * The 01/02/03 numerals stay: this is an ordered sequence, so the numbers
 * carry information rather than decorating.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { motion } from "framer-motion";
import { UserPlus, QrCode, TrendingUp, ArrowRight } from "lucide-react";
import { rise, stack, stackItem, VIEWPORT, EASE_OUT_EXPO } from "@/lib/motion";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Sign up",
    glow: "shadow-[0_0_25px_rgba(74,222,128,0.15)] border-protein/40 text-protein bg-protein/10",
    dot: "bg-protein shadow-[0_0_8px_#4ade80]",
    description:
      "Build your profile in 30 seconds. Set goals, activity level and preferences: Fitzo works out your targets from there.",
  },
  {
    number: "02",
    icon: QrCode,
    title: "Check in & train",
    glow: "shadow-[0_0_25px_rgba(250,204,21,0.15)] border-carbs/40 text-carbs bg-carbs/10",
    dot: "bg-carbs shadow-[0_0_8px_#facc15]",
    description:
      "Scan your gym's QR, set today's focus, then log lifts, scan food and track macros in a few taps. Works offline.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Progress",
    glow: "shadow-[0_0_25px_rgba(34,211,238,0.15)] border-cyan-400/40 text-cyan-400 bg-cyan-400/10",
    dot: "bg-cyan-400 shadow-[0_0_8px_#22d3ee]",
    description:
      "Streaks grow, XP adds up, levels climb. Learn while you train through the built-in education module.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden py-14 sm:py-24 lg:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mb-9 max-w-2xl sm:mb-14"
        >
          <h2 className="text-[clamp(2rem,4.6vw,3.25rem)] font-black leading-[0.98] tracking-[-0.04em] text-balance">
            Three steps to
            <br />
            <span className="text-ink-faint">a better you.</span>
          </h2>
        </motion.div>

        <motion.ol
          variants={stack}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:gap-5"
        >
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={step.number}
                variants={stackItem}
                className="panel panel-interactive group relative flex flex-col p-5 sm:p-8"
              >
                {/* Step numeral: structural, sits behind the content */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-6 top-4 select-none text-[5rem] font-black leading-none tracking-tighter text-white/[0.045] transition-colors duration-300 group-hover:text-white/[0.08]"
                >
                  {step.number}
                </span>

                <div className="relative z-10 mb-2.5 flex items-center gap-3 sm:mb-6 sm:block">
                  <span className={`relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border backdrop-blur-md transition-all duration-300 group-hover:scale-105 sm:mb-6 sm:h-14 sm:w-14 ${step.glow}`}>
                    <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6" />
                    <span className={`absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full ${step.dot}`} />
                  </span>

                  <h3 className="text-lg font-bold tracking-tight text-white sm:mb-3 sm:text-xl">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                </div>
                <p className="relative z-10 max-w-[42ch] text-[15px] leading-relaxed text-ink-muted text-pretty">
                  {step.description}
                </p>
              </motion.li>
            );
          })}
        </motion.ol>

        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-10 flex justify-center sm:mt-14"
        >
          <motion.a
            href="#download"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.975 }}
            transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition-colors duration-300 hover:bg-protein"
          >
            Start your journey
            <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
