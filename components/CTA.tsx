/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Final CTA Section
 * B&W conversion-optimized download section
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Apple } from "lucide-react";
import {
  staggerContainer,
  staggerItem,
} from "@/lib/animations";

export default function CTA() {
  return (
    <section id="download" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 radial-fade" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Badge */}
          <motion.div variants={staggerItem} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] text-neutral-400 border border-white/[0.06]">
              <ArrowRight className="w-3 h-3" />
              Start Training Smarter
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={staggerItem}
            className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight mb-6"
          >
            Ready to Train<br />
            <span className="text-neutral-500">Smarter</span>?
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={staggerItem}
            className="text-lg sm:text-xl text-neutral-500 max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Join thousands of lifters who ditched the guesswork. Track with
            precision. Progress with data.
          </motion.p>

          {/* ━━━ Download Buttons ━━━ */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            {/* iOS */}
            <motion.a
              href="#"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
              className="flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black font-semibold text-base hover:bg-neutral-200 transition-colors duration-300"
            >
              <Apple className="w-5 h-5" />
              Download for iOS
            </motion.a>

            {/* Android */}
            <motion.a
              href="#"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
              className="flex items-center gap-3 px-8 py-4 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white font-semibold text-base hover:bg-white/[0.1] transition-colors duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 2.237a.625.625 0 0 0-.858.23l-1.77 3.107C13.825 5.2 12.7 4.97 11.5 4.97s-2.325.23-3.395.604L6.335 2.467a.625.625 0 0 0-1.088.613l1.656 2.907C4.652 7.472 3 9.84 3 12.62h17c0-2.78-1.652-5.148-3.903-6.633l1.656-2.907a.625.625 0 0 0-.23-.843zM8.5 10.37a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75zm6 0a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75zM3 13.87v5.75c0 .69.56 1.25 1.25 1.25h1.25v2.5a1.25 1.25 0 0 0 2.5 0v-2.5h5v2.5a1.25 1.25 0 0 0 2.5 0v-2.5h1.25c.69 0 1.25-.56 1.25-1.25v-5.75H3z"/></svg>
              Android
            </motion.a>
          </motion.div>

          {/* Trust note */}
          <motion.p
            variants={staggerItem}
            className="mt-8 text-xs text-neutral-600"
          >
            Free to download · No credit card required · Cancel anytime
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
