import { Metadata } from "next";
import Link from "next/link";
import FitzoLogo from "@/components/FitzoLogo";
import { ArrowLeft, Check, X } from "lucide-react";
import { SITE_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Fitzo",
  description: "See how Fitzo compares to MyFitnessPal, Strong, and Hevy. Free, no ads, offline, AI nutrition, Indian food database, and 10+ workout splits.",
  alternates: {
    canonical: `${SITE_URL}/compare`,
  },
  openGraph: {
    title: "Fitzo vs MyFitnessPal vs Strong vs Hevy — Feature Comparison",
    description: "Compare fitness tracking apps side by side. Fitzo is free, ad-free, works offline, and has the best Indian food database.",
    type: "website",
    url: `${SITE_URL}/compare`,
  },
};

type Feature = {
  name: string;
  fitzo: string | boolean;
  mfp: string | boolean;
  strong: string | boolean;
  hevy: string | boolean;
};

/*
 * ⚠️ Scope of this table changed deliberately. Do not re-add the removed rows.
 *
 * It previously asserted, unsourced, that MyFitnessPal sells user data
 * ("No Data Selling: ✗"), is not "Privacy First", and lacks custom routines,
 * a workout timer, progressive-overload tracking and offline mode. Several of
 * those are simply untrue, and an unsourced claim about a named company's
 * data practices is a legal exposure, not a marketing point. Pricing was also
 * listed undated and unsourced, and "Free Forever" contradicted the site's own
 * FAQ ("premium features will arrive later").
 *
 * What remains is the one structural difference that is defensible from each
 * product's own public positioning: Strong and Hevy are workout trackers and
 * do not do nutrition; MyFitnessPal is a nutrition tracker and is not built
 * for programmed lifting; Fitzo does both, with Indian food first.
 *
 * RULE: a row belongs here only if it is checkable from the competitor's own
 * store listing or marketing today. If you add one, update LAST_CHECKED.
 */
const LAST_CHECKED = "February 2026";

const categories: { title: string; features: Feature[] }[] = [
  {
    title: "What the app is actually for",
    features: [
      { name: "Programmed lifting (splits, progression)", fitzo: true, mfp: false, strong: true, hevy: true },
      { name: "Calorie & macro tracking", fitzo: true, mfp: true, strong: false, hevy: false },
      { name: "Both, in one app", fitzo: true, mfp: false, strong: false, hevy: false },
    ],
  },
  {
    title: "Nutrition",
    features: [
      { name: "Food database", fitzo: "500K+", mfp: "Very large", strong: false, hevy: false },
      { name: "Indian food coverage", fitzo: "50K+ items", mfp: "Partial", strong: false, hevy: false },
      { name: "Barcode scanner", fitzo: true, mfp: true, strong: false, hevy: false },
      { name: "AI food analysis", fitzo: true, mfp: false, strong: false, hevy: false },
    ],
  },
  {
    title: "Training",
    features: [
      { name: "Training splits (PPL, PHUL, PHAT)", fitzo: "10+", mfp: false, strong: true, hevy: true },
      { name: "Custom routines", fitzo: true, mfp: false, strong: true, hevy: true },
      { name: "Muscle-volume heatmap", fitzo: true, mfp: false, strong: false, hevy: true },
      { name: "AI coach on your own logged data", fitzo: true, mfp: false, strong: false, hevy: false },
    ],
  },
  {
    title: "Only in Fitzo",
    features: [
      { name: "Built-in education (Learn)", fitzo: true, mfp: false, strong: false, hevy: false },
      { name: "XP & gamification", fitzo: true, mfp: false, strong: false, hevy: false },
      { name: "Gym QR check-in & class booking", fitzo: true, mfp: false, strong: false, hevy: false },
      { name: "1-bit thermal workout receipts", fitzo: true, mfp: false, strong: false, hevy: false },
    ],
  },
];

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="w-4 h-4 text-protein mx-auto" />
    ) : (
      <X className="w-4 h-4 text-ink-faint mx-auto" />
    );
  }
  return <span className="text-sm text-ink-muted">{value}</span>;
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
          <Link href="/" className="flex items-center gap-3 text-ink-muted hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <FitzoLogo size="sm" />
          </Link>
          <span className="text-[11px] uppercase tracking-wider text-ink-faint">Compare</span>
        </div>
      </header>

      <main id="main" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] text-ink-muted border border-white/[0.06] mb-6">
            Comparison
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            Fitzo vs The Rest
          </h1>
          <p className="text-lg text-ink-muted max-w-2xl mx-auto">
            Most apps pick a side: nutrition trackers aren&apos;t built for
            programmed lifting, and lifting trackers don&apos;t do food. Fitzo
            does both, with Indian food first.
          </p>
        </div>

        <p className="mb-8 text-center text-xs text-ink-faint">
          Compared against each app&apos;s publicly documented features, last
          checked {LAST_CHECKED}. Competitors ship changes often — tell us at{" "}
          <a
            href="mailto:contact@fitzoapp.in"
            className="underline underline-offset-4 hover:text-white"
          >
            contact@fitzoapp.in
          </a>{" "}
          if a row is out of date and we&apos;ll correct it.
        </p>

        {/* Comparison Tables */}
        <div className="space-y-12">
          {categories.map((cat) => (
            <div key={cat.title}>
              <h2 className="text-xl font-bold text-white mb-4">{cat.title}</h2>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left py-3 px-4 text-sm text-ink-faint w-[200px]">Feature</th>
                      {apps.map((app) => (
                        <th
                          key={app.key}
                          className={`text-center py-3 px-4 text-sm font-semibold ${
                            app.highlight ? "text-protein" : "text-ink-muted"
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
                        <td className="py-3 px-4 text-sm text-ink-muted">{feature.name}</td>
                        {apps.map((app) => (
                          <td
                            key={app.key}
                            className={`py-3 px-4 text-center ${
                              app.highlight ? "bg-protein/[0.04]" : ""
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
            {/* "Join the Waitlist" pointed at a live app, and "Free forever"
                contradicted the FAQ's "premium features will arrive later". */}
            <p className="text-ink-muted mb-6">
              Free to download on Google Play, or join the iOS beta.
            </p>
            <Link
              href="/#download"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white font-semibold text-black transition-colors hover:bg-protein"
            >
              Get Fitzo
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
