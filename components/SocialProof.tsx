/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Social Proof Bar
 * Infinite marquee with brand logos
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { Marquee } from "@/components/magicui/marquee";

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

function BrandItem({ name }: { name: string }) {
  return (
    <div className="bg-white/[0.05] dark:bg-white/[0.05] border border-white/[0.08] rounded-xl px-6 py-3">
      <span className="text-sm sm:text-base font-bold tracking-[0.15em] text-neutral-700 dark:text-neutral-300 hover:text-neutral-400 dark:hover:text-neutral-100 transition-colors duration-300 cursor-default select-none whitespace-nowrap">
        {name}
      </span>
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
        <p className="text-center text-[11px] uppercase tracking-[0.25em] text-neutral-600 dark:text-neutral-400 mb-10">
          Trusted by athletes from
        </p>

        {/* Infinite Marquee */}
        <div className="flex flex-col gap-4">
          <Marquee
            className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
            pauseOnHover
          >
            {BRANDS.map((brand) => (
              <BrandItem key={brand} name={brand} />
            ))}
          </Marquee>

          <Marquee
            className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
            reverse
            pauseOnHover
          >
            {BRANDS.map((brand) => (
              <BrandItem key={brand} name={brand} />
            ))}
          </Marquee>
        </div>
      </div>
    </motion.section>
  );
}
