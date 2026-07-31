/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Hero
 *
 * The phone is the argument: it runs the real app loop — dashboard, workout,
 * nutrition, progress — on a timer you can take control of. Underneath, a spec
 * plate states what the product actually reads. No claim here that the app
 * cannot already do.
 *
 * Two defects this replaces:
 *   · AnimatePresence mode="wait" left the centrepiece blank for ~800ms of
 *     every 4s cycle. Screens now crossfade in place.
 *   · The auto-cycle ignored the visitor — tapping a tab got overridden a
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
function NutritionRing() {
  const macros = [
    { label: "Protein", current: 128, target: 150, tone: "text-protein", bar: "bg-protein" },
    { label: "Carbs", current: 175, target: 200, tone: "text-carbs", bar: "bg-carbs" },
    { label: "Fat", current: 52, target: 65, tone: "text-fat", bar: "bg-fat" },
  ];

  return (
    <div className="well p-4">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 flex-shrink-0">
          <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64" aria-hidden>
            <circle
              cx="32"
              cy="32"
              r="27"
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="5"
            />
            <motion.circle
              cx="32"
              cy="32"
              r="27"
              fill="none"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ strokeDasharray: "170 170", strokeDashoffset: 170 }}
              animate={{ strokeDashoffset: 30 }}
              transition={{ duration: 1.4, delay: 0.4, ease: EASE_OUT_EXPO }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[15px] font-bold tabular-nums leading-none text-white">
              160
            </span>
            <span className="mt-0.5 text-[7px] uppercase tracking-[0.12em] text-ink-faint">
              Left
            </span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {macros.map((m, i) => (
            <div key={m.label} className="flex items-center gap-2">
              <span className="w-10 text-[10px] text-ink-muted">{m.label}</span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(m.current / m.target) * 100}%` }}
                  transition={{
                    duration: 1.1,
                    delay: 0.6 + i * 0.12,
                    ease: EASE_OUT_EXPO,
                  }}
                  className={`h-full rounded-full ${m.bar}`}
                />
              </div>
              <span className="font-mono text-[9px] tabular-nums text-ink-faint">
                {m.current}/{m.target}g
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ━━━ Screen 1: Dashboard ━━━ */
function DashboardScreen() {
  return (
    <div className="space-y-3 px-4 pt-1 sm:space-y-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Image
            src="/avatar_zeus.png"
            width={40}
            height={40}
            priority
            className="h-10 w-10 rounded-full border border-white/[0.08] bg-black object-cover"
            alt=""
          />
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-ink-faint">
              Consistency matters.
            </p>
            <p className="text-sm font-bold text-white">Ojas</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-lg border border-protein/25 bg-protein/10 px-2 py-1">
            <span className="h-1 w-1 rounded-full bg-protein" />
            <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-protein">
              Checked in
            </span>
          </span>
          <span className="flex h-7 items-center gap-1 rounded-lg bg-white/[0.07] px-2 text-[10px]">
            🔥
            <span className="font-mono text-[11px] font-bold text-white">12</span>
          </span>
        </div>
      </div>

      <div>
        <p className="text-[10px] text-ink-faint">Today&apos;s training</p>
        <p className="text-lg font-black tracking-tight text-white">
          ANTERIOR · CUSTOM
        </p>
      </div>

      <div className="well p-3 sm:p-3.5">
        <div className="mb-3 flex items-center justify-center gap-2">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-protein">
            <Check className="h-2.5 w-2.5 text-black" strokeWidth={3} />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
            Completed today
          </span>
        </div>
        <div className="flex">
          <div className="flex-1 border-r border-white/[0.07] text-center">
            <p className="mb-1 text-[9px] uppercase tracking-[0.12em] text-ink-faint">
              Workouts
            </p>
            <p className="text-2xl font-bold tabular-nums text-white">1</p>
          </div>
          <div className="flex-1 text-center">
            <p className="mb-1 text-[9px] uppercase tracking-[0.12em] text-ink-faint">
              Calories
            </p>
            <p className="text-2xl font-bold tabular-nums text-white">1,840</p>
          </div>
        </div>
      </div>

      {/* The "Log workout / Log calories" button row lived here. It was
          decorative chrome, and its ~60px pushed the AI-coach line — the only
          place this screen states the product's thesis — underneath the dock.
          Substance beats chrome: the row is gone so the thesis fits. */}

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-bold text-white">Today&apos;s nutrition</p>
          <p className="text-[10px] uppercase tracking-[0.12em] text-ink-faint">
            Log food
          </p>
        </div>
        <NutritionRing />
      </div>

      {/* The differentiator, stated in the product's own voice:
          it read the lifts AND the food, and it has something to say. */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6, ease: EASE_OUT_EXPO }}
        className="flex items-start gap-2.5 rounded-xl border border-protein/20 bg-protein/[0.06] p-3"
      >
        <Sparkles className="mt-px h-3.5 w-3.5 flex-shrink-0 text-protein" />
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-protein">
            AI coach
          </p>
          <p className="mt-1 text-[10px] leading-relaxed text-ink-muted">
            Push day done, but you&apos;re 22g short on protein. A scoop of whey
            or 150g paneer closes it before bed.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* ━━━ Screen 2: Live workout ━━━ */
function WorkoutScreen() {
  const exercises = [
    { name: "Bench Press", sets: "4 × 8", weight: "80 kg", done: true },
    { name: "Incline DB Press", sets: "3 × 10", weight: "30 kg", done: true },
    { name: "Cable Flyes", sets: "3 × 12", weight: "15 kg", done: false },
    { name: "Tricep Pushdown", sets: "3 × 12", weight: "25 kg", done: false },
    { name: "Overhead Extension", sets: "3 × 10", weight: "20 kg", done: false },
  ];

  return (
    <div className="space-y-3 px-4 pt-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-ink-faint">
            Active workout
          </p>
          <p className="text-lg font-black tracking-tight text-white">PUSH DAY</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-lg border border-protein/25 bg-protein/10 px-3 py-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full bg-protein animate-breathe"
            data-motion="ambient"
          />
          <span className="text-[10px] font-semibold text-protein">LIVE</span>
        </span>
      </div>

      <div className="py-2 text-center">
        <p className="font-mono text-[28px] font-bold tabular-nums tracking-tight text-white">
          00:42:18
        </p>
        <p className="mt-0.5 text-[9px] uppercase tracking-[0.14em] text-ink-faint">
          Duration
        </p>
      </div>

      <div className="space-y-1">
        {exercises.map((ex, i) => (
          <motion.div
            key={ex.name}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.07, ease: EASE_OUT_EXPO }}
            className={`flex items-center gap-3 rounded-xl border border-white/[0.05] p-2.5 ${
              ex.done ? "bg-white/[0.04]" : "bg-transparent"
            }`}
          >
            <span
              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                ex.done ? "bg-protein" : "border border-white/20"
              }`}
            >
              {ex.done && <Check className="h-3 w-3 text-black" strokeWidth={3} />}
            </span>
            <div className="min-w-0 flex-1">
              <p
                className={`text-[11px] font-semibold ${
                  ex.done ? "text-ink-faint line-through" : "text-white"
                }`}
              >
                {ex.name}
              </p>
              <p className="font-mono text-[9px] tabular-nums text-ink-faint">
                {ex.sets} · {ex.weight}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ━━━ Screen 3: Nutrition ━━━ */
function NutritionScreen() {
  const meals = [
    { name: "Breakfast", items: "Oats + banana + whey", cal: 520 },
    { name: "Lunch", items: "Chicken rice bowl", cal: 680 },
    { name: "Snack", items: "Greek yogurt + almonds", cal: 280 },
    { name: "Dinner", items: "Add meal…", cal: 0, empty: true },
  ];

  return (
    <div className="space-y-3 px-4 pt-1">
      <div className="flex items-center justify-between">
        <p className="text-lg font-black tracking-tight text-white">Nutrition</p>
        <span className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-white" />
          <span className="text-[10px] text-ink-muted">AI coach</span>
        </span>
      </div>

      <NutritionRing />

      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-[0.14em] text-ink-faint">
          Today&apos;s meals
        </p>
        {meals.map((meal, i) => (
          <motion.div
            key={meal.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.07, ease: EASE_OUT_EXPO }}
            className={`flex items-center justify-between rounded-xl border p-3 ${
              meal.empty
                ? "border-dashed border-white/[0.09]"
                : "border-white/[0.05] bg-white/[0.025]"
            }`}
          >
            <div>
              <p className="text-[11px] font-semibold text-white">{meal.name}</p>
              <p
                className={`text-[9px] ${
                  meal.empty ? "text-ink-faint" : "text-ink-muted"
                }`}
              >
                {meal.items}
              </p>
            </div>
            {!meal.empty && (
              <span className="text-[11px] font-bold tabular-nums text-white">
                {meal.cal}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ━━━ Screen 4: Progress ━━━ */
function ProgressScreen() {
  const chart =
    "M0,40 C20,38 40,35 60,30 C80,25 100,28 120,22 C140,18 160,15 180,10 C200,8 220,12 240,6";

  return (
    <div className="space-y-3 px-4 pt-1">
      <div className="flex items-center justify-between">
        <p className="text-lg font-black tracking-tight text-white">Progress</p>
        <span className="text-[10px] uppercase tracking-[0.14em] text-ink-faint">
          This month
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Workouts", value: "18", icon: <Dumbbell className="h-3 w-3" /> },
          { label: "Streak", value: "12d", icon: <span className="text-[10px]">🔥</span> },
          { label: "XP", value: "2,450", icon: <TrendingUp className="h-3 w-3" /> },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.08, ease: EASE_OUT_EXPO }}
            className="well p-2.5 text-center"
          >
            <div className="mb-1 flex items-center justify-center text-ink-faint">
              {s.icon}
            </div>
            <p className="text-sm font-bold tabular-nums text-white">
              {s.value}
            </p>
            <p className="text-[8px] uppercase tracking-[0.1em] text-ink-faint">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="well p-4">
        <p className="mb-3 text-[10px] uppercase tracking-[0.14em] text-ink-faint">
          Weight progress
        </p>
        <svg className="h-12 w-full" viewBox="0 0 240 50" fill="none" aria-hidden>
          <motion.path
            d={chart}
            stroke="hsl(var(--protein))"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, delay: 0.3, ease: EASE_OUT_EXPO }}
          />
          <motion.path
            d={`${chart} L240,50 L0,50 Z`}
            fill="url(#heroChartGrad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          />
          <defs>
            <linearGradient id="heroChartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--protein))" stopOpacity="0.28" />
              <stop offset="100%" stopColor="hsl(var(--protein))" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <div className="mt-2 flex justify-between font-mono text-[9px] text-ink-faint">
          <span>Week 1</span>
          <span>Week 4</span>
        </div>
      </div>

      <div>
        <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-ink-faint">
          Recent PRs
        </p>
        {[
          { exercise: "Bench Press", pr: "100 kg", date: "2 days ago" },
          { exercise: "Squat", pr: "130 kg", date: "1 week ago" },
        ].map((pr, i) => (
          <motion.div
            key={pr.exercise}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.12, ease: EASE_OUT_EXPO }}
            className="flex items-center justify-between border-t border-white/[0.05] py-2"
          >
            <div>
              <p className="text-[11px] font-semibold text-white">{pr.exercise}</p>
              <p className="text-[9px] text-ink-faint">{pr.date}</p>
            </div>
            <span className="font-mono text-[11px] font-bold tabular-nums text-protein">
              {pr.pr}
            </span>
          </motion.div>
        ))}
      </div>
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
    <div className="relative h-[580px] w-[280px] overflow-hidden rounded-[2.5rem] border border-white/[0.1] bg-[#0a0a0b] shadow-[0_2px_4px_rgba(0,0,0,0.8),0_40px_80px_-24px_rgba(0,0,0,1)] sm:h-[620px] sm:w-[300px]">
      {/* Top bezel highlight — the plate catches light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />

      <div className="flex items-center justify-between px-6 pb-1 pt-3">
        <span className="font-mono text-[10px] text-ink-faint">9:41</span>
        <div className="h-[22px] w-[72px] rounded-full bg-black" />
        <div className="h-[10px] w-[15px] rounded-[2px] border border-white/25" />
      </div>

      {/* Screens crossfade in place — never blank.
          The dock is an absolute overlay 56px tall sitting 12px off the base,
          so the screen must reserve that as real padding. Without it the last
          element of each screen renders underneath the dock — which was
          swallowing the AI-coach line, the one place the hero states the
          product's actual thesis. */}
      <div className="relative h-[calc(100%-2.75rem)] overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.008 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="scrollbar-hide absolute inset-0 overflow-y-auto pb-[4.75rem]"
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
          {/* The dwell timer, made visible — cycling stops being a surprise.
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
   Spec plate — what the product actually reads.
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
 * "begins counting on load", and a static number is not an instrument — but a
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
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24 md:pt-20"
    >
      {/* One quiet backdrop — a cold overhead wash, like gym lighting */}
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

            {/* The headline used to be "The coach that actually knows you" —
                true, but it could sit on any AI wellness app, and the one
                thing only Fitzo does was demoted to the paragraph below. The
                mechanism now runs at display scale; the old line survives as
                the payoff on the third row. */}
            <motion.h1
              variants={stackItem}
              className="mb-6 text-[clamp(2.1rem,4.6vw,3.3rem)] font-black leading-[1.02] tracking-[-0.045em] text-balance"
            >
              Every set. Every roti.
              <br />
              <span className="text-ink-faint">One coach reads both.</span>
            </motion.h1>

            <motion.p
              variants={stackItem}
              className="mx-auto mb-7 max-w-[38ch] sm:mb-9 text-lg leading-relaxed text-ink-muted text-pretty sm:text-xl lg:mx-0"
            >
              Fitzo logs your lifts and your food — dal to biryani — in one
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
                <p className="mt-0.5 hidden text-xs text-ink-faint sm:block">{s.detail}</p>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
