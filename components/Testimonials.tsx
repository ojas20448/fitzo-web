/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Testimonials Section
 * Beta tester quotes with animated stat counters
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { Quote } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

const testimonials = [
  {
    name: "Aditya Sharma",
    location: "Mumbai, Maharashtra",
    avatar: "AS",
    xp: "42",
    level: "Level 12",
    quote: "Finally an app that understands Indian body types. The AI coach suggested modifications that actually work with my schedule. Been consistent for 3 months straight now!",
  },
  {
    name: "Priya Menon",
    location: "Bangalore, Karnataka",
    avatar: "PM",
    xp: "78",
    level: "Level 24",
    quote: "The learn module is legit. I didn't know half of this nutrition stuff. Lost 8kg in 2 months just by understanding calories properly. Game changer.",
  },
  {
    name: "Rahul Verma",
    location: "Delhi, NCR",
    avatar: "RV",
    xp: "156",
    level: "Level 31",
    quote: "Gym buddies feature keeps me accountable. My roommate and I compete weekly now. The workout intent system is simple but so effective.",
  },
  {
    name: "Sneha Iyer",
    location: "Chennai, Tamil Nadu",
    avatar: "SI",
    xp: "93",
    level: "Level 28",
    quote: "The barcode scanner works amazing for Indian packaged foods. Most apps only have US database. Fitzo gets Indian brands. Finally!",
  },
  {
    name: "Kunal Patel",
    location: "Ahmedabad, Gujarat",
    avatar: "KP",
    xp: "34",
    level: "Level 9",
    quote: "As a beginner, I was lost in the gym. Fitzo's workout splits and exercise library helped me build a routine. No more randoms exercises.",
  },
  {
    name: "Anjali Reddy",
    location: "Hyderabad, Telangana",
    avatar: "AR",
    xp: "67",
    level: "Level 19",
    quote: "The XP system makes it feel like a game. Stupid but it works lol. I've not missed a workout in 6 weeks because I don't want to break my streak.",
  },
];

/* ━━━ Animated Stat Counter ━━━ */
function StatCounter({
  end,
  suffix,
  label,
  delay,
  decimals = 0,
}: {
  end: number;
  suffix: string;
  label: string;
  delay: number;
  decimals?: number;
}) {
  const { ref, display } = useCountUp({ end, suffix, duration: 2000, delay, decimals });

  return (
    <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
      <p
        ref={ref as React.RefObject<HTMLParagraphElement>}
        className="text-2xl sm:text-3xl font-black text-white tabular-nums"
      >
        {display}
      </p>
      <p className="text-xs sm:text-sm text-neutral-500">{label}</p>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-16 sm:py-24 bg-black">
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
            Beta Testers
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            Loved by<br />
            <span className="text-neutral-500">Indian Lifters</span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-500 max-w-2xl mx-auto">
            Real feedback from our beta community across the country.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={fadeUp}
              className="glass-card p-6 rounded-2xl border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-neutral-700 mb-4" />

              {/* Quote */}
              <p className="text-[15px] text-neutral-300 leading-relaxed mb-6">
                &quot;{testimonial.quote}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <span className="text-sm font-bold text-black">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              {/* XP Badge */}
              <div className="mt-4 pt-4 border-t border-white/[0.04] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  <span className="text-xs text-neutral-400">
                    {testimonial.xp} XP earned
                  </span>
                </div>
                <span className="text-[10px] px-2 py-1 rounded-full bg-white/[0.04] text-neutral-400">
                  {testimonial.level}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Stats Banner */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <StatCounter end={2500} suffix="+" label="Beta Users" delay={0} />
          <StatCounter end={50000} suffix="+" label="Workouts Logged" delay={150} />
          <StatCounter end={12000} suffix="+" label="Meals Tracked" delay={300} />
          <StatCounter end={4.8} suffix="/5" label="Play Store Rating" delay={450} decimals={1} />
        </motion.div>
      </div>
    </section>
  );
}
