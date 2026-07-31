/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Built by a lifter
 *
 * The left panel used to be three concentric rings around a stroked "F" —
 * generic chrome standing where an authored asset belongs. It is now the
 * product's own 1-bit thermal receipt, printing the founder's week. The
 * artifact is a real Fitzo feature, so the section proves something instead of
 * decorating.
 *
 * The stat row lost "50K+ lines of code" and "1 mission": a lifter does not
 * care how much code there is, and a mission is not a quantity. What replaced
 * them are facts a reader can actually weigh.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { stack, stackItem, sweep, VIEWPORT, EASE_OUT_EXPO } from "@/lib/motion";

/* ━━━ The receipt — Fitzo's own thermal share format, printed ━━━ */
const RECEIPT_ROWS = [
  ["BENCH PRESS", "4 × 80"],
  ["INCLINE DB", "3 × 30"],
  ["CABLE FLYE", "3 × 15"],
  ["OHP", "4 × 45"],
  ["LATERAL RAISE", "3 × 12"],
  ["TRICEP PUSHDOWN", "3 × 25"],
];

function ReceiptArtifact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, rotate: -3 }}
      whileInView={{ opacity: 1, y: 0, rotate: -2 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
      className="relative mx-auto w-[16.5rem] max-w-full sm:w-[19rem] lg:mx-0"
    >
      {/* Paper */}
      <div className="relative bg-white px-6 pb-8 pt-7 font-mono text-[10px] leading-[1.7] text-black shadow-[0_24px_60px_-16px_rgba(0,0,0,0.9)]">
        {/* Torn top edge */}
        <div
          aria-hidden
          className="absolute inset-x-0 -top-1 h-2 bg-white [clip-path:polygon(0_100%,2%_20%,4%_100%,6%_35%,8%_100%,10%_15%,12%_100%,14%_40%,16%_100%,18%_25%,20%_100%,22%_10%,24%_100%,26%_45%,28%_100%,30%_20%,32%_100%,34%_35%,36%_100%,38%_15%,40%_100%,42%_40%,44%_100%,46%_25%,48%_100%,50%_10%,52%_100%,54%_45%,56%_100%,58%_20%,60%_100%,62%_35%,64%_100%,66%_15%,68%_100%,70%_40%,72%_100%,74%_25%,76%_100%,78%_10%,80%_100%,82%_45%,84%_100%,86%_20%,88%_100%,90%_35%,92%_100%,94%_15%,96%_100%,98%_40%,100%_100%)]"
        />

        <div className="text-center">
          <p className="text-[13px] font-bold tracking-[0.2em]">FITZO</p>
          <p className="mt-0.5 text-[9px] tracking-[0.12em] text-neutral-600">
            TRAINING RECEIPT
          </p>
        </div>

        <div className="my-3 border-t border-dashed border-black/25" />

        <div className="flex justify-between text-[9px] text-neutral-600">
          <span>PUSH · WEEK 12</span>
          <span>#1840</span>
        </div>

        <div className="my-3 border-t border-dashed border-black/25" />

        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="space-y-1"
        >
          {RECEIPT_ROWS.map(([name, load]) => (
            <motion.div
              key={name}
              variants={sweep}
              className="flex justify-between tabular-nums"
            >
              <span>{name}</span>
              <span className="font-bold">{load}</span>
            </motion.div>
          ))}
        </motion.div>

        <div className="my-3 border-t border-dashed border-black/25" />

        <div className="flex justify-between font-bold tabular-nums">
          <span>TOTAL VOLUME</span>
          <span>7,240 KG</span>
        </div>
        <div className="mt-1 flex justify-between text-[9px] text-neutral-600 tabular-nums">
          <span>DURATION</span>
          <span>00:52:11</span>
        </div>

        <div className="my-3 border-t border-dashed border-black/25" />

        {/* 1-bit dithered barbell — the product's own mark */}
        <div className="flex items-end justify-between">
          <Image
            src="/barbell_dither.png"
            width={52}
            height={52}
            className="h-[52px] w-[52px] object-contain"
            alt=""
          />
          <div className="text-right text-[8px] leading-tight text-neutral-600">
            <p>SHARE IT RAW OR</p>
            <p className="font-bold text-black">DROP IT ON YOUR SELFIE</p>
          </div>
        </div>

        {/* Barcode */}
        <div aria-hidden className="mt-4 flex h-8 items-end gap-[2px]">
          {[3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 3, 1, 2, 4, 1, 1, 2, 3, 1, 2, 1, 4, 2, 1, 3, 1, 1, 2].map(
            (w, i) => (
              <span
                key={i}
                style={{ width: `${w}px` }}
                className="h-full bg-black"
              />
            )
          )}
        </div>
      </div>
    </motion.div>
  );
}

const FACTS = [
  { value: "10+", label: "Years under the bar" },
  { value: "6", label: "Cities in the beta" },
  { value: "0", label: "Investors, ads, trackers" },
];

export default function FounderStory() {
  return (
    <section
      id="founder"
      className="relative overflow-hidden py-14 sm:py-24 lg:py-32"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-9 sm:gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          {/* ━━━ The artifact ━━━ */}
          <ReceiptArtifact />

          {/* ━━━ The story ━━━ */}
          <motion.div
            variants={stack}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <motion.p variants={stackItem}>
              <span className="kicker mb-6">Meet the builder</span>
            </motion.p>

            <motion.h2
              variants={stackItem}
              className="text-[clamp(2rem,4.6vw,3.25rem)] font-black leading-[0.98] tracking-[-0.04em] text-balance"
            >
              Built by a lifter,
              <br />
              <span className="text-ink-faint">for lifters.</span>
            </motion.h2>

            <motion.div variants={stackItem} className="mt-6">
              <p className="text-xl font-bold text-white">Ojas Narang</p>
              <p className="mt-0.5 text-sm text-ink-faint">Founder &amp; developer</p>
            </motion.div>

            <motion.div variants={stackItem} className="mt-6 space-y-4">
              <p className="max-w-[62ch] text-base leading-relaxed text-ink-muted text-pretty">
                Ten years as an athlete. Engineer by trade. I built Fitzo because
                every tracking app I tried was either bloated with social
                features nobody asked for, or missing the science behind real
                hypertrophy training.
              </p>
              <p className="max-w-[62ch] text-base leading-relaxed text-ink-muted text-pretty">
                It&apos;s what happens when a lifter who codes gets tired of
                settling. No venture capital, no growth hacks — just the tool I
                wanted to exist, for myself and every serious lifter in India.
              </p>
            </motion.div>

            <motion.dl
              variants={stackItem}
              className="mt-8 grid grid-cols-3 gap-x-4 border-t border-white/[0.07] pt-6 sm:mt-10 sm:flex sm:flex-wrap sm:gap-x-12 sm:gap-y-6 sm:pt-7"
            >
              {FACTS.map((f) => (
                <div key={f.label}>
                  <dd className="text-[22px] font-black tabular-nums leading-none tracking-[-0.03em] text-white sm:text-[28px]">
                    {f.value}
                  </dd>
                  <dt className="mt-1.5 text-[11px] leading-tight text-ink-muted sm:mt-2 sm:text-sm">{f.label}</dt>
                </div>
              ))}
            </motion.dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
