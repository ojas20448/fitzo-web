/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Landing page
 *
 * Scroll pacing: a dense first viewport, then the one authored motion moment
 * (WeeklyReadout), then hands-on (InteractiveDemo), then the catalogue, then
 * the argument, then the people, then one close. Sections own their own top
 * and bottom rhythm — the previous seven identical hairline dividers were
 * grammar nobody chose.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WeeklyReadout from "@/components/WeeklyReadout";
import InteractiveDemo from "@/components/InteractiveDemo";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Comparison from "@/components/Comparison";
import Testimonials from "@/components/Testimonials";
import FounderStory from "@/components/FounderStory";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getSoftwareApplicationSchema,
  getFAQSchema,
} from "@/lib/structured-data";

const faqData = [
  { question: "Is Fitzo free to use?", answer: "Yes! Fitzo is completely free to download and use. We believe everyone should have access to quality fitness tracking. Premium features will be introduced later with additional capabilities." },
  { question: "Does it work offline?", answer: "Absolutely. Fitzo works fully offline — you can log workouts, track calories, and view your data without internet. It syncs automatically when you're back online." },
  { question: "Can I track Indian food items?", answer: "Yes! Fitzo has a comprehensive Indian food database alongside USDA data. You can search for dal, roti, paneer, biryani, and thousands of other Indian dishes. Plus barcode scanner works with Indian packaged foods." },
  { question: "What workout splits are available?", answer: "We have 10+ proven splits: PPL (Push Pull Legs), Upper/Lower, Bro Split, Full Body, PHUL, PHAT, Arnold Split, and custom routines. You can also create your own or generate AI-powered personalized plans." },
  { question: "How does the AI Coach work?", answer: "Our AI Coach uses Google Gemini to answer your fitness questions — form corrections, nutrition advice, workout modifications, and more. Just chat and get instant, personalized guidance." },
  { question: "Is my data secure?", answer: "100%. We use industry-standard encryption, never sell your data, and you're in full control. You can export or delete your data anytime from settings." },
  { question: "Can I use it with my gym trainer?", answer: "Yes! Fitzo supports trainer profiles. Your trainer can view your progress, track attendance, and send motivational nudges to keep you accountable." },
  { question: "Which gyms is it designed for?", answer: "Fitzo works for any gym, but it's optimized for medium-sized gyms and training studios in India. Features like QR check-in and class booking are built for gym ecosystems." },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebSiteSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getSoftwareApplicationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(faqData)) }}
      />

      <Navbar />

      <main id="main">
        <Hero />

        {/* The one authored motion moment: a week of training, scrubbed. */}
        <WeeklyReadout />

        {/* Show, then let them touch it. */}
        <InteractiveDemo />

        <Features />

        <HowItWorks />

        <Comparison />

        <Testimonials />

        <FounderStory />

        <FAQ />

        {/* One conversion point — every CTA on the site lands here. */}
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
