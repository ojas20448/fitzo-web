import type { Metadata } from "next";
import { SITE_URL } from "@/lib/links";

export const HOME_TITLE = "Fitzo: Workout & Indian Food Tracker for iOS and Android";
export const HOME_DESCRIPTION =
  "Free workout and Indian food tracker for iOS and Android. Log sets, track calories and macros, resume workouts, and choose optional Fitzo AI coaching.";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: "Fitzo",
      title,
      description,
      url,
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Fitzo workout and Indian food tracker" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}
