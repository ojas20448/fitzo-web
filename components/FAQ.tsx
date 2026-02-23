/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — FAQ Section
 * Common questions from Indian gym-goers
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

const faqs = [
  {
    question: "Is Fitzo free to use?",
    answer:
      "Yes! Fitzo is completely free to download and use. We believe everyone should have access to quality fitness tracking. Premium features will be introduced later with additional capabilities.",
  },
  {
    question: "Does it work offline?",
    answer:
      "Absolutely. Fitzo works fully offline — you can log workouts, track calories, and view your data without internet. It syncs automatically when you're back online.",
  },
  {
    question: "Can I track Indian food items?",
    answer:
      "Yes! Fitzo has a comprehensive Indian food database alongside USDA data. You can search for dal, roti, paneer, biryani, and thousands of other Indian dishes. Plus barcode scanner works with Indian packaged foods.",
  },
  {
    question: "What workout splits are available?",
    answer:
      "We have 10+ proven splits: PPL (Push Pull Legs), Upper/Lower, Bro Split, Full Body, PHUL, PHAT, Arnold Split, and custom routines. You can also create your own or generate AI-powered personalized plans.",
  },
  {
    question: "How does the AI Coach work?",
    answer:
      "Our AI Coach uses Google Gemini to answer your fitness questions — form corrections, nutrition advice, workout modifications, and more. Just chat and get instant, personalized guidance.",
  },
  {
    question: "Is my data secure?",
    answer:
      "100%. We use industry-standard encryption, never sell your data, and you're in full control. You can export or delete your data anytime from settings.",
  },
  {
    question: "Can I use it with my gym trainer?",
    answer:
      "Yes! Fitzo supports trainer profiles. Your trainer can view your progress, track attendance, and send motivational nudges to keep you accountable.",
  },
  {
    question: "Which gyms is it designed for?",
    answer:
      "Fitzo works for any gym, but it's optimized for medium-sized gyms and training studios in India. Features like QR check-in and class booking are built for gym ecosystems.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="border-b border-white/[0.06] last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="text-base sm:text-lg font-medium text-white group-hover:text-green-400 transition-colors">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 ml-4"
        >
          <ChevronDown className="w-5 h-5 text-neutral-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm sm:text-base text-neutral-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-16 sm:py-24">
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] text-neutral-500 border border-white/[0.06] mb-6">
            <HelpCircle className="w-3 h-3" />
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
            Got Questions?
          </h2>
          <p className="text-lg text-neutral-500">
            Everything you need to know about Fitzo.
          </p>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="glass-card rounded-2xl p-2 sm:p-4"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>

        {/* Still Have Questions */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-neutral-500">
            Still have questions?{" "}
            <a
              href="mailto:contact@fitzoapp.in"
              className="text-white hover:text-green-400 transition-colors underline underline-offset-4"
            >
              Reach out
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
