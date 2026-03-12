/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Pricing Section
 * Simple, transparent, and free for now.
 * Enhanced with Magic UI components.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { Check, Zap } from "lucide-react";
import { Meteors } from "@/components/magicui/meteors";
import { BorderBeam } from "@/components/magicui/border-beam";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Badge } from "@/components/ui/badge";

const features = [
  "Unlimited Workout Logging",
  "Full Exercise Library",
  "Indian Food Database",
  "Progress Tracking & Charts",
  "Gym Buddies & Accountability",
  "AI Form Assistant (Limited)",
  "Custom Workout Routines",
  "Data Export (CSV/JSON)",
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-16 sm:py-24 bg-black">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium bg-green-500/10 text-green-400 border border-green-500/20 mb-6">
            <Zap className="w-3 h-3 fill-current" />
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
            Everything You Need,<br />
            <span className="text-neutral-500">Completely Free.</span>
          </h2>
          <p className="text-lg text-neutral-500 max-w-xl mx-auto">
            We believe tracking your progress shouldn&apos;t come with a subscription. Fitzo is built for the community.
          </p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-px bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Card container — relative + overflow-hidden for Meteors, rounded for BorderBeam */}
            <div className="relative overflow-hidden glass-card rounded-3xl p-8 sm:p-12 border border-white/[0.08] bg-white/[0.01]">
              {/* Meteors background effect */}
              <Meteors number={20} />

              {/* BorderBeam animated border — green to white, 10s loop */}
              <BorderBeam
                size={250}
                duration={10}
                colorFrom="#4ade80"
                colorTo="#ffffff"
              />

              {/* Most Popular Badge */}
              <div className="flex justify-center mb-6">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30 text-[11px] uppercase tracking-wider px-3 py-1">
                  Most Popular
                </Badge>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Beta Access</h3>
                  <p className="text-neutral-500 text-sm mb-6">Full access to all features during beta.</p>

                  <div className="flex items-baseline gap-1">
                    <SparklesText
                      text="₹0"
                      className="text-5xl font-black text-white"
                      sparklesCount={8}
                    />
                    <span className="text-neutral-500">/ forever</span>
                  </div>
                </div>

                <div className="flex-1 w-full max-w-xs">
                  <ul className="space-y-4">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-green-400" />
                        </div>
                        <span className="text-sm text-neutral-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-white/[0.04] text-center">
                <a href="#waitlist" className="inline-block w-full md:w-auto">
                  <ShimmerButton
                    className="px-8 py-4 text-base font-bold w-full md:w-auto"
                    shimmerColor="#4ade80"
                    background="linear-gradient(135deg, #16a34a 0%, #15803d 100%)"
                    borderRadius="12px"
                  >
                    Get Started Now
                  </ShimmerButton>
                </a>
                <p className="mt-4 text-xs text-neutral-600">
                  No credit card required. No hidden fees.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
