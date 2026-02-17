/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Privacy Policy Page
 * App Store & Google Play compliant
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Fitzo",
  description:
    "Fitzo Privacy Policy. Learn how we collect, use, and protect your personal data.",
};

/** Section component for consistent styling */
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

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black">
      {/* ━━━ Header ━━━ */}
      <header className="border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-white"
          >
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

      {/* ━━━ Content ━━━ */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-neutral-500">
            Last updated: February 17, 2026
          </p>
        </div>

        {/* ━━━ Introduction ━━━ */}
        <Section title="1. Introduction">
          <p>
            Welcome to Fitzo (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). Fitzo is a
            science-based fitness tracking application designed for serious
            lifters who value precision and data-driven progress. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your
            information when you use our mobile application and related services
            (collectively, the &quot;Service&quot;).
          </p>
          <p>
            By using Fitzo, you agree to the collection and use of information
            in accordance with this policy. If you do not agree with the terms
            of this Privacy Policy, please do not access or use the Service.
          </p>
        </Section>

        {/* ━━━ Data Collection ━━━ */}
        <Section title="2. Data We Collect">
          <p>We collect the following types of information:</p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                2.1 Personal Information
              </h3>
              <ul className="list-disc list-inside space-y-2 text-neutral-400">
                <li>
                  <span className="text-neutral-300">Name and email address</span>{" "}
                  — provided during account registration
                </li>
                <li>
                  <span className="text-neutral-300">Profile information</span>{" "}
                  — username, profile picture, bio
                </li>
                <li>
                  <span className="text-neutral-300">
                    Authentication data
                  </span>{" "}
                  — when signing in via Google OAuth or email/password
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                2.2 Fitness & Health Data
              </h3>
              <ul className="list-disc list-inside space-y-2 text-neutral-400">
                <li>
                  <span className="text-neutral-300">Workout data</span> —
                  exercises, sets, reps, weights, workout duration
                </li>
                <li>
                  <span className="text-neutral-300">Nutrition data</span> —
                  food logs, macronutrient intake, calorie tracking
                </li>
                <li>
                  <span className="text-neutral-300">Progress data</span> —
                  body measurements, progress photos (if uploaded), XP and level
                  information
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                2.3 Automatically Collected Data
              </h3>
              <ul className="list-disc list-inside space-y-2 text-neutral-400">
                <li>Device information (device type, operating system)</li>
                <li>App usage analytics (features used, session duration)</li>
                <li>Crash reports and performance data</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* ━━━ Usage ━━━ */}
        <Section title="3. How We Use Your Data">
          <p>We use the information we collect to:</p>
          <ul className="list-disc list-inside space-y-2 text-neutral-400">
            <li>Provide, maintain, and improve the Fitzo Service</li>
            <li>
              Personalize your experience (workout recommendations, AI nutrition
              coaching via Gemini AI)
            </li>
            <li>Track your fitness progress and generate analytics</li>
            <li>
              Enable social features (adding friends, sharing progress)
            </li>
            <li>Send important notifications about your account or the Service</li>
            <li>Ensure the security and integrity of our platform</li>
            <li>Comply with legal obligations</li>
          </ul>
        </Section>

        {/* ━━━ Storage ━━━ */}
        <Section title="4. Data Storage & Security">
          <p>
            Your data is stored securely using industry-standard cloud
            infrastructure with encryption at rest and in transit. We implement
            appropriate technical and organizational security measures to
            protect your personal information against unauthorized access,
            alteration, disclosure, or destruction.
          </p>
          <p>
            While we strive to use commercially acceptable means to protect
            your personal data, no method of transmission over the Internet or
            method of electronic storage is 100% secure. We cannot guarantee
            its absolute security.
          </p>
        </Section>

        {/* ━━━ Data Sharing ━━━ */}
        <Section title="5. Data Sharing & Third Parties">
          <p className="text-lg font-semibold text-white">
            We do not sell your personal data to third parties.
          </p>
          <p>We may share data with:</p>
          <ul className="list-disc list-inside space-y-2 text-neutral-400">
            <li>
              <span className="text-neutral-300">Service providers</span> —
              cloud hosting, analytics, and AI services (e.g., Google Gemini
              for nutrition coaching) that help us operate the Service
            </li>
            <li>
              <span className="text-neutral-300">Legal requirements</span> —
              if required by law, regulation, or legal process
            </li>
            <li>
              <span className="text-neutral-300">Your consent</span> — when
              you explicitly choose to share data with other users through
              social features
            </li>
          </ul>
        </Section>

        {/* ━━━ User Rights ━━━ */}
        <Section title="6. Your Rights">
          <p>You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 text-neutral-400">
            <li>
              <span className="text-neutral-300">Access</span> — Request a
              copy of the personal data we hold about you
            </li>
            <li>
              <span className="text-neutral-300">Correction</span> — Request
              correction of inaccurate personal data
            </li>
            <li>
              <span className="text-neutral-300">Deletion</span> — Request
              deletion of your account and associated data
            </li>
            <li>
              <span className="text-neutral-300">Export</span> — Request an
              export of your data in a portable format
            </li>
            <li>
              <span className="text-neutral-300">Withdrawal of consent</span>{" "}
              — Withdraw consent for data processing at any time
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{" "}
            <a
              href="mailto:support@fitzo.app"
              className="text-white underline hover:text-neutral-300 transition-colors"
            >
              support@fitzo.app
            </a>
            . We will respond to your request within 30 days.
          </p>
        </Section>

        {/* ━━━ Children ━━━ */}
        <Section title="7. Children&apos;s Privacy">
          <p>
            Fitzo is not intended for use by individuals under the age of 13.
            We do not knowingly collect personal information from children
            under 13. If we become aware that we have collected personal data
            from a child under 13, we will take steps to delete that
            information promptly.
          </p>
        </Section>

        {/* ━━━ Changes ━━━ */}
        <Section title="8. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the &quot;Last updated&quot; date. You are advised to review
            this Privacy Policy periodically for any changes.
          </p>
        </Section>

        {/* ━━━ Contact ━━━ */}
        <Section title="9. Contact Us">
          <p>
            If you have any questions or concerns about this Privacy Policy or
            our data practices, please contact us:
          </p>
          <div className="bg-white/[0.04] rounded-2xl p-6 border border-white/[0.06] mt-4">
            <p className="text-white font-semibold mb-2">Fitzo Support</p>
            <p>
              Email:{" "}
              <a
                href="mailto:support@fitzo.app"
                className="text-white underline hover:text-neutral-300 transition-colors"
              >
                support@fitzo.app
              </a>
            </p>
          </div>
        </Section>
        {/* Related Links */}
        <div className="pt-8 border-t border-white/[0.06]">
          <p className="text-sm text-neutral-500 mb-3">Related</p>
          <Link
            href="/terms"
            className="text-sm text-neutral-400 hover:text-white transition-colors"
          >
            Terms of Service &rarr;
          </Link>
        </div>
      </main>

      {/* ━━━ Footer ━━━ */}
      <footer className="border-t border-white/[0.06] py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-700">
            &copy; {new Date().getFullYear()} Fitzo. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="text-xs text-neutral-600 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/"
              className="text-xs text-neutral-600 hover:text-white transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
