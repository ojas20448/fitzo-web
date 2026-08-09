import { Metadata } from "next";
import TdeeCalculator from "./calculator";
import { SITE_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Fitzo",
  description: "Calculate exactly how many calories you burn in a day with our free TDEE calculator.",
  alternates: {
    canonical: `${SITE_URL}/tools/tdee-calculator`,
  },
  openGraph: {
    title: "Fitzo TDEE Calculator: Total Daily Energy Expenditure",
    description: "Calculate exactly how many calories you burn in a day with our free TDEE calculator.",
    url: `${SITE_URL}/tools/tdee-calculator`,
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
