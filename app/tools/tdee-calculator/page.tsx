import { pageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import TdeeCalculator from "./calculator";
import { SITE_URL } from "@/lib/links";

export const metadata: Metadata = pageMetadata(
  "Free TDEE Calculator: Daily Calorie Needs | Fitzo",
  "Estimate daily calorie needs from your age, height, weight and activity level. Use your TDEE as a starting point for maintenance, fat loss or muscle gain.",
  "/tools/tdee-calculator",
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Fitzo TDEE Calculator",
  description: "Calculate your Total Daily Energy Expenditure.",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  url: `${SITE_URL}/tools/tdee-calculator`,
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
      <TdeeCalculator />
    </>
  );
}
