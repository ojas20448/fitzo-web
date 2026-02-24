/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Founder Story
 * "Built by a lifter, for lifters" — Ojas Narang
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { Code2, Dumbbell, Target } from "lucide-react";

/* ━━━ Geometric Avatar Graphic ━━━ */
function FounderGraphic() {
  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto lg:mx-0">
      {/* Outer ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
        className="absolute inset-0 rounded-full border border-white/[0.06]"
      />

      {/* Middle ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
        className="absolute inset-6 rounded-full border border-white/[0.08]"
      />

      {/* Inner filled circle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        className="absolute inset-12 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center"
      >
        {/* Geometric F initial */}
        <svg
          viewBox="0 0 60 60"
          className="w-20 h-20 sm:w-24 sm:h-24"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        >
          {/* Angular F shape */}
          <motion.path
            d="M20 48V12h22M20 30h16"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Accent dots */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="absolute top-4 right-8 w-2 h-2 rounded-full bg-green-400"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-4 w-1.5 h-1.5 rounded-full bg-white/20"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.1 }}
        className="absolute top-16 left-2 w-1 h-1 rounded-full bg-yellow-400/50"
      />
    </div>
  );
}

export default function FounderStory() {
  return (
    <section className="relative py-16 sm:py-24 bg-black">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ━━━ Left: Geometric Graphic ━━━ */}
          <div className="flex justify-center lg:justify-start">
            <FounderGraphic />
          </div>

          {/* ━━━ Right: Story ━━━ */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span
              variants={staggerItem}
              className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] text-neutral-500 border border-white/[0.06] mb-6"
            >
              Meet the Builder
            </motion.span>

            <motion.h2
              variants={staggerItem}
              className="text-4xl sm:text-5xl font-black tracking-tight mb-4"
            >
              Built by a Lifter,<br />
              <span className="text-neutral-500">for Lifters.</span>
            </motion.h2>

            <motion.div variants={staggerItem} className="mb-6">
              <p className="text-xl font-bold text-white mb-1">Ojas Narang</p>
              <p className="text-sm text-neutral-500">Founder & Developer</p>
            </motion.div>

            <motion.div variants={staggerItem} className="space-y-4 mb-8">
              <p className="text-[15px] sm:text-base text-neutral-400 leading-relaxed">
                10+ years as an athlete. Engineer by trade. I built Fitzo because
                every tracking app I tried was either bloated with social features
                nobody asked for, or completely missing the science behind real
                hypertrophy training.
              </p>
              <p className="text-[15px] sm:text-base text-neutral-400 leading-relaxed">
                Fitzo is what happens when a lifter who codes gets tired of
                settling. No venture capital, no growth hacks — just a tool I
                wanted to exist for myself and every serious lifter in India.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={staggerItem}
              className="grid grid-cols-3 gap-4"
            >
              {[
                { icon: <Dumbbell className="w-4 h-4" />, value: "10+", label: "Years Lifting" },
                { icon: <Code2 className="w-4 h-4" />, value: "50K+", label: "Lines of Code" },
                { icon: <Target className="w-4 h-4" />, value: "1", label: "Mission" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]"
                >
                  <div className="flex items-center justify-center text-neutral-600 mb-2">
                    {stat.icon}
                  </div>
                  <p className="text-xl font-black text-white">{stat.value}</p>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
