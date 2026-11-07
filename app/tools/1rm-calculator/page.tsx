import { pageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import OneRepMaxCalculator from "./calculator";
import { SITE_URL } from "@/lib/links";

export const metadata: Metadata = pageMetadata(
  "Free 1RM Calculator: One-Rep Max Estimate | Fitzo",
  "Estimate your one-rep max with the Epley formula using the weight and reps you lift. View training percentages for bench press, squat and deadlift.",
  "/tools/1rm-calculator",
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Fitzo 1RM Calculator",
  description: "Calculate your 1-Rep Max (1RM) and optimal training percentages.",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  url: `${SITE_URL}/tools/1rm-calculator`,
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
      <OneRepMaxCalculator />
    </>
  );
}
