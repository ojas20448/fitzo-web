/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — How It Works Section
 * 3-step explanation  |  Magic UI upgraded
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { motion } from "framer-motion";
import { UserPlus, Dumbbell, TrendingUp } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

import { WordPullUp } from "@/components/magicui/word-pull-up";
import { MagicCard } from "@/components/magicui/magic-card";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { DotPattern } from "@/components/magicui/dot-pattern";

const steps = [
  {
    number: "01",
    icon: <UserPlus className="w-6 h-6" />,
    title: "Sign Up",
    description:
      "Create your profile in 30 seconds. Set your goals, activity level, and preferences. Our AI calculates your optimal targets.",
  },
  {
    number: "02",
    icon: <Dumbbell className="w-6 h-6" />,
    title: "Track",
    description:
      "Log workouts, scan food, track macros. All in a few taps. Works offline so you never miss a session.",
  },
  {
    number: "03",
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Progress",
    description:
      "Watch your streaks grow, earn XP, level up. Learn while you train with our gamified education module.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-16 sm:py-24 overflow-hidden">
      {/* Dot pattern background with radial fade mask */}
      <DotPattern
        className="absolute inset-0 z-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)] dark:[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)] opacity-40 dark:opacity-25"
        width={20}
        height={20}
        cr={1}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] text-neutral-500 border border-white/[0.06] mb-6">
            How It Works
          </span>

          {/* Word-by-word pull-up heading */}
          <WordPullUp
            words="Three steps to a better you"
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6"
          />
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              className="relative"
            >
              <MagicCard
                className="relative text-center p-8 h-full"
                gradientColor="rgba(255,255,255,0.08)"
                gradientSize={250}
              >
                {/* Number */}
                <span className="text-8xl font-black text-white/[0.03] dark:text-white/[0.03] absolute -top-4 left-1/2 -translate-x-1/2 select-none">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </MagicCard>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-[60%] w-[80%] h-px bg-gradient-to-r from-white/[0.1] to-transparent z-30" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a href="#waitlist">
            <ShimmerButton
              className="px-8 py-4 text-base font-semibold"
              shimmerColor="#ffffff"
              background="rgba(255,255,255,1)"
              borderRadius="12px"
            >
              <span className="text-black">Start Your Journey</span>
            </ShimmerButton>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
