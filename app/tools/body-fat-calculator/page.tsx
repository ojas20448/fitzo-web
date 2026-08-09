import { Metadata } from "next";
import BodyFatCalculator from "./calculator";
import { SITE_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Fitzo",
  description: "Accurately estimate your body fat percentage using the free US Navy tape measure method calculator.",
  alternates: {
    canonical: `${SITE_URL}/tools/body-fat-calculator`,
  },
  openGraph: {
    title: "Fitzo Body Fat Calculator: US Navy Tape Method",
    description: "Accurately estimate your body fat percentage using the free US Navy tape measure method calculator.",
    url: `${SITE_URL}/tools/body-fat-calculator`,
    type: "website",
  },
};

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
