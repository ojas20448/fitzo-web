import { Metadata } from "next";
import ProteinCalculator from "./calculator";
import { SITE_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Fitzo",
  description: "Find out exactly how much protein you need per day to build muscle or lose fat. Free protein calculator for lifters.",
  alternates: {
    canonical: `${SITE_URL}/tools/protein-calculator`,
  },
  openGraph: {
    title: "Fitzo Protein Calculator: Daily Intake for Muscle & Fat Loss",
    description: "Find out exactly how much protein you need per day to build muscle or lose fat. Free protein calculator for lifters.",
    url: `${SITE_URL}/tools/protein-calculator`,
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Fitzo Protein Calculator",
  description: "Calculate your optimal daily protein intake.",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  url: `${SITE_URL}/tools/protein-calculator`,
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
      <ProteinCalculator />
    </>
  );
}
