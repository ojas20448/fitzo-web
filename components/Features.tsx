/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO: Feature grid
 *
 * Each cell carries a real screen from the app, so the grid demonstrates
 * rather than lists. Structure change from the previous build:
 *   · TiltCard wrapping MagicCard wrapping a card wrapping a well was four
 *     nested containers deep. It is now one panel with one inset well.
 *   · Cards used a 6% white border on pure black and effectively vanished.
 *     The panel surface carries a hairline, an inner top highlight and a real
 *     offset shadow, so a cell reads as an object.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Dumbbell,
  BookOpen,
  Users,
  Sparkles,
  ScanLine,
  Target,
  Check,
  QrCode,
  Flame,
} from "lucide-react";
import { rise, stack, stackItem, VIEWPORT } from "@/lib/motion";

/* ━━━ Dashboard ━━━ */
function DashboardMini() {
  return (
    <div className="well space-y-2.5 p-3">
      <div className="flex items-center gap-2">
        <Image
          src="/avatar_zeus.png"
          width={28}
          height={28}
          className="h-7 w-7 rounded-full border border-white/10 bg-black object-cover"
          alt="Ojas - Fitzo User Profile"
        />
        <div>
          <p className="text-[8px] uppercase tracking-[0.14em] text-ink-faint">
            Consistency matters.
          </p>
          <p className="text-[10px] font-bold text-white">Ojas</p>
        </div>
      </div>
      <div>
        <p className="text-[8px] text-ink-faint">Today&apos;s training</p>
        <p className="text-xs font-black tracking-tight text-white">
          ANTERIOR · CUSTOM
        </p>
      </div>
      <div className="flex gap-2">
        {[
          { label: "Workouts", value: "1" },
          { label: "Calories", value: "1,840" },
        ].map((s) => (
          <div
            key={s.label}
            className="flex-1 rounded-lg bg-white/[0.04] p-2 text-center"
          >
            <p className="text-[8px] uppercase tracking-[0.1em] text-ink-faint">
              {s.label}
            </p>
            <p className="text-sm font-bold tabular-nums text-white">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ━━━ Learn ━━━ */
function LearnMini() {
  return (
    <div className="well space-y-2.5 p-4">
      <p className="text-[9px] uppercase tracking-[0.14em] text-ink-faint">
        Learn · path
      </p>
      <p className="text-sm font-bold text-white">Nutrition fundamentals</p>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "38%" }}
          viewport={VIEWPORT}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-carbs"
        />
      </div>
      <p className="text-[9px] tabular-nums text-ink-faint">3 / 8 lessons</p>
      {[
        { title: "What are calories?", xp: "+50 XP", done: true },
        { title: "Protein: building block", xp: "+50 XP", done: true },
        { title: "Carbs & fat", xp: "+75 XP", done: false },
      ].map((l) => (
        <div key={l.title} className="flex items-center gap-2 py-1.5">
          <span
            className={`flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full ${
              l.done ? "bg-protein" : "border border-white/20"
            }`}
          >
            {l.done && <Check className="h-2 w-2 text-black" strokeWidth={3.5} />}
          </span>
          <span className="flex-1 text-[10px] text-ink-muted">{l.title}</span>
          <span className="text-[9px] tabular-nums text-ink-faint">{l.xp}</span>
        </div>
      ))}
    </div>
  );
}

/* ━━━ Buddies ━━━ */
function BuddiesMini() {
  const buddies = [
    { name: "Rahul", status: "Hitting Legs 🦵 · Live now", active: true, avatar: "/avatar_discobolus.png" },
    { name: "Priya", status: "3 day streak 🔥 · Active 15m ago", active: false, avatar: "/avatar_runner.png" },
    { name: "Arjun", status: "Push Day 💪 · Checked in", active: true, avatar: "/avatar_lion.png" },
  ];

  return (
    <div className="well space-y-3 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-white">Gym buddies</p>
        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink-faint">
          ADD
        </span>
      </div>
      {buddies.map((b) => (
        <div
          key={b.name}
          className="flex items-center gap-3 border-t border-white/[0.05] py-2 first:border-t-0"
        >
          <div className="relative flex-shrink-0">
            <Image
              src={b.avatar}
              width={36}
              height={36}
              className="h-9 w-9 rounded-full border border-white/10 bg-black object-cover"
              alt={b.name}
            />
            {b.active && (
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#050506] bg-protein" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-white">{b.name}</p>
            <p className="truncate text-[9px] text-ink-faint">{b.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ━━━ Food search ━━━ */
function FoodSearchMini() {
  return (
    <div className="well space-y-2.5 p-4">
      <p className="text-sm font-bold text-white">Add food</p>
      <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.04] px-3 py-2">
        <ScanLine className="h-3.5 w-3.5 text-ink-faint" />
        <span className="text-[10px] text-ink-faint">Search or scan food…</span>
      </div>
      <div className="flex w-fit items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.04] px-3 py-1.5">
        <Sparkles className="h-3.5 w-3.5 text-protein" />
        <span className="text-[10px] text-ink-muted">AI analysis</span>
      </div>
      {[
        { name: "Chicken breast", cal: "165", per: "100g" },
        { name: "Brown rice", cal: "112", per: "100g" },
      ].map((f) => (
        <div
          key={f.name}
          className="flex items-center justify-between border-t border-white/[0.05] py-1.5"
        >
          <span className="text-[10px] text-ink-muted">{f.name}</span>
          <span className="text-[10px] tabular-nums text-ink-faint">
            <span className="font-semibold text-white">{f.cal}</span> kcal /{" "}
            {f.per}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ━━━ Heatmap ━━━ */
function HeatmapMini() {
  return (
    <div className="well group relative flex h-44 items-center justify-center overflow-hidden p-3">
      <Image
        src="/heatmap.png"
        width={176}
        height={176}
        className="h-full w-auto object-contain opacity-90 transition-transform duration-700 ease-out-expo group-hover:scale-105"
        alt="Muscle heatmap showing training volume per muscle group"
      />
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/85 via-transparent to-transparent pb-2">
        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink-muted">
          Interactive muscle heatmap
        </span>
      </div>
    </div>
  );
}

/* ━━━ Gym ━━━ */
function GymMini() {
  return (
    <div className="well space-y-3 p-4">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white">
          <QrCode className="h-5 w-5 text-black" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold text-white">Checked in</p>
          <p className="text-[9px] text-ink-faint">Iron Temple Gym · 6:42 PM</p>
        </div>
        <span className="flex items-center gap-1 rounded-lg bg-white/[0.05] px-2 py-1">
          <Flame className="h-3 w-3 text-carbs" />
          <span className="text-[10px] font-bold tabular-nums text-white">12</span>
        </span>
      </div>
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <p className="text-[9px] uppercase tracking-[0.14em] text-ink-faint">
            Gym crowd
          </p>
          <span className="text-[9px] font-semibold text-protein">Not busy</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "35%" }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="h-full rounded-full bg-protein"
          />
        </div>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.03] p-2.5">
        <div>
          <p className="text-[10px] font-semibold text-white">
            HIIT Blast · 7:30 PM
          </p>
          <p className="text-[9px] text-ink-faint">
            with Coach Arjun · 4 spots left
          </p>
        </div>
        <span className="rounded-full bg-white px-2 py-1 text-[9px] font-semibold text-black">
          Book
        </span>
      </div>
    </div>
  );
}

/* ━━━ Receipt ━━━ */
function ReceiptMini() {
  return (
    <div className="well flex h-44 flex-col justify-between overflow-hidden p-4">
      <div className="flex flex-1 flex-col justify-between rounded-lg bg-white p-3.5 font-mono text-[9px] leading-relaxed text-black shadow-lg">
        <div>
          <div className="flex justify-between border-b border-black/15 pb-1 font-bold">
            <span>FITZO RECEIPT</span>
            <span>#1840</span>
          </div>
          <div className="mt-1 space-y-0.5 tabular-nums">
            <div className="flex justify-between">
              <span>BENCH PRESS</span>
              <span>4×100kg</span>
            </div>
            <div className="flex justify-between">
              <span>SQUAT (PR)</span>
              <span>3×130kg</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>TOTAL VOL</span>
              <span>1,840 kg</span>
            </div>
          </div>
        </div>
        <div className="mt-1 flex items-center justify-between border-t border-black/15 pt-1">
          <Image
            src="/barbell_dither.png"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            alt=""
          />
          <div className="text-right text-[7px] leading-none text-neutral-600">
            <p>EQUIV. TO</p>
            <p className="mt-0.5 text-[8px] font-bold text-black">BARBELL ARMS</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ━━━ Cell ━━━ */
/* ━━━ Cell ━━━ */
function FeatureCell({
  icon,
  title,
  description,
  badge,
  children,
  className = "",
  showcase = false,
  glow = "shadow-[0_0_20px_rgba(74,222,128,0.15)] border-protein/40 text-protein bg-protein/10",
  dot = "bg-protein shadow-[0_0_8px_#4ade80]",
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  children?: React.ReactNode;
  className?: string;
  showcase?: boolean;
  glow?: string;
  dot?: string;
}) {
  return (
    <motion.article
      variants={stackItem}
      className={`panel panel-interactive group p-5 sm:p-7 ${className}`}
    >
      <div className="mb-3 flex items-start justify-between gap-3 sm:mb-5 sm:gap-4">
        <div
          className={`flex gap-2.5 ${
            showcase
              ? "flex-row items-center sm:gap-3"
              : "flex-col items-start sm:flex-row sm:items-center sm:gap-3"
          }`}
        >
          <span className={`relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border backdrop-blur-md transition-all duration-300 group-hover:scale-105 sm:h-12 sm:w-12 ${glow}`}>
            {icon}
            <span className={`absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full ${dot}`} />
          </span>
          <h3 className="text-[15px] font-bold leading-tight tracking-tight text-white sm:text-xl">
            {title}
          </h3>
        </div>
        {badge && (
          <span className="hidden flex-shrink-0 rounded-full border border-white/[0.07] bg-white/[0.05] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-faint sm:inline-block">
            {badge}
          </span>
        )}
      </div>

      <p className="max-w-[52ch] text-sm leading-relaxed text-ink-muted text-pretty sm:mb-5 sm:text-[15px]">
        {description}
      </p>

      {children && (
        <div className={showcase ? "mt-4 sm:mt-0" : "hidden sm:block"}>
          {children}
        </div>
      )}
    </motion.article>
  );
}

export default function Features() {
  return (
    <section id="features" className="relative py-14 sm:py-24 lg:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ━━━ Header ━━━ */}
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mb-9 max-w-2xl sm:mb-14"
        >
          <h2 className="text-[clamp(2rem,4.6vw,3.25rem)] font-black leading-[0.98] tracking-[-0.04em] text-balance">
            Everything you need.
            <br />
            <span className="text-ink-faint">Nothing you don&apos;t.</span>
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-muted text-pretty">
            No fluff, no gimmicks. Just the tools serious lifters need to track,
            progress and dominate.
          </p>
        </motion.div>

        {/* ━━━ Grid ━━━ */}
        <motion.div
          variants={stack}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3"
        >
          <FeatureCell
            icon={<Target className="h-5 w-5" />}
            title="Smart dashboard"
            description="Workouts, nutrition, streaks and daily targets in one view."
            badge="V2.0"
            className="col-span-2"
            glow="shadow-[0_0_25px_rgba(74,222,128,0.15)] border-protein/40 text-protein bg-protein/10"
            dot="bg-protein shadow-[0_0_8px_#4ade80]"
            showcase
          >
            <DashboardMini />
          </FeatureCell>

          <FeatureCell
            icon={<Dumbbell className="h-5 w-5" />}
            title="Muscle heatmaps"
            description="Training volume on a 3D mannequin. Tap a group for detail."
            badge="Heatmap"
            className="col-span-2 lg:col-span-1"
            glow="shadow-[0_0_25px_rgba(250,204,21,0.15)] border-carbs/40 text-carbs bg-carbs/10"
            dot="bg-carbs shadow-[0_0_8px_#facc15]"
            showcase
          >
            <HeatmapMini />
          </FeatureCell>

          <FeatureCell
            icon={<Sparkles className="h-5 w-5" />}
            title="AI nutrition coach"
            description="500K+ foods with AI scanning. Instant macros, Indian food included."
            badge="AI"
            className="col-span-2"
            glow="shadow-[0_0_25px_rgba(34,211,238,0.15)] border-cyan-400/40 text-cyan-400 bg-cyan-400/10"
            dot="bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
            showcase
          >
            <FoodSearchMini />
          </FeatureCell>

          <FeatureCell
            icon={<BookOpen className="h-5 w-5" />}
            title="Built-in education"
            description="Science-backed lessons between sets. XP for every one you finish."
            glow="shadow-[0_0_25px_rgba(192,132,252,0.15)] border-purple-400/40 text-purple-400 bg-purple-400/10"
            dot="bg-purple-400 shadow-[0_0_8px_#c084fc]"
          >
            <LearnMini />
          </FeatureCell>

          <FeatureCell
            icon={<Users className="h-5 w-5" />}
            title="Gym buddies"
            description="See who's training right now. Stay accountable together."
            glow="shadow-[0_0_25px_rgba(74,222,128,0.15)] border-protein/40 text-protein bg-protein/10"
            dot="bg-protein shadow-[0_0_8px_#4ade80]"
          >
            <BuddiesMini />
          </FeatureCell>

          <FeatureCell
            icon={<Target className="h-5 w-5" />}
            title="1-bit thermal receipts"
            description="Print your session. Share it raw, or over a gym selfie."
            badge="Share"
            glow="shadow-[0_0_25px_rgba(244,114,182,0.15)] border-pink-400/40 text-pink-400 bg-pink-400/10"
            dot="bg-pink-400 shadow-[0_0_8px_#f472b6]"
          >
            <ReceiptMini />
          </FeatureCell>

          <FeatureCell
            icon={<QrCode className="h-5 w-5" />}
            title="Your gym, connected"
            description="QR check-in, live crowd meter, class booking."
            badge="Gym OS"
            glow="shadow-[0_0_25px_rgba(251,146,60,0.15)] border-orange-400/40 text-orange-400 bg-orange-400/10"
            dot="bg-orange-400 shadow-[0_0_8px_#fb923c]"
          >
            <GymMini />
          </FeatureCell>
        </motion.div>
      </div>
    </section>
  );
}
