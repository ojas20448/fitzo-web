/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Features Bento Grid
 * B&W asymmetric grid with app screen mockups
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { motion } from "framer-motion";
import {
  Dumbbell,
  BookOpen,
  Users,
  Sparkles,
  ScanLine,
  Target,
  Check,
} from "lucide-react";
import {
  staggerContainer,
  bentoItemVariants,
  fadeUp,
} from "@/lib/animations";

/* ━━━ Mini App Screen: Dashboard ━━━ */
function DashboardMini() {
  return (
    <div className="bg-[#0c0c0c] rounded-xl p-3 border border-white/[0.04] space-y-2.5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-neutral-800" />
        <div>
          <p className="text-[8px] text-neutral-600 uppercase tracking-wider">Consistency Matters.</p>
          <p className="text-[10px] font-bold text-white">Ojas</p>
        </div>
      </div>
      {/* Training */}
      <div>
        <p className="text-[8px] text-neutral-600">Today&apos;s Training</p>
        <p className="text-xs font-black text-white tracking-tight">ANTERIOR • CUSTOM</p>
      </div>
      {/* Stats */}
      <div className="flex gap-2">
        <div className="flex-1 bg-white/[0.03] rounded-lg p-2 text-center">
          <p className="text-[8px] text-neutral-500 uppercase">Workouts</p>
          <p className="text-sm font-bold text-white">1</p>
        </div>
        <div className="flex-1 bg-white/[0.03] rounded-lg p-2 text-center">
          <p className="text-[8px] text-neutral-500 uppercase">Calories</p>
          <p className="text-sm font-bold text-white">0</p>
        </div>
      </div>
    </div>
  );
}

/* ━━━ Mini App Screen: Learn Tab ━━━ */
function LearnMini() {
  return (
    <div className="bg-[#0c0c0c] rounded-xl p-3 border border-white/[0.04] space-y-2">
      <p className="text-[8px] text-neutral-500 uppercase tracking-wider">Learn • Path</p>
      <p className="text-xs font-bold text-white">Nutrition Fundamentals</p>
      {/* Progress */}
      <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "38%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="h-full rounded-full bg-white"
        />
      </div>
      <p className="text-[8px] text-neutral-600">3/8 lessons</p>
      {/* Lessons */}
      {[
        { title: "What are Calories?", xp: "+50 XP", done: true },
        { title: "Protein: Building Block", xp: "+50 XP", done: true },
        { title: "Carbs & Fat", xp: "+75 XP", done: false },
      ].map((l) => (
        <div key={l.title} className="flex items-center gap-2 py-1">
          <div className={`w-3 h-3 rounded-full ${l.done ? "bg-white" : "border border-neutral-700"} flex items-center justify-center flex-shrink-0`}>
            {l.done && <Check className="w-1.5 h-1.5 text-black" />}
          </div>
          <span className={`text-[9px] flex-1 ${l.done ? "text-neutral-400" : "text-neutral-300"}`}>{l.title}</span>
          <span className="text-[8px] text-neutral-600">{l.xp}</span>
        </div>
      ))}
    </div>
  );
}

/* ━━━ Mini App Screen: Gym Buddies ━━━ */
function BuddiesMini() {
  return (
    <div className="bg-[#0c0c0c] rounded-xl p-3 border border-white/[0.04] space-y-2.5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-white">Gym Buddies</p>
        <span className="text-[8px] text-neutral-600 uppercase tracking-wider">Add</span>
      </div>
      {/* Buddy list */}
      {[
        { name: "Alex", status: "Working out now", active: true },
        { name: "Sarah", status: "Last active 2h ago", active: false },
        { name: "Mike", status: "3 day streak 🔥", active: true },
      ].map((b) => (
        <div key={b.name} className="flex items-center gap-2.5 py-1.5 border-t border-white/[0.03] first:border-t-0">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-neutral-800" />
            {b.active && <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#0c0c0c]" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold text-white">{b.name}</p>
            <p className="text-[8px] text-neutral-500 truncate">{b.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ━━━ Mini App Screen: Food Search / AI ━━━ */
function FoodSearchMini() {
  return (
    <div className="bg-[#0c0c0c] rounded-xl p-3 border border-white/[0.04] space-y-2">
      <p className="text-xs font-bold text-white">Add Food</p>
      {/* Search bar */}
      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.04]">
        <ScanLine className="w-3 h-3 text-neutral-600" />
        <span className="text-[9px] text-neutral-500">Search or scan food…</span>
      </div>
      {/* AI chip */}
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.04] w-fit">
        <Sparkles className="w-3 h-3 text-white" />
        <span className="text-[9px] text-neutral-400">AI Analysis</span>
      </div>
      {/* Results */}
      {[
        { name: "Chicken Breast", cal: "165 kcal", per: "100g" },
        { name: "Brown Rice", cal: "112 kcal", per: "100g" },
        { name: "Greek Yogurt", cal: "59 kcal", per: "100g" },
      ].map((f) => (
        <div key={f.name} className="flex items-center justify-between py-1 border-t border-white/[0.03]">
          <span className="text-[9px] text-neutral-300">{f.name}</span>
          <div className="text-right">
            <span className="text-[9px] font-semibold text-white">{f.cal}</span>
            <span className="text-[8px] text-neutral-600 ml-1">/ {f.per}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ━━━ Mini App Screen: Fitness Profile ━━━ */
function ProfileMini() {
  return (
    <div className="bg-[#0c0c0c] rounded-xl p-3 border border-white/[0.04] space-y-2.5">
      <p className="text-xs font-bold text-white">Fitness Profile</p>
      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-1.5">
        {[
          { label: "Height", value: "5'10\"" },
          { label: "Weight", value: "165 lbs" },
          { label: "BMI", value: "23.7" },
          { label: "Activity", value: "High" },
        ].map((s) => (
          <div key={s.label} className="bg-white/[0.03] rounded-lg p-2 text-center">
            <p className="text-[7px] text-neutral-600 uppercase tracking-wider">{s.label}</p>
            <p className="text-[10px] font-bold text-white">{s.value}</p>
          </div>
        ))}
      </div>
      {/* Goal */}
      <div>
        <p className="text-[8px] text-neutral-600 uppercase tracking-wider mb-1">Goal</p>
        <div className="flex gap-1.5">
          {["Lose Fat", "Maintain", "Build Muscle"].map((g, i) => (
            <span
              key={g}
              className={`text-[8px] px-2 py-1 rounded-full ${
                i === 2
                  ? "bg-white text-black font-semibold"
                  : "bg-white/[0.04] text-neutral-500"
              }`}
            >
              {g}
            </span>
          ))}
        </div>
      </div>
      {/* Weekly target */}
      <div className="flex items-center justify-between">
        <span className="text-[8px] text-neutral-500">Weekly workouts</span>
        <span className="text-[10px] font-bold text-white">5x / week</span>
      </div>
    </div>
  );
}

/* ━━━ Card Wrapper ━━━ */
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  children?: React.ReactNode;
  className?: string;
}

function FeatureCard({
  icon,
  title,
  description,
  badge,
  children,
  className = "",
}: FeatureCardProps) {
  return (
    <motion.div
      variants={bentoItemVariants}
      className={`glass-card p-6 hover:border-white/[0.12] transition-all duration-500 group relative overflow-hidden ${className}`}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute -inset-1 rounded-3xl bg-white/[0.02] blur-xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/[0.04] flex items-center justify-center">
              {icon}
            </div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
          </div>
          {badge && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/[0.06] text-neutral-400 border border-white/[0.04]">
              {badge}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-500 leading-relaxed mb-4">
          {description}
        </p>

        {/* Visual */}
        {children}
      </div>
    </motion.div>
  );
}

/* ━━━ Main Features Export ━━━ */
export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ━━━ Section Header ━━━ */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] text-neutral-500 border border-white/[0.06] mb-6">
            Features
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            Everything You Need.<br />
            <span className="text-neutral-500">Nothing You Don&apos;t.</span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-500 max-w-2xl mx-auto">
            No fluff, no gimmicks. Just the tools serious lifters need to track,
            progress, and dominate.
          </p>
        </motion.div>

        {/* ━━━ Bento Grid ━━━ */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {/* Card 1: Dashboard — spans 2 cols */}
          <FeatureCard
            icon={<Target className="w-5 h-5 text-white" />}
            title="Smart Dashboard"
            description="Everything you need at a glance — workouts, nutrition, streaks, and daily targets in one clean view."
            badge="V2.0"
            className="lg:col-span-2"
          >
            <DashboardMini />
          </FeatureCard>

          {/* Card 2: Workouts */}
          <FeatureCard
            icon={<Dumbbell className="w-5 h-5 text-white" />}
            title="Science-Based Workouts"
            description="10+ training splits: PPL, Upper/Lower, Bro Split, Anterior/Posterior, PHUL, PHAT, Arnold, and custom routines."
            badge="10 Splits"
          >
            <ProfileMini />
          </FeatureCard>

          {/* Card 3: Education */}
          <FeatureCard
            icon={<BookOpen className="w-5 h-5 text-white" />}
            title="Built-In Education"
            description="Learn from science-backed content while you train. Earn XP for every lesson completed."
          >
            <LearnMini />
          </FeatureCard>

          {/* Card 4: Social */}
          <FeatureCard
            icon={<Users className="w-5 h-5 text-white" />}
            title="Gym Buddies"
            description="Add gym buddies, see who&apos;s working out, and stay accountable together."
          >
            <BuddiesMini />
          </FeatureCard>

          {/* Card 5: AI Food — spans 2 cols */}
          <FeatureCard
            icon={<Sparkles className="w-5 h-5 text-white" />}
            title="AI Nutrition Coach"
            description="500K+ food database with AI-powered scanning. Get instant macro breakdowns and smart meal suggestions."
            badge="AI-Powered"
            className="lg:col-span-2"
          >
            <FoodSearchMini />
          </FeatureCard>
        </motion.div>
      </div>
    </section>
  );
}
