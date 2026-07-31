/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Weekly readout  ·  the page's one authored motion moment
 *
 * This replaces the "Trusted by athletes from" marquee, which paraded eight
 * gym brands that do not exist. A pre-launch product cannot borrow other
 * people's logos, but it can show the thing it actually does — so the scroll
 * scrubs a week of training being read: tonnage climbing day by day, macro
 * adherence resolving underneath, totals counting, and finally the coach's
 * read on the week.
 *
 * The motion is the argument. Every value is bound to scroll progress, so the
 * visitor drives the instrument rather than watching a loop.
 *
 * Second pass — what a cold review correctly called out:
 *   · 320vh with the bars finishing at 0.56 meant the last 44% of the scroll
 *     delivered one fading paragraph. Now 200vh, with the read landing at 0.9.
 *   · It was a bar chart with a scroll trigger. An instrument has a scale, so
 *     it now carries a volume axis, tick lines, a labelled peak and a ghosted
 *     last-week outline to compare against.
 *   · Three 6px dots carried all the macro information with no legend. There
 *     is now a legend, and a day that missed its protein target is marked on
 *     the bar itself rather than only in a dot nobody can decode.
 *
 * The week shown is demonstration data, labelled as such in the UI.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { Sparkles } from "lucide-react";
import { EASE_OUT_EXPO } from "@/lib/motion";

type Day = {
  day: string;
  session: string;
  volume: number;
  /** Last week's tonnage for the same slot — drawn as a ghost to compare. */
  prev: number;
  /** Did protein / carbs / fat land inside target that day. */
  macros: [boolean, boolean, boolean];
};

const WEEK: Day[] = [
  { day: "Mon", session: "Push", volume: 7240, prev: 6980, macros: [true, true, true] },
  { day: "Tue", session: "Pull", volume: 8120, prev: 8010, macros: [true, true, false] },
  { day: "Wed", session: "Legs", volume: 11450, prev: 9800, macros: [true, false, true] },
  { day: "Thu", session: "Rest", volume: 0, prev: 0, macros: [true, true, true] },
  { day: "Fri", session: "Push", volume: 7890, prev: 7400, macros: [false, true, true] },
  { day: "Sat", session: "Pull", volume: 8460, prev: 8300, macros: [true, true, true] },
  { day: "Sun", session: "Legs", volume: 12100, prev: 10600, macros: [true, true, false] },
];

const PEAK = Math.max(...WEEK.map((d) => d.volume));
const PEAK_DAY = WEEK.find((d) => d.volume === PEAK)!;
const TOTAL = WEEK.reduce((s, d) => s + d.volume, 0);
const SESSIONS = WEEK.filter((d) => d.volume > 0).length;
const PROTEIN_AVG = 148;

/** Axis ticks in kg, top-down. */
const TICKS = [12000, 8000, 4000];

const MACRO_LABELS = ["Protein", "Carbs", "Fat"] as const;
const MACRO_DOT = ["bg-protein", "bg-carbs", "bg-fat"] as const;

/* Each day owns a slice of the scroll. Bars finish by ~0.62. */
const barWindow = (i: number): [number, number] => [
  0.05 + i * 0.062,
  0.05 + i * 0.062 + 0.14,
];

/* ━━━ One day column ━━━ */
function DayColumn({
  d,
  i,
  progress,
  reduce,
}: {
  d: Day;
  i: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const [from, to] = barWindow(i);
  const pct = (d.volume / PEAK) * 100;

  const height = useTransform(progress, [from, to], ["0%", `${pct}%`], {
    clamp: true,
  });
  const macroOpacity = useTransform(progress, [to - 0.02, to + 0.05], [0, 1], {
    clamp: true,
  });

  const isRest = d.volume === 0;
  const isPeak = d.volume === PEAK;
  const missedProtein = !d.macros[0];

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-2.5">
      <div className="relative flex h-[clamp(88px,17vh,168px)] w-full items-end justify-center">
        {isRest ? (
          <motion.div
            style={{ opacity: reduce ? 1 : macroOpacity }}
            className="mb-1 h-px w-full bg-white/15"
          />
        ) : (
          <motion.div
            style={{ height: reduce ? `${pct}%` : height }}
            className="relative w-full max-w-[54px] overflow-hidden rounded-t-[4px] rounded-b-sm bg-gradient-to-t from-protein/25 via-protein/70 to-protein"
          >
            <span className="absolute inset-x-0 top-0 h-px bg-white/70" />
          </motion.div>
        )}

        {/* Last week's tonnage, as a marker line laid across the bar.
            Drawn as a ghost *column* it was invisible: this week beat last
            week almost every day, so the bar covered it completely. A line
            reads whichever side of it the bar lands on. */}
        {!isRest && d.prev > 0 && (
          <motion.span
            aria-hidden
            style={{
              bottom: `${(d.prev / PEAK) * 100}%`,
              opacity: reduce ? 1 : macroOpacity,
            }}
            className="absolute left-1/2 h-px w-full max-w-[62px] -translate-x-1/2 bg-white/45"
          />
        )}

        {/* Protein miss, marked on the bar itself — not only in a 6px dot */}
        {missedProtein && (
          <motion.span
            style={{ opacity: reduce ? 1 : macroOpacity }}
            className="absolute inset-x-0 bottom-0 mx-auto h-[3px] w-full max-w-[54px] rounded-full bg-fat"
            title="Protein target missed"
          />
        )}

        {isPeak && (
          <motion.span
            style={{ opacity: reduce ? 1 : macroOpacity }}
            className="absolute -top-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-1.5 py-0.5 text-[9px] font-bold tabular-nums text-black"
          >
            {(PEAK / 1000).toFixed(1)}t
          </motion.span>
        )}
      </div>

      <motion.div
        style={{ opacity: reduce ? 1 : macroOpacity }}
        className="flex gap-1"
        aria-hidden
      >
        {d.macros.map((hit, m) => (
          <span
            key={m}
            className={`h-1.5 w-1.5 rounded-full ${
              hit ? MACRO_DOT[m] : "bg-transparent ring-1 ring-inset ring-white/25"
            }`}
          />
        ))}
      </motion.div>

      <div className="text-center">
        <p className="text-[11px] font-semibold text-white sm:text-xs">{d.day}</p>
        <p className="text-[10px] text-ink-faint sm:text-[11px]">{d.session}</p>
      </div>

      {/* The same information, for anyone not reading the dots visually */}
      <span className="sr-only">
        {d.day}, {d.session}:{" "}
        {isRest ? "rest day" : `${d.volume.toLocaleString("en-IN")} kg volume`}.
        Macros hit:{" "}
        {d.macros.every(Boolean)
          ? "all three"
          : MACRO_LABELS.filter((_, m) => d.macros[m]).join(", ") || "none"}
        .
      </span>
    </div>
  );
}

/* ━━━ A figure that counts as you scroll ━━━ */
function ScrubValue({
  progress,
  target,
  from,
  to,
  reduce,
  format = (n: number) => n.toLocaleString("en-IN"),
}: {
  progress: MotionValue<number>;
  target: number;
  from: number;
  to: number;
  reduce: boolean;
  format?: (n: number) => string;
}) {
  const raw = useTransform(progress, [from, to], [0, target], { clamp: true });
  const [display, setDisplay] = useState(0);
  useMotionValueEvent(raw, "change", (v) => setDisplay(Math.round(v)));
  /* Reduced motion gets the finished figure rather than a value it would have
     to scrub for — `reduce` is mount-gated upstream, so SSR still renders 0. */
  return <>{format(reduce ? target : display)}</>;
}

export default function WeeklyReadout() {
  const ref = useRef<HTMLDivElement>(null);

  /* useReducedMotion() reads false during SSR and true on a reduced-motion
     client, so branching markup straight off it hydration-mismatches every
     inline height and opacity below. Gate it behind mount: server and first
     client render agree, then the reduced path takes over on the next tick. */
  const prefersReduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduce = mounted && !!prefersReduce;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const coachOpacity = useTransform(scrollYProgress, [0.6, 0.78], [0, 1], {
    clamp: true,
  });
  const coachY = useTransform(scrollYProgress, [0.6, 0.78], [16, 0], {
    clamp: true,
  });
  /* Fades out just before the read fades in, so the slot is never blank. */
  const readingOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.16, 0.58, 0.68],
    [0, 1, 1, 0],
    { clamp: true }
  );

  return (
    <section
      id="readout"
      ref={ref}
      aria-label="A week of training, read by Fitzo"
      className="relative h-[165vh] sm:h-[210vh] lg:h-[240vh]"
    >
      <div className="sticky top-0 flex min-h-[100svh] items-center overflow-hidden pb-10 pt-20 sm:pb-14">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* ━━━ Heading ━━━ */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            className="mb-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-3"
          >
            <h2 className="text-[clamp(1.75rem,3.8vw,2.5rem)] font-black leading-[0.98] tracking-[-0.04em] text-balance">
              One week, read.
            </h2>
            <p className="max-w-[40ch] text-sm leading-relaxed text-ink-muted text-pretty">
              Every set and every meal lands in the same place. Scroll, and watch
              a week resolve the way Fitzo sees it.
            </p>
          </motion.div>

          {/* ━━━ The instrument ━━━ */}
          <div className="panel p-5 sm:p-6">
            {/* Plate header */}
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.07] pb-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                  Training volume · week 12
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  Push · Pull · Legs, twice through
                </p>
              </div>
              <span className="rounded-full border border-white/[0.09] bg-white/[0.04] px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-ink-faint">
                Demo data
              </span>
            </div>

            {/* ━━━ Plot: axis + bars ━━━ */}
            <div className="flex gap-3 sm:gap-4">
              {/* Volume scale — what makes this a readout, not a chart */}
              <div
                aria-hidden
                className="relative h-[clamp(88px,17vh,168px)] w-9 flex-shrink-0 sm:w-11"
              >
                {TICKS.map((t) => (
                  <span
                    key={t}
                    style={{ bottom: `${(t / PEAK) * 100}%` }}
                    className="absolute right-0 -translate-y-1/2 font-mono text-[9px] tabular-nums text-ink-faint"
                  >
                    {t / 1000}t
                  </span>
                ))}
              </div>

              <div className="relative min-w-0 flex-1">
                {/* Tick lines run behind the bars */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-[clamp(88px,17vh,168px)]"
                >
                  {TICKS.map((t) => (
                    <span
                      key={t}
                      style={{ bottom: `${(t / PEAK) * 100}%` }}
                      className="absolute inset-x-0 h-px bg-white/[0.07]"
                    />
                  ))}
                  <span className="absolute inset-x-0 bottom-0 h-px bg-white/20" />
                </div>

                <div className="relative flex items-end gap-2 sm:gap-4">
                  {WEEK.map((d, i) => (
                    <DayColumn
                      key={d.day}
                      d={d}
                      i={i}
                      progress={scrollYProgress}
                      reduce={reduce}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ━━━ Legend — the dots meant nothing without it ━━━ */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/[0.07] pt-4 text-[11px] text-ink-faint">
              {MACRO_LABELS.map((label, m) => (
                <span key={label} className="flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${MACRO_DOT[m]}`} />
                  {label}
                </span>
              ))}
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full ring-1 ring-inset ring-white/25" />
                Target missed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-px w-4 bg-white/45" />
                Last week
              </span>
              <span className="ml-auto hidden sm:inline">
                Peak: {PEAK_DAY.day} · {PEAK.toLocaleString("en-IN")} kg
              </span>
            </div>

            {/* ━━━ Totals ━━━ */}
            <div className="mt-5 grid grid-cols-1 gap-4 border-t border-white/[0.07] pt-5 sm:grid-cols-3 sm:gap-8">
              {[
                {
                  label: "Total volume",
                  target: TOTAL,
                  unit: "kg",
                  from: 0.1,
                  to: 0.66,
                  fmt: undefined,
                },
                {
                  label: "Sessions",
                  target: SESSIONS,
                  unit: "/ 7 days",
                  from: 0.1,
                  to: 0.6,
                  fmt: (n: number) => String(n),
                },
                {
                  label: "Protein held",
                  target: PROTEIN_AVG,
                  unit: "g/day",
                  from: 0.15,
                  to: 0.66,
                  fmt: (n: number) => String(n),
                },
              ].map((t) => (
                <div
                  key={t.label}
                  className="flex items-baseline justify-between sm:block"
                >
                  <p className="text-[10px] uppercase tracking-[0.14em] text-ink-faint sm:mb-1.5">
                    {t.label}
                  </p>
                  <p className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-black tabular-nums leading-none tracking-[-0.03em] text-white">
                    <ScrubValue
                      progress={scrollYProgress}
                      target={t.target}
                      from={t.from}
                      to={t.to}
                      reduce={reduce}
                      format={t.fmt}
                    />
                    <span className="ml-1 text-sm font-medium text-ink-faint">
                      {t.unit}
                    </span>
                  </p>
                </div>
              ))}
            </div>

            {/* ━━━ The read — the payoff the whole scroll builds to.
                   The slot holds its height from the start so nothing shifts,
                   and while the week is still resolving it says so rather than
                   sitting as an empty rectangle. The wait became part of the
                   argument: the coach is reading. ━━━ */}
            <div className="relative mt-5 min-h-[10.5rem] sm:min-h-[8.5rem]">
              <motion.div
                aria-hidden
                style={reduce ? { opacity: 0 } : { opacity: readingOpacity }}
                className="absolute inset-0 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 sm:p-5"
              >
                <span className="flex gap-1">
                  {[0, 1, 2].map((n) => (
                    <motion.span
                      key={n}
                      className="h-1.5 w-1.5 rounded-full bg-protein"
                      animate={{ opacity: [0.25, 1, 0.25] }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        delay: n * 0.18,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </span>
                <p className="text-sm text-ink-faint">
                  Reading six sessions and 41 logged meals…
                </p>
              </motion.div>

              <motion.div
                style={reduce ? undefined : { opacity: coachOpacity, y: coachY }}
                className="absolute inset-0 flex items-start gap-3 rounded-xl border border-protein/20 bg-protein/[0.05] p-4 sm:p-5 overflow-y-auto scrollbar-hide"
              >
                <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-protein" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-protein">
                    Fitzo&apos;s read
                  </p>
                  <p className="mt-1.5 max-w-[62ch] text-xs leading-relaxed text-ink-muted sm:text-sm">
                    Leg volume is up 14% on last week and protein held at 148g a
                    day across six sessions. Friday is the one you dropped —
                    short on protein after a heavy push. Thursday&apos;s rest
                    day landed where it should. Bench is the laggard: 2.5kg in
                    three weeks. Push the press on Friday.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
