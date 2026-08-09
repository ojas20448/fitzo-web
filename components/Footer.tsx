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

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Try the demo", href: "/#demo" },
    { label: "Compare", href: "/compare" },
    { label: "Early access", href: "/#download" },
  ],
  Company: [
    { label: "Blog", href: "/blog" },
    { label: "Changelog", href: "/changelog" },
    { label: "Contact", href: "mailto:contact@fitzoapp.in" },
  ],
  Tools: [
    { label: "BMR Calculator", href: "/tools/bmr-calculator" },
    { label: "Macro Calculator", href: "/tools/macro-calculator" },
    { label: "Body Fat Calculator", href: "/tools/body-fat-calculator" },
    { label: "1RM Calculator", href: "/tools/1rm-calculator" },
    { label: "TDEE Calculator", href: "/tools/tdee-calculator" },
    { label: "Protein Calculator", href: "/tools/protein-calculator" },
  ],
  Legal: [
    { label: "Privacy policy", href: "/privacy-policy" },
    { label: "Terms of service", href: "/terms" },
  ],
} as const;

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
      className="relative border-t border-white/[0.07] pb-8 pt-12 sm:pt-16"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-10 md:mb-14 md:grid-cols-5 lg:gap-16">
          {/* ━━━ Brand ━━━ */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="mb-5 -m-2 inline-block p-2">
              <FitzoLogo size="sm" showWordmark />
            </Link>
            <p className="mb-7 max-w-[34ch] text-sm leading-relaxed text-ink-muted">
              For serious lifters. Track workouts, nutrition and progress with
              precision.
            </p>

            <div className="flex gap-3">
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
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.04] text-ink-muted transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-protein"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ━━━ Link columns ━━━ */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <nav key={category} aria-label={category}>
              <h2 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                {category}
              </h2>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="-my-1 inline-block py-2 text-[13px] text-ink-muted transition-colors duration-300 hover:text-white sm:text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ━━━ Bottom bar ━━━ */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-7 sm:flex-row">
          <p className="text-xs text-ink-faint">
            &copy; {currentYear} Fitzo. All rights reserved.
          </p>
          <p className="text-xs text-ink-faint">
            Made for the gym floor, in India.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
