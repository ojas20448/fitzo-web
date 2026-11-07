import { pageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import BodyFatCalculator from "./calculator";
import { SITE_URL } from "@/lib/links";

export const metadata: Metadata = pageMetadata(
  "Free Body Fat Calculator: US Navy Method | Fitzo",
  "Estimate body fat percentage from tape measurements with the US Navy method. A free calculator with metric inputs and measurement guidance.",
  "/tools/body-fat-calculator",
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Fitzo Body Fat Calculator",
  description: "Estimate your body fat percentage using the US Navy tape measure method.",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  url: `${SITE_URL}/tools/body-fat-calculator`,
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
      <BodyFatCalculator />
    </>
  );
}
