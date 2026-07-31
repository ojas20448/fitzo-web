/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Sticky Navigation
 *
 * The bar itself is the page's only always-on instrument: a hairline scroll
 * readout runs along its base, and the active section lights up as you pass it.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import FitzoLogo from "@/components/FitzoLogo";
import { EASE_OUT_EXPO } from "@/lib/motion";

const NAV_LINKS = [
  { href: "/#features", label: "Features", id: "features" },
  { href: "/#demo", label: "Try it", id: "demo" },
  { href: "/#science", label: "Compare", id: "science" },
  { href: "/blog", label: "Blog", id: null },
] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => setScrolled(v > 0.01));

  /* Light the nav item for whichever section owns the viewport centre. */
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id).filter(Boolean) as string[];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    /* Track the full visible set, not just the latest entry — otherwise the
       pill stays lit on the last matched section long after the reader has
       scrolled past every tracked one. */
    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        }
        if (visible.size === 0) {
          setActive(null);
          return;
        }
        const [topId] = Array.from(visible.entries()).sort(
          (a, b) => b[1] - a[1]
        )[0];
        setActive(topId);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* Escape closes the mobile menu. */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-white/[0.07] bg-black/70 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8"
        aria-label="Main"
      >
        <Link
          href="/"
          className="relative z-10 -m-2 rounded-lg p-2"
          aria-label="Fitzo — home"
        >
          <FitzoLogo size="md" />
        </Link>

        {/* ━━━ Desktop links ━━━ */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = link.id !== null && active === link.id;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-ink-muted hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-white/[0.07] ring-1 ring-inset ring-white/[0.06]"
                    transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* ━━━ Desktop CTA ━━━ */}
        <div className="hidden md:flex">
          <motion.a
            href="/#download"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.975 }}
            transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
            className="group inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors duration-300 hover:bg-protein"
          >
            Get Fitzo
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />
          </motion.a>
        </div>

        {/* ━━━ Mobile toggle — 44px target ━━━ */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="relative z-10 -mr-2 flex h-11 w-11 items-center justify-center rounded-xl text-white md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* ━━━ Scroll readout — the page's progress, as an instrument ━━━ */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className={`h-px origin-left bg-gradient-to-r from-protein via-protein to-carbs transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* ━━━ Mobile menu ━━━ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: {
                      delay: 0.06 + i * 0.05,
                      duration: 0.5,
                      ease: EASE_OUT_EXPO,
                    },
                  }}
                  exit={{ opacity: 0, y: 10, transition: { duration: 0.15 } }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-6 py-3 text-3xl font-extrabold tracking-tight text-white transition-colors hover:text-protein"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.a
                href="/#download"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.32, duration: 0.5, ease: EASE_OUT_EXPO },
                }}
                exit={{ opacity: 0 }}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-black"
              >
                Get Fitzo <ArrowRight className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
