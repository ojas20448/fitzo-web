import { Metadata } from "next";
import Link from "next/link";
import FitzoLogo from "@/components/FitzoLogo";
import { ArrowLeft, Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Compare — Fitzo vs MyFitnessPal vs Strong vs Hevy",
  description: "See how Fitzo compares to MyFitnessPal, Strong, and Hevy. Free, no ads, offline, AI nutrition, Indian food database, and 10+ workout splits.",
  alternates: {
    canonical: "https://fitzo.app/compare",
  },
  openGraph: {
    title: "Fitzo vs MyFitnessPal vs Strong vs Hevy — Feature Comparison",
    description: "Compare fitness tracking apps side by side. Fitzo is free, ad-free, works offline, and has the best Indian food database.",
    type: "website",
    url: "https://fitzo.app/compare",
  },
};

type Feature = {
  name: string;
  fitzo: string | boolean;
  mfp: string | boolean;
  strong: string | boolean;
  hevy: string | boolean;
};

const categories: { title: string; features: Feature[] }[] = [
  {
    title: "Workout Tracking",
    features: [
      { name: "Exercise Library", fitzo: "500+", mfp: "Limited", strong: "300+", hevy: "300+" },
      { name: "Training Splits (PPL, PHUL, PHAT)", fitzo: true, mfp: false, strong: false, hevy: false },
      { name: "Custom Routines", fitzo: true, mfp: false, strong: true, hevy: true },
      { name: "Workout Timer", fitzo: true, mfp: false, strong: true, hevy: true },
      { name: "Progressive Overload Tracking", fitzo: true, mfp: false, strong: true, hevy: true },
    ],
  },
  {
    title: "Nutrition",
    features: [
      { name: "Food Database Size", fitzo: "500K+", mfp: "14M+", strong: false, hevy: false },
      { name: "Indian Food Database", fitzo: "50K+", mfp: "Limited", strong: false, hevy: false },
      { name: "Barcode Scanner", fitzo: true, mfp: true, strong: false, hevy: false },
      { name: "AI Nutrition Analysis", fitzo: true, mfp: false, strong: false, hevy: false },
      { name: "Macro Tracking", fitzo: true, mfp: true, strong: false, hevy: false },
    ],
  },
  {
    title: "Unique Features",
    features: [
      { name: "Built-In Education (Learn)", fitzo: true, mfp: false, strong: false, hevy: false },
      { name: "XP & Gamification", fitzo: true, mfp: false, strong: false, hevy: false },
      { name: "Gym Buddies", fitzo: true, mfp: "Community", strong: false, hevy: "Social Feed" },
      { name: "Offline Mode", fitzo: true, mfp: false, strong: true, hevy: true },
      { name: "AI Coach", fitzo: true, mfp: false, strong: false, hevy: false },
    ],
  },
  {
    title: "Pricing & Philosophy",
    features: [
      { name: "Price", fitzo: "Free Forever", mfp: "$20/mo", strong: "$5/mo", hevy: "$10/mo" },
      { name: "Ads", fitzo: false, mfp: true, strong: false, hevy: false },
      { name: "Privacy First", fitzo: true, mfp: false, strong: true, hevy: true },
      { name: "No Data Selling", fitzo: true, mfp: false, strong: true, hevy: true },
    ],
  },
];

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="w-4 h-4 text-green-400 mx-auto" />
    ) : (
      <X className="w-4 h-4 text-neutral-700 mx-auto" />
    );
  }
  return <span className="text-sm text-neutral-300">{value}</span>;
}

export default function ComparePage() {
  const apps = [
    { key: "fitzo" as const, name: "Fitzo", highlight: true },
    { key: "mfp" as const, name: "MyFitnessPal", highlight: false },
    { key: "strong" as const, name: "Strong", highlight: false },
    { key: "hevy" as const, name: "Hevy", highlight: false },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <FitzoLogo size="sm" />
          </Link>
          <span className="text-[11px] uppercase tracking-wider text-neutral-600">Compare</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] text-neutral-500 border border-white/[0.06] mb-6">
            Comparison
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            Fitzo vs The Rest
          </h1>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            We built Fitzo because existing apps either focus on nutrition OR workouts,
            charge too much, or are bloated with social features. Here&apos;s how we compare.
          </p>
        </div>

        {/* Comparison Tables */}
        <div className="space-y-12">
          {categories.map((cat) => (
            <div key={cat.title}>
              <h2 className="text-xl font-bold text-white mb-4">{cat.title}</h2>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left py-3 px-4 text-sm text-neutral-600 w-[200px]">Feature</th>
                      {apps.map((app) => (
                        <th
                          key={app.key}
                          className={`text-center py-3 px-4 text-sm font-semibold ${
                            app.highlight ? "text-green-400" : "text-neutral-500"
                          }`}
                        >
                          {app.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {cat.features.map((feature) => (
                      <tr key={feature.name} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                        <td className="py-3 px-4 text-sm text-neutral-400">{feature.name}</td>
                        {apps.map((app) => (
                          <td
                            key={app.key}
                            className={`py-3 px-4 text-center ${
                              app.highlight ? "bg-green-400/[0.03]" : ""
                            }`}
                          >
                            <CellValue value={feature[app.key]} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="glass-card p-8 sm:p-12 inline-block">
            <h3 className="text-2xl font-bold text-white mb-2">Ready to switch?</h3>
            <p className="text-neutral-500 mb-6">Join 2,500+ lifters already using Fitzo. Free forever.</p>
            <Link
              href="/#waitlist"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition-colors"
            >
              Join the Waitlist
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
