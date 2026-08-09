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
            /* [&::-webkit-...] hides Chrome/Edge/Safari's native number
               spinner; [-moz-appearance:textfield] does the same in Firefox.
               Without both, the spinner plus a unit suffix ate most of a
               narrow 2-up column's width and truncated the placeholder to
               "e.g. 2…" — confirmed from a screenshot on a real device. */
            className={`w-full appearance-none rounded-lg border bg-black px-4 py-3.5 text-base text-white placeholder-ink-faint shadow-sm outline-none transition-colors duration-200 [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none focus:border-white focus:ring-1 focus:ring-white ${
              error
                ? "border-fat focus:border-fat focus:ring-fat"
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
        {error && <span className="mt-1 text-xs text-fat">{error}</span>}
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
            /* pr-10 reserves room for the chevron below, which is always
               present (unlike CalcInput's suffix, which is conditional).
               Without it, long option text — "Balanced (30% P / 40% C /
               30% F)", "Sedentary (Little/No Exercise)" — ran straight
               under the icon and got visibly cut off mid-word; confirmed
               on the macro-calculator's Activity Level, Goal and Diet Type
               selects, where every option is exactly this long. */
            className={`w-full truncate appearance-none rounded-lg border bg-black py-3.5 pl-4 pr-10 text-base text-white shadow-sm outline-none transition-colors duration-200 focus:border-white focus:ring-1 focus:ring-white ${
              error
                ? "border-fat focus:border-fat focus:ring-fat"
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
        {error && <span className="mt-1 text-xs text-fat">{error}</span>}
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
