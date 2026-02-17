/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Final CTA Section
 * B&W conversion-optimized download section
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  staggerContainer,
  staggerItem,
} from "@/lib/animations";

export default function CTA() {
  return (
    <section id="download" className="relative py-16 sm:py-24 overflow-hidden">
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
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Download for iOS
            </motion.a>

            {/* Google Play */}
            <motion.a
              href="#"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
              className="flex items-center gap-3 px-8 py-4 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white font-semibold text-base hover:bg-white/[0.1] transition-colors duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z"/>
              </svg>
              Google Play
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
