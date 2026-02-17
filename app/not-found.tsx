/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Custom 404 Page
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-center">
      {/* Big number */}
      <h1 className="text-[120px] sm:text-[180px] font-black leading-none tracking-tighter text-white/[0.06] select-none">
        404
      </h1>

      {/* Message */}
      <div className="-mt-8 sm:-mt-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Page Not Found
        </h2>
        <p className="text-neutral-500 mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-7 py-3.5 rounded-xl bg-white text-black text-base font-semibold hover:bg-neutral-200 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="#download"
            className="px-7 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-base font-semibold hover:bg-white/[0.1] transition-colors"
          >
            Download Fitzo
          </Link>
        </div>
      </div>

      {/* Bottom credit */}
      <p className="absolute bottom-8 text-xs text-neutral-700">
        &copy; {new Date().getFullYear()} Fitzo
      </p>
    </div>
  );
}
