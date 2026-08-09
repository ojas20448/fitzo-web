import { Metadata } from "next";
import TdeeCalculator from "./calculator";

export const metadata: Metadata = {
  title: "TDEE Calculator: Total Daily Energy Expenditure | Fitzo",
  description: "Calculate exactly how many calories you burn in a day with our free TDEE calculator.",
  alternates: {
    canonical: "/tools/tdee-calculator",
  },
  openGraph: {
    title: "TDEE Calculator: Total Daily Energy Expenditure | Fitzo",
    description: "Calculate exactly how many calories you burn in a day with our free TDEE calculator.",
    url: "/tools/tdee-calculator",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Fitzo TDEE Calculator",
  description: "Calculate your Total Daily Energy Expenditure.",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  url: "https://fitzoapp.in/tools/tdee-calculator",
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
