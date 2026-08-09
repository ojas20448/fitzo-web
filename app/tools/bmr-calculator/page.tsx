import { Metadata } from "next";
import BmrCalculator from "./calculator";
import { SITE_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Fitzo",
  description: "Calculate your Basal Metabolic Rate (BMR) instantly. Free online BMR calculator to optimize calorie tracking.",
  alternates: {
    canonical: `${SITE_URL}/tools/bmr-calculator`,
  },
  openGraph: {
    title: "Fitzo BMR Calculator: Basal Metabolic Rate, Free & Instant",
    description: "Calculate your Basal Metabolic Rate (BMR) instantly. Free online BMR calculator to optimize calorie tracking.",
    url: `${SITE_URL}/tools/bmr-calculator`,
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Fitzo BMR Calculator",
  description: "Calculate your Basal Metabolic Rate (BMR) instantly.",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  url: `${SITE_URL}/tools/bmr-calculator`,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BmrCalculator />
    </>
  );
}
