import { Metadata } from "next";
import BmrCalculator from "./calculator";

export const metadata: Metadata = {
  title: "Free BMR Calculator | Fitzo",
  description: "Calculate your Basal Metabolic Rate (BMR) instantly. Free online BMR calculator to optimize calorie tracking.",
  alternates: {
    canonical: "/tools/bmr-calculator",
  },
  openGraph: {
    title: "Free BMR Calculator | Fitzo",
    description: "Calculate your Basal Metabolic Rate (BMR) instantly. Free online BMR calculator to optimize calorie tracking.",
    url: "/tools/bmr-calculator",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Fitzo BMR Calculator",
  description: "Calculate your Basal Metabolic Rate (BMR) instantly.",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  url: "https://fitzoapp.in/tools/bmr-calculator",
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
