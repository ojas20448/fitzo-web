/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO: Final CTA + Early Access
 * The single conversion point of the page: big brand moment,
 * one working email form, honest store status.
 * Every "#download" link on the site lands here.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2, Mail } from "lucide-react";
import { stack, stackItem, VIEWPORT } from "@/lib/motion";
import { FitzoIcon } from "@/components/FitzoLogo";
import { STORE } from "@/lib/links";

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
        setMessage("You're on the list: see you at launch. 💪");
        setEmail("");
      } else {
        // Honest failure: never fake success and silently lose a lead
        setStatus("error");
        setMessage("Couldn't sign you up. Email us at contact@fitzoapp.in instead.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error: try again, or email contact@fitzoapp.in.");
    }
  };

  return (
    <section id="download" className="relative overflow-hidden py-16 sm:py-28 lg:py-40">
      {/* Single quiet backdrop */}
      <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(74,222,128,0.09),transparent_70%)]"
        />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={stack}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {/* Brand moment */}
          <motion.div variants={stackItem} className="flex justify-center mb-8">
            <FitzoIcon className="w-16 h-16 sm:w-20 sm:h-20" />
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={stackItem}
            className="text-[clamp(2.25rem,5.4vw,3.75rem)] font-black leading-[0.96] tracking-[-0.045em] text-balance text-white mb-5"
          >
            Train with a coach
            <br />
            that knows you.
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={stackItem}
            className="text-lg text-ink-muted max-w-lg mx-auto mb-9 leading-relaxed text-pretty"
          >
            Android is live on Google Play. iOS is in open TestFlight beta.
            Both free: no card, no ads.
          </motion.p>

          {/* ━━━ The real destinations.
                 These used to be an email form wearing "Download iOS" and
                 "Google Play" labels. They are now the actual listings, and
                 the iOS one says TestFlight because that is what it is. ━━━ */}
          <motion.div
            variants={stackItem}
            className="mb-10 flex flex-col justify-center gap-3 sm:flex-row"
          >
            <motion.a
              href={STORE.android}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.975 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-7 py-4 text-base font-semibold text-black transition-colors duration-300 hover:bg-protein"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" />
              </svg>
              Get it on Google Play
            </motion.a>

            <motion.a
              href={STORE.iosTestFlight}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.975 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/[0.14] bg-white/[0.05] px-7 py-4 text-base font-semibold text-white transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.09]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Join the iOS beta
            </motion.a>
          </motion.div>

          <motion.div variants={stackItem} className="mb-7 flex items-center gap-4">
            <span className="h-px flex-1 bg-white/[0.09]" />
            <span className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">
              or get launch news
            </span>
            <span className="h-px flex-1 bg-white/[0.09]" />
          </motion.div>

          {/* ━━━ Email list: now the secondary path, not a fake download ━━━ */}
          <motion.form
            variants={stackItem}
            onSubmit={handleSubmit}
            className="max-w-md mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="you@example.com"
                  aria-label="Email address"
                  className="w-full pl-11 pr-4 py-4 rounded-full border border-white/[0.12] bg-white/[0.05] text-white placeholder:text-ink-faint text-sm outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="px-8 py-4 rounded-full bg-white text-black text-sm font-semibold hover:bg-protein transition-colors disabled:opacity-60 disabled:cursor-not-allowed min-w-[160px] flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : status === "success" ? (
                  <>
                    <Check className="w-4 h-4" /> Joined
                  </>
                ) : (
                  <>
                    Notify me <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {message && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 text-sm ${status === "error" ? "text-fat" : "text-protein"}`}
                role="status"
              >
                {message}
              </motion.p>
            )}
          </motion.form>

          <motion.p
            variants={stackItem}
            className="mx-auto mt-7 max-w-sm text-xs leading-relaxed text-ink-faint"
          >
            One email when the public iOS release lands. No spam, unsubscribe
            any time.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
