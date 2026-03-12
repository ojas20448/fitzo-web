/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Sticky Navigation Bar
 * Minimal B&W nav with mobile slide-in menu
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import FitzoLogo from "@/components/FitzoLogo";
import ThemeToggle from "@/components/ThemeToggle";
import {
  navbarVariants,
  mobileMenuVariants,
} from "@/lib/animations";

/** Navigation links matching the reference design */
const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#science", label: "Science" },
  { href: "/blog", label: "Blog" },
  { href: "#download", label: "Pricing" },
] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <motion.header
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-2xl bg-white/80 dark:bg-black/80 border-b border-black/[0.06] dark:border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-[72px] flex items-center justify-between"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* ━━━ Logo ━━━ */}
        <Link href="/" className="relative z-10">
          <FitzoLogo size="md" />
        </Link>

        {/* ━━━ Desktop Links ━━━ */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-[13px] font-medium text-neutral-500 hover:text-black dark:hover:text-white transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-current after:transition-all after:duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ━━━ Desktop CTA + Theme Toggle ━━━ */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#download"
            className="inline-flex items-center px-6 py-2.5 rounded-full text-sm font-semibold text-white dark:text-black bg-black dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors duration-300"
          >
            Get Started
          </a>
        </div>

        {/* ━━━ Mobile Menu Toggle ━━━ */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-10 p-2 rounded-lg text-black dark:text-white"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* ━━━ Mobile Menu ━━━ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/98 backdrop-blur-2xl"
              onClick={() => setIsOpen(false)}
            />

            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.1 + i * 0.08 },
                  }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-semibold text-white hover:text-neutral-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.45 } }}
                exit={{ opacity: 0, y: 20 }}
              >
                <a
                  href="#download"
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-3 rounded-full text-base font-semibold text-black bg-white"
                >
                  Get Started
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
