/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO: Account Deletion Page
 *
 * Required by Google Play's data deletion policy: users must be able to request
 * deletion from a publicly reachable URL WITHOUT installing the app. This URL
 * goes in the Play Console Data safety form.
 *
 * Deliberately has no login form. Collecting a password on a marketing site to
 * perform a destructive action is a phishing pattern, and it would make this
 * page a credential-harvesting target. In-app deletion is already authenticated;
 * everyone else goes through an identity-verified email request.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fitzo",
  description:
    "How to delete your Fitzo account and all associated data, with or without the app installed.",
};

const DELETED = [
  "Your profile: name, email, age, height, weight and goals",
  "Every workout, exercise, set and personal record",
  "Every meal and nutrition log",
  "Body measurements and weight history",
  "Gym check-ins, streaks and experience points",
  "Gym buddy connections",
  "Any health data imported from Health Connect or Apple Health",
];

export default function DeleteAccount() {
  const subject = encodeURIComponent("Account deletion request");
  const body = encodeURIComponent(
    "I would like to delete my Fitzo account and all associated data.\n\n" +
      "Email address on the account: \n\n" +
      "I understand this is permanent and cannot be undone."
  );

  return (
    <div className="min-h-screen bg-black">
      {/* ━━━ Header ━━━ */}
      <header className="border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            Fitzo
          </Link>
          <Link
            href="/"
            className="text-sm text-ink-muted hover:text-white transition-colors"
          >
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <main id="main" className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Delete your account
        </h1>
        <p className="text-ink-muted mb-12 text-lg">
          Two ways to do it. Both delete the same thing: everything.
        </p>

        {/* ━━━ Option 1 ━━━ */}
        <section className="mb-10">
          <div className="bg-white/[0.04] rounded-2xl p-6 sm:p-8 border border-white/[0.06]">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-xs font-bold text-black bg-white rounded-full px-2.5 py-1">
                FASTEST
              </span>
              <h2 className="text-2xl font-bold text-white">In the app</h2>
            </div>
            <p className="text-neutral-300 mb-5">
              Immediate, and no waiting on us.
            </p>
            <ol className="space-y-3 text-neutral-300">
              {[
                "Open Fitzo and sign in",
                "Tap Profile in the bottom bar",
                "Tap Settings",
                "Scroll to the bottom and tap Delete Account",
                "Confirm — you will be asked twice, because it cannot be undone",
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="text-ink-faint font-mono text-sm pt-0.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ━━━ Option 2 ━━━ */}
        <section className="mb-12">
          <div className="bg-white/[0.04] rounded-2xl p-6 sm:p-8 border border-white/[0.06]">
            <h2 className="text-2xl font-bold text-white mb-4">
              By email, without the app
            </h2>
            <p className="text-neutral-300 mb-5">
              If you have already uninstalled Fitzo, email us from{" "}
              <span className="text-white">
                the address your account is registered to
              </span>
              . We use that as proof it is yours — we will not action a request
              sent from a different address, because doing so would let anyone
              delete someone else&apos;s account.
            </p>
            <a
              href={`mailto:support@fitzoapp.in?subject=${subject}&body=${body}`}
              className="inline-block bg-white text-black font-semibold rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors"
            >
              Email a deletion request
            </a>
            <p className="text-sm text-ink-muted mt-5">
              We action requests within{" "}
              <span className="text-neutral-300">30 days</span>, and in practice
              much sooner. You will get a confirmation once it is done.
            </p>
          </div>
        </section>

        {/* ━━━ What gets deleted ━━━ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            What gets deleted
          </h2>
          <p className="text-neutral-300 mb-4">
            All of it. Deletion is immediate and permanent — there is no grace
            period and no archive we can restore from:
          </p>
          <ul className="space-y-2">
            {DELETED.map((item) => (
              <li key={item} className="flex gap-3 text-ink-muted">
                <span className="text-white shrink-0">&bull;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ━━━ What we keep ━━━ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            What we keep, and why
          </h2>
          <p className="text-neutral-300">
            Nothing that identifies you. Server error logs may briefly retain a
            technical trace of a request, and these expire automatically within
            90 days. Where the law requires us to keep a record of your deletion
            request itself, we keep only that record — not your data.
          </p>
        </section>

        {/* ━━━ Note ━━━ */}
        <div className="bg-white/[0.04] rounded-2xl p-6 border border-white/[0.06]">
          <p className="text-white font-semibold mb-2">
            Deleting the app is not the same as deleting your account
          </p>
          <p className="text-ink-muted text-sm">
            Uninstalling Fitzo removes it from your phone but leaves your account
            on our servers. Use one of the two methods above to remove the data
            itself.
          </p>
        </div>

        <div className="pt-10 mt-10 border-t border-white/[0.06]">
          <p className="text-sm text-ink-muted mb-3">Related</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/privacy-policy"
              className="text-sm text-ink-muted hover:text-white transition-colors"
            >
              Privacy Policy &rarr;
            </Link>
            <Link
              href="/terms"
              className="text-sm text-ink-muted hover:text-white transition-colors"
            >
              Terms of Service &rarr;
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/[0.06] py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-faint">
            &copy; {new Date().getFullYear()} Fitzo. All rights reserved.
          </p>
          <Link
            href="/"
            className="text-xs text-ink-faint hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
