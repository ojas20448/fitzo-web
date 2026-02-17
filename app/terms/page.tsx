/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Terms of Service Page
 * App Store & Google Play compliant
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Fitzo",
  description:
    "Fitzo Terms of Service. Read our terms and conditions for using the Fitzo fitness tracking application.",
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

export default function TermsOfService() {
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
            Terms of Service
          </h1>
          <p className="text-neutral-500">Last updated: February 17, 2026</p>
        </div>

        {/* ━━━ Agreement ━━━ */}
        <Section title="1. Agreement to Terms">
          <p>
            By downloading, installing, or using the Fitzo mobile application
            and related services (collectively, the &quot;Service&quot;), you
            agree to be bound by these Terms of Service (&quot;Terms&quot;). If
            you do not agree to these Terms, do not use the Service.
          </p>
          <p>
            We may update these Terms from time to time. Your continued use of
            the Service after any such changes constitutes your agreement to the
            revised Terms.
          </p>
        </Section>

        {/* ━━━ Eligibility ━━━ */}
        <Section title="2. Eligibility">
          <p>
            You must be at least 13 years of age to use Fitzo. If you are under
            18, you represent that your parent or legal guardian has reviewed and
            agreed to these Terms on your behalf. By using the Service, you
            represent and warrant that you meet these eligibility requirements.
          </p>
        </Section>

        {/* ━━━ Account ━━━ */}
        <Section title="3. Your Account">
          <p>
            To use certain features of the Service, you may need to create an
            account. You are responsible for:
          </p>
          <ul className="list-disc list-inside space-y-2 text-neutral-400">
            <li>
              <span className="text-neutral-300">
                Maintaining the confidentiality
              </span>{" "}
              of your account credentials
            </li>
            <li>
              <span className="text-neutral-300">
                All activities
              </span>{" "}
              that occur under your account
            </li>
            <li>
              <span className="text-neutral-300">Notifying us immediately</span>{" "}
              of any unauthorized use of your account
            </li>
          </ul>
          <p>
            We reserve the right to suspend or terminate your account if we
            reasonably believe you have violated these Terms.
          </p>
        </Section>

        {/* ━━━ Acceptable Use ━━━ */}
        <Section title="4. Acceptable Use">
          <p>You agree not to:</p>
          <ul className="list-disc list-inside space-y-2 text-neutral-400">
            <li>Use the Service for any unlawful purpose</li>
            <li>
              Attempt to gain unauthorized access to any part of the Service
            </li>
            <li>
              Interfere with or disrupt the integrity or performance of the
              Service
            </li>
            <li>
              Upload or share content that is offensive, harmful, or infringes
              on third-party rights
            </li>
            <li>
              Reverse engineer, decompile, or disassemble any part of the
              Service
            </li>
            <li>
              Use automated systems (bots, scrapers) to access the Service
            </li>
            <li>
              Impersonate another person or misrepresent your identity
            </li>
          </ul>
        </Section>

        {/* ━━━ Subscription & Payments ━━━ */}
        <Section title="5. Subscriptions & Payments">
          <p>
            Fitzo may offer free and paid subscription plans. If you purchase a
            subscription:
          </p>
          <ul className="list-disc list-inside space-y-2 text-neutral-400">
            <li>
              <span className="text-neutral-300">Billing</span> — Payment is
              processed through the Apple App Store or Google Play Store. Your
              subscription automatically renews unless cancelled at least 24
              hours before the end of the current billing period.
            </li>
            <li>
              <span className="text-neutral-300">Cancellation</span> — You can
              cancel your subscription at any time through your device&apos;s app
              store settings. Cancellation takes effect at the end of the
              current billing period.
            </li>
            <li>
              <span className="text-neutral-300">Refunds</span> — Refund
              requests are handled by the Apple App Store or Google Play Store
              in accordance with their respective refund policies.
            </li>
            <li>
              <span className="text-neutral-300">Price changes</span> — We
              reserve the right to change subscription prices. You will be
              notified in advance of any price changes.
            </li>
          </ul>
        </Section>

        {/* ━━━ Intellectual Property ━━━ */}
        <Section title="6. Intellectual Property">
          <p>
            The Service and its original content, features, and functionality
            are owned by Fitzo and are protected by international copyright,
            trademark, trade secret, and other intellectual property laws. You
            may not:
          </p>
          <ul className="list-disc list-inside space-y-2 text-neutral-400">
            <li>
              Copy, modify, or create derivative works of the Service
            </li>
            <li>
              Use our trademarks, logos, or branding without prior written
              consent
            </li>
            <li>
              Remove any copyright or proprietary notices from the Service
            </li>
          </ul>
        </Section>

        {/* ━━━ User Content ━━━ */}
        <Section title="7. User-Generated Content">
          <p>
            You retain ownership of any content you submit to the Service
            (workout data, photos, profile information). By submitting content,
            you grant Fitzo a non-exclusive, worldwide, royalty-free license to
            use, display, and process your content solely for the purpose of
            providing and improving the Service.
          </p>
          <p>
            You represent that you have all necessary rights to submit content
            and that your content does not violate any third-party rights.
          </p>
        </Section>

        {/* ━━━ Health Disclaimer ━━━ */}
        <Section title="8. Health & Fitness Disclaimer">
          <p>
            Fitzo is designed as a fitness tracking and education tool.
            <strong className="text-white">
              {" "}
              Fitzo is not a medical device and does not provide medical advice.
            </strong>
          </p>
          <ul className="list-disc list-inside space-y-2 text-neutral-400">
            <li>
              The workout programs, nutrition information, and educational
              content provided through the Service are for informational
              purposes only
            </li>
            <li>
              Always consult with a qualified healthcare provider before
              starting any new exercise or nutrition program
            </li>
            <li>
              AI-powered nutrition suggestions are estimates and should not
              replace professional dietary advice
            </li>
            <li>
              You assume all risks associated with your use of the fitness
              information provided through the Service
            </li>
          </ul>
        </Section>

        {/* ━━━ Limitation of Liability ━━━ */}
        <Section title="9. Limitation of Liability">
          <p>
            To the maximum extent permitted by law, Fitzo and its officers,
            directors, employees, and agents shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages,
            including but not limited to loss of profits, data, or use,
            arising out of or in connection with your use of the Service.
          </p>
          <p>
            Our total liability shall not exceed the amount you paid us in the
            12 months preceding the event giving rise to the liability, or $100,
            whichever is greater.
          </p>
        </Section>

        {/* ━━━ Indemnification ━━━ */}
        <Section title="10. Indemnification">
          <p>
            You agree to indemnify, defend, and hold harmless Fitzo and its
            affiliates from and against any claims, liabilities, damages,
            losses, and expenses (including reasonable legal fees) arising out
            of your use of the Service, your violation of these Terms, or your
            violation of any third-party rights.
          </p>
        </Section>

        {/* ━━━ Termination ━━━ */}
        <Section title="11. Termination">
          <p>
            We may terminate or suspend your access to the Service immediately,
            without prior notice, for any reason, including breach of these
            Terms. Upon termination:
          </p>
          <ul className="list-disc list-inside space-y-2 text-neutral-400">
            <li>
              Your right to use the Service will immediately cease
            </li>
            <li>
              You may request export of your data within 30 days by contacting
              support
            </li>
            <li>
              Provisions that by their nature should survive termination will
              survive (including intellectual property, limitation of liability,
              and indemnification)
            </li>
          </ul>
        </Section>

        {/* ━━━ Governing Law ━━━ */}
        <Section title="12. Governing Law">
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of the jurisdiction in which Fitzo operates, without
            regard to its conflict of law provisions. Any disputes arising from
            these Terms or the Service will be resolved through binding
            arbitration, except where prohibited by law.
          </p>
        </Section>

        {/* ━━━ Contact ━━━ */}
        <Section title="13. Contact Us">
          <p>
            If you have any questions about these Terms, please contact us:
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
            href="/privacy-policy"
            className="text-sm text-neutral-400 hover:text-white transition-colors"
          >
            Privacy Policy &rarr;
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
              href="/privacy-policy"
              className="text-xs text-neutral-600 hover:text-white transition-colors"
            >
              Privacy Policy
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
