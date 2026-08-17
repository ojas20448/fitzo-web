/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO: Account & Data Deletion
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * Google Play requires a publicly reachable URL where a user can start account
 * deletion WITHOUT installing the app — someone who has already uninstalled it
 * must still be able to get their data removed. The in-app path (Settings →
 * Delete Account) satisfies the other half of the requirement; this page is the
 * half that was missing.
 *
 * The URL goes in Play Console → App content → Data safety → account deletion.
 * It must stay at this exact path once submitted.
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Delete Your Fitzo Account",
  description:
    "How to permanently delete your Fitzo account and all associated data, from inside the app or by email.",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="text-neutral-300 leading-relaxed space-y-4">
        {children}
      </div>
    </section>
  );
}

export default function DeleteAccount() {
  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            Fitzo
          </Link>
          <Link
            href="/"
            className="text-sm text-neutral-400 hover:text-white transition-colors"
          >
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <main id="main" className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Delete Your Account
          </h1>
          <p className="text-neutral-400">
            Two ways to do it. Both delete the same things, permanently.
          </p>
        </div>

        <Section title="Option 1 — In the app (instant)">
          <ol className="list-decimal list-inside space-y-2 text-neutral-300">
            <li>Open Fitzo and go to the <strong>Profile</strong> tab</li>
            <li>Tap <strong>Settings</strong></li>
            <li>Scroll to the bottom and tap <strong>Delete Account</strong></li>
            <li>Confirm twice — we ask again because this cannot be undone</li>
          </ol>
          <p>
            Your account and all associated data are removed immediately. There
            is no waiting period and no recovery window.
          </p>
        </Section>

        <Section title="Option 2 — By email (if you've uninstalled the app)">
          <p>
            Email{" "}
            <a
              href="mailto:support@fitzoapp.in?subject=Account%20Deletion%20Request"
              className="text-white underline hover:text-neutral-300 transition-colors"
            >
              support@fitzoapp.in
            </a>{" "}
            from <strong>the email address on your Fitzo account</strong>, with
            the subject &quot;Account Deletion Request&quot;.
          </p>
          <p>
            We use the sending address to verify ownership, which is why the
            request has to come from that account&apos;s own inbox — otherwise
            anyone could delete anyone else&apos;s data. If you no longer have
            access to it, say so in the message and we&apos;ll verify another
            way.
          </p>
          <p>
            Requests are completed within <strong>30 days</strong>, and in
            practice much sooner.
          </p>
        </Section>

        <Section title="What gets deleted">
          <p>Everything tied to your account, permanently:</p>
          <ul className="list-disc list-inside space-y-2 text-neutral-400">
            <li>
              <span className="text-neutral-300">Your account</span> — name,
              email, password, profile
            </li>
            <li>
              <span className="text-neutral-300">Training history</span> — every
              workout, exercise, set, and personal record
            </li>
            <li>
              <span className="text-neutral-300">Nutrition history</span> — meals,
              macros, saved foods, and recipes
            </li>
            <li>
              <span className="text-neutral-300">Body metrics</span> — weight,
              measurements, and any health data synced from Health Connect or
              Apple Health
            </li>
            <li>
              <span className="text-neutral-300">Social connections</span> —
              gym buddies, gym membership, and check-in history
            </li>
            <li>
              <span className="text-neutral-300">Coach conversations</span> and
              any AI-generated insights
            </li>
          </ul>
          <p>
            Deletion cascades through our database, so nothing is left orphaned
            behind a deleted account.
          </p>
        </Section>

        <Section title="What we keep, and why">
          <p>
            Being precise here matters more than claiming we keep nothing:
          </p>
          <ul className="list-disc list-inside space-y-2 text-neutral-400">
            <li>
              <span className="text-neutral-300">Encrypted backups</span> — our
              database provider keeps automatic backups on a rolling schedule.
              Your data disappears from these as they age out; we do not restore
              deleted accounts from them.
            </li>
            <li>
              <span className="text-neutral-300">Anonymised aggregates</span> —
              statistics such as &quot;how busy is this gym at 7pm&quot; contain
              no identifier and cannot be traced back to you, so they are not
              personal data and are not deleted.
            </li>
            <li>
              <span className="text-neutral-300">Legal records</span> — where we
              are required by law to retain something, we retain only that.
            </li>
          </ul>
          <p>
            Health data that Fitzo read from Health Connect or Apple Health is
            deleted from our servers along with everything else. The original
            data in Apple Health or Health Connect belongs to your phone, not to
            us — delete it there if you want it gone from the device too.
          </p>
        </Section>

        <Section title="Just want a break?">
          <p>
            You do not have to delete the account to stop hearing from us. In
            Settings you can turn off notifications, or switch off sharing so
            gym buddies stop seeing your activity, and keep your history intact
            for whenever you come back.
          </p>
        </Section>

        <div className="pt-8 border-t border-white/[0.06]">
          <p className="text-sm text-neutral-400 mb-3">Related</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/privacy-policy"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Privacy Policy &rarr;
            </Link>
            <Link
              href="/terms"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Terms of Service &rarr;
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/[0.06] py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} Fitzo. All rights reserved.
          </p>
          <Link
            href="/"
            className="text-xs text-neutral-500 hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
