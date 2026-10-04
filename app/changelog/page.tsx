import { Metadata } from "next";
import Link from "next/link";
import FitzoLogo from "@/components/FitzoLogo";
import { ArrowLeft } from "lucide-react";
import { SITE_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Fitzo",
  description: "Every update, feature, and improvement shipped in Fitzo. See the complete release history of India's workout and nutrition tracker.",
  alternates: {
    canonical: `${SITE_URL}/changelog`,
  },
};

const entries = [
  {
    version: "v1.3.8",
    date: "September 2026",
    title: "Thermal Receipts & Nutrition Formula v4",
    description: "1 bit thermal receipt share cards, calibrated protein targets, HealthKit sync fixes, and streamlined social architecture.",
    changes: [
      "Thermal receipt share slips with Indian weight equivalences (rickshaws, bikes, gas cylinders)",
      "Scientific protein formula v4 calibrated to 1.8 to 2.0 g/kg bodyweight",
      "Apple Health and Health Connect auto sync with direct permission flows",
      "Removed social feed bloat: distraction free training with buddies and kudos",
      "Universal links and QR discovery for instant buddy invitations",
    ],
    tag: "Major",
  },
  {
    version: "v1.3.0",
    date: "August 2026",
    title: "2 Step Onboarding & Context Memory",
    description: "Faster onboarding, Gemini AI 14 day context pack, and unit toggles.",
    changes: [
      "Streamlined onboarding from 6 steps down to 2 with live TDEE preview",
      "Height unit toggle: seamlessly switch between cm and feet inches",
      "AI Coach 14 day context memory reading recent sets, meals, and sleep",
      "Photo first food logging with camera scanner and portion sliders",
      "XP awards for workouts and gym check ins wired directly to leaderboard",
    ],
    tag: "Feature",
  },
  {
    version: "v1.2.0",
    date: "July 2026",
    title: "Anatomical Heatmaps & PR Detection",
    description: "Smart log bridge, muscle volume mapping, and crowd intelligence.",
    changes: [
      "Organic anatomical muscle heatmap tracking weekly volume across 6 groups",
      "Automatic personal record (PR) detection on every exercise top set",
      "Smart Log bridge mirroring flat workouts into structured analytics",
      "Capacity based gym crowd meter (green, amber, red light)",
      "Expanded Indian food database with IFCT 2017 nutrient profiles",
    ],
    tag: "Feature",
  },
  {
    version: "v1.1.0",
    date: "June 2026",
    title: "Curated Splits & Workout Tools",
    description: "160+ exercise library, plate calculator, and training routines.",
    changes: [
      "Proven splits: PPL, Upper Lower, Arnold Split, Bro Split, and Full Body",
      "Expanded exercise library with form cues and target muscles",
      "Live barbell plate math calculator under weight selector",
      "Previous set ghosting to pre fill weights and reps from last session",
      "Rest timer between sets with audio and haptic alerts",
    ],
    tag: "Feature",
  },
  {
    version: "v1.0.0",
    date: "May 2026",
    title: "Public Launch on Play Store & App Store",
    description: "The initial release of Fitzo built for the gym floor in India.",
    changes: [
      "Offline first workout logging with sets, reps, weight, and RPE",
      "Macro tracking with Indian foods: dal, roti, rice, paneer, and chicken",
      "Gym QR check in and daily streak tracking",
      "Duolingo style fitness education lessons with XP",
      "Zero ads, zero trackers, your data stays yours",
    ],
    tag: "Launch",
  },
];

function TagBadge({ tag }: { tag: string }) {
  const colors: Record<string, string> = {
    Major: "bg-green-400/10 text-green-400 border-green-400/20",
    Feature: "bg-white/[0.06] text-ink-muted border-white/[0.06]",
    Launch: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
    Fix: "bg-rose-400/10 text-rose-400 border-rose-400/20",
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${colors[tag] || colors.Feature}`}>
      {tag}
    </span>
  );
}

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/[0.04]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-ink-muted hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <FitzoLogo size="sm" />
          </Link>
          <span className="text-[11px] uppercase tracking-wider text-ink-faint">Changelog</span>
        </div>
      </header>

      <main id="main" className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Page Header */}
        <div className="mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] text-ink-muted border border-white/[0.06] mb-6">
            Updates
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Changelog
          </h1>
          <p className="text-lg text-ink-muted">
            Every update, feature, and fix: shipped fast, documented clearly.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/[0.06]" />

          <div className="space-y-12">
            {entries.map((entry) => (
              <div key={entry.version} className="relative pl-8">
                {/* Timeline dot */}
                <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full bg-black border-2 border-white/20" />

                {/* Content */}
                <div className="glass-card p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="text-sm font-bold text-white">{entry.version}</span>
                    <TagBadge tag={entry.tag} />
                    <span className="text-xs text-ink-faint">{entry.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">{entry.title}</h2>
                  <p className="text-sm text-ink-muted mb-4">{entry.description}</p>
                  <ul className="space-y-1.5">
                    {entry.changes.map((change) => (
                      <li key={change} className="flex items-start gap-2 text-sm text-ink-muted">
                        <span className="text-ink-faint mt-1.5 flex-shrink-0">•</span>
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
