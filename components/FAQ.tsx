/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO: FAQ
 *
 * Left-aligned against a sticky heading rather than centred: a column of
 * questions reads faster with a fixed left edge, and the heading stays with
 * the reader through a long list.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { FAQS } from "@/lib/product";



export default function FAQ() {
  return (
    <section id="faq" className="relative py-14 sm:py-24 lg:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* ━━━ Sticky heading ━━━ */}
          <div
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <h2 className="text-[clamp(2rem,4.6vw,3.25rem)] font-black leading-[0.98] tracking-[-0.04em] text-balance">
              Got questions?
            </h2>
            <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-ink-muted text-pretty">
              A few things before your first session.
            </p>
            <p className="mt-7 text-sm text-ink-muted">
              Still stuck?{" "}
              <a
                href="mailto:contact@fitzoapp.in"
                className="font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-protein hover:decoration-protein/50"
              >
                Email us
              </a>{" "}
             — a human answers.
            </p>
          </div>

          {/* ━━━ Questions ━━━ */}
          <div
          >
            <div>
              {FAQS.map((faq, index) => (
                <div key={faq.question}>
                  <details
                    open={index === 0}
                    className="border-b border-white/[0.07]"
                  >
                    <summary className="cursor-pointer py-5 text-left text-base font-semibold text-white transition-colors hover:text-protein hover:no-underline sm:text-lg">
                      {faq.question}
                    </summary>
                    <p className="max-w-[62ch] pb-5 text-[15px] leading-relaxed text-ink-muted">
                      {faq.answer}
                    </p>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
