/**
 * Capture real Fitzo app screens for the store panel compositor.
 *
 * These are the actual app rendered with real data, not mock-ups. Both stores
 * expect screenshots to represent genuine app usage, and drawn approximations
 * drift from the UI the moment anything changes.
 *
 * Prerequisites:
 *   1. The reviewer account exists and is seeded:
 *        cd backend && node scripts/seed_review_account.js
 *   2. The Expo web build is serving, POINTED AT PRODUCTION:
 *        cd mobile && EXPO_PUBLIC_API_URL=https://fitzo.onrender.com/api \
 *          npx expo start --web --port 8100
 *   3. Run from this project (Playwright lives in its node_modules):
 *        FITZO_WEB_URL=http://localhost:8100 node scripts/capture-store-screenshots.mjs
 *   4. Then compose the marketing panels:
 *        node scripts/compose-store-panels.mjs
 *
 * ── ONE capture set, at a REAL phone shape ──────────────────────────────────
 * An earlier version captured twice, once per store, sizing each viewport to
 * the store's own canvas ratio — including 360x720 (exactly 2.000) to respect
 * Google Play's 2:1 screenshot cap.
 *
 * That was the bug behind the "squashed" look. No phone is 2.000: a Pixel 8 is
 * 2.221, a Galaxy S24 2.167, an iPhone 17 Pro Max 2.173. Forcing the app to
 * lay out in a 720pt-tall box crammed its vertical rhythm — the store's canvas
 * ratio leaked into the DEVICE ratio.
 *
 * The device ratio and the panel ratio are independent. The device is just an
 * image placed on the panel, so one capture at a true phone shape serves both
 * canvases; the compositor scales it to width and lets it bleed off the bottom.
 * 440x956 at DPR 3 is used because it is both a real device (iPhone 17 Pro Max
 * class) and exactly Apple's required 6.9" pixel size.
 *
 * ── Scroll offsets ──────────────────────────────────────────────────────────
 * Each route names the section worth showing. Capturing every screen at scroll
 * 0 buries the feature the panel's headline is about — the muscle heatmap sits
 * below the fold on Stats, so the "See what you actually trained" panel was
 * showing a weekly summary card instead of the heatmap.
 */

import { chromium } from 'playwright';
import fs from 'fs';

const BASE = process.env.FITZO_WEB_URL || 'http://localhost:8100';
const OUT = 'C:/Users/PC/Documents/Code/Fitzo/mobile/store-screenshots/device';

const REVIEW_EMAIL = 'review@fitzo.app';
const REVIEW_PASSWORD = 'FitzoReview2026!';

// Real device metrics — iPhone 17 Pro Max class. CSS pixels with DPR doing the
// upscale, so the app lays out as a phone rather than a 1320pt-wide tablet.
const CSS = { width: 440, height: 956 };
const DPR = 3;                                    // -> 1320 x 2868

// `scrollTo` is the y offset in CSS px. Chosen so the panel's headline feature
// is actually on screen. `anchor` scrolls an element into view instead, when
// the offset would be fragile.
const ROUTES = [
    { name: '01-home', path: '/(tabs)', scrollTo: 0 },
    { name: '02-stats', path: '/(tabs)/stats', anchor: 'Muscle Volume Status' },
    { name: '03-coach', path: '/ai-coach', scrollTo: 0 },
    { name: '04-logger', path: '/log/workout', scrollTo: 0 },
    { name: '05-nutrition', path: '/log/calories', scrollTo: 0 },
    { name: '06-profile', path: '/(tabs)/profile', scrollTo: 0 },
    { name: '07-learn', path: '/(tabs)/learn', scrollTo: 0 },
    { name: '08-buddies', path: '/(tabs)/buddies', scrollTo: 0 },
];

fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
    viewport: CSS,
    deviceScaleFactor: DPR,
    isMobile: true,
    hasTouch: true,
});

await page.goto(BASE, { waitUntil: 'networkidle', timeout: 180_000 });
await page.waitForTimeout(4000);

const inputs = await page.locator('input').all();
if (inputs.length < 2) {
    console.error(`login form not found at ${BASE} — is the web build running?`);
    process.exit(1);
}
await inputs[0].fill(REVIEW_EMAIL);
await inputs[1].fill(REVIEW_PASSWORD);
await page.getByText('Log In', { exact: true }).first().click();

// Wait for a REAL post-login signal, never a fixed sleep. A previous version
// slept 9s and continued regardless; when the API cold-started it captured a
// logged-out app and reported success, emitting a full set of plausible-looking
// screenshots showing "0 sessions". Silently wrong output is worse than a crash.
try {
    await page.waitForFunction(
        () => !document.body.innerText.includes('WELCOME BACK'),
        { timeout: 90_000 },
    );
} catch {
    console.error('login did not complete within 90s — still on the sign-in screen.');
    console.error('  The API may be cold-starting, or mobile/.env.local may be pointing');
    console.error('  EXPO_PUBLIC_API_URL at localhost:3001 (it overrides mobile/.env).');
    process.exit(1);
}
await page.waitForTimeout(6000);

for (const route of ROUTES) {
    try {
        await page.goto(BASE + route.path, { waitUntil: 'networkidle', timeout: 60_000 });
        await page.waitForTimeout(5000);

        if (route.anchor) {
            const el = page.getByText(route.anchor).first();
            await el.scrollIntoViewIfNeeded({ timeout: 10_000 });
            // Back off a little so the anchor is not flush against the top edge.
            await page.evaluate(() => window.scrollBy(0, -70));
        } else if (route.scrollTo) {
            await page.evaluate((y) => window.scrollTo(0, y), route.scrollTo);
        }
        await page.waitForTimeout(1800);

        await page.screenshot({ path: `${OUT}/${route.name}.png` });
        console.log(`  ok  ${route.name}`);
    } catch (err) {
        console.error(`  FAIL ${route.name}: ${String(err).slice(0, 90)}`);
    }
}

console.log(`\n${CSS.width * DPR}x${CSS.height * DPR} (ratio ${(CSS.height / CSS.width).toFixed(3)}) -> ${OUT}`);
await browser.close();
