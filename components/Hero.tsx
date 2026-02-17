/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Hero Section
 * B&W design with actual app dashboard mockup
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Check, WifiOff, Shield } from "lucide-react";
import {
  staggerContainer,
  staggerItem,
  floatAnimation,
} from "@/lib/animations";

/* ━━━ Phone Mockup — matches actual Fitzo dashboard ━━━ */
function PhoneMockup() {
  return (
    <div className="relative w-[280px] sm:w-[300px] h-[580px] sm:h-[620px] rounded-[2.5rem] border border-white/[0.08] bg-[#0c0c0c] shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden">
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-3 pb-1">
        <span className="text-[10px] text-neutral-500 font-medium">9:41</span>
        <div className="w-[72px] h-[22px] rounded-full bg-black" />
        <div className="flex items-center gap-1">
          <div className="w-[15px] h-[10px] rounded-[2px] border border-neutral-600" />
        </div>
      </div>

      {/* App Content */}
      <div className="px-4 pt-1 space-y-3.5">
        {/* User Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-neutral-800 border border-white/[0.06]" />
            <div>
              <p className="text-[9px] text-neutral-500 uppercase tracking-wider font-medium">Consistency Matters.</p>
              <p className="text-sm font-bold text-white">Ojas</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center">
              <span className="text-[10px]">🔥</span>
            </div>
            <span className="text-xs font-bold text-white">0</span>
          </div>
        </div>

        {/* Today's Training */}
        <div>
          <p className="text-[10px] text-neutral-500 mb-0.5">Today&apos;s Training</p>
          <p className="text-lg font-black tracking-tight text-white">ANTERIOR • CUSTOM</p>
          <p className="text-[10px] text-neutral-600 flex items-center gap-1 mt-0.5">
            <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 2L3.5 7.5 1.5 5.5" />
            </svg>
            Tap to change
          </p>
        </div>

        {/* Completed Today */}
        <div className="bg-white/[0.04] rounded-2xl p-3.5 border border-white/[0.04]">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-black" />
            </div>
            <span className="text-[11px] font-semibold text-white uppercase tracking-wider">Completed Today</span>
          </div>
          <div className="flex">
            <div className="flex-1 text-center border-r border-white/[0.06]">
              <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-0.5">Workouts</p>
              <p className="text-2xl font-bold text-white">1</p>
            </div>
            <div className="flex-1 text-center">
              <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-0.5">Calories Logged</p>
              <p className="text-2xl font-bold text-white">0 <span className="text-xs font-normal text-neutral-500">kcal</span></p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="flex-1 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.06] text-[11px] font-semibold text-white flex items-center justify-center gap-1.5">
            <span className="text-neutral-400">+</span> Log Workout
          </button>
          <button className="flex-1 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.06] text-[11px] font-semibold text-white flex items-center justify-center gap-1.5">
            <span className="text-neutral-400">+</span> Log Calories
          </button>
        </div>

        {/* Today's Nutrition */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-bold text-white">Today&apos;s Nutrition</p>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Log Food</p>
          </div>
          <div className="bg-white/[0.04] rounded-2xl p-4 border border-white/[0.04]">
            <div className="flex items-center gap-4">
              {/* Calorie Ring */}
              <div className="relative w-16 h-16 flex-shrink-0">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="27" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
                  <circle cx="32" cy="32" r="27" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeDasharray="170 170" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm font-bold text-white leading-none">2000</span>
                  <span className="text-[7px] text-neutral-500 uppercase tracking-wider">Remaining</span>
                </div>
              </div>
              {/* Macro Bars */}
              <div className="flex-1 space-y-2">
                {[
                  { label: "Protein", current: "0g", target: "150g", color: "bg-green-400", dot: "bg-green-400" },
                  { label: "Carbs", current: "0g", target: "200g", color: "bg-yellow-400", dot: "bg-yellow-400" },
                  { label: "Fat", current: "0g", target: "65g", color: "bg-rose-400", dot: "bg-rose-400" },
                ].map((m) => (
                  <div key={m.label} className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
                    <span className="text-[10px] text-neutral-400 w-10">{m.label}</span>
                    <div className="flex-1 h-1 rounded-full bg-white/[0.06]">
                      <div className={`h-full rounded-full ${m.color} w-0`} />
                    </div>
                    <span className="text-[9px] text-neutral-500">{m.current} / {m.target}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-[#0c0c0c] border-t border-white/[0.04] flex items-center justify-around px-4">
        {[
          { label: "Home", active: true },
          { label: "Buddies", active: false },
          { label: "", active: false, isAdd: true },
          { label: "Learn", active: false },
          { label: "Profile", active: false },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            {item.isAdd ? (
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center -mt-4">
                <span className="text-black text-lg font-light">+</span>
              </div>
            ) : (
              <>
                <div className={`w-5 h-5 rounded-sm ${item.active ? "bg-white" : "bg-neutral-700"}`} />
                <span className={`text-[8px] ${item.active ? "text-white" : "text-neutral-600"}`}>{item.label}</span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden pt-20 md:pt-0"
    >
      {/* Subtle radial gradient */}
      <div className="absolute inset-0 radial-fade" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-5rem)]">
          {/* ━━━ Left: Copy ━━━ */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={staggerItem} className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] text-neutral-400 border border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                V2.0 NOW AVAILABLE
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={staggerItem}
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] mb-6"
            >
              Science-Based<br />
              Consistency.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={staggerItem}
              className="text-lg sm:text-xl text-neutral-500 leading-relaxed max-w-md mx-auto lg:mx-0 mb-8"
            >
              Stop guessing. Start growing. Fitzo combines cutting-edge
              hypertrophy science with seamless tracking to ensure you never
              miss a beat in your training journey.
            </motion.p>

            {/* ━━━ CTA Buttons ━━━ */}
            <motion.div
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6"
            >
              {/* iOS */}
              <motion.a
                href="#download"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
                className="flex items-center gap-3 px-7 py-3.5 rounded-xl bg-white text-black font-semibold text-base hover:bg-neutral-200 transition-colors duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Download for iOS
              </motion.a>

              {/* Google Play */}
              <motion.a
                href="#download"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
                className="flex items-center gap-3 px-7 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white font-semibold text-base hover:bg-white/[0.1] transition-colors duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z"/>
                </svg>
                Google Play
              </motion.a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={staggerItem}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              {[
                { icon: <Check className="w-3 h-3" />, label: "No Ads" },
                { icon: <Shield className="w-3 h-3" />, label: "Privacy First" },
                { icon: <WifiOff className="w-3 h-3" />, label: "Offline Mode" },
              ].map((badge) => (
                <span
                  key={badge.label}
                  className="flex items-center gap-1.5 text-[12px] text-neutral-500"
                >
                  <span className="text-green-400">{badge.icon}</span>
                  {badge.label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ━━━ Right: Phone Mockup ━━━ */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            style={{ rotateY, y: phoneY, perspective: 1200 }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div {...floatAnimation} className="relative">
              {/* Subtle glow */}
              <div className="absolute -inset-20 bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.01] rounded-full blur-[60px] -z-10" />
              <PhoneMockup />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
