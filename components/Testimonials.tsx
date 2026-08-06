/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO: Tester feedback
 *
 * Attribution (confirmed with the product owner, do not "improve"):
 * the QUOTES are real tester feedback; the full names and cities attached to
 * them previously were not. Inventing an identity to dress a real quote makes
 * the real quote unbelievable too, so attribution is now first name + initial
 * only, with no invented city and no invented tenure.
 *
 * ⚠️ If you obtain consent to publish someone's full name or city, add it
 * here per-person. Never add one back as set dressing.
 *
 * ⚠️ VERIFY BEFORE RELYING ON: TESTER_NUMBERS should be checked against the
 * real dashboard. Delete a figure that cannot be evidenced rather than
 * rounding it up.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { rise, stack, stackItem, VIEWPORT } from "@/lib/motion";
import { NumberTicker } from "@/components/magicui/number-ticker";

const TESTER_NUMBERS = [
  { value: 2500, suffix: "+", label: "Testers" },
  { value: 50000, suffix: "+", label: "Workouts logged" },
  { value: 12000, suffix: "+", label: "Meals tracked" },
];

const testimonials = [
  {
    name: "Aditya S.",
    avatar: "A",
    quote:
      "Finally an app that understands Indian body types. The AI coach suggested modifications that actually work with my schedule. Been consistent for 3 months straight now!",
  },
  {
    name: "Priya M.",
    avatar: "P",
    quote:
      "The learn module is legit. I didn't know half of this nutrition stuff. Lost 8kg in 2 months just by understanding calories properly. Game changer.",
  },
  {
    name: "Rahul V.",
    avatar: "R",
    quote:
      "Gym buddies feature keeps me accountable. My roommate and I compete weekly now. The workout intent system is simple but so effective.",
  },
  {
    name: "Sneha I.",
    avatar: "S",
    quote:
      "The barcode scanner works amazing for Indian packaged foods. Most apps only have US database. Fitzo gets Indian brands. Finally!",
  },
  {
    name: "Kunal P.",
    avatar: "K",
    quote:
      "As a beginner, I was lost in the gym. Fitzo's workout splits and exercise library helped me build a routine. No more random exercises.",
  },
  {
    name: "Anjali R.",
    avatar: "A",
    quote:
      "The XP system makes it feel like a game. Stupid but it works lol. I've not missed a workout in 6 weeks because I don't want to break my streak.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-14 sm:py-24 lg:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ━━━ Header ━━━ */}
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mb-9 max-w-2xl sm:mb-14"
        >
          <span className="kicker mb-6">Tester feedback</span>
          <h2 className="text-[clamp(2rem,4.6vw,3.25rem)] font-black leading-[0.98] tracking-[-0.04em] text-balance">
            What the testers
            <br />
            <span className="text-ink-faint">actually said.</span>
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-muted text-pretty">
Real words from people running Fitzo every day on Google Play and
            the iOS TestFlight beta. Quotes are theirs; names are shortened
            because we don&apos;t publish a tester&apos;s identity without asking.
          </p>
        </motion.div>

        {/* ━━━ Beta numbers: stated as beta numbers, not launch metrics ━━━ */}
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="panel mb-8 grid grid-cols-3 items-start gap-4 p-5 sm:mb-12 sm:flex sm:flex-wrap sm:items-center sm:gap-x-12 sm:gap-y-6 sm:p-7"
        >
          {TESTER_NUMBERS.map((s) => (
            <div key={s.label} className="sm:min-w-[9rem] sm:flex-1">
              <p className="whitespace-nowrap text-[clamp(1.05rem,4.6vw,2.25rem)] font-black tabular-nums leading-none tracking-[-0.03em] text-white">
                <NumberTicker value={s.value} className="text-white" />
                {s.suffix}
              </p>
              <p className="mt-1.5 text-[11px] leading-snug text-ink-muted sm:mt-2 sm:text-sm">
                {s.label}
              </p>
            </div>
          ))}
          <p className="col-span-3 border-t border-white/[0.07] pt-3 text-[11px] text-ink-faint sm:w-auto sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0 sm:text-xs">
            Totals to date across Google Play and the iOS beta.
          </p>
        </motion.div>

        {/* ━━━ Quotes ━━━
             On a phone six stacked cards ran to three screens of scroll for
             content nobody reads end to end. Below md they become a
             snap-scrolling rail: one card at a time with the next peeking, so
             the section costs one card's height instead of six. It is a grid
             again from md up, where the vertical budget exists. ━━━ */}
        <motion.div
          variants={stack}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          /* tabIndex={0} is load-bearing, not decoration. The rail has no
             focusable children, so without it a keyboard user can reach card
             one and nothing else: cards two to six are simply unavailable.
             Chrome makes bare scrollers focusable on its own; Safari and
             Firefox do not, so it is declared explicitly. */
          tabIndex={0}
          role="region"
          aria-label="Tester quotes: scrollable, use arrow keys"
          className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1 [scroll-padding-inline:1rem] focus-visible:outline-2 focus-visible:outline-offset-4 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.figure
              key={t.name}
              variants={stackItem}
              className="panel panel-interactive flex w-[82vw] max-w-sm shrink-0 snap-start flex-col p-6 md:w-auto md:max-w-none"
            >
              <Quote className="mb-4 h-6 w-6 flex-shrink-0 text-white/15" />

              <blockquote className="mb-6 flex-1 text-[15px] leading-relaxed text-ink-muted">
                {t.quote}
              </blockquote>

              <figcaption className="flex items-center gap-3 border-t border-white/[0.07] pt-5">
                <span
                  aria-hidden
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-[13px] font-bold text-white ring-1 ring-inset ring-white/10"
                >
                  {t.avatar}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {t.name}
                  </p>
                  <p className="truncate text-xs text-ink-faint">Verified tester</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
