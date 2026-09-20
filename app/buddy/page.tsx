"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import Link from "next/link";

function BuddyContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || searchParams.get("userId") || "";
  const username = searchParams.get("u") || searchParams.get("username") || "user";
  const validInvite = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
  const deepLink = `fitzo://buddy?id=${encodeURIComponent(id)}&u=${encodeURIComponent(username)}`;
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.fitzo.app";
  const appStoreUrl = "https://apps.apple.com/app/id6804647531";

  useEffect(() => {
    if (typeof window !== "undefined" && validInvite) {
      // Attempt to open the Fitzo mobile app via deep link
      const timer = setTimeout(() => {
        window.location.href = deepLink;
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [validInvite, deepLink]);

  if (!validInvite) return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center gap-4">
      <h1 className="text-2xl font-bold">This invite is incomplete</h1>
      <p>Ask your buddy to share their Fitzo invite link again.</p>
      <Link href="/" className="underline">Go to Fitzo</Link>
    </main>
  );

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#E8FF4D]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-neutral-950/80 border border-white/10 backdrop-blur-xl rounded-3xl p-8 text-center shadow-2xl">
        {/* Logo / Badge */}
        <div className="w-16 h-16 rounded-2xl bg-[#E8FF4D]/10 border border-[#E8FF4D]/30 flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">💪</span>
        </div>

        <p className="text-xs uppercase tracking-widest text-[#E8FF4D] font-mono font-bold mb-2">
          Fitzo Gym Buddy
        </p>

        <h1 className="text-2xl font-bold text-white mb-2">
          Train with @{username}
        </h1>

        <p className="text-neutral-400 text-sm mb-8 leading-relaxed">
          Connect with @{username} on Fitzo to see workouts, celebrate PRs, and keep each other accountable.
        </p>

        <div className="space-y-3">
          <a
            href={deepLink}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-black bg-[#E8FF4D] hover:bg-[#d8ef3f] transition-all transform active:scale-95 shadow-lg shadow-[#E8FF4D]/20 text-sm"
          >
            <span>Open in Fitzo App</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>

          <a
            href={appStoreUrl}
            className="w-full flex items-center justify-center py-3 px-6 rounded-xl font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 text-sm"
          >
            Download on the App Store
          </a>
          <a
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm"
          >
            <span>Download on Google Play</span>
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-xs text-neutral-500">
          Already installed? Tap &ldquo;Open in Fitzo App&rdquo; to add @{username} directly.
          <p className="mt-2">Installing for the first time? Return to this invite after installation to connect.</p>
        </div>
      </div>

      <div className="mt-8 text-xs text-neutral-600">
        <Link href="/" className="hover:text-neutral-400 transition-colors">
          fitzoapp.in
        </Link>
      </div>
    </main>
  );
}

export default function BuddyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-neutral-500">
          Loading buddy invite...
        </div>
      }
    >
      <BuddyContent />
    </Suspense>
  );
}
