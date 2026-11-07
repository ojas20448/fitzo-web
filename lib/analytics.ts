export const CONSENT_KEY = "fitzo-analytics-consent";
// Measurement IDs are public; an environment override can target a separate property.
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-R6SYM45NL3";
export type AnalyticsConsent = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fitzoAnalyticsEnabled?: boolean;
    [key: `ga-disable-${string}`]: boolean;
  }
}

// Query strings can contain buddy IDs, usernames or email addresses.
export function analyticsUrl(value: string): string {
  try {
    const url = new URL(value);
    return /^https?:$/.test(url.protocol) ? `${url.origin}${url.pathname}` : "";
  } catch {
    return "";
  }
}

export function trackAppStoreClick(platform: "android" | "ios") {
  if (typeof window !== "undefined" && window.fitzoAnalyticsEnabled) {
    window.gtag?.("event", "app_store_click", { platform, transport_type: "beacon" });
  }
}
