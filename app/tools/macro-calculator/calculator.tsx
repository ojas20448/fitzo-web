"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ToolLayout from "@/components/ToolLayout";
import { CalcInput, CalcSelect, CalcButton } from "@/components/CalculatorControls";
import { EASE_OUT_EXPO } from "@/lib/motion";

export default function MacroCalculator() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("1.2");
  const [goal, setGoal] = useState("maintain");
  const [diet, setDiet] = useState("balanced");

  const [macros, setMacros] = useState<{
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  } | null>(null);

  const calculateMacros = (e: React.FormEvent) => {
    e.preventDefault();
    const a = parseFloat(age);
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(a) || isNaN(h) || isNaN(w)) return;

    // 1. Calculate BMR (Mifflin-St Jeor)
    let bmr = 10 * w + 6.25 * h - 5 * a;
    bmr += gender === "male" ? 5 : -161;

    // 2. Calculate TDEE
    const tdee = bmr * parseFloat(activity);

    // 3. Adjust for Goal
    let calories = tdee;
    if (goal === "cut") calories -= 500;
    else if (goal === "bulk") calories += 300;

    // 4. Calculate Macros based on Diet Type
    let proteinPct = 0.3;
    let fatPct = 0.3;
    let carbPct = 0.4;

    if (diet === "low-carb") {
      proteinPct = 0.4;
      fatPct = 0.4;
      carbPct = 0.2;
    } else if (diet === "high-protein") {
      proteinPct = 0.4;
      fatPct = 0.25;
      carbPct = 0.35;
    }

    const protein = (calories * proteinPct) / 4;
    const fats = (calories * fatPct) / 9;
    const carbs = (calories * carbPct) / 4;

    setMacros({
      calories: Math.round(calories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fats: Math.round(fats),
    });
  };

  return (
    <ToolLayout
      title="Macro Calculator"
      description="Find out exactly how many grams of protein, carbs, and fats you need daily to hit your fitness goals."
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <form onSubmit={calculateMacros} className="space-y-6">
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            <CalcSelect
              label="Goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              options={[
                { label: "Cut (Lose Fat)", value: "cut" },
                { label: "Maintain Weight", value: "maintain" },
                { label: "Bulk (Build Muscle)", value: "bulk" },
              ]}
              required
            />
          </div>

          <CalcSelect
            label="Diet Type"
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            options={[
              { label: "Balanced (30% P / 40% C / 30% F)", value: "balanced" },
              { label: "Low Carb (40% P / 20% C / 40% F)", value: "low-carb" },
              { label: "High Protein (40% P / 35% C / 25% F)", value: "high-protein" },
            ]}
            required
          />

          <CalcButton type="submit" className="mt-4">
            Calculate Macros
          </CalcButton>
        </form>

        <div className="flex flex-col justify-center rounded-xl border border-white/[0.06] bg-black/50 p-6 relative overflow-hidden sm:p-8">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {macros ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                className="relative z-10 flex flex-col"
              >
                <div className="mb-8 text-center border-b border-white/[0.06] pb-8">
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-ink-muted">
                    Daily Calories
                  </h3>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-extrabold tracking-tighter text-white sm:text-6xl">
                      {macros.calories.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium tracking-widest text-ink-faint">
                      KCAL
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-[11px] font-semibold uppercase tracking-widest text-ink-muted mb-2">Protein</div>
                    <div className="text-2xl font-bold text-white sm:text-3xl">{macros.protein}g</div>
                  </div>
                  <div className="text-center border-l border-r border-white/[0.06]">
                    <div className="text-[11px] font-semibold uppercase tracking-widest text-ink-muted mb-2">Carbs</div>
                    <div className="text-2xl font-bold text-white sm:text-3xl">{macros.carbs}g</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[11px] font-semibold uppercase tracking-widest text-ink-muted mb-2">Fats</div>
                    <div className="text-2xl font-bold text-white sm:text-3xl">{macros.fats}g</div>
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
                  Enter your details to calculate your target macros.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ToolLayout>
  );
}
