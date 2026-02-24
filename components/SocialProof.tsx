/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Social Proof Bar
 * Infinite marquee with brand logos
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
  "POWERZONE",
  "ATHLOS",
];

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex shrink-0 gap-x-12 sm:gap-x-20 items-center ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {[...BRANDS, ...BRANDS].map((brand, i) => (
          <span
            key={`${brand}-${i}`}
            className="text-sm sm:text-base font-bold tracking-[0.15em] text-neutral-700 hover:text-neutral-400 transition-colors duration-300 cursor-default select-none whitespace-nowrap"
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SocialProof() {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      id="community"
      className="relative py-12 sm:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label */}
        <p className="text-center text-[11px] uppercase tracking-[0.25em] text-neutral-600 mb-10">
          Trusted by athletes from
        </p>

        {/* Infinite Marquee */}
        <MarqueeRow />
      </div>
    </motion.section>
  );
}
