import { FAQS } from "@/lib/product";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WeeklyReadout from "@/components/WeeklyReadout";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Comparison from "@/components/Comparison";
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(FAQS)) }}
      />

      <Navbar />

      <main id="main">
        <Hero />
        <Features />
        <HowItWorks />
        <WeeklyReadout />

        <Comparison />

        <FounderStory />

        <FAQ />

        {/* One conversion point: every CTA on the site lands here. */}
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
