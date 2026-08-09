"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ToolLayout from "@/components/ToolLayout";
import { CalcInput, CalcSelect, CalcButton } from "@/components/CalculatorControls";
import { EASE_OUT_EXPO } from "@/lib/motion";

export default function ProteinCalculator() {
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("muscle");
  
  const [result, setResult] = useState<{min: number, max: number} | null>(null);

  const calculateProtein = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);

    if (isNaN(w)) return;

    let minMultiplier = 1.6;
    let maxMultiplier = 2.2;

    if (goal === "maintenance") {
      minMultiplier = 1.2;
      maxMultiplier = 1.6;
    } else if (goal === "fat-loss") {
      // higher protein needed during a cut to preserve muscle
      minMultiplier = 1.8;
      maxMultiplier = 2.4;
    }

    setResult({
      min: Math.round(w * minMultiplier),
      max: Math.round(w * maxMultiplier)
    });
  };

  return (
    <ToolLayout
      kicker="Protein Calculator"
      title="Protein Calculator"
      description="Find your optimal daily protein target to maximize muscle growth and recovery."
    >
      <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-16">
        <form onSubmit={calculateProtein} className="space-y-6">
          <CalcInput
            label="Body Weight"
            type="number"
            placeholder="e.g. 70"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            suffix="kg"
            required
            min={30}
            max={250}
            step="0.5"
          />

          <CalcSelect
            label="Primary Goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            options={[
              { label: "Maintenance", value: "maintenance" },
              { label: "Muscle Gain (Bulk)", value: "muscle" },
              { label: "Fat Loss (Cut)", value: "fat-loss" },
            ]}
            required
          />

          <CalcButton type="submit" className="mt-4">
            Calculate Protein Target
          </CalcButton>
        </form>

        <div className="flex flex-col items-center justify-center well p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
          
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-ink-muted">
            Daily Target
          </h2>
          
          <AnimatePresence mode="wait">
            {result !== null ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                className="relative z-10 flex flex-col items-center"
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold tracking-tighter text-white lg:text-6xl">
                    {result.min} - {result.max}
                  </span>
                </div>
                <span className="mt-2 text-sm font-medium tracking-widest text-ink-faint">
                  GRAMS / DAY
                </span>
                
                <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-muted">
                  Aim for this range consistently. Split it across 3-5 meals for optimal muscle protein synthesis.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10 flex h-32 items-center justify-center"
              >
                <span className="text-5xl font-bold tracking-tighter text-white/10 lg:text-6xl">
                  —
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ToolLayout>
  );
}
