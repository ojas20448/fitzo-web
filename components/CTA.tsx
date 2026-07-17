/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Final CTA + Early Access
 * The single conversion point of the page: big brand moment,
 * one working email form, honest store status.
 * Every "#download" link on the site lands here.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2, Mail } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { FitzoIcon } from "@/components/FitzoLogo";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email.");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("https://formspree.io/f/xpwzgvqr", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, source: "fitzoapp.in early access" }),
      });
      if (response.ok) {
        setStatus("success");
        setMessage("You're on the list — see you at launch. 💪");
        setEmail("");
      } else {
        // Honest failure — never fake success and silently lose a lead
        setStatus("error");
        setMessage("Couldn't sign you up. Email us at contact@fitzoapp.in instead.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error — try again, or email contact@fitzoapp.in.");
    }
  };

  return (
    <section id="download" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Single quiet backdrop */}
      <div className="absolute inset-0 radial-fade dark:radial-fade" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Brand moment */}
          <motion.div variants={staggerItem} className="flex justify-center mb-8">
            <FitzoIcon className="w-16 h-16 sm:w-20 sm:h-20" />
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={staggerItem}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black dark:text-white mb-5"
          >
            Train with a coach
            <br />
            that knows you.
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={staggerItem}
            className="text-lg text-neutral-500 max-w-md mx-auto mb-10 leading-relaxed"
          >
            Get early access before launch. Free for early members — no card, no
            spam, one email when it&apos;s your turn.
          </motion.p>

          {/* ━━━ Early access form (the one conversion action) ━━━ */}
          <motion.form
            variants={staggerItem}
            onSubmit={handleSubmit}
            className="max-w-md mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="you@example.com"
                  aria-label="Email address"
                  className="w-full pl-11 pr-4 py-4 rounded-full bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-black dark:text-white placeholder:text-neutral-500 text-sm outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="px-8 py-4 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed min-w-[160px] flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : status === "success" ? (
                  <>
                    <Check className="w-4 h-4" /> Joined
                  </>
                ) : (
                  <>
                    Get early access <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {message && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 text-sm ${status === "error" ? "text-red-400" : "text-green-500"}`}
                role="status"
              >
                {message}
              </motion.p>
            )}
          </motion.form>

          {/* Honest store status */}
          <motion.p
            variants={staggerItem}
            className="mt-8 text-xs text-neutral-500 tracking-wide uppercase"
          >
            Android &amp; iOS · Launching soon
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
