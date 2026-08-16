/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO: Footer
 *
 * Two defects fixed here:
 *   · Contrast. Link and copyright text sat on neutral-600/700 over pure
 *     black: roughly 2.0:2.7:1, well under the 4.5:1 floor. Everything now
 *     uses the ink ramp, which is built to clear it.
 *   · Dead links. All three social icons pointed at "#". Only the X handle is
 *     evidenced anywhere in this codebase (layout.tsx twitter.creator), so
 *     that one survives and the unverifiable ones are gone.
 *
 * ⚠️ TO ADD: real Instagram / Reddit / YouTube URLs when those accounts exist.
 * Add them to SOCIALS: do not reintroduce href="#".
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { rise, VIEWPORT } from "@/lib/motion";
import FitzoLogo from "./FitzoLogo";


const SOCIALS = [
  {
    label: "Fitzo on X",
    href: "https://x.com/fitzoapp",
    icon: (
      <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Email Fitzo",
    href: "mailto:contact@fitzoapp.in",
    icon: <Mail className="h-[18px] w-[18px]" aria-hidden />,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      variants={rise}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className="relative mt-24 border-t border-white/[0.07] pb-12 pt-12 sm:pb-24 sm:pt-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-start">
          <div className="flex flex-col md:max-w-2xl">
            <div className="mb-6 flex items-center justify-center md:justify-start">
              <FitzoLogo size="sm" showWordmark />
            </div>
            
            <p className="font-mono text-[11px] leading-relaxed text-ink-muted sm:text-xs">
              Fitzo v2.0.0. Built for serious lifters to track workouts, nutrition, and progress with precision.
              Designed and engineered for the gym floor in India. Contains tools including BMR Calculator, Macro Calculator, Body Fat Calculator, 1RM Calculator, TDEE Calculator, and Protein Calculator.
              &copy; {currentYear} Fitzo. All rights reserved.
              {" "}
              <Link href="/privacy-policy" className="underline hover:text-white transition-colors">Privacy</Link>
              {" · "}
              <Link href="/terms" className="underline hover:text-white transition-colors">Terms</Link>
              {" · "}
              <a href="mailto:contact@fitzoapp.in" className="underline hover:text-white transition-colors">Contact</a>
            </p>
          </div>
          
          <div className="mt-4 flex gap-4 md:mt-0">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  social.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="text-ink-muted transition-colors duration-300 hover:text-protein"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
