"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ToolLayout from "@/components/ToolLayout";
import { CalcInput, CalcSelect, CalcButton } from "@/components/CalculatorControls";
import { EASE_OUT_EXPO } from "@/lib/motion";

export default function TdeeCalculator() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("1.2");

  const [result, setResult] = useState<number | null>(null);

  const calculateTDEE = (e: React.FormEvent) => {
    e.preventDefault();
    const a = parseFloat(age);
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(a) || isNaN(h) || isNaN(w)) return;

    // Mifflin-St Jeor Equation
    let bmr = 10 * w + 6.25 * h - 5 * a;
    bmr += gender === "male" ? 5 : -161;

    // Total Daily Energy Expenditure
    const tdee = bmr * parseFloat(activity);

    setResult(Math.round(tdee));
  };

  return (
    <ToolLayout
      kicker="TDEE Calculator"
      title="TDEE Calculator"
      description="Calculate your Total Daily Energy Expenditure to find out exactly how many calories you burn in a day."
    >
      <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-16">
        <form onSubmit={calculateTDEE} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <CalcInput
              label="Age"
              type="number"
              placeholder="e.g. 25"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              suffix="yrs"
              required
              min={15}
              max={100}
            />
            <CalcSelect
              label="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
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
            />
            <CalcInput
              label="Weight"
              type="number"
              placeholder="e.g. 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              suffix="kg"
              required
              min={30}
              max={250}
            />
          </div>

          <CalcSelect
            label="Activity Level"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            options={[
              { label: "Sedentary (Office Job)", value: "1.2" },
              { label: "Light (1-3 days/wk)", value: "1.375" },
              { label: "Moderate (3-5 days/wk)", value: "1.55" },
              { label: "Active (6-7 days/wk)", value: "1.725" },
              { label: "Very Active (Physical Job)", value: "1.9" },
            ]}
            required
          />

          <CalcButton type="submit" className="mt-4">
            Calculate TDEE
          </CalcButton>
        </form>

        <div className="flex flex-col items-center justify-center well p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
          
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-ink-muted">
            Your TDEE Is
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
                  <span className="text-6xl font-extrabold tracking-tighter text-white lg:text-7xl">
                    {result.toLocaleString()}
                  </span>
                </div>
                <span className="mt-2 text-sm font-medium tracking-widest text-ink-faint">
                  KCAL / DAY
                </span>
                
                <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-muted">
                  This is your maintenance calorie level. Eat fewer calories to lose weight, or more to gain muscle.
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
