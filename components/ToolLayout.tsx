"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { rise, VIEWPORT } from "@/lib/motion";

interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function ToolLayout({
  title,
  description,
  children,
}: ToolLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
      {/* Abstract Background Elements matching the 1-bit style */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={rise}
          initial="hidden"
          animate="visible"
          viewport={VIEWPORT}
          className="mb-12 text-center sm:mb-16"
        >
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-ink-muted sm:text-lg">
            {description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 shadow-2xl backdrop-blur-xl sm:p-10"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
