/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — FAQ
 *
 * Left-aligned against a sticky heading rather than centred: a column of
 * questions reads faster with a fixed left edge, and the heading stays with
 * the reader through a long list.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { motion } from "framer-motion";
import { rise, stack, stackItem, VIEWPORT } from "@/lib/motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is Fitzo free to use?",
    answer:
      "Yes. Fitzo is completely free to download and use — we believe everyone should have access to quality fitness tracking. Premium features will arrive later with additional capabilities.",
  },
  {
    question: "Does it work offline?",
    answer:
      "Fully. Log workouts, track calories and view your data with no internet at all. Everything syncs automatically once you're back online.",
  },
  {
    question: "Can I track Indian food items?",
    answer:
      "Yes — that's the point. Fitzo carries a comprehensive Indian food database alongside USDA data, so dal, roti, paneer and biryani are all there. The barcode scanner works with Indian packaged foods too.",
  },
  {
    question: "What workout splits are available?",
    answer:
      "10+ proven splits: PPL (Push Pull Legs), Upper/Lower, Bro Split, Full Body, PHUL, PHAT, Arnold Split and custom routines. You can build your own or generate an AI-personalised plan.",
  },
  {
    question: "How does the AI coach work?",
    answer:
      "It runs on Google Gemini and answers your fitness questions — form corrections, nutrition advice, workout modifications. It reads your logged lifts and food, so the guidance is based on what you've actually done.",
  },
  {
    question: "Is my data secure?",
    answer:
      "We use industry-standard encryption, never sell your data, and leave you in full control. Export or delete everything from settings whenever you want.",
  },
  {
    question: "Can I use it with my gym trainer?",
    answer:
      "Yes. Fitzo supports trainer profiles — your trainer can view your progress, track attendance and send motivational nudges to keep you accountable.",
  },
  {
    question: "Which gyms is it designed for?",
    answer:
      "Fitzo works for any gym, but it's optimised for medium-sized gyms and training studios in India. QR check-in and class booking are built for gym ecosystems specifically.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative py-14 sm:py-24 lg:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* ━━━ Sticky heading ━━━ */}
          <motion.div
            variants={rise}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <h2 className="text-[clamp(2rem,4.6vw,3.25rem)] font-black leading-[0.98] tracking-[-0.04em] text-balance">
              Got questions?
            </h2>
            <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-ink-muted text-pretty">
              Everything you need to know about Fitzo.
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
          </motion.div>

          {/* ━━━ Questions ━━━ */}
          <motion.div
            variants={stack}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <Accordion type="single" collapsible defaultValue="faq-0">
              {faqs.map((faq, index) => (
                <motion.div key={faq.question} variants={stackItem}>
                  <AccordionItem
                    value={`faq-${index}`}
                    className="border-b border-white/[0.07]"
                  >
                    <AccordionTrigger className="py-5 text-left text-base font-semibold text-white transition-colors hover:text-protein hover:no-underline sm:text-lg">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="max-w-[62ch] pb-5 text-[15px] leading-relaxed text-ink-muted">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
