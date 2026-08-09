import React, { InputHTMLAttributes, SelectHTMLAttributes } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface CalcInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  suffix?: string;
}

export const CalcInput = React.forwardRef<HTMLInputElement, CalcInputProps>(
  ({ label, error, suffix, className = "", ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        <label className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
          {label}
        </label>
        <div className="relative flex items-center">
          <input
            ref={ref}
            className={`w-full appearance-none rounded-lg border bg-black px-4 py-3.5 text-base text-white placeholder-ink-faint shadow-sm outline-none transition-colors duration-200 focus:border-white focus:ring-1 focus:ring-white ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-white/[0.12] hover:border-white/[0.2]"
            } ${suffix ? "pr-12" : ""}`}
            {...props}
          />
          {suffix && (
            <span className="pointer-events-none absolute right-4 text-sm font-medium text-ink-muted">
              {suffix}
            </span>
          )}
        </div>
        {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);
CalcInput.displayName = "CalcInput";

interface CalcSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { label: string; value: string }[];
  error?: string;
}

export const CalcSelect = React.forwardRef<HTMLSelectElement, CalcSelectProps>(
  ({ label, options, error, className = "", ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        <label className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
          {label}
        </label>
        <div className="relative">
          <select
            ref={ref}
            className={`w-full appearance-none rounded-lg border bg-black px-4 py-3.5 text-base text-white shadow-sm outline-none transition-colors duration-200 focus:border-white focus:ring-1 focus:ring-white ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-white/[0.12] hover:border-white/[0.2]"
            }`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
            <svg
              className="h-4 w-4 text-ink-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);
CalcSelect.displayName = "CalcSelect";

interface CalcButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
}

export const CalcButton = React.forwardRef<HTMLButtonElement, CalcButtonProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
        className={`w-full rounded-lg bg-white px-6 py-4 text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-protein disabled:opacity-50 disabled:hover:bg-white ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
CalcButton.displayName = "CalcButton";
