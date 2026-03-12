/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Hero Section
 * Animated phone mockup cycling through 4 app screens
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Check, WifiOff, Shield, Sparkles, TrendingUp, Dumbbell } from "lucide-react";
import {
  staggerContainer,
  staggerItem,
  floatAnimation,
} from "@/lib/animations";
import { Particles } from "@/components/magicui/particles";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Badge } from "@/components/ui/badge";

const SCREEN_INTERVAL = 4000;
const SCREEN_COUNT = 4;

/* ━━━ Screen 1: Dashboard ━━━ */
function DashboardScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="px-4 pt-1 space-y-3.5"
    >
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
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="text-xs font-bold text-white"
          >
            12
          </motion.span>
        </div>
      </div>

      {/* Today's Training */}
      <div>
        <p className="text-[10px] text-neutral-500 mb-0.5">Today&apos;s Training</p>
        <p className="text-lg font-black tracking-tight text-white">ANTERIOR • CUSTOM</p>
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
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-white"
            >
              1
            </motion.p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-0.5">Calories Logged</p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold text-white"
            >
              1,840 <span className="text-xs font-normal text-neutral-500">kcal</span>
            </motion.p>
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

      {/* Today's Nutrition with animated bars */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-bold text-white">Today&apos;s Nutrition</p>
          <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Log Food</p>
        </div>
        <NutritionRing />
      </div>
    </motion.div>
  );
}

/* ━━━ Nutrition Ring (shared) ━━━ */
function NutritionRing() {
  return (
    <div className="bg-white/[0.04] rounded-2xl p-4 border border-white/[0.04]">
      <div className="flex items-center gap-4">
        {/* Calorie Ring */}
        <div className="relative w-16 h-16 flex-shrink-0">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="27" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
            <motion.circle
              cx="32" cy="32" r="27" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round"
              initial={{ strokeDasharray: "170 170", strokeDashoffset: 170 }}
              animate={{ strokeDashoffset: 30 }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-sm font-bold text-white leading-none">160</span>
            <span className="text-[7px] text-neutral-500 uppercase tracking-wider">Remaining</span>
          </div>
        </div>
        {/* Macro Bars */}
        <div className="flex-1 space-y-2">
          {[
            { label: "Protein", current: "128g", target: "150g", color: "bg-green-400", width: "85%" },
            { label: "Carbs", current: "175g", target: "200g", color: "bg-yellow-400", width: "87%" },
            { label: "Fat", current: "52g", target: "65g", color: "bg-rose-400", width: "80%" },
          ].map((m, i) => (
            <div key={m.label} className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${m.color}`} />
              <span className="text-[10px] text-neutral-400 w-10">{m.label}</span>
              <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: m.width }}
                  transition={{ duration: 1.2, delay: 0.8 + i * 0.15, ease: [0.25, 0.4, 0.25, 1] }}
                  className={`h-full rounded-full ${m.color}`}
                />
              </div>
              <span className="text-[9px] text-neutral-500">{m.current} / {m.target}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ━━━ Screen 2: Workout Log ━━━ */
function WorkoutScreen() {
  const exercises = [
    { name: "Bench Press", sets: "4 × 8", weight: "80 kg", done: true },
    { name: "Incline DB Press", sets: "3 × 10", weight: "30 kg", done: true },
    { name: "Cable Flyes", sets: "3 × 12", weight: "15 kg", done: false },
    { name: "Tricep Pushdown", sets: "3 × 12", weight: "25 kg", done: false },
    { name: "Overhead Extension", sets: "3 × 10", weight: "20 kg", done: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="px-4 pt-1 space-y-3"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Active Workout</p>
          <p className="text-lg font-black tracking-tight text-white">PUSH DAY</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-400/10 border border-green-400/20">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] font-semibold text-green-400">LIVE</span>
        </div>
      </div>

      {/* Timer */}
      <div className="text-center py-2">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-black text-white tabular-nums tracking-wider"
        >
          00:42:18
        </motion.p>
        <p className="text-[9px] text-neutral-600 uppercase tracking-wider mt-0.5">Duration</p>
      </div>

      {/* Exercise List */}
      <div className="space-y-1">
        {exercises.map((ex, i) => (
          <motion.div
            key={ex.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            className={`flex items-center gap-3 p-2.5 rounded-xl ${ex.done ? "bg-white/[0.04]" : "bg-transparent"} border border-white/[0.03]`}
          >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${ex.done ? "bg-white" : "border border-neutral-700"}`}>
              {ex.done && <Check className="w-3 h-3 text-black" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-[11px] font-semibold ${ex.done ? "text-neutral-400 line-through" : "text-white"}`}>{ex.name}</p>
              <p className="text-[9px] text-neutral-600">{ex.sets} · {ex.weight}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ━━━ Screen 3: Nutrition Tracker ━━━ */
function NutritionScreen() {
  const meals = [
    { name: "Breakfast", items: "Oats + Banana + Whey", cal: 520 },
    { name: "Lunch", items: "Chicken Rice Bowl", cal: 680 },
    { name: "Snack", items: "Greek Yogurt + Almonds", cal: 280 },
    { name: "Dinner", items: "Add meal...", cal: 0, empty: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="px-4 pt-1 space-y-3"
    >
      <div className="flex items-center justify-between">
        <p className="text-lg font-black tracking-tight text-white">Nutrition</p>
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span className="text-[10px] text-neutral-400">AI Coach</span>
        </div>
      </div>

      <NutritionRing />

      {/* Meals */}
      <div className="space-y-2">
        <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Today&apos;s Meals</p>
        {meals.map((meal, i) => (
          <motion.div
            key={meal.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className={`flex items-center justify-between p-3 rounded-xl border ${meal.empty ? "border-dashed border-white/[0.06]" : "border-white/[0.04] bg-white/[0.02]"}`}
          >
            <div>
              <p className="text-[11px] font-semibold text-white">{meal.name}</p>
              <p className={`text-[9px] ${meal.empty ? "text-neutral-600" : "text-neutral-500"}`}>{meal.items}</p>
            </div>
            {!meal.empty && (
              <span className="text-[11px] font-bold text-white">{meal.cal} kcal</span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ━━━ Screen 4: Progress ━━━ */
function ProgressScreen() {
  const chartPoints = "M0,40 C20,38 40,35 60,30 C80,25 100,28 120,22 C140,18 160,15 180,10 C200,8 220,12 240,6";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="px-4 pt-1 space-y-3"
    >
      <div className="flex items-center justify-between">
        <p className="text-lg font-black tracking-tight text-white">Progress</p>
        <span className="text-[10px] text-neutral-500 uppercase tracking-wider">This Month</span>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Workouts", value: "18", icon: <Dumbbell className="w-3 h-3" /> },
          { label: "Streak", value: "12d", icon: <span className="text-[10px]">🔥</span> },
          { label: "XP", value: "2,450", icon: <TrendingUp className="w-3 h-3" /> },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
            className="bg-white/[0.04] rounded-xl p-2.5 text-center border border-white/[0.04]"
          >
            <div className="flex items-center justify-center text-neutral-500 mb-1">{s.icon}</div>
            <p className="text-sm font-bold text-white">{s.value}</p>
            <p className="text-[8px] text-neutral-600 uppercase">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white/[0.04] rounded-2xl p-4 border border-white/[0.04]">
        <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-3">Weight Progress</p>
        <svg className="w-full h-12" viewBox="0 0 240 50" fill="none">
          <motion.path
            d={chartPoints}
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          />
          <motion.path
            d={`${chartPoints} L240,50 L0,50 Z`}
            fill="url(#chartGrad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1, delay: 2 }}
          />
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.2" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <div className="flex justify-between mt-2">
          <span className="text-[9px] text-neutral-600">Week 1</span>
          <span className="text-[9px] text-neutral-600">Week 4</span>
        </div>
      </div>

      {/* Personal Records */}
      <div>
        <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-2">Recent PRs</p>
        {[
          { exercise: "Bench Press", pr: "100 kg", date: "2 days ago" },
          { exercise: "Squat", pr: "130 kg", date: "1 week ago" },
        ].map((pr, i) => (
          <motion.div
            key={pr.exercise}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + i * 0.15 }}
            className="flex items-center justify-between py-2 border-t border-white/[0.03]"
          >
            <div>
              <p className="text-[11px] font-semibold text-white">{pr.exercise}</p>
              <p className="text-[9px] text-neutral-600">{pr.date}</p>
            </div>
            <span className="text-[11px] font-bold text-green-400">{pr.pr}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ━━━ Phone Shell ━━━ */
function PhoneShell({ children, activeScreen, onScreenChange }: {
  children: React.ReactNode;
  activeScreen: number;
  onScreenChange: (i: number) => void;
}) {
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

      {/* Screen Content */}
      <div className="h-[calc(100%-7.5rem)] overflow-hidden">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-[#0c0c0c] border-t border-white/[0.04] flex items-center justify-around px-4">
        {[
          { label: "Home", idx: 0 },
          { label: "Workout", idx: 1 },
          { label: "", idx: -1, isAdd: true },
          { label: "Nutrition", idx: 2 },
          { label: "Progress", idx: 3 },
        ].map((item) => (
          <button
            key={item.label || "add"}
            onClick={() => !item.isAdd && onScreenChange(item.idx)}
            className="flex flex-col items-center gap-0.5"
          >
            {item.isAdd ? (
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center -mt-4">
                <span className="text-black text-lg font-light">+</span>
              </div>
            ) : (
              <>
                <div className={`w-5 h-5 rounded-sm transition-colors duration-200 ${activeScreen === item.idx ? "bg-white" : "bg-neutral-700"}`} />
                <span className={`text-[8px] transition-colors duration-200 ${activeScreen === item.idx ? "text-white" : "text-neutral-600"}`}>{item.label}</span>
              </>
            )}
          </button>
        ))}
      </div>

      {/* Screen Dots */}
      <div className="absolute bottom-[3.75rem] left-0 right-0 flex justify-center gap-1.5 pb-1">
        {Array.from({ length: SCREEN_COUNT }).map((_, i) => (
          <button
            key={i}
            onClick={() => onScreenChange(i)}
            className={`w-1 h-1 rounded-full transition-all duration-300 ${
              activeScreen === i ? "w-4 bg-white" : "bg-neutral-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ━━━ Screens Array ━━━ */
const screens = [DashboardScreen, WorkoutScreen, NutritionScreen, ProgressScreen];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const [activeScreen, setActiveScreen] = useState(0);

  const goToScreen = useCallback((i: number) => {
    setActiveScreen(i);
  }, []);

  // Auto-cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % SCREEN_COUNT);
    }, SCREEN_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const ActiveComponent = screens[activeScreen];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden pt-20 md:pt-0"
    >
      {/* Particle background */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={80}
        color="#ffffff"
        size={0.4}
        staticity={50}
      />
      {/* Subtle radial gradient */}
      <div className="absolute inset-0 radial-fade dark:radial-fade" />

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
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium bg-black/[0.04] dark:bg-white/[0.04] text-neutral-500 dark:text-neutral-400 border border-black/[0.06] dark:border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                V2.0 NOW AVAILABLE
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={staggerItem}
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] mb-6"
            >
              <SparklesText text="Science-Based" sparklesCount={8} /><br />
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
              <ShimmerButton
                className="flex items-center gap-3 px-7 py-3.5 text-base font-semibold"
                background="rgba(0,0,0,1)"
                shimmerColor="#ffffff"
                borderRadius="0.75rem"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Download for iOS
              </ShimmerButton>

              {/* Google Play */}
              <motion.a
                href="#download"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
                className="flex items-center gap-3 px-7 py-3.5 rounded-xl bg-black/[0.06] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.08] text-black dark:text-white font-semibold text-base hover:bg-black/[0.1] dark:hover:bg-white/[0.1] transition-colors duration-300"
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
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              {[
                { icon: <Check className="w-3 h-3" />, label: "No Ads" },
                { icon: <Shield className="w-3 h-3" />, label: "Privacy First" },
                { icon: <WifiOff className="w-3 h-3" />, label: "Offline Mode" },
              ].map((badge) => (
                <Badge
                  key={badge.label}
                  variant="outline"
                  className="flex items-center gap-1.5 text-[12px] border-black/[0.08] dark:border-white/[0.08] text-neutral-500 dark:text-neutral-400 bg-black/[0.02] dark:bg-white/[0.03] px-3 py-1"
                >
                  <span className="text-green-400">{badge.icon}</span>
                  {badge.label}
                </Badge>
              ))}
            </motion.div>
          </motion.div>

          {/* ━━━ Right: Animated Phone Mockup ━━━ */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            style={{ rotateY, y: phoneY, perspective: 1200 }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div {...floatAnimation} className="relative">
              {/* Enhanced glow */}
              <div className="absolute -inset-20 bg-gradient-to-br from-white/[0.06] via-green-400/[0.03] to-white/[0.02] rounded-full blur-[80px] -z-10" />
              <div className="relative">
                <PhoneShell activeScreen={activeScreen} onScreenChange={goToScreen}>
                  <ActiveComponent key={activeScreen} />
                </PhoneShell>
                {/* Animated border beam */}
                <BorderBeam size={250} duration={12} colorFrom="#ffffff" colorTo="#4ade80" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
