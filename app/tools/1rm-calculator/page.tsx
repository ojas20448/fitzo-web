import { Metadata } from "next";
import OneRepMaxCalculator from "./calculator";

export const metadata: Metadata = {
  title: "1RM Calculator: One Rep Max Estimator | Fitzo",
  description: "Calculate your 1-Rep Max (1RM) and optimal training percentages instantly for bench press, squat, and deadlift.",
  alternates: {
    canonical: "/tools/1rm-calculator",
  },
  openGraph: {
    title: "1RM Calculator: One Rep Max Estimator | Fitzo",
    description: "Calculate your 1-Rep Max (1RM) and optimal training percentages instantly for bench press, squat, and deadlift.",
    url: "/tools/1rm-calculator",
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
  url: "https://fitzoapp.in/tools/1rm-calculator",
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
