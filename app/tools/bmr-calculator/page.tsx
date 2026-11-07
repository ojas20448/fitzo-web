import { pageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import BmrCalculator from "./calculator";
import { SITE_URL } from "@/lib/links";

export const metadata: Metadata = pageMetadata(
  "Free BMR Calculator: Calories at Rest | Fitzo",
  "Estimate your basal metabolic rate with the Mifflin-St Jeor equation. Enter age, height and weight to find your daily calories at rest.",
  "/tools/bmr-calculator",
);

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
