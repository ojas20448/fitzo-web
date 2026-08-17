/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO: Privacy Policy Page
 *
 * Derived from docs/store/DATA_MAP.md in the app repo, which is itself a code
 * audit rather than a summary. Do not edit this page in isolation — Google Play
 * Data safety and Apple App Privacy answers must agree with it, and reviewers
 * do compare the three. Update the data map first, then this page, then the
 * console forms.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fitzo",
  description:
    "Fitzo Privacy Policy. What we collect, where it is stored, who processes it, and how to delete it.",
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

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      {children}
    </div>
  );
}

/** Plain data table — used for the subprocessor and retention lists. */
function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/[0.12]">
            {head.map((h) => (
              <th
                key={h}
                className="text-left py-3 pr-4 font-semibold text-white whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-white/[0.06] align-top">
              {r.map((c, j) => (
                <td key={j} className="py-3 pr-4 text-ink-muted">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black">
      {/* ━━━ Header ━━━ */}
      <header className="border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
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

      <main id="main" className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-ink-muted">Last updated: 17 August 2026</p>
        </div>

        {/* ━━━ Summary ━━━ */}
        <div className="bg-white/[0.04] rounded-2xl p-6 border border-white/[0.06] mb-12">
          <p className="text-white font-semibold mb-3">The short version</p>
          <ul className="list-disc list-inside space-y-2 text-ink-muted text-sm">
            <li>
              Your data lives in a database in{" "}
              <span className="text-neutral-300">Mumbai, India</span>.
            </li>
            <li>
              We <span className="text-neutral-300">never sell your data</span>,
              and we run no advertising.
            </li>
            <li>
              Voice recordings and food photos are{" "}
              <span className="text-neutral-300">never stored</span> — they are
              analysed and discarded.
            </li>
            <li>
              We do not collect your location, contacts, or any advertising
              identifier.
            </li>
            <li>
              You can delete everything from inside the app, or from{" "}
              <Link
                href="/delete-account"
                className="text-white underline hover:text-neutral-300"
              >
                this page
              </Link>{" "}
              without installing it.
            </li>
          </ul>
        </div>

        {/* ━━━ 1 ━━━ */}
        <Section title="1. Who we are">
          <p>
            Fitzo (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is a fitness
            and nutrition tracking app for gym members. This policy explains what
            we collect, where it is physically stored, who else processes it, and
            what you can do about it. It applies to the Fitzo mobile app and the
            Fitzo API.
          </p>
          <p>
            For the purposes of the EU/UK GDPR we are the{" "}
            <span className="text-neutral-300">data controller</span>. Under
            India&apos;s Digital Personal Data Protection Act 2023 we are the{" "}
            <span className="text-neutral-300">Data Fiduciary</span>.
          </p>
        </Section>

        {/* ━━━ 2 ━━━ */}
        <Section title="2. What we collect">
          <div className="space-y-6">
            <Sub title="2.1 Account information">
              <ul className="list-disc list-inside space-y-2 text-ink-muted">
                <li>Name and email address, given at sign-up</li>
                <li>
                  A password, stored only as a bcrypt hash — we cannot read it
                </li>
                <li>
                  If you use Google Sign-In, the Google account identifier
                  associated with you. We never receive your Google password
                </li>
                <li>
                  Your chosen avatar. This is one of nine illustrations bundled
                  with the app —{" "}
                  <span className="text-neutral-300">
                    there is no photo upload in Fitzo
                  </span>
                </li>
              </ul>
            </Sub>

            <Sub title="2.2 Health and fitness data">
              <ul className="list-disc list-inside space-y-2 text-ink-muted">
                <li>
                  Height, weight, age, sex, activity level and goal — used to
                  calculate your calorie and macronutrient targets
                </li>
                <li>Workouts: exercises, sets, reps, load, duration, effort</li>
                <li>Meals: foods, portions, calories and macronutrients</li>
                <li>Body measurements you record over time</li>
                <li>Gym check-ins, streaks and experience points</li>
              </ul>
            </Sub>

            <Sub title="2.3 Data from Health Connect and Apple Health">
              <p>
                Only if you explicitly grant permission, and only four
                categories:{" "}
                <span className="text-neutral-300">
                  steps, heart rate, sleep, and active calories burned
                </span>
                .
              </p>
              <p>
                Steps and active calories set your daily calorie target from your
                real activity instead of an assumed average. Heart rate and sleep
                produce your recovery readiness score. We request nothing beyond
                these four, and{" "}
                <span className="text-neutral-300">
                  Fitzo is fully usable if you decline
                </span>
                . You can revoke access at any time in Health Connect (Android)
                or the Health app (iOS). We never use health data for advertising
                or marketing, and never sell it.
              </p>
            </Sub>

            <Sub title="2.4 Microphone and camera">
              <p>
                Both are optional and used only when you actively start the
                feature.
              </p>
              <ul className="list-disc list-inside space-y-2 text-ink-muted">
                <li>
                  <span className="text-neutral-300">Voice logging</span> — a
                  recording of up to 90 seconds is sent for transcription so you
                  can log a meal or workout by speaking. It is{" "}
                  <span className="text-neutral-300">not stored</span> by Fitzo
                </li>
                <li>
                  <span className="text-neutral-300">Food photos</span> — a photo
                  of a meal is analysed to estimate its macros, then discarded.
                  It is <span className="text-neutral-300">never saved</span> to
                  our servers or database
                </li>
                <li>
                  <span className="text-neutral-300">Gym QR check-in</span> — the
                  code is read on your device. No image leaves your phone
                </li>
              </ul>
            </Sub>

            <Sub title="2.5 Technical data">
              <ul className="list-disc list-inside space-y-2 text-ink-muted">
                <li>
                  Server-side error reports and performance traces when something
                  fails
                </li>
                <li>
                  Basic usage of app features, to understand what is worth
                  building
                </li>
                <li>
                  A push notification token, if you enable notifications
                </li>
              </ul>
            </Sub>
          </div>
        </Section>

        {/* ━━━ 3 ━━━ */}
        <Section title="3. What we do not collect">
          <p>
            Stated plainly, because the absence is as important as the presence:
          </p>
          <ul className="list-disc list-inside space-y-2 text-ink-muted">
            <li>
              <span className="text-neutral-300">No location data.</span> The app
              requests no location permission of any kind
            </li>
            <li>
              <span className="text-neutral-300">
                No advertising identifiers, and no advertising.
              </span>{" "}
              There is no ad SDK in the app
            </li>
            <li>No contacts, messages, call logs or calendar access</li>
            <li>
              No payment or financial information — there are no in-app purchases
            </li>
            <li>No third-party marketing or behavioural analytics trackers</li>
            <li>No photo library access, and no uploaded photos</li>
          </ul>
        </Section>

        {/* ━━━ 4 ━━━ */}
        <Section title="4. Where your data is stored">
          <p>
            Your account and all fitness history are stored in a PostgreSQL
            database hosted by{" "}
            <span className="text-neutral-300">Supabase</span> on Amazon Web
            Services infrastructure in the{" "}
            <span className="text-neutral-300">
              ap-south-1 region — Mumbai, India
            </span>
            . Backups remain in the same region.
          </p>
          <p>
            The Fitzo API is hosted by{" "}
            <span className="text-neutral-300">Render</span>. Data is encrypted
            in transit with TLS on every connection, and encrypted at rest by our
            database provider.
          </p>
          <p>
            On your phone, your login token is held in the operating system&apos;s
            secure storage — the iOS Keychain or the Android Keystore.
          </p>
          <p>
            Some of the processors listed below operate outside India. Where
            personal data is transferred internationally, it is transferred to
            processors bound by contractual data-protection obligations.
          </p>
        </Section>

        {/* ━━━ 5 ━━━ */}
        <Section title="5. Who else processes your data">
          <p className="text-lg font-semibold text-white">
            We do not sell your personal data, and we never will.
          </p>
          <p>
            We use the following processors. Each receives only what its function
            requires:
          </p>

          <Table
            head={["Processor", "What it receives", "Why"]}
            rows={[
              [
                "Google (Gemini AI)",
                "Voice recordings, food photos, and a summary of your recent training, nutrition and recovery",
                "Voice logging, photo macro estimation, and the AI coach",
              ],
              [
                "Google Identity",
                "Your Google sign-in token",
                "To verify Google Sign-In",
              ],
              [
                "Supabase",
                "All stored account and fitness data",
                "Database hosting (Mumbai)",
              ],
              ["Render", "API traffic", "Application hosting"],
              [
                "Expo",
                "Push token and notification text",
                "Delivering notifications",
              ],
              [
                "Resend",
                "Your email address",
                "Password resets and gym invitations",
              ],
              [
                "Sentry",
                "Server error traces",
                "Diagnosing crashes and failures",
              ],
              [
                "Food and exercise databases (FatSecret, USDA, Open Food Facts, API Ninjas, ExerciseDB, YouTube)",
                "Only a search term or barcode — never your name, email or any identifier",
                "Looking up nutrition facts, exercises and technique videos",
              ],
            ]}
          />

          <p>
            The food and exercise lookups deserve a specific note: when you search
            for a food, the search term travels alone. Those providers receive no
            way to connect it to you.
          </p>
          <p>
            We may also disclose data where we are legally required to, or to
            protect the rights and safety of our users.
          </p>
        </Section>

        {/* ━━━ 6 ━━━ */}
        <Section title="6. How long we keep it">
          <Table
            head={["Data", "Kept for"]}
            rows={[
              [
                "Account and all fitness history",
                "Until you delete your account",
              ],
              ["Voice recordings", "Not retained — analysed, then discarded"],
              ["Food photos", "Not retained — analysed, then discarded"],
              ["Cached data", "Temporary, expires automatically"],
              ["Server error traces", "Up to 90 days"],
            ]}
          />
        </Section>

        {/* ━━━ 7 ━━━ */}
        <Section title="7. Deleting your data">
          <p>
            Deleting your account removes your profile, workouts, meals, body
            measurements, check-ins and friendships. It is immediate and cannot be
            undone.
          </p>
          <ul className="list-disc list-inside space-y-2 text-ink-muted">
            <li>
              <span className="text-neutral-300">In the app:</span> Profile
              &rarr; Settings &rarr; Delete Account
            </li>
            <li>
              <span className="text-neutral-300">Without the app:</span>{" "}
              <Link
                href="/delete-account"
                className="text-white underline hover:text-neutral-300"
              >
                fitzoapp.in/delete-account
              </Link>
            </li>
          </ul>
        </Section>

        {/* ━━━ 8 ━━━ */}
        <Section title="8. Your rights">
          <p>
            Depending on where you live, you have some or all of the following
            rights. Under India&apos;s DPDP Act 2023, the EU/UK GDPR and similar
            laws, you may:
          </p>
          <ul className="list-disc list-inside space-y-2 text-ink-muted">
            <li>Access a copy of the data we hold about you</li>
            <li>Correct anything inaccurate</li>
            <li>Delete your account and its data</li>
            <li>Receive an export of your data in a portable format</li>
            <li>Withdraw consent — for example, revoking health data access</li>
            <li>Object to, or restrict, certain processing</li>
            <li>
              Complain to your data protection authority, or in India to the Data
              Protection Board
            </li>
          </ul>
          <p>
            Email{" "}
            <a
              href="mailto:support@fitzoapp.in"
              className="text-white underline hover:text-neutral-300 transition-colors"
            >
              support@fitzoapp.in
            </a>{" "}
            and we will respond within 30 days.
          </p>
        </Section>

        {/* ━━━ 9 ━━━ */}
        <Section title="9. Age requirement">
          <p>
            Fitzo is intended for people aged{" "}
            <span className="text-neutral-300">18 and over</span>. We do not
            knowingly collect data from anyone under 18. Calorie targets and
            training recommendations are designed for adults, and India&apos;s
            DPDP Act treats anyone under 18 as a child requiring verifiable
            parental consent.
          </p>
          <p>
            If you believe a minor has created an account, contact us and we will
            delete it.
          </p>
        </Section>

        {/* ━━━ 10 ━━━ */}
        <Section title="10. Security">
          <p>
            Passwords are hashed with bcrypt and never stored in readable form.
            All traffic uses TLS. Access to production data is restricted, API
            requests are rate limited, and session tokens are held in
            hardware-backed device storage.
          </p>
          <p>
            No system is perfectly secure. If we ever discover a breach affecting
            your personal data, we will notify affected users and the relevant
            authorities as required by law.
          </p>
        </Section>

        {/* ━━━ 11 ━━━ */}
        <Section title="11. Changes to this policy">
          <p>
            We will update this page and the date at the top when this policy
            changes. For changes that materially affect how we handle your data,
            we will notify you in the app.
          </p>
        </Section>

        {/* ━━━ 12 ━━━ */}
        <Section title="12. Contact">
          <p>Questions, requests, or complaints:</p>
          <div className="bg-white/[0.04] rounded-2xl p-6 border border-white/[0.06] mt-4">
            <p className="text-white font-semibold mb-2">Fitzo Support</p>
            <p>
              Email:{" "}
              <a
                href="mailto:support@fitzoapp.in"
                className="text-white underline hover:text-neutral-300 transition-colors"
              >
                support@fitzoapp.in
              </a>
            </p>
          </div>
        </Section>

        <div className="pt-8 border-t border-white/[0.06]">
          <p className="text-sm text-ink-muted mb-3">Related</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/terms"
              className="text-sm text-ink-muted hover:text-white transition-colors"
            >
              Terms of Service &rarr;
            </Link>
            <Link
              href="/delete-account"
              className="text-sm text-ink-muted hover:text-white transition-colors"
            >
              Delete your account &rarr;
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/[0.06] py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-faint">
            &copy; {new Date().getFullYear()} Fitzo. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="text-xs text-ink-faint hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/"
              className="text-xs text-ink-faint hover:text-white transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
