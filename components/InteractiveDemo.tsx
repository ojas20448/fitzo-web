/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Interactive App Demo
 * "Try Fitzo" — clickable phone mockup
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { rise, VIEWPORT } from "@/lib/motion";
import { BorderBeam } from "@/components/magicui/border-beam";
import {
  Home,
  Dumbbell,
  UtensilsCrossed,
  User,
  Users,
  Check,
  Sparkles,
  Trophy,
  Flame,
  Plus,
  QrCode,
  ArrowRight,
} from "lucide-react";

/* ━━━ Demo Screen: Home ━━━ */
function DemoHome() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-white/[0.09] border border-white/[0.06]" />
          <div>
            <p className="text-[9px] text-ink-muted uppercase tracking-wider">Good morning</p>
            <p className="text-sm font-bold text-white">Guest User</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04]">
          <Flame className="w-3 h-3 text-carbs" />
          <span className="text-xs font-bold text-white">7</span>
        </div>
      </div>

      <div className="well p-3">
        <p className="text-[10px] text-ink-muted mb-1">Today&apos;s Training</p>
        <p className="text-base font-black text-white tracking-tight">PUSH • PPL SPLIT</p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-protein" />
          <span className="text-[9px] text-ink-muted">6 exercises · ~55 min</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="well p-3 text-center">
          <p className="text-[9px] text-ink-muted uppercase mb-1">Workouts</p>
          <p className="text-xl font-bold text-white">0</p>
        </div>
        <div className="well p-3 text-center">
          <p className="text-[9px] text-ink-muted uppercase mb-1">Calories</p>
          <p className="text-xl font-bold text-white">0 <span className="text-[9px] font-normal text-ink-faint">kcal</span></p>
        </div>
      </div>

      {/* Decorative chrome inside the mockup — rendered as spans, not buttons,
          so keyboard users never land on a control that does nothing. */}
      <div className="flex gap-2" aria-hidden>
        <span className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white py-2.5 text-[11px] font-semibold text-black">
          <Plus className="h-3 w-3" /> Start Workout
        </span>
        <span className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.06] py-2.5 text-[11px] font-semibold text-white">
          <Plus className="h-3 w-3 text-ink-muted" /> Log Food
        </span>
      </div>

      <div className="well p-3">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="w-3.5 h-3.5 text-carbs" />
          <p className="text-[10px] font-semibold text-white">Weekly Challenge</p>
        </div>
        <p className="text-[10px] text-ink-muted">Complete 4 workouts this week</p>
        <div className="h-1.5 rounded-full bg-white/[0.06] mt-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "25%" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full rounded-full bg-carbs"
          />
        </div>
        <p className="text-[8px] text-ink-faint mt-1">1/4 completed</p>
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
          <p className="text-[10px] text-ink-muted uppercase tracking-wider">Push Day</p>
          <p className="text-base font-black text-white tracking-tight">PPL SPLIT</p>
        </div>
        <span className="text-[10px] px-2.5 py-1 rounded-full bg-protein/10 text-protein font-semibold border border-protein/25">
          {completed.size}/{exercises.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          animate={{ width: `${(completed.size / exercises.length) * 100}%` }}
          transition={{ duration: 0.3 }}
          className="h-full rounded-full bg-protein"
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
              completed.has(i) ? "bg-protein" : "border border-white/20"
            }`}>
              {completed.has(i) && <Check className="w-3 h-3 text-black" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-[11px] font-semibold ${completed.has(i) ? "text-ink-muted line-through" : "text-white"}`}>
                {ex.name}
              </p>
              <p className="text-[9px] text-ink-faint">{ex.sets} · {ex.muscle}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <p className="text-[9px] text-ink-faint text-center">Tap exercises to mark complete</p>
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
          <span className="text-[10px] text-ink-muted">AI Coach</span>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-2">
        <div className="well p-3 text-center">
          <p className="text-[9px] text-ink-muted uppercase">Calories</p>
          <motion.p
            key={totalCal}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-lg font-bold text-white"
          >
            {totalCal}
          </motion.p>
          <p className="text-[8px] text-ink-faint">/ 2000 kcal</p>
        </div>
        <div className="well p-3 text-center">
          <p className="text-[9px] text-ink-muted uppercase">Protein</p>
          <motion.p
            key={totalProtein}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-lg font-bold text-protein"
          >
            {totalProtein}g
          </motion.p>
          <p className="text-[8px] text-ink-faint">/ 150g target</p>
        </div>
      </div>

      {/* Food list */}
      <p className="text-[10px] text-ink-muted uppercase tracking-wider">Tap to log food</p>
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
              logged.has(i) ? "bg-protein/[0.06] border-protein/25" : "border-white/[0.04] hover:bg-white/[0.02]"
            }`}
          >
            <span className="text-base">{food.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-white">{food.name}</p>
              <p className="text-[9px] text-ink-muted">{food.protein}g protein</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-white">{food.cal}</p>
              <p className="text-[8px] text-ink-faint">kcal</p>
            </div>
            {logged.has(i) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-4 h-4 rounded-full bg-protein flex items-center justify-center"
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

/* ━━━ Demo Screen: Buddies ━━━ */
function DemoBuddies() {
  const [nudged, setNudged] = useState<Set<number>>(new Set());

  const buddies = [
    { name: "Rahul", intent: "Hitting Legs 🦵", status: "Checked in", active: true },
    { name: "Priya", intent: "Cardio at 7 PM", status: "Planning", active: false },
    { name: "Arjun", intent: "Push Day 💪", status: "Checked in", active: true },
    { name: "Sneha", intent: "Rest day", status: "Resting", active: false },
  ];

  const toggleNudge = (i: number) => {
    setNudged((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-base font-black text-white">Gym Buddies</p>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">
          <QrCode className="w-3 h-3 text-ink-muted" />
          <span className="text-[10px] text-ink-muted">Add via QR</span>
        </div>
      </div>

      {/* Crowd indicator */}
      <div className="well p-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-semibold text-white">Gym Crowd Right Now</p>
          <span className="text-[9px] font-semibold text-protein">Not Busy</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "35%" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full rounded-full bg-protein"
          />
        </div>
        <p className="text-[8px] text-ink-faint mt-1.5">Best time to train · 2 buddies there now</p>
      </div>

      {/* Buddy list */}
      <p className="text-[10px] text-ink-muted uppercase tracking-wider">Today&apos;s Intents · Tap to nudge</p>
      <div className="space-y-1.5">
        {buddies.map((b, i) => (
          <motion.button
            key={b.name}
            onClick={() => toggleNudge(i)}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`w-full flex items-center gap-3 p-2.5 rounded-xl border transition-all duration-200 text-left ${
              nudged.has(i) ? "bg-protein/[0.06] border-protein/25" : "border-white/[0.04] hover:bg-white/[0.02]"
            }`}
          >
            <div className="relative flex-shrink-0">
              <div className="w-9 h-9 rounded-full bg-white/[0.09]" />
              {b.active && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-protein border-2 border-[#050506]" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-white">{b.name}</p>
              <p className="text-[9px] text-ink-muted truncate">{b.intent} · {b.status}</p>
            </div>
            <motion.span
              key={nudged.has(i) ? "nudged" : "nudge"}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-[9px] px-2.5 py-1 rounded-full font-semibold flex-shrink-0 ${
                nudged.has(i)
                  ? "bg-protein/15 text-protein border border-protein/25"
                  : "bg-white/[0.06] text-ink-muted border border-white/[0.06]"
              }`}
            >
              {nudged.has(i) ? "Nudged 👊" : "Nudge"}
            </motion.span>
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
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-protein to-protein/60 flex items-center justify-center">
          <span className="text-lg font-bold text-black">GU</span>
        </div>
        <div>
          <p className="text-base font-bold text-white">Guest User</p>
          <p className="text-[10px] text-ink-muted">Level 1 · 0 XP</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Workouts", value: "0" },
          { label: "Streak", value: "0d" },
          { label: "Weight", value: "—" },
        ].map((s) => (
          <div key={s.label} className="well p-2.5 text-center">
            <p className="text-sm font-bold text-white">{s.value}</p>
            <p className="text-[8px] text-ink-faint uppercase">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div>
        <p className="text-[10px] text-ink-muted uppercase tracking-wider mb-2">Achievements</p>
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
        <p className="text-[10px] text-ink-muted uppercase tracking-wider mb-2">Quick Settings</p>
        {[
          { label: "Training Split", value: "PPL" },
          { label: "Calorie Target", value: "2000 kcal" },
          { label: "Protein Goal", value: "150g" },
        ].map((setting) => (
          <div key={setting.label} className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.03]">
            <span className="text-[11px] text-ink-muted">{setting.label}</span>
            <span className="text-[11px] font-semibold text-white">{setting.value}</span>
          </div>
        ))}
      </div>

      <p className="text-[9px] text-ink-faint text-center pt-2">
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
  { label: "Buddies", icon: Users, component: DemoBuddies },
  { label: "Profile", icon: User, component: DemoProfile },
];

export default function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const ActiveScreen = tabs[activeTab].component;

  return (
    <section id="demo" className="relative py-14 sm:py-24 lg:py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-[0.95fr_1fr] lg:gap-16">
        {/* Header */}
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <span className="kicker mb-6">Interactive</span>
          <h2 className="text-[clamp(2rem,4.6vw,3.25rem)] font-black leading-[0.98] tracking-[-0.04em] text-balance">
            Try Fitzo.
            <br />
            <span className="text-ink-faint">No download required.</span>
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-muted text-pretty">
            Tap through five screens of the real app. Log a set, tick off a
            meal, nudge a buddy — it all responds.
          </p>
        </motion.div>

        {/* Phone Demo */}
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="flex flex-col items-center"
        >
          <div className="relative h-[560px] w-[288px] sm:h-[660px] sm:w-[320px] rounded-[2.5rem] border border-white/[0.08] bg-panel shadow-[0_0_100px_rgba(255,255,255,0.03)] overflow-hidden">
            {/* BorderBeam */}
            <BorderBeam
              size={150}
              duration={8}
              colorFrom="#4ade80"
              colorTo="#ffffff"
              delay={0}
            />

            {/* Status bar */}
            <div className="flex items-center justify-between px-6 pt-3 pb-1">
              <span className="text-[10px] text-ink-muted font-medium">9:41</span>
              <div className="w-[72px] h-[22px] rounded-full bg-black" />
              <div className="flex items-center gap-1">
                <div className="w-[15px] h-[10px] rounded-[2px] border border-neutral-600" />
              </div>
            </div>

            {/* Screen Content */}
            <div className="relative h-[calc(100%-2.75rem)] overflow-hidden">
              {/* Crossfade in place. mode="wait" ran exit (0.25s) fully before
                  enter, so the phone went blank between every tab — the exact
                  defect the hero phone was rebuilt to remove. */}
              <AnimatePresence initial={false}>
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.006 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="scrollbar-hide absolute inset-0 overflow-y-auto px-4 pb-[4.75rem] pt-2"
                >
                  <ActiveScreen />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Tab Bar Dock */}
            <div className="absolute bottom-3 left-3 right-3 h-14 bg-black/80 backdrop-blur-md border border-white/[0.08] rounded-2xl flex items-center justify-around px-2 z-20">
              {tabs.map((tab, i) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(i)}
                    className="relative flex h-11 w-11 flex-col items-center justify-center gap-0.5 rounded-lg"
                  >
                    <Icon className={`w-4 h-4 transition-all duration-300 ${activeTab === i ? "text-white scale-110" : "text-ink-muted hover:text-ink-muted"}`} />
                    <span className={`text-[8px] font-semibold tracking-tight transition-colors duration-300 mt-0.5 ${activeTab === i ? "text-white" : "text-ink-faint"}`}>
                      {tab.label}
                    </span>
                    {activeTab === i && (
                      <motion.div
                        layoutId="demo-tab-indicator"
                        className="absolute -bottom-1.5 w-4 h-[2px] bg-white rounded-full"
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
            viewport={VIEWPORT}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            {/* Honesty: these used to be "Download iOS" and "Google Play"
                buttons that both scrolled to an email form. Fitzo has no store
                listing yet, so the label now matches what the click does. */}
            <p className="mb-5 text-sm text-ink-muted">
              This is the real interface, running in your browser.
            </p>
            <motion.a
              href="#download"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.975 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition-colors duration-300 hover:bg-protein"
            >
              Get the real thing
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
            </motion.a>
            <p className="mt-4 text-xs uppercase tracking-[0.14em] text-ink-faint">
              Google Play · iOS TestFlight beta
            </p>
          </motion.div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
