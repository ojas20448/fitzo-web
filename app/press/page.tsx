import { Metadata } from "next";
import Link from "next/link";
import FitzoLogo, { FitzoIcon } from "@/components/FitzoLogo";
import { ArrowLeft, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Press Kit — Brand Assets & Media Info",
  description: "Download Fitzo brand assets, logos, screenshots, and get media information. For press inquiries and coverage.",
  alternates: {
    canonical: "https://fitzo.app/press",
  },
};

export default function PressPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <FitzoLogo size="sm" />
          </Link>
          <span className="text-[11px] uppercase tracking-wider text-neutral-600">Press</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Page Header */}
        <div className="mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] text-neutral-500 border border-white/[0.06] mb-6">
            Media Kit
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Press & Brand Assets
          </h1>
          <p className="text-lg text-neutral-500 max-w-2xl">
            Everything you need to write about Fitzo. Logos, screenshots, and
            key information in one place.
          </p>
        </div>

        {/* About Fitzo */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">About Fitzo</h2>
          <div className="glass-card p-6 sm:p-8 space-y-4">
            <p className="text-neutral-400 leading-relaxed">
              Fitzo is a science-based fitness tracking app built for serious lifters in India.
              It combines workout logging, AI-powered nutrition tracking with a 500K+ food database
              (including 50,000+ Indian foods), gamified education, and social accountability — all
              completely free, with no ads and no data selling.
            </p>
            <p className="text-neutral-400 leading-relaxed">
              Founded by Ojas Narang — a 10+ year athlete and software engineer — Fitzo was born
              from frustration with existing fitness apps that were either bloated with social features,
              lacked accurate Indian food data, or charged premium prices for basic tracking.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {[
                { label: "Founded", value: "2025" },
                { label: "Beta Users", value: "2,500+" },
                { label: "Price", value: "Free Forever" },
                { label: "Platform", value: "iOS & Android" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Assets */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">Brand Assets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Logo on Dark */}
            <div className="glass-card p-8 flex flex-col items-center gap-4">
              <div className="bg-black p-8 rounded-xl border border-white/[0.06] w-full flex items-center justify-center">
                <FitzoLogo size="lg" />
              </div>
              <p className="text-sm text-neutral-500">Logo on dark background</p>
            </div>

            {/* Icon */}
            <div className="glass-card p-8 flex flex-col items-center gap-4">
              <div className="bg-black p-8 rounded-xl border border-white/[0.06] w-full flex items-center justify-center">
                <FitzoIcon className="w-20 h-20" />
              </div>
              <p className="text-sm text-neutral-500">App Icon</p>
            </div>
          </div>
        </section>

        {/* Brand Colors */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">Brand Colors</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { name: "Black", hex: "#000000", bg: "bg-black border border-white/[0.1]", text: "text-white" },
              { name: "White", hex: "#FFFFFF", bg: "bg-white", text: "text-black" },
              { name: "Protein", hex: "#4ADE80", bg: "bg-green-400", text: "text-black" },
              { name: "Carbs", hex: "#FACC15", bg: "bg-yellow-400", text: "text-black" },
              { name: "Fat", hex: "#FB7185", bg: "bg-rose-400", text: "text-black" },
            ].map((color) => (
              <div key={color.name} className="text-center">
                <div className={`${color.bg} w-full aspect-square rounded-xl mb-2 flex items-center justify-center`}>
                  <span className={`text-xs font-mono ${color.text}`}>{color.hex}</span>
                </div>
                <p className="text-sm text-neutral-400">{color.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Facts */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">Key Facts</h2>
          <div className="glass-card p-6 sm:p-8">
            <div className="space-y-3">
              {[
                { q: "What is Fitzo?", a: "A science-based fitness tracking app for workout logging, nutrition tracking, and education." },
                { q: "Who built it?", a: "Ojas Narang — a 10+ year athlete and software engineer based in India." },
                { q: "How much does it cost?", a: "Free forever. No premium tier, no ads, no data selling." },
                { q: "What makes it different?", a: "Combined workout + nutrition tracking with Indian food database (50K+ items), AI analysis, gamification, and built-in education." },
                { q: "Where is it available?", a: "Android (Play Store) and iOS (App Store) in India, expanding globally." },
              ].map((item) => (
                <div key={item.q} className="flex gap-4 py-2 border-b border-white/[0.03] last:border-0">
                  <span className="text-sm font-semibold text-white min-w-[180px]">{item.q}</span>
                  <span className="text-sm text-neutral-400">{item.a}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
          <div className="glass-card p-6 sm:p-8 text-center">
            <Mail className="w-8 h-8 text-neutral-600 mx-auto mb-4" />
            <p className="text-neutral-400 mb-2">
              For press inquiries, interviews, or partnership opportunities:
            </p>
            <a
              href="mailto:press@fitzo.app"
              className="text-white font-semibold hover:text-green-400 transition-colors"
            >
              press@fitzo.app
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
