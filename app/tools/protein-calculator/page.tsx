import { pageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import ProteinCalculator from "./calculator";
import { SITE_URL } from "@/lib/links";

export const metadata: Metadata = pageMetadata(
  "Free Protein Calculator: Daily Protein Intake | Fitzo",
  "Estimate a daily protein range from your weight, training and goal. Find a starting target for muscle building, fat loss or general fitness.",
  "/tools/protein-calculator",
);

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
