/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Why switch
 *
 * A two-column argument. The status-quo column is deliberately flatter and
 * quieter than the Fitzo column — the hierarchy does the persuading, so the
 * copy doesn't have to shout.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { rise, stack, stackItem, VIEWPORT } from "@/lib/motion";

const COMPARISONS = [
  {
    generic: "Guesswork-based advice",
    fitzo: "Evidence-based methodology",
  },
  {
    generic: "Bloated with social media features",
    fitzo: "Laser-focused on training & nutrition",
  },
  {
    generic: "Inaccurate calorie tracking",
    fitzo: "AI food scanner across a 500K+ database",
  },
  {
    generic: "Cookie-cutter workout plans",
    fitzo: "10+ customisable splits for every training style",
  },
  {
    generic: "US-only food databases",
    fitzo: "Indian food first — dal, roti, paneer, biryani",
  },
  {
    generic: "Zero connection to your actual gym",
    fitzo: "QR check-in, class booking, crowd meter, trainer sync",
  },
];

export default function Comparison() {
  return (
    <section id="science" className="relative overflow-hidden py-14 sm:py-24 lg:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mb-9 max-w-2xl sm:mb-14"
        >
          <span className="kicker mb-6">Why switch</span>
          <h2 className="text-[clamp(2rem,4.6vw,3.25rem)] font-black leading-[0.98] tracking-[-0.04em] text-balance">
            Most fitness apps
            <br />
            <span className="text-ink-faint">aren&apos;t built for lifters.</span>
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-muted text-pretty">
            They&apos;re built for casual users who want a step counter. Fitzo is
            built for people who log every set.
          </p>
        </motion.div>

        <motion.div
          variants={stack}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-4 lg:grid-cols-2 sm:gap-5"
        >
          {/* ━━━ The status quo — flatter, quieter, no elevation ━━━ */}
          <motion.div
            variants={stackItem}
            className="hidden rounded-2xl border border-white/[0.06] bg-white/[0.012] p-7 sm:block sm:p-8"
          >
            <div className="mb-7 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03]">
                <X className="h-5 w-5 text-ink-faint" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-ink-muted">
                  Generic fitness apps
                </h3>
                <p className="text-xs text-ink-faint">The status quo</p>
              </div>
            </div>

            <ul className="space-y-0">
              {COMPARISONS.map((item) => (
                <li
                  key={item.generic}
                  className="flex items-start gap-3 border-t border-white/[0.05] py-3 first:border-t-0 sm:py-3.5"
                >
                  <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-fat/50" />
                  <p className="text-sm leading-relaxed text-ink-faint">
                    {item.generic}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ━━━ Fitzo — full elevation, the accent does the work ━━━ */}
          <motion.div
            variants={stackItem}
            className="panel relative overflow-hidden p-5 sm:p-8"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-protein/60 to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(74,222,128,0.07),transparent_70%)]"
            />

            <div className="relative z-10">
              <div className="mb-7 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-protein">
                  <Check className="h-5 w-5 text-black" strokeWidth={3} />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white">Fitzo</h3>
                  <p className="text-xs text-ink-faint">Built different</p>
                </div>
              </div>

              <ul className="space-y-0">
                {COMPARISONS.map((item) => (
                  <li
                    key={item.fitzo}
                    className="flex items-start gap-3 border-t border-white/[0.06] py-3 first:border-t-0 sm:py-3.5"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-protein"
                      strokeWidth={2.5}
                    />
                    <p className="text-sm leading-relaxed text-white">
                      {item.fitzo}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
