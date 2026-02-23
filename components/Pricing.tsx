/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Pricing Section
 * Simple, transparent, and free for now.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { Check, Zap } from "lucide-react";

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
            
            <div className="relative glass-card rounded-3xl p-8 sm:p-12 border border-white/[0.08] bg-white/[0.01]">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Beta Access</h3>
                  <p className="text-neutral-500 text-sm mb-6">Full access to all features during beta.</p>
                  
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-white">₹0</span>
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
                <a
                  href="#waitlist"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-neutral-200 transition-all duration-300 w-full md:w-auto"
                >
                  Get Started Now
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
