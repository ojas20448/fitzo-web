import { Metadata } from "next";
import MacroCalculator from "./calculator";
import { SITE_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Fitzo",
  description: "Calculate your exact daily protein, carbs, and fat needs for cutting, bulking, or maintaining weight.",
  alternates: {
    canonical: `${SITE_URL}/tools/macro-calculator`,
  },
  openGraph: {
    title: "Fitzo Macro Calculator: Protein, Carbs & Fat for Cutting or Bulking",
    description: "Calculate your exact daily protein, carbs, and fat needs for cutting, bulking, or maintaining weight.",
    url: `${SITE_URL}/tools/macro-calculator`,
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Fitzo Macro Calculator",
  description: "Calculate your exact daily protein, carbs, and fat needs.",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  url: `${SITE_URL}/tools/macro-calculator`,
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
      <MacroCalculator />
    </>
  );
}
