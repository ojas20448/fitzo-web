"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import Link from "next/link";
import { analyticsUrl, CONSENT_KEY, trackAppStoreClick, type AnalyticsConsent } from "@/lib/analytics";
import { STORE } from "@/lib/links";

export default function GoogleAnalytics({ measurementId }: { measurementId?: string }) {
  const pathname = usePathname();
  const [consent, setConsent] = useState<AnalyticsConsent | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const initialized = useRef(false);
  const previousPage = useRef("");
  const validId = /^G-[A-Z0-9]+$/.test(measurementId || "");
  const enabled = validId && consent === "granted" && pathname !== "/buddy";

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CONSENT_KEY);
      if (saved === "granted" || saved === "denied") setConsent(saved);
    } catch { /* Storage may be unavailable; the choice still works for this visit. */ }
  }, []);

  useEffect(() => {
    if (!validId || !measurementId) return;
    window.fitzoAnalyticsEnabled = enabled;
    window[`ga-disable-${measurementId}`] = !enabled;
    if (!enabled) {
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
      return;
    }

    if (!initialized.current) {
      window.dataLayer = window.dataLayer || [];
      // eslint-disable-next-line prefer-rest-params -- Preserve Google's documented gtag command queue.
      window.gtag = function () { window.dataLayer!.push(arguments); };
      window.gtag("consent", "default", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      window.gtag("js", new Date());
      initialized.current = true;
    } else {
      window.gtag?.("consent", "update", { analytics_storage: "granted" });
    }
    return () => { window.fitzoAnalyticsEnabled = false; };
  }, [enabled, measurementId, validId]);

  useEffect(() => {
    if (!enabled) { previousPage.current = ""; return; }
    const location = analyticsUrl(window.location.href);
    if (previousPage.current === location) return;
    // Enhanced measurement is disabled in GA4; this is the only page-view sender.
    const page = { page_location: location, page_title: document.title,
      page_referrer: previousPage.current || analyticsUrl(document.referrer) };
    window.gtag?.("config", measurementId, {
      ...page, send_page_view: false,
      allow_google_signals: false, allow_ad_personalization_signals: false,
    });
    window.gtag?.("event", "page_view", page);
    previousPage.current = location;
  }, [pathname, enabled, measurementId]);

  useEffect(() => {
    if (!enabled) return;
    function onClick(event: MouseEvent) {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (link?.href === STORE.android) trackAppStoreClick("android");
      if (link?.href === STORE.ios) trackAppStoreClick("ios");
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [enabled]);

  function choose(value: AnalyticsConsent) {
    // Disable immediately, including any click before React runs the next effect.
    if (value === "denied" && measurementId) {
      window.fitzoAnalyticsEnabled = false;
      window[`ga-disable-${measurementId}`] = true;
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
    }
    try { localStorage.setItem(CONSENT_KEY, value); } catch { /* Session-only choice. */ }
    setConsent(value);
    setShowSettings(false);
  }

  if (!validId || pathname === "/buddy") return null;
  return <>
    {enabled && <Script id="fitzo-google-analytics" src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />}
    {(consent === null || showSettings) ? (
      <section aria-label="Website analytics preferences" className="fixed bottom-4 left-4 right-4 z-[100] max-w-lg rounded-2xl border border-white/20 bg-neutral-950 p-5 text-white shadow-2xl sm:right-auto">
        <h2 className="text-base font-semibold">Help improve Fitzo?</h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-300">
          With your permission, Google Analytics uses cookies to measure page visits and app-store clicks. We don&apos;t send your food logs, body measurements or form entries. <Link href="/privacy-policy#website-analytics" className="underline underline-offset-4">Privacy details</Link>
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={() => choose("granted")} className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Allow analytics</button>
          <button type="button" onClick={() => choose("denied")} className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">No thanks</button>
        </div>
      </section>
    ) : (
      <button type="button" onClick={() => setShowSettings(true)} className="fixed bottom-3 left-3 z-[90] rounded-full border border-white/20 bg-neutral-950 px-3 py-2 text-xs text-neutral-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Cookie settings</button>
    )}
  </>;
}
