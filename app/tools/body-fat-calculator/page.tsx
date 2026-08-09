"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ToolLayout from "@/components/ToolLayout";
import { CalcInput, CalcSelect, CalcButton } from "@/components/CalculatorControls";
import { EASE_OUT_EXPO } from "@/lib/motion";

export default function BodyFatCalculator() {
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  
  const [result, setResult] = useState<number | null>(null);

  const calculateBodyFat = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(height);
    const n = parseFloat(neck);
    const w = parseFloat(waist);
    const hp = parseFloat(hip);

    if (isNaN(h) || isNaN(n) || isNaN(w)) return;
    if (gender === "female" && isNaN(hp)) return;

    let bf = 0;
    if (gender === "male") {
      // US Navy Method (Male) - uses cm
      bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
    } else {
      // US Navy Method (Female) - uses cm
      bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.22100 * Math.log10(h)) - 450;
    }

    // Clamp values to realistic ranges for safety
    if (bf < 2) bf = 2;
    if (bf > 60) bf = 60;

    setResult(Math.round(bf * 10) / 10);
  };

  const getCategory = (bf: number, isMale: boolean) => {
    if (isMale) {
      if (bf < 6) return "Essential Fat";
      if (bf < 14) return "Athletes";
      if (bf < 18) return "Fitness";
      if (bf < 25) return "Average";
      return "Obese";
    } else {
      if (bf < 14) return "Essential Fat";
      if (bf < 21) return "Athletes";
      if (bf < 25) return "Fitness";
      if (bf < 32) return "Average";
      return "Obese";
    }
  };

  return (
    <ToolLayout
      title="Body Fat Calculator"
      description="Estimate your body fat percentage using the US Navy tape measure method."
    >
      <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-16">
        <form onSubmit={calculateBodyFat} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <CalcSelect
              label="Gender"
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
                setResult(null);
              }}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
              required
            />
            <CalcInput
              label="Height"
              type="number"
              placeholder="e.g. 175"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              suffix="cm"
              required
              min={100}
              max={250}
              step="0.1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <CalcInput
              label="Neck (narrowest)"
              type="number"
              placeholder="e.g. 40"
              value={neck}
              onChange={(e) => setNeck(e.target.value)}
              suffix="cm"
              required
              min={20}
              max={100}
              step="0.1"
            />
            <CalcInput
              label="Waist (at navel)"
              type="number"
              placeholder="e.g. 85"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              suffix="cm"
              required
              min={40}
              max={200}
              step="0.1"
            />
          </div>

          <AnimatePresence>
            {gender === "female" && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <CalcInput
                  label="Hip (widest part)"
                  type="number"
                  placeholder="e.g. 95"
                  value={hip}
                  onChange={(e) => setHip(e.target.value)}
                  suffix="cm"
                  required={gender === "female"}
                  min={40}
                  max={200}
                  step="0.1"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <CalcButton type="submit" className="mt-4">
            Calculate Body Fat
          </CalcButton>
        </form>

        <div className="flex flex-col items-center justify-center rounded-xl border border-white/[0.06] bg-black/50 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
          
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-ink-muted">
            Body Fat Estimate
          </h3>
          
          <AnimatePresence mode="wait">
            {result !== null ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                className="relative z-10 flex flex-col items-center"
              >
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-extrabold tracking-tighter text-white lg:text-7xl">
                    {result}
                  </span>
                  <span className="text-3xl font-bold text-white/50">%</span>
                </div>
                
                <span className="mt-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-widest text-white">
                  {getCategory(result, gender === "male")}
                </span>
                
                <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-muted">
                  This is an estimate based on the US Navy tape measure method. For absolute accuracy, consider a DEXA scan.
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
