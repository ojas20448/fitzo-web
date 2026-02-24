/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Main Landing Page
 * Science-Based Fitness Tracking for Serious Lifters
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Blog from "@/components/Blog";
import Waitlist from "@/components/Waitlist";
import Comparison from "@/components/Comparison";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import FounderStory from "@/components/FounderStory";
import InteractiveDemo from "@/components/InteractiveDemo";
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
    <div className="relative min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* JSON-LD Structured Data */}
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

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Social Proof Bar */}
        <SocialProof />

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
        </div>

        {/* How It Works */}
        <HowItWorks />

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
        </div>

        {/* Features Bento Grid */}
        <Features />

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
        </div>

        {/* Testimonials */}
        <Testimonials />

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
        </div>

        {/* Founder Story */}
        <FounderStory />

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
        </div>

        {/* FAQ */}
        <FAQ />

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
        </div>

        {/* Blog */}
        <Blog />

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
        </div>

        {/* Why Fitzo — Comparison */}
        <Comparison />

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
        </div>

        {/* Interactive Demo */}
        <InteractiveDemo />

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
        </div>

        {/* Pricing */}
        <Pricing />

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
        </div>

        {/* Waitlist */}
        <Waitlist />

        {/* Final CTA */}
        <CTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
