import { Metadata } from "next";
import BodyFatCalculator from "./calculator";

export const metadata: Metadata = {
  title: "Body Fat Calculator (US Navy Method) | Fitzo",
  description: "Accurately estimate your body fat percentage using the free US Navy tape measure method calculator.",
  alternates: {
    canonical: "/tools/body-fat-calculator",
  },
  openGraph: {
    title: "Body Fat Calculator (US Navy Method) | Fitzo",
    description: "Accurately estimate your body fat percentage using the free US Navy tape measure method calculator.",
    url: "/tools/body-fat-calculator",
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
  url: "https://fitzoapp.in/tools/body-fat-calculator",
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
