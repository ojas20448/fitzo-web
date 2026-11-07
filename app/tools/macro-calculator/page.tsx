import { pageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import MacroCalculator from "./calculator";
import { SITE_URL } from "@/lib/links";

export const metadata: Metadata = pageMetadata(
  "Free Macro Calculator: Protein, Carbs & Fat | Fitzo",
  "Estimate daily calories and protein, carbohydrate and fat targets for cutting, bulking or maintenance. Free macro calculator with adjustable goals.",
  "/tools/macro-calculator",
);

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
