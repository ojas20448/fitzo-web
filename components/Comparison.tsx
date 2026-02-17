/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — "Why Fitzo?" Comparison Section
 * B&W side-by-side comparison
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

interface ComparisonItem {
  generic: string;
  fitzo: string;
}

const COMPARISONS: ComparisonItem[] = [
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
    fitzo: "AI-powered food scanner with 500K+ database",
  },
  {
    generic: "Cookie-cutter workout plans",
    fitzo: "10+ customizable splits for every training style",
  },
];

export default function Comparison() {
  return (
    <section id="science" className="relative py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ━━━ Section Header ━━━ */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] text-neutral-500 border border-white/[0.06] mb-6">
            Why Switch?
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            Why <span className="text-white">Fitzo</span>?
          </h2>
          <p className="text-lg sm:text-xl text-neutral-500 max-w-2xl mx-auto">
            Most fitness apps are built for casual users. Fitzo is built for
            lifters who take their training seriously.
          </p>
        </motion.div>

        {/* ━━━ Comparison Grid ━━━ */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-5xl mx-auto"
        >
          {/* ━━━ Generic Apps Column ━━━ */}
          <motion.div
            variants={staggerItem}
            className="glass-card p-8 relative opacity-60"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.04] flex items-center justify-center">
                <X className="w-5 h-5 text-neutral-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-500">
                  Generic Fitness Apps
                </h3>
                <p className="text-xs text-neutral-700">The status quo</p>
              </div>
            </div>

            <div className="space-y-4">
              {COMPARISONS.map((item, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="flex items-start gap-3 py-3 border-t border-white/[0.04] first:border-t-0"
                >
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                    <X className="w-3.5 h-3.5 text-red-400/80" />
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {item.generic}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ━━━ Fitzo Column (highlighted) ━━━ */}
          <motion.div
            variants={staggerItem}
            className="glass-card p-8 relative border-white/[0.1]"
          >
            {/* Subtle accent */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center">
                  <Check className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Fitzo</h3>
                  <p className="text-xs text-neutral-500">Built different</p>
                </div>
              </div>

              <div className="space-y-4">
                {COMPARISONS.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    className="flex items-start gap-3 py-3 border-t border-white/[0.04] first:border-t-0"
                  >
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-white/[0.08] flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {item.fitzo}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
