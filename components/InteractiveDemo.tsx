/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Interactive App Demo
 * "Try Fitzo" — clickable phone mockup
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { fadeUp } from "@/lib/animations";
import {
  Home,
  Dumbbell,
  UtensilsCrossed,
  User,
  Check,
  Sparkles,
  Trophy,
  Flame,
  Plus,
} from "lucide-react";

/* ━━━ Demo Screen: Home ━━━ */
function DemoHome() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-neutral-800 border border-white/[0.06]" />
          <div>
            <p className="text-[9px] text-neutral-500 uppercase tracking-wider">Good morning</p>
            <p className="text-sm font-bold text-white">Guest User</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04]">
          <Flame className="w-3 h-3 text-orange-400" />
          <span className="text-xs font-bold text-white">7</span>
        </div>
      </div>

      <div className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.04]">
        <p className="text-[10px] text-neutral-500 mb-1">Today&apos;s Training</p>
        <p className="text-base font-black text-white tracking-tight">PUSH • PPL SPLIT</p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="text-[9px] text-neutral-500">6 exercises · ~55 min</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.04] text-center">
          <p className="text-[9px] text-neutral-500 uppercase mb-1">Workouts</p>
          <p className="text-xl font-bold text-white">0</p>
        </div>
        <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.04] text-center">
          <p className="text-[9px] text-neutral-500 uppercase mb-1">Calories</p>
          <p className="text-xl font-bold text-white">0 <span className="text-[9px] font-normal text-neutral-600">kcal</span></p>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 py-2 rounded-xl bg-white text-black text-[11px] font-semibold flex items-center justify-center gap-1.5">
          <Plus className="w-3 h-3" /> Start Workout
        </button>
        <button className="flex-1 py-2 rounded-xl bg-white/[0.06] border border-white/[0.06] text-[11px] font-semibold text-white flex items-center justify-center gap-1.5">
          <Plus className="w-3 h-3 text-neutral-400" /> Log Food
        </button>
      </div>

      <div className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.04]">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="w-3.5 h-3.5 text-yellow-400" />
          <p className="text-[10px] font-semibold text-white">Weekly Challenge</p>
        </div>
        <p className="text-[10px] text-neutral-500">Complete 4 workouts this week</p>
        <div className="h-1.5 rounded-full bg-white/[0.06] mt-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "25%" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full rounded-full bg-yellow-400"
          />
        </div>
        <p className="text-[8px] text-neutral-600 mt-1">1/4 completed</p>
      </div>
    </div>
  );
}

/* ━━━ Demo Screen: Workout ━━━ */
function DemoWorkout() {
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  const exercises = [
    { name: "Flat Bench Press", sets: "4 × 8-10", muscle: "Chest" },
    { name: "Incline DB Press", sets: "3 × 10-12", muscle: "Upper Chest" },
    { name: "Cable Flyes", sets: "3 × 12-15", muscle: "Chest" },
    { name: "Overhead Press", sets: "4 × 8-10", muscle: "Shoulders" },
    { name: "Lateral Raises", sets: "3 × 15", muscle: "Side Delts" },
    { name: "Tricep Pushdown", sets: "3 × 12", muscle: "Triceps" },
  ];

  const toggleExercise = (i: number) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Push Day</p>
          <p className="text-base font-black text-white tracking-tight">PPL SPLIT</p>
        </div>
        <span className="text-[10px] px-2.5 py-1 rounded-full bg-green-400/10 text-green-400 font-semibold border border-green-400/20">
          {completed.size}/{exercises.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          animate={{ width: `${(completed.size / exercises.length) * 100}%` }}
          transition={{ duration: 0.3 }}
          className="h-full rounded-full bg-green-400"
        />
      </div>

      <div className="space-y-1.5 max-h-[320px] overflow-y-auto">
        {exercises.map((ex, i) => (
          <motion.button
            key={ex.name}
            onClick={() => toggleExercise(i)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`w-full flex items-center gap-3 p-2.5 rounded-xl border transition-all duration-200 text-left ${
              completed.has(i)
                ? "bg-white/[0.04] border-white/[0.06]"
                : "border-white/[0.03] hover:bg-white/[0.02]"
            }`}
          >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
              completed.has(i) ? "bg-green-400" : "border border-neutral-700"
            }`}>
              {completed.has(i) && <Check className="w-3 h-3 text-black" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-[11px] font-semibold ${completed.has(i) ? "text-neutral-400 line-through" : "text-white"}`}>
                {ex.name}
              </p>
              <p className="text-[9px] text-neutral-600">{ex.sets} · {ex.muscle}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <p className="text-[9px] text-neutral-600 text-center">Tap exercises to mark complete</p>
    </div>
  );
}

/* ━━━ Demo Screen: Nutrition ━━━ */
function DemoNutrition() {
  const [logged, setLogged] = useState<Set<number>>(new Set());
  const foods = [
    { name: "Paneer Tikka", cal: 265, protein: 18, emoji: "🧀" },
    { name: "Chicken Biryani", cal: 490, protein: 32, emoji: "🍗" },
    { name: "Masala Oats", cal: 220, protein: 8, emoji: "🥣" },
    { name: "Whey Protein", cal: 120, protein: 24, emoji: "🥤" },
    { name: "Dal Chawal", cal: 350, protein: 14, emoji: "🍛" },
  ];

  const totalCal = foods.reduce((sum, f, i) => sum + (logged.has(i) ? f.cal : 0), 0);
  const totalProtein = foods.reduce((sum, f, i) => sum + (logged.has(i) ? f.protein : 0), 0);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-base font-black text-white">Nutrition</p>
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-white" />
          <span className="text-[10px] text-neutral-400">AI Coach</span>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.04] text-center">
          <p className="text-[9px] text-neutral-500 uppercase">Calories</p>
          <motion.p
            key={totalCal}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-lg font-bold text-white"
          >
            {totalCal}
          </motion.p>
          <p className="text-[8px] text-neutral-600">/ 2000 kcal</p>
        </div>
        <div className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.04] text-center">
          <p className="text-[9px] text-neutral-500 uppercase">Protein</p>
          <motion.p
            key={totalProtein}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-lg font-bold text-green-400"
          >
            {totalProtein}g
          </motion.p>
          <p className="text-[8px] text-neutral-600">/ 150g target</p>
        </div>
      </div>

      {/* Food list */}
      <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Tap to log food</p>
      <div className="space-y-1.5">
        {foods.map((food, i) => (
          <motion.button
            key={food.name}
            onClick={() => {
              setLogged((prev) => {
                const next = new Set(prev);
                if (next.has(i)) next.delete(i);
                else next.add(i);
                return next;
              });
            }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`w-full flex items-center gap-3 p-2.5 rounded-xl border transition-all duration-200 text-left ${
              logged.has(i) ? "bg-green-400/5 border-green-400/20" : "border-white/[0.04] hover:bg-white/[0.02]"
            }`}
          >
            <span className="text-base">{food.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-white">{food.name}</p>
              <p className="text-[9px] text-neutral-500">{food.protein}g protein</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-white">{food.cal}</p>
              <p className="text-[8px] text-neutral-600">kcal</p>
            </div>
            {logged.has(i) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-4 h-4 rounded-full bg-green-400 flex items-center justify-center"
              >
                <Check className="w-2.5 h-2.5 text-black" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/* ━━━ Demo Screen: Profile ━━━ */
function DemoProfile() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
          <span className="text-lg font-bold text-black">GU</span>
        </div>
        <div>
          <p className="text-base font-bold text-white">Guest User</p>
          <p className="text-[10px] text-neutral-500">Level 1 · 0 XP</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Workouts", value: "0" },
          { label: "Streak", value: "0d" },
          { label: "Weight", value: "—" },
        ].map((s) => (
          <div key={s.label} className="bg-white/[0.04] rounded-xl p-2.5 text-center border border-white/[0.04]">
            <p className="text-sm font-bold text-white">{s.value}</p>
            <p className="text-[8px] text-neutral-600 uppercase">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div>
        <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-2">Achievements</p>
        <div className="grid grid-cols-4 gap-2">
          {["🏋️", "🔥", "📚", "🎯"].map((emoji, i) => (
            <motion.div
              key={emoji}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: i === 0 ? 1 : 0.3, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className={`aspect-square rounded-xl flex items-center justify-center text-xl ${
                i === 0 ? "bg-white/[0.06] border border-white/[0.08]" : "bg-white/[0.02] border border-white/[0.03]"
              }`}
            >
              {emoji}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Settings preview */}
      <div className="space-y-1">
        <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-2">Quick Settings</p>
        {[
          { label: "Training Split", value: "PPL" },
          { label: "Calorie Target", value: "2000 kcal" },
          { label: "Protein Goal", value: "150g" },
        ].map((setting) => (
          <div key={setting.label} className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.03]">
            <span className="text-[11px] text-neutral-400">{setting.label}</span>
            <span className="text-[11px] font-semibold text-white">{setting.value}</span>
          </div>
        ))}
      </div>

      <p className="text-[9px] text-neutral-600 text-center pt-2">
        Download Fitzo to unlock your full profile
      </p>
    </div>
  );
}

/* ━━━ Tab Data ━━━ */
const tabs = [
  { label: "Home", icon: Home, component: DemoHome },
  { label: "Workout", icon: Dumbbell, component: DemoWorkout },
  { label: "Nutrition", icon: UtensilsCrossed, component: DemoNutrition },
  { label: "Profile", icon: User, component: DemoProfile },
];

export default function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const ActiveScreen = tabs[activeTab].component;

  return (
    <section id="demo" className="relative py-16 sm:py-24 bg-black">
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
            Interactive
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            Try Fitzo.<br />
            <span className="text-neutral-500">No Download Required.</span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-500 max-w-2xl mx-auto">
            Tap around. Explore the features. See why lifters love it.
          </p>
        </motion.div>

        {/* Phone Demo */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div className="relative w-[300px] sm:w-[320px] h-[620px] sm:h-[660px] rounded-[2.5rem] border border-white/[0.08] bg-[#0c0c0c] shadow-[0_0_100px_rgba(255,255,255,0.03)] overflow-hidden">
            {/* Status bar */}
            <div className="flex items-center justify-between px-6 pt-3 pb-1">
              <span className="text-[10px] text-neutral-500 font-medium">9:41</span>
              <div className="w-[72px] h-[22px] rounded-full bg-black" />
              <div className="flex items-center gap-1">
                <div className="w-[15px] h-[10px] rounded-[2px] border border-neutral-600" />
              </div>
            </div>

            {/* Screen Content */}
            <div className="px-4 pt-2 h-[calc(100%-7rem)] overflow-y-auto scrollbar-hide">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
                >
                  <ActiveScreen />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Tab Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-[#0c0c0c] border-t border-white/[0.04] flex items-center justify-around px-6">
              {tabs.map((tab, i) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(i)}
                    className="flex flex-col items-center gap-0.5 relative"
                  >
                    <Icon className={`w-5 h-5 transition-colors duration-200 ${activeTab === i ? "text-white" : "text-neutral-600"}`} />
                    <span className={`text-[8px] transition-colors duration-200 ${activeTab === i ? "text-white" : "text-neutral-600"}`}>
                      {tab.label}
                    </span>
                    {activeTab === i && (
                      <motion.div
                        layoutId="demo-tab-indicator"
                        className="absolute -top-2 w-8 h-0.5 rounded-full bg-white"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CTA below phone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-neutral-500 text-sm mb-4">
              Love it? Get the real thing.
            </p>
            <div className="flex gap-3 justify-center">
              <a
                href="#download"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Download iOS
              </a>
              <a
                href="#download"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white font-semibold text-sm hover:bg-white/[0.1] transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z"/>
                </svg>
                Google Play
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
