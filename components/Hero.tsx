/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO: Hero
 *
 * The phone is the argument: it runs the real app loop: dashboard, workout,
 * nutrition, progress: on a timer you can take control of. Underneath, a spec
 * plate states what the product actually reads. No claim here that the app
 * cannot already do.
 *
 * Two defects this replaces:
 *   · AnimatePresence mode="wait" left the centrepiece blank for ~800ms of
 *     every 4s cycle. Screens now crossfade in place.
 *   · The auto-cycle ignored the visitor: tapping a tab got overridden a
 *     moment later. It now yields to interaction and shows its own timer.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  Check,
  WifiOff,
  Shield,
  Sparkles,
  TrendingUp,
  Dumbbell,
  Home,
  Utensils,
  BarChart2,
  Plus,
  ArrowRight,
} from "lucide-react";
import { stack, stackItem, EASE_OUT_EXPO } from "@/lib/motion";

const SCREEN_INTERVAL = 5200;
const SCREEN_COUNT = 4;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Shared: the app's calorie ring + macro readout
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */


/* ━━━ Shared: Muscle Volume Status Anatomy Map ━━━ */
function MuscleVolumeMap() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-black/60 p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold text-white tracking-tight">Muscle Volume Status</span>
        <span className="text-[9px] text-ink-faint">Target: 6 sets/week</span>
      </div>

      <div className="grid grid-cols-2 gap-2 my-1 text-center">
        {/* FRONT BODY */}
        <div className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-2">
          <span className="text-[8px] font-bold tracking-[0.14em] text-ink-faint uppercase block mb-1">FRONT</span>
          <svg viewBox="0 0 100 150" className="h-24 mx-auto stroke-neutral-600 fill-none" strokeWidth="1.6">
            {/* Head */}
            <circle cx="50" cy="14" r="9" />
            {/* Traps/Shoulders */}
            <path d="M34 32c4-5 10-7 16-7s12 2 16 7" />
            {/* Delts */}
            <path d="M26 34c2 7 4 13 6 17" />
            <path d="M74 34c-2 7-4 13-6 17" />
            {/* Chest - HIGHLIGHTED GOLD */}
            <path d="M34 32c6 1 11 4 16 8c5-4 10-7 16-8c2 9-2 16-16 17c-14 0-18-8-16-17Z" className="stroke-amber-400 fill-amber-400/25" strokeWidth="2.2" />
            {/* Abs */}
            <path d="M38 58h24v28H38z" />
            <path d="M50 58v28M38 67h24M38 76h24" />
            {/* Arms */}
            <path d="M24 48c-2 10-4 20-6 30" />
            <path d="M76 48c2 10 4 20 6 30" />
            {/* Quads / Legs */}
            <path d="M36 88c-2 16-4 32-6 44" />
            <path d="M64 88c2 16 4 32 6 44" />
            <path d="M48 88v44M52 88v44" />
          </svg>
        </div>

        {/* BACK BODY */}
        <div className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-2">
          <span className="text-[8px] font-bold tracking-[0.14em] text-ink-faint uppercase block mb-1">BACK</span>
          <svg viewBox="0 0 100 150" className="h-24 mx-auto stroke-neutral-600 fill-none" strokeWidth="1.6">
            {/* Head */}
            <circle cx="50" cy="14" r="9" />
            {/* Traps */}
            <path d="M34 32c4-5 10-7 16-7s12 2 16 7" />
            <path d="M50 25v22L34 32M50 47L66 32" />
            {/* Lats */}
            <path d="M32 38c5 7 9 14 11 20" />
            <path d="M68 38c-5 7-9 14-11 20" />
            {/* Lower back / Glutes */}
            <path d="M38 58h24v18H38z" />
            <path d="M36 76c4 9 10 12 14 12s10-3 14-12" />
            {/* Hamstrings / Calves */}
            <path d="M36 88c-2 16-4 32-6 44" />
            <path d="M64 88c2 16 4 32 6 44" />
            <path d="M48 88v44M52 88v44" />
          </svg>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1.5 border-t border-white/[0.06]">
        <span className="text-[10px] font-bold text-white">CHEST ▾</span>
        <span className="text-[9px] font-mono text-amber-400 font-bold">2 / 6 sets</span>
      </div>
    </div>
  );
}

/* ━━━ Screen 1: Dashboard (Real App Match) ━━━ */
function DashboardScreen() {
  return (
    <div className="space-y-3 px-3.5 pt-1">
      {/* Real App Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Image
              src="/avatar_zeus.png"
              width={38}
              height={38}
              priority
              className="h-9.5 w-9.5 rounded-full border border-white/10 bg-black object-cover"
              alt="Profile"
            />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white text-[7px] font-black text-black">✓</span>
          </div>
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-ink-faint">
              CONSISTENCY MATTERS.
            </p>
            <p className="text-sm font-black tracking-tight text-white">Ojas</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white">
            <BarChart2 className="h-3.5 w-3.5 text-white" />
          </span>
          <span className="flex h-7 items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] px-2 text-[10px]">
            🔥 <span className="font-mono text-[10px] font-bold text-white">12</span>
          </span>
        </div>
      </div>

      {/* Coach's Daily Insight */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white">
            <TrendingUp className="h-3 w-3 text-protein" /> COACH&apos;S DAILY INSIGHT
          </span>
          <span className="text-[10px] text-ink-faint">›</span>
        </div>
        <p className="text-[10px] leading-relaxed text-ink-muted">
          Your 12-day streak is solid! Let&apos;s prioritize skipped back & leg muscle groups for a balanced session today.
        </p>
        <p className="mt-2 text-[9px] font-medium text-ink-faint hover:text-white">
          Ask your coach anything →
        </p>
      </div>

      {/* Next Up Routine Card */}
      <div className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3">
        <div className="flex items-center gap-2.5">
          <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase text-black">
            PULL
          </span>
          <div>
            <p className="text-[9px] font-bold text-white">Next up</p>
            <p className="text-[9px] text-ink-faint">Seedha Putha Routine</p>
          </div>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-black">
          Let&apos;s Go ⇄
        </span>
      </div>

      {/* Action Buttons: Log Workout & Log Calories */}
      <div className="grid grid-cols-2 gap-2">
        <span className="flex items-center justify-center gap-1.5 rounded-2xl bg-white py-3 text-[11px] font-black text-black shadow-lg">
          <Plus className="h-3.5 w-3.5" strokeWidth={3} /> LOG WORKOUT
        </span>
        <span className="flex items-center justify-center gap-1.5 rounded-2xl bg-white py-3 text-[11px] font-black text-black shadow-lg">
          <Plus className="h-3.5 w-3.5" strokeWidth={3} /> LOG CALORIES
        </span>
      </div>

      {/* Today's Nutrition Ring & Breakdown */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-white">Today&apos;s Nutrition</span>
          <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink-faint">LOG FOOD</span>
        </div>
        <div className="flex items-center gap-3.5">
          <div className="relative h-[72px] w-[72px] flex-shrink-0 flex items-center justify-center">
            <svg className="h-[72px] w-[72px] -rotate-90" viewBox="0 0 64 64" aria-hidden>
              <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
              <circle cx="32" cy="32" r="26" fill="none" stroke="white" strokeWidth="5" strokeDasharray="163" strokeDashoffset="38" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-sm font-black leading-none text-white tracking-tight">2690</span>
              <span className="text-[6px] font-bold uppercase tracking-[0.1em] text-ink-faint mt-0.5">REMAINING</span>
            </div>
          </div>

          <div className="flex-1 space-y-1.5">
            <div className="flex items-center justify-between text-[9px]">
              <span className="flex items-center gap-1 text-ink-muted"><span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> Protein</span>
              <span className="font-mono text-ink-faint">128g / 235g</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-white/[0.08]">
              <div className="h-full w-[54%] rounded-full bg-cyan-400" />
            </div>

            <div className="flex items-center justify-between text-[9px]">
              <span className="flex items-center gap-1 text-ink-muted"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Carbs</span>
              <span className="font-mono text-ink-faint">175g / 235g</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-white/[0.08]">
              <div className="h-full w-[74%] rounded-full bg-amber-400" />
            </div>

            <div className="flex items-center justify-between text-[9px]">
              <span className="flex items-center gap-1 text-ink-muted"><span className="h-1.5 w-1.5 rounded-full bg-rose-400" /> Fat</span>
              <span className="font-mono text-ink-faint">52g / 90g</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-white/[0.08]">
              <div className="h-full w-[57%] rounded-full bg-rose-400" />
            </div>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-white/[0.06] text-center">
          <span className="text-[9px] font-semibold text-ink-muted hover:text-white flex items-center justify-center gap-1">
            <TrendingUp className="h-2.5 w-2.5" /> View Detailed Insights ›
          </span>
        </div>
      </div>
    </div>
  );
}

/* ━━━ Screen 2: Live Workout ━━━ */
function WorkoutScreen() {
  const exercises = [
    { name: "Bench Press", sets: "4 × 8", weight: "80 kg", done: true },
    { name: "Incline DB Press", sets: "3 × 10", weight: "30 kg", done: true },
    { name: "Cable Flyes", sets: "3 × 12", weight: "15 kg", done: false },
    { name: "Tricep Pushdown", sets: "3 × 12", weight: "25 kg", done: false },
  ];

  return (
    <div className="space-y-2.5 px-3.5 pt-1 sm:space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink-faint">Active session</p>
          <p className="text-lg font-black tracking-tight text-white">PUSH DAY</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-protein/30 bg-protein/10 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-protein animate-pulse" />
          <span className="text-[9px] font-bold text-protein">LIVE</span>
        </span>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] py-2 text-center sm:py-2.5">
        <p className="font-mono text-xl font-black tabular-nums tracking-tight text-white sm:text-2xl">00:42:18</p>
        <p className="mt-0.5 text-[8px] uppercase tracking-[0.14em] text-ink-faint">Session Duration</p>
      </div>

      {/* Muscle Volume Status Component */}
      <MuscleVolumeMap />

      <div className="space-y-1">
        {exercises.map((ex, i) => (
          <motion.div
            key={ex.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.05, ease: EASE_OUT_EXPO }}
            /* The 4th row overran the bezel by 12px on a 390px phone: a
               partially-sliced row reads as a bug, not a bezel. It rejoins
               the list from `sm` up, where the frame is taller. */
            className={`${i === 3 ? "hidden sm:flex" : "flex"} items-center gap-2.5 rounded-xl border p-2 ${
              ex.done ? "border-white/[0.04] bg-white/[0.04]" : "border-white/[0.08] bg-white/[0.01]"
            }`}
          >
            <span className={`flex h-4.5 w-4.5 items-center justify-center rounded-full ${ex.done ? "bg-protein" : "border border-white/20"}`}>
              {ex.done && <Check className="h-3 w-3 text-black" strokeWidth={3} />}
            </span>
            <div className="min-w-0 flex-1">
              <p className={`text-[11px] font-bold ${ex.done ? "text-ink-faint line-through" : "text-white"}`}>{ex.name}</p>
              <p className="font-mono text-[9px] text-ink-faint">{ex.sets} · {ex.weight}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ━━━ Screen 3: Nutrition Insights ━━━ */
function NutritionScreen() {
  return (
    <div className="space-y-3 px-3.5 pt-1">
      <div className="flex items-center justify-between">
        <p className="text-base font-black text-white">Nutrition Insights</p>
        <span className="rounded-full bg-white/[0.06] border border-white/10 px-2.5 py-1 text-[9px] font-bold text-white">+ Log</span>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-ink-faint">NUTRITION & MACROS</span>
          <span className="rounded bg-white/10 px-1.5 py-0.5 text-[8px] font-mono text-white">2,690 Target</span>
        </div>

        {/* Weekly Bar Chart */}
        <div className="flex items-end justify-between h-20 pt-4 px-1 border-b border-white/[0.06] pb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, idx) => (
            <div key={day} className="flex flex-col items-center gap-1">
              <div className="w-4 rounded-t bg-white/10" style={{ height: `${[40, 65, 80, 50, 90, 70, 30][idx]}%` }}>
                <div className="w-full bg-cyan-400 rounded-t" style={{ height: '40%' }} />
              </div>
              <span className={`text-[8px] font-mono ${idx === 6 ? 'text-white font-bold' : 'text-ink-faint'}`}>{day}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-around pt-2 text-[9px]">
          <span className="flex items-center gap-1 text-amber-400 font-bold"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Fat 0g</span>
          <span className="flex items-center gap-1 text-cyan-400 font-bold"><span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> Carbs 0g</span>
          <span className="flex items-center gap-1 text-purple-400 font-bold"><span className="h-1.5 w-1.5 rounded-full bg-purple-400" /> Protein 0g</span>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-ink-faint">CALORIE OVERVIEW</span>
          <span className="text-[10px] font-mono font-bold text-white">0%</span>
        </div>
        <div className="text-base font-black text-white">0 / 2690 kcal</div>
        <div className="h-1 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-0 bg-white" />
        </div>

        <div className="space-y-1 pt-1 text-[10px]">
          <div className="flex justify-between text-ink-muted"><span>Consumed</span><span className="font-mono text-white">0 kcal</span></div>
          <div className="flex justify-between text-ink-muted"><span>Burnt (workouts)</span><span className="font-mono text-white">0 kcal</span></div>
          <div className="flex justify-between text-ink-muted"><span>Net Calories</span><span className="font-mono text-white">0 kcal</span></div>
          <div className="flex justify-between text-ink-muted"><span>Maintenance</span><span className="font-mono text-white">2690 kcal</span></div>
        </div>

        <div className="pt-2 border-t border-white/[0.06] text-[10px] font-bold text-amber-400">
          DEFICIT: 2690 kcal below maintenance
        </div>
      </div>
    </div>
  );
}

/* ━━━ Screen 4: Training & Weekly Report ━━━ */
function ProgressScreen() {
  return (
    <div className="space-y-3 px-3.5 pt-1">
      {/* Segmented Control */}
      <div className="flex rounded-xl bg-white/[0.06] p-1 text-[10px] font-bold">
        <span className="flex-1 text-center py-1 rounded-lg bg-black text-white shadow">Training</span>
        <span className="flex-1 text-center py-1 text-ink-faint">Nutrition</span>
      </div>

      {/* Weekly Workouts Summary */}
      <div className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-wider text-ink-faint">WEEKLY WORKOUTS</p>
          <p className="text-lg font-black text-white">0 sessions</p>
        </div>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white">
          <Dumbbell className="h-4 w-4" />
        </span>
      </div>

      {/* ✨ Weekly Report Card */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white">
            <Sparkles className="h-3 w-3 text-white" /> WEEKLY REPORT
          </span>
          <span className="text-ink-faint text-xs">↗</span>
        </div>
        <p className="text-[9.5px] leading-relaxed text-ink-muted">
          This week, you recorded 0 workouts, 0 gym check-ins, and your nutrition data was untracked. Let&apos;s focus on completing just one workout to begin building consistency.
        </p>

        <div className="grid grid-cols-3 gap-1 pt-2 border-t border-white/[0.06] text-center">
          <div>
            <p className="text-[8px] text-ink-faint uppercase">Workout Load</p>
            <p className="text-xs font-black text-white">0 workouts</p>
          </div>
          <div>
            <p className="text-[8px] text-ink-faint uppercase">Gym Attendance</p>
            <p className="text-xs font-black text-white">0 days</p>
          </div>
          <div>
            <p className="text-[8px] text-ink-faint uppercase">Streak Size</p>
            <p className="text-xs font-black text-white">0 days</p>
          </div>
        </div>
      </div>

      {/* Anatomical Muscle Volume Status */}
      <MuscleVolumeMap />
    </div>
  );
}

const SCREENS = [
  { Component: DashboardScreen, label: "Home", icon: Home },
  { Component: WorkoutScreen, label: "Workout", icon: Dumbbell },
  { Component: NutritionScreen, label: "Nutrition", icon: Utensils },
  { Component: ProgressScreen, label: "Progress", icon: BarChart2 },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Phone shell
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function PhoneShell({
  active,
  onSelect,
  paused,
}: {
  active: number;
  onSelect: (i: number) => void;
  paused: boolean;
}) {
  const reduce = useReducedMotion();
  const Active = SCREENS[active].Component;

  return (
    <div className="relative h-[580px] w-[280px] overflow-hidden rounded-2xl border border-white/[0.1] bg-background shadow-[0_2px_4px_rgba(0,0,0,0.8),0_40px_80px_-24px_rgba(0,0,0,1)] sm:h-[620px] sm:w-[300px]">
      {/* Top bezel highlight: the plate catches light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />

      <div className="relative h-full overflow-hidden pt-2">
        <AnimatePresence initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.008 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            /* Clips rather than scrolls. As a scroll region this was a
               keyboard trap: content taller than the frame, no focusable
               children, so a keyboard user could neither reach nor scroll it.
               A phone mockup should behave like a phone bezel: the padding
               below keeps the AI-coach line clear of the dock, and anything
               past that is meant to be cut off. The demo phone below is a
               real scroller because its content is interactive. */
            className="absolute inset-0 overflow-hidden pb-[4.75rem]"
          >
            <Active />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dock */}
      <div className="absolute inset-x-3 bottom-3 z-20 flex h-14 items-center justify-around rounded-2xl border border-white/[0.1] bg-black/85 px-2 backdrop-blur-md">
        {SCREENS.slice(0, 2).map((s, i) => (
          <DockButton
            key={s.label}
            {...s}
            index={i}
            active={active}
            onSelect={onSelect}
            paused={paused}
            reduce={!!reduce}
          />
        ))}

        <span className="relative -mt-6 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white shadow-lg shadow-black/60">
          <Plus className="h-5 w-5 text-black" strokeWidth={2.5} />
        </span>

        {SCREENS.slice(2).map((s, i) => (
          <DockButton
            key={s.label}
            {...s}
            index={i + 2}
            active={active}
            onSelect={onSelect}
            paused={paused}
            reduce={!!reduce}
          />
        ))}
      </div>
    </div>
  );
}

function DockButton({
  label,
  icon: Icon,
  index,
  active,
  onSelect,
  paused,
  reduce,
}: {
  label: string;
  icon: typeof Home;
  index: number;
  active: number;
  onSelect: (i: number) => void;
  paused: boolean;
  reduce: boolean;
}) {
  const isActive = active === index;
  return (
    <button
      onClick={() => onSelect(index)}
      aria-label={`Show ${label} screen`}
      aria-pressed={isActive}
      className="relative flex h-11 w-11 flex-col items-center justify-center gap-0.5 rounded-lg"
    >
      <Icon
        className={`h-4 w-4 transition-all duration-300 ${
          isActive ? "scale-110 text-white" : "text-ink-faint"
        }`}
      />
      <span
        className={`mt-0.5 text-[8px] font-semibold tracking-tight transition-colors duration-300 ${
          isActive ? "text-white" : "text-ink-faint"
        }`}
      >
        {label}
      </span>
      {isActive && (
        <span className="absolute bottom-0.5 h-[2px] w-5 overflow-hidden rounded-full bg-white/20">
          {/* The dwell timer, made visible: cycling stops being a surprise.
              `initial` must NOT depend on useReducedMotion(): that hook reads
              false during SSR and true on a reduced-motion client, which
              hydration-mismatches the inline width. Start at 0% always and let
              the transition duration collapse to zero instead. */}
          <motion.span
            key={`${index}-${paused}`}
            className="block h-full rounded-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: reduce || paused ? 0 : SCREEN_INTERVAL / 1000,
              ease: "linear",
            }}
          />
        </span>
      )}
    </button>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Spec plate: what the product actually reads.
   Every figure here is a capability the app ships, not a market claim.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const SPECS = [
  { to: 500, suffix: "K+", label: "Foods indexed", detail: "Indian + USDA" },
  { to: 10, suffix: "+", label: "Training splits", detail: "PPL, PHUL, PHAT, custom" },
  { to: 6, suffix: "", label: "App tabs, no clutter", detail: "Train, eat, learn, share" },
  { to: 0, suffix: "", label: "Ads, ever", detail: "Offline-first, your data stays yours" },
];

/**
 * Counts once on mount. The direction contract promises instrumentation that
 * "begins counting on load", and a static number is not an instrument: but a
 * counter that never settles is noise, so this runs exactly once.
 *
 * Gated on reduced motion at its own call site: MotionConfig does not cover
 * rAF-driven work like this.
 */
function CountUp({
  to,
  suffix,
  duration = 1400,
}: {
  to: number;
  suffix: string;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (reduce || to === 0) {
      setN(to);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      // exponential ease-out, same family as the rest of the page
      setN(Math.round(to * (1 - Math.pow(2, -10 * p))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setN(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, reduce]);

  return (
    <>
      {n}
      {suffix}
    </>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const phoneRotate = useTransform(scrollYProgress, [0, 1], [0, -6]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const select = useCallback((i: number) => {
    setActive(i);
    setPaused(true);
  }, []);

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(
      () => setActive((p) => (p + 1) % SCREEN_COUNT),
      SCREEN_INTERVAL
    );
    return () => clearInterval(t);
  }, [paused, reduce, active]);

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden pb-16 pt-32 md:pb-24 md:pt-36"
    >
      {/* One quiet backdrop: a cold overhead wash, like gym lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(255,255,255,0.09),transparent_70%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 sm:px-6 lg:px-8">
        <div className="grid flex-1 items-center gap-8 py-6 sm:gap-12 sm:py-8 lg:grid-cols-[1.12fr_1fr] lg:gap-10">
          {/* ━━━ Copy ━━━ */}
          <motion.div
            style={{ y: copyY }}
            variants={stack}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.p variants={stackItem} className="mb-5 sm:mb-7">
              <span className="kicker">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-protein animate-breathe"
                  data-motion="ambient"
                />
                V2.0 now available
              </span>
            </motion.p>

            {/* The headline used to be "The coach that actually knows you" :
                true, but it could sit on any AI wellness app, and the one
                thing only Fitzo does was demoted to the paragraph below. The
                mechanism now runs at display scale; the old line survives as
                the payoff on the third row. */}
            <motion.h1
              variants={stackItem}
              className="mb-6 text-[clamp(2.1rem,4.6vw,3.3rem)] font-black leading-[1.02] tracking-[-0.045em] text-balance"
            >
              <span className="sr-only">Fitzo App: </span>
              Every set. Every roti.
              <br />
              <span className="text-ink-faint">One coach reads both.</span>
            </motion.h1>

            <motion.p
              variants={stackItem}
              className="mx-auto mb-7 max-w-[38ch] sm:mb-9 text-lg leading-relaxed text-ink-muted text-pretty sm:text-xl lg:mx-0"
            >
              Fitzo logs your lifts and your food: dal to biryani: in one
              place, then coaches from all of it. Science-based training, built
              for Indian lifters.
            </motion.p>

            <motion.div
              variants={stackItem}
              className="mb-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
            >
              <motion.a
                href="#download"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.975 }}
                transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition-colors duration-300 hover:bg-protein"
              >
                Get Fitzo free
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
              </motion.a>

              <motion.a
                href="#demo"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.975 }}
                transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
                className="inline-flex items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.05] px-8 py-4 text-base font-semibold text-white transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.09]"
              >
                Try it, no download
              </motion.a>
            </motion.div>

            <motion.ul
              variants={stackItem}
              className="flex flex-wrap justify-center gap-x-5 gap-y-2 lg:justify-start"
            >
              {[
                { icon: Check, label: "No ads" },
                { icon: Shield, label: "Privacy first" },
                { icon: WifiOff, label: "Offline mode" },
              ].map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-1.5 text-[13px] text-ink-muted"
                >
                  <Icon className="h-3.5 w-3.5 text-protein" />
                  {label}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* ━━━ Phone ━━━ */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.25, ease: EASE_OUT_EXPO }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              style={{
                y: phoneY,
                rotateY: phoneRotate,
                transformPerspective: 1400,
              }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocusCapture={() => setPaused(true)}
              className="relative"
            >
              <div
                aria-hidden
                className="absolute -inset-16 -z-10 rounded-full bg-white/[0.05] blur-[90px]"
              />
              <PhoneShell active={active} onSelect={select} paused={paused} />
            </motion.div>
          </motion.div>
        </div>

        {/* ━━━ Spec plate ━━━ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT_EXPO }}
          className="mt-auto pb-8 sm:pb-10"
        >
          <div className="rule mb-6" />
          <dl className="grid grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-6">
            {SPECS.map((s) => (
              <div key={s.label}>
                <dd className="text-[22px] font-black tabular-nums leading-none tracking-[-0.03em] text-white sm:text-[38px]">
                  <CountUp to={s.to} suffix={s.suffix} />
                </dd>
                <dt className="mt-1.5 text-[11px] font-medium leading-tight text-white sm:mt-2 sm:text-[13px]">
                  {s.label}
                </dt>
                <dd className="mt-0.5 hidden text-xs text-ink-faint sm:block">{s.detail}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
