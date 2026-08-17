/**
 * Capture real Fitzo app screens for both app stores.
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
 *
 * ── Why the API URL must be overridden ──────────────────────────────────────
 * mobile/.env.local sets EXPO_PUBLIC_API_URL to http://localhost:3001/api and
 * TAKES PRECEDENCE over mobile/.env. Without a local backend running, every
 * request fails with ERR_CONNECTION_REFUSED, the login never completes, and
 * the capture silently produces a full set of logged-out screenshots showing
 * "0 sessions" and an untrained muscle map. The login gate below now turns
 * that into a loud failure instead, but the override is what actually fixes it.
 *
 * ── Why two device profiles ─────────────────────────────────────────────────
 * One set cannot satisfy both stores:
 *
 *   app-store    1320x2868   Apple's 6.9" slot (iPhone 17 Pro Max class),
 *                            aspect 2.173:1. Upload ONLY this size — App Store
 *                            Connect scales it to every smaller iPhone shelf.
 *   google-play  1080x2160   Google Play caps screenshots at 2:1, and Apple's
 *                            2.173:1 exceeds that cap. 1080x2160 is exactly
 *                            2:1, the tallest Play will accept.
 *
 * ── Why the viewport is in CSS pixels ───────────────────────────────────────
 * The viewport must be phone-sized (440x956 / 360x720) with deviceScaleFactor
 * doing the upscale, so the app lays out as a phone. Setting the viewport to
 * 1080 CSS px instead makes the app believe it is a 1080pt-wide tablet: type
 * renders tiny, cards stretch, and the result is obviously wrong.
 */

import { chromium } from 'playwright';
import fs from 'fs';

const BASE = process.env.FITZO_WEB_URL || 'http://localhost:8099';
const ROOT = 'C:/Users/PC/Documents/Code/Fitzo/mobile/store-screenshots';

const REVIEW_EMAIL = 'review@fitzo.app';
const REVIEW_PASSWORD = 'FitzoReview2026!';

const PROFILES = [
    { key: 'app-store',   css: { width: 440, height: 956 }, dsf: 3 },  // 1320x2868
    { key: 'google-play', css: { width: 360, height: 720 }, dsf: 3 },  // 1080x2160
];

const ROUTES = [
    ['01-home',      '/(tabs)'],
    ['02-stats',     '/(tabs)/stats'],
    ['03-coach',     '/ai-coach'],
    ['04-logger',    '/log/workout'],
    ['05-nutrition', '/log/calories'],
    ['06-profile',   '/(tabs)/profile'],
    ['07-learn',     '/(tabs)/learn'],
    ['08-buddies',   '/(tabs)/buddies'],
];

const browser = await chromium.launch();

for (const prof of PROFILES) {
    const out = `${ROOT}/${prof.key}`;
    fs.mkdirSync(out, { recursive: true });

    const page = await browser.newPage({
        viewport: prof.css,
        deviceScaleFactor: prof.dsf,
        isMobile: true,
        hasTouch: true,
    });

    await page.goto(BASE, { waitUntil: 'networkidle', timeout: 180_000 });
    await page.waitForTimeout(4000);

    const inputs = await page.locator('input').all();
    if (inputs.length < 2) {
        console.error(`${prof.key}: login form not found at ${BASE} — is the web build running?`);
        await page.close();
        continue;
    }

    await inputs[0].fill(REVIEW_EMAIL);
    await inputs[1].fill(REVIEW_PASSWORD);
    await page.getByText('Log In', { exact: true }).first().click();

    // Wait for a REAL post-login signal, not a fixed sleep.
    //
    // This previously slept 9 seconds and carried on regardless. When Render
    // cold-started, the login had not completed in time, and the script
    // captured a logged-out app without complaining — producing a full set of
    // plausible-looking screenshots showing "0 sessions" and an untrained
    // muscle map. Silently wrong output is worse than a crash, so a failed
    // login is now fatal.
    try {
        await page.waitForFunction(
            () => !document.body.innerText.includes('WELCOME BACK'),
            { timeout: 90_000 },
        );
    } catch {
        console.error(
            `${prof.key}: login did not complete within 90s — still on the sign-in screen.\n` +
            '  The API may be cold-starting, or the reviewer account may be missing.\n' +
            '  Re-seed with: cd backend && node scripts/seed_review_account.js',
        );
        await page.close();
        process.exitCode = 1;
        continue;
    }

    // Let the authenticated home screen settle before navigating away.
    await page.waitForTimeout(6000);

    for (const [name, route] of ROUTES) {
        try {
            await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 60_000 });
            await page.waitForTimeout(5000);
            await page.screenshot({ path: `${out}/${name}.png` });
        } catch (err) {
            console.error(`  FAIL ${prof.key}/${name}: ${String(err).slice(0, 80)}`);
        }
    }

    console.log(`${prof.key}: ${prof.css.width * prof.dsf}x${prof.css.height * prof.dsf} -> ${out}`);
    await page.close();
}

await browser.close();
