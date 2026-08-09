"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ToolLayout from "@/components/ToolLayout";
import { CalcInput, CalcButton } from "@/components/CalculatorControls";
import { EASE_OUT_EXPO } from "@/lib/motion";

export default function OneRepMaxCalculator() {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  
  const [result, setResult] = useState<number | null>(null);
  const [percentages, setPercentages] = useState<{rep: number, pct: number, weight: number}[]>([]);

  const calculate1RM = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const r = parseFloat(reps);

    if (isNaN(w) || isNaN(r)) return;

    // Epley Formula
    const oneRepMax = w * (1 + r / 30);
    const max = Math.round(oneRepMax);
    
    setResult(max);

    // Generate standard percentages
    const pcts = [
      { rep: 1, pct: 100 },
      { rep: 2, pct: 95 },
      { rep: 3, pct: 93 },
      { rep: 4, pct: 90 },
      { rep: 5, pct: 87 },
      { rep: 6, pct: 85 },
      { rep: 8, pct: 80 },
      { rep: 10, pct: 75 },
      { rep: 12, pct: 70 },
    ].map(item => ({
      ...item,
      weight: Math.round(max * (item.pct / 100))
    }));

    setPercentages(pcts);
  };

  return (
    <ToolLayout
      title="1RM Calculator"
      description="Estimate your one-rep max and optimal training loads based on your current lifts."
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <form onSubmit={calculate1RM} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <CalcInput
              label="Weight Lifted"
              type="number"
              placeholder="e.g. 100"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              suffix="kg/lbs"
              required
              min={1}
              step="0.5"
            />
            <CalcInput
              label="Reps Performed"
              type="number"
              placeholder="e.g. 5"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              suffix="reps"
              required
              min={1}
              max={30}
            />
          </div>

          <CalcButton type="submit" className="mt-4">
            Calculate 1RM
          </CalcButton>
          
          <p className="text-xs text-ink-faint mt-4">
            Note: Calculations become less accurate beyond 10 reps.
          </p>
        </form>

        <div className="flex flex-col rounded-xl border border-white/[0.06] bg-black/50 p-6 relative overflow-hidden sm:p-8">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {result !== null ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                className="relative z-10 flex flex-col"
              >
                <div className="mb-6 text-center border-b border-white/[0.06] pb-6">
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-ink-muted">
                    Estimated 1RM
                  </h3>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-extrabold tracking-tighter text-white sm:text-6xl">
                      {result.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium tracking-widest text-ink-faint uppercase">
                      Units
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-widest text-ink-muted mb-4">
                    Training Percentages
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {percentages.map((p) => (
                      <div key={p.rep} className="flex flex-col bg-white/[0.02] border border-white/[0.04] rounded-lg p-3 text-center">
                        <span className="text-lg font-bold text-white">{p.weight}</span>
                        <span className="text-[10px] uppercase tracking-wider text-ink-muted mt-1">{p.pct}% / {p.rep}RM</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10 flex h-48 flex-col items-center justify-center gap-4 text-center"
              >
                <span className="text-4xl font-bold tracking-tighter text-white/10">
                  —
                </span>
                <p className="max-w-[200px] text-xs leading-relaxed text-ink-faint">
                  Enter your lift details to calculate your one rep max.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ToolLayout>
  );
}
