import { chromium } from 'playwright';
import fs from 'fs';

/**
 * Capture real Fitzo screens from the Expo web build for both stores.
 *
 * Two device profiles, because one set cannot satisfy both stores:
 *
 *   ios  1320x2868  Apple's 6.9" slot (iPhone 17 Pro Max / 16 Pro Max class).
 *                   Aspect 2.17:1. Upload only this size — App Store Connect
 *                   scales it down to every smaller iPhone shelf.
 *   play 1080x2160  Google Play caps screenshots at a 2:1 aspect ratio, and
 *                   Apple's 2.17:1 exceeds it. 1080x2160 is exactly 2:1, the
 *                   tallest Play accepts.
 *
 * Viewports are CSS pixels with deviceScaleFactor doing the upscale, so the app
 * lays out as a phone. Using a 1080px CSS viewport instead makes the app render
 * as a 1080pt tablet: tiny type, stretched cards, obvious dead space.
 */
const PROFILES = [
  { key: 'app-store',  css: { width: 440, height: 956 }, dsf: 3 },  // -> 1320 x 2868
  { key: 'google-play', css: { width: 360, height: 720 }, dsf: 3 },  // -> 1080 x 2160
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

const BASE = 'http://localhost:8099';
const ROOT = 'C:/Users/PC/Documents/Code/Fitzo/mobile/store-screenshots';

const b = await chromium.launch();

for (const prof of PROFILES) {
  const out = `${ROOT}/${prof.key}`;
  fs.mkdirSync(out, { recursive: true });

  const p = await b.newPage({
    viewport: prof.css, deviceScaleFactor: prof.dsf, isMobile: true, hasTouch: true,
  });

  await p.goto(BASE, { waitUntil: 'networkidle', timeout: 180000 });
  await p.waitForTimeout(4000);

  const inputs = await p.locator('input').all();
  if (inputs.length >= 2) {
    await inputs[0].fill('review@fitzo.app');
    await inputs[1].fill('FitzoReview2026!');
    await p.getByText('Log In', { exact: true }).first().click();
    await p.waitForTimeout(9000);
  } else {
    console.log(`${prof.key}: login form not found — aborting profile`);
    await p.close();
    continue;
  }

  for (const [name, route] of ROUTES) {
    try {
      await p.goto(BASE + route, { waitUntil: 'networkidle', timeout: 60000 });
      await p.waitForTimeout(5000);
      await p.screenshot({ path: `${out}/${name}.png` });
    } catch (e) {
      console.log(`  FAIL ${prof.key}/${name}: ${String(e).slice(0, 60)}`);
    }
  }
  console.log(`${prof.key}: ${prof.css.width * prof.dsf}x${prof.css.height * prof.dsf} -> ${out}`);
  await p.close();
}

await b.close();
