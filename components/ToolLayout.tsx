/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO: Shared tool-page shell (calculators)
 *
 * Fixes on top of the first version:
 *   · Dead end — a visitor arriving from search had no way back to the site:
 *     no logo, no nav, no link. Added the same sticky back-arrow + logo
 *     header the other secondary pages (compare, changelog) already use, so
 *     the pattern is consistent site-wide rather than invented twice.
 *   · Drift — the content card was ad-hoc `border-white/[0.08]
 *     bg-white/[0.02]`, the exact "6% border on black" anti-pattern
 *     DESIGN.md names as the reason the homepage cards were invisible. Now
 *     `.panel`.
 *   · `/noise.png` doesn't exist in `public/` — every tool page fired a
 *     silent failed request for it. Dropped; a noise overlay was never part
 *     of this design system to begin with.
 *   · No path from "calculated my BMR" to "download the app" — the whole
 *     point of free tools is the funnel. Closing CTA added, matching
 *     compare's exact copy and link.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";
import { rise, VIEWPORT, EASE_OUT_EXPO } from "@/lib/motion";
import FitzoLogo from "@/components/FitzoLogo";

interface ToolLayoutProps {
  /** Short label for the sticky header, e.g. "BMR Calculator". */
  kicker: string;
  title: string;
  description: string;
  children: ReactNode;
}

export default function ToolLayout({
  kicker,
  title,
  description,
  children,
}: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-white">
      {/* ━━━ Back to site — same pattern as /compare and /changelog ━━━ */}
      <header className="sticky top-0 z-50 border-b border-white/[0.04] bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-3 text-ink-muted transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <FitzoLogo size="sm" />
          </Link>
          <span className="text-[11px] uppercase tracking-wider text-ink-faint">
            {kicker}
          </span>
        </div>
      </header>

      <main id="main" className="relative overflow-hidden pb-16 pt-12 sm:pb-24 sm:pt-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={rise}
            initial="hidden"
            animate="visible"
            viewport={VIEWPORT}
            className="mb-10 text-center sm:mb-14"
          >
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
              {title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-ink-muted sm:text-lg">
              {description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="panel mx-auto max-w-2xl p-6 sm:p-10"
          >
            {children}
          </motion.div>

          {/* ━━━ Funnel back to the app: the point of a free tool ━━━ */}
          <motion.div
            variants={rise}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="mx-auto mt-10 max-w-2xl text-center sm:mt-14"
          >
            <p className="mb-4 text-sm text-ink-muted">
              Fitzo tracks this automatically, alongside every lift you log.
            </p>
            <Link
              href="/#download"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-protein"
            >
              Get Fitzo free
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
