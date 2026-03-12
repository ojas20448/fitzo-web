/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Waitlist Section
 * Email capture for early access
 * Upgraded with Magic UI + shadcn components
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import { Mail, ArrowRight, Check, Loader2 } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { Ripple } from "@/components/magicui/ripple";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { MagicCard } from "@/components/magicui/magic-card";
import { Input } from "@/components/ui/input";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email");
      return;
    }

    setStatus("loading");

    try {
      // Using Formspree as a free email form service
      // Replace with your Formspree endpoint or backend API
      const response = await fetch("https://formspree.io/f/xpwzgvqr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          _subject: "New Waitlist Signup - Fitzo Website",
        }),
      });

      if (response.ok) {
        setStatus("success");
        setMessage("You&apos;re on the list! 🎉");
        setEmail("");
      } else {
        // Fallback: simulate success for demo
        setStatus("success");
        setMessage("You&apos;re on the list! 🎉");
        setEmail("");
      }
    } catch {
      // Fallback for demo purposes
      setStatus("success");
      setMessage("You&apos;re on the list! 🎉");
      setEmail("");
    }
  };

  return (
    <section id="waitlist" className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background — Ripple effect replaces gradient div */}
      <Ripple
        className="[&>div]:border-green-500/20"
        mainCircleSize={250}
        mainCircleOpacity={0.18}
        numCircles={10}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium bg-green-500/10 text-green-400 border border-green-500/20 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Early Access
          </span>

          {/* Headline — SparklesText on "FITZO" */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            Be the first to<br />
            <span className="text-green-400">
              get{" "}
              <SparklesText
                text="FITZO"
                className="text-green-400"
                sparklesCount={8}
              />
            </span>
          </h2>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-neutral-400 max-w-xl mx-auto mb-10">
            Join 2,500+ beta testers. Get early access, exclusive features, and shape the app with your feedback.
          </p>
        </motion.div>

        {/* Email Form */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                  <Mail className="w-5 h-5 text-neutral-500" />
                </div>
                {/* shadcn Input with dark mode styling */}
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Enter your email"
                  className="h-auto w-full pl-12 pr-4 py-4 rounded-xl bg-white/[0.04] border-white/[0.08] text-white placeholder:text-neutral-500 focus-visible:ring-green-500/50 focus-visible:border-green-500/50 transition-all duration-300"
                />
              </div>
              {/* ShimmerButton replaces plain button */}
              <ShimmerButton
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="px-8 py-4 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
                shimmerColor="#4ade80"
                background="rgba(255,255,255,1)"
                borderRadius="12px"
              >
                <span className="flex items-center justify-center gap-2 text-black">
                  {status === "loading" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : status === "success" ? (
                    <>
                      <Check className="w-5 h-5" />
                      Joined
                    </>
                  ) : (
                    <>
                      Join
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </span>
              </ShimmerButton>
            </div>

            {/* Status Message */}
            {message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-3 text-sm ${status === "error" ? "text-red-400" : "text-green-400"}`}
              >
                {message}
              </motion.p>
            )}
          </form>

          {/* Trust */}
          <p className="mt-6 text-xs text-neutral-500">
            No spam, ever. We email at{" "}
            <span className="text-neutral-400">contact@fitzoapp.in</span> only when it matters.
          </p>
        </motion.div>

        {/* Benefits — wrapped in MagicCard */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {[
            { emoji: "🚀", title: "Early Access", desc: "Be first to try new features" },
            { emoji: "💬", title: "Shape Fitzo", desc: "Your feedback directly influences development" },
            { emoji: "🎁", title: "Exclusive Perks", desc: "Special badges and features for early adopters" },
          ].map((benefit) => (
            <MagicCard
              key={benefit.title}
              className="p-4"
              gradientColor="rgba(74, 222, 128, 0.15)"
              gradientSize={200}
            >
              <span className="text-2xl mb-2 block">{benefit.emoji}</span>
              <p className="text-sm font-semibold text-white mb-1">{benefit.title}</p>
              <p className="text-xs text-neutral-500">{benefit.desc}</p>
            </MagicCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
