import { Metadata } from "next";
import Link from "next/link";
import FitzoLogo from "@/components/FitzoLogo";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Changelog — What's New in Fitzo",
  description: "Every update, feature, and improvement shipped in Fitzo. From v1.0 to v2.0 — see the complete evolution of India's best fitness tracking app.",
  alternates: {
    canonical: "https://fitzo.app/changelog",
  },
};

const entries = [
  {
    version: "v2.0",
    date: "February 2026",
    title: "The Big Update",
    description: "Complete redesign with a new dashboard, AI nutrition coach, and gamification system.",
    changes: [
      "New smart dashboard with daily overview",
      "AI-powered nutrition analysis and meal suggestions",
      "XP system and leveling for gamified progress",
      "Gym Buddies — see who's working out in real-time",
      "Built-In Learn module with science-backed courses",
      "Indian food database expanded to 50,000+ items",
      "Barcode scanner for packaged foods",
      "Dark mode redesign across the entire app",
    ],
    tag: "Major",
  },
  {
    version: "v1.5",
    date: "December 2025",
    title: "Social & Streaks",
    description: "Added social features and consistency tracking.",
    changes: [
      "Workout streaks with fire counter",
      "Share workout summaries to Instagram Stories",
      "Buddy system for accountability",
      "Push notification reminders",
      "Bug fixes and performance improvements",
    ],
    tag: "Feature",
  },
  {
    version: "v1.2",
    date: "October 2025",
    title: "Nutrition Tracking",
    description: "Full calorie and macro tracking with Indian food focus.",
    changes: [
      "Calorie and macro logging",
      "Indian food database (20,000+ items)",
      "Daily nutrition targets based on your goals",
      "Meal history and quick-add favorites",
      "Water intake tracking",
    ],
    tag: "Feature",
  },
  {
    version: "v1.1",
    date: "August 2025",
    title: "More Splits, More Exercises",
    description: "Expanded the exercise library and added popular training splits.",
    changes: [
      "Added PPL, Upper/Lower, PHUL, PHAT splits",
      "Exercise library expanded to 300+",
      "Custom routine builder",
      "Rest timer between sets",
      "Personal record (PR) tracking",
    ],
    tag: "Feature",
  },
  {
    version: "v1.0",
    date: "June 2025",
    title: "Launch Day",
    description: "Fitzo goes live on the Play Store. Basic workout tracking with a clean, focused UI.",
    changes: [
      "Basic workout logging",
      "Exercise library (100+ exercises)",
      "3 training splits (PPL, Bro Split, Full Body)",
      "Progress charts",
      "Offline-first architecture",
      "Zero ads, zero tracking",
    ],
    tag: "Launch",
  },
];

function TagBadge({ tag }: { tag: string }) {
  const colors: Record<string, string> = {
    Major: "bg-green-400/10 text-green-400 border-green-400/20",
    Feature: "bg-white/[0.06] text-neutral-400 border-white/[0.06]",
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
          <Link href="/" className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <FitzoLogo size="sm" />
          </Link>
          <span className="text-[11px] uppercase tracking-wider text-neutral-600">Changelog</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Page Header */}
        <div className="mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] text-neutral-500 border border-white/[0.06] mb-6">
            Updates
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Changelog
          </h1>
          <p className="text-lg text-neutral-500">
            Every update, feature, and fix — shipped fast, documented clearly.
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
                    <span className="text-xs text-neutral-600">{entry.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{entry.title}</h3>
                  <p className="text-sm text-neutral-500 mb-4">{entry.description}</p>
                  <ul className="space-y-1.5">
                    {entry.changes.map((change) => (
                      <li key={change} className="flex items-start gap-2 text-sm text-neutral-400">
                        <span className="text-neutral-600 mt-1.5 flex-shrink-0">•</span>
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
