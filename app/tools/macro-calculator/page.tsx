import { Metadata } from "next";
import MacroCalculator from "./calculator";

export const metadata: Metadata = {
  title: "Free Macro Calculator for Bodybuilding | Fitzo",
  description: "Calculate your exact daily protein, carbs, and fat needs for cutting, bulking, or maintaining weight.",
  alternates: {
    canonical: "/tools/macro-calculator",
  },
  openGraph: {
    title: "Free Macro Calculator for Bodybuilding | Fitzo",
    description: "Calculate your exact daily protein, carbs, and fat needs for cutting, bulking, or maintaining weight.",
    url: "/tools/macro-calculator",
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
  url: "https://fitzoapp.in/tools/macro-calculator",
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
