/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FITZO — Canonical origin and distribution links
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

/**
 * The one canonical origin.
 *
 * ⚠️ This used to be split across the codebase: `app/layout.tsx` declared
 * `metadataBase` and OpenGraph as `https://www.fitzoapp.in`, while
 * `lib/structured-data.ts`, `app/sitemap.ts`, `app/robots.ts` and six
 * page-level `alternates.canonical` values all named a *different* domain.
 *
 * A canonical that names a different origin than the one serving the page
 * tells Google the content belongs somewhere else, which de-indexes the real
 * site. Every URL now derives from here — if the primary domain changes,
 * change it in this one place.
 */
export const SITE_URL = "https://www.fitzoapp.in";

/**
 * Real distribution links, confirmed by the product owner.
 *
 * The site previously had no store URL anywhere: every "Download iOS" and
 * "Google Play" button scrolled to an email form, while the changelog and
 * press page claimed the app was already live.
 *
 * Android ships through Google Play. iOS is in TestFlight beta and is NOT on
 * the public App Store — copy must say "TestFlight" or "beta", never
 * "Download on the App Store".
 */
export const STORE = {
  android: "https://play.google.com/store/apps/details?id=com.fitzo.app",
  iosTestFlight: "https://testflight.apple.com/join/ygUKHFzU",
} as const;

export const CONTACT_EMAIL = "contact@fitzoapp.in";
