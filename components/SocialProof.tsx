/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Social Proof Bar
 * "Trusted by Athletes" with monochrome brand logos
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const BRANDS = [
  "IRONHOUSE",
  "SPRINT",
  "CARDIO+",
  "PEAKPERFORMANCE",
  "LIFTLAB",
  "FORGE",
];

export default function SocialProof() {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      id="community"
      className="relative py-16 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label */}
        <p className="text-center text-[11px] uppercase tracking-[0.25em] text-neutral-600 mb-10">
          Trusted by athletes from
        </p>

        {/* Brand Logos */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 sm:gap-x-16 gap-y-6">
          {BRANDS.map((brand, i) => (
            <motion.span
              key={brand}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-sm sm:text-base font-bold tracking-[0.15em] text-neutral-700 hover:text-neutral-400 transition-colors duration-300 cursor-default select-none"
            >
              {brand}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
