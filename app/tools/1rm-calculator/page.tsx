import { Metadata } from "next";
import OneRepMaxCalculator from "./calculator";
import { SITE_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Fitzo",
  description: "Calculate your 1-Rep Max (1RM) and optimal training percentages instantly for bench press, squat, and deadlift.",
  alternates: {
    canonical: `${SITE_URL}/tools/1rm-calculator`,
  },
  openGraph: {
    title: "Fitzo 1RM Calculator: One-Rep Max Estimator",
    description: "Calculate your 1-Rep Max (1RM) and optimal training percentages instantly for bench press, squat, and deadlift.",
    url: `${SITE_URL}/tools/1rm-calculator`,
    type: "website",
  },
};

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
