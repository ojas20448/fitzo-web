/**
 * Compose app-store marketing panels from the raw Fitzo app captures.
 *
 * Raw screenshots alone read as cramped in a listing: the store renders them
 * small, nothing frames the screen, and nothing tells a browsing user what they
 * are looking at. Competitors ship marketing panels instead — brand background,
 * one bold headline, device-framed screen.
 *
 * ── The device ratio is NOT the panel ratio ─────────────────────────────────
 * The single most important thing this file gets right. An earlier version
 * captured the app twice, sizing each viewport to the destination store's
 * canvas — including 360x720 (exactly 2.000) to respect Google Play's 2:1
 * screenshot cap. No phone is 2.000: a Pixel 8 is 2.221, a Galaxy S24 2.167,
 * an iPhone 17 Pro Max 2.173. The app was being laid out in a stubby box and
 * the result looked squashed.
 *
 * The device is just an image placed on the panel, so its shape is independent
 * of the canvas. ONE capture at a true phone ratio (2.173) now feeds both
 * canvases; each scales it to width and lets it bleed off the bottom.
 *
 * ── Why not simply copy MyFitnessPal ────────────────────────────────────────
 * They fill panels with brand blue. Fitzo's brand IS black and the screenshots
 * are black too, so the same formula gives flat rectangles with an invisible
 * phone. Separation comes instead from the app's own glass language: a lifted
 * near-black gradient, a hairline luminous bezel, and one accent glow per
 * panel drawn from the macro-ring colours the app already uses — teal protein,
 * yellow carbs, coral fat, green success. Product-derived, not decorative, and
 * it makes the eight read as one set.
 *
 * Rendered through Playwright rather than sharp because the panels need real
 * Lexend — the app's own typeface — and sharp's SVG renderer will not load a
 * local font file reliably.
 *
 *   node scripts/compose-store-panels.mjs
 *
 * Input : mobile/store-screenshots/device/NN-name.png   (one set, 1320x2868)
 * Output: mobile/store-listing/{google-play,app-store}/NN-name.png
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const MOBILE = 'C:/Users/PC/Documents/Code/Fitzo/mobile';
const FONTS = path.join(MOBILE, 'assets', 'fonts');
const SHOTS = path.join(MOBILE, 'store-screenshots', 'device');

// Play caps screenshots at 2:1; Apple's 6.9" slot is 2.173:1. The CANVASES
// differ, the device inside them does not.
const TARGETS = [
    { key: 'google-play', w: 1080, h: 2160 },
    { key: 'app-store', w: 1320, h: 2868 },
];

const DEVICE_RATIO = 2868 / 1320;   // 2.173 — the captured phone shape

// Copy is plain and active: what the feature does, not how it is sold.
// Eyebrows reuse the app's own letterspaced-uppercase idiom.
const PANELS = [
    {
        file: '01-home.png', accent: '#FFFFFF',
        eyebrow: 'TRAINING + NUTRITION',
        title: 'Built for people who<br>actually go to the gym',
        support: 'Your lifts, your macros and your gym on one screen.',
    },
    {
        file: '02-stats.png', accent: '#4ECDC4',
        eyebrow: 'MUSCLE VOLUME',
        title: 'See what you<br>actually trained',
        support: 'A heatmap of every muscle you hit, and the ones you keep skipping.',
    },
    {
        file: '03-coach.png', accent: '#FFE66D',
        eyebrow: 'AI COACH',
        title: 'A coach that has<br>read your logs',
        support: 'It already knows your training, recovery and nutrition when you ask.',
    },
    {
        file: '04-logger.png', accent: '#FFFFFF',
        eyebrow: 'WORKOUT LOGGING',
        title: 'Log a set<br>in seconds',
        support: 'Last session ghosted in. Plate calculator. Rest timer when you want one.',
    },
    {
        file: '05-nutrition.png', accent: '#FF6B6B',
        eyebrow: 'VOICE + PHOTO',
        title: 'Say it, or<br>photograph it',
        support: 'Speak a meal and it becomes macros. Indian food database built in.',
    },
    {
        file: '06-profile.png', accent: '#22C55E',
        eyebrow: 'PROGRESS',
        title: 'Proof you are<br>getting stronger',
        support: 'Streaks, personal records and body metrics tracked over time.',
    },
    {
        file: '07-learn.png', accent: '#FFE66D',
        eyebrow: 'LEARN',
        title: 'Understand why<br>it works',
        support: 'Short lessons on training and nutrition, written for lifters.',
    },
    {
        file: '08-buddies.png', accent: '#4ECDC4',
        eyebrow: 'SQUAD',
        title: 'Train with<br>your gym',
        support: 'Check in by QR, see who is training, keep the streak alive together.',
    },
];

const b64 = (p) => fs.readFileSync(p).toString('base64');
const FONT_BOLD = b64(path.join(FONTS, 'Lexend-Bold.ttf'));
const FONT_REG = b64(path.join(FONTS, 'Lexend-Regular.ttf'));

function html(panel, shotB64, W, H) {
    // Every dimension scales from a 1080-wide design so both canvases stay
    // proportionally identical instead of needing two hand-tuned layouts.
    const u = W / 1080;
    const px = (n) => (n * u).toFixed(2) + 'px';

    const DEVICE_W = 828;                       // design units
    const SCREEN_W = DEVICE_W - 20;             // inside the 10u bezel
    const SCREEN_H = SCREEN_W * DEVICE_RATIO;   // native ratio — never stretched

    return [
        '<!doctype html><html><head><meta charset="utf-8"><style>',
        '@font-face{font-family:"Lexend";font-weight:700;src:url(data:font/ttf;base64,' + FONT_BOLD + ') format("truetype");}',
        '@font-face{font-family:"Lexend";font-weight:400;src:url(data:font/ttf;base64,' + FONT_REG + ') format("truetype");}',
        '*{margin:0;padding:0;box-sizing:border-box;}',
        'html,body{width:' + W + 'px;height:' + H + 'px;background:#000;overflow:hidden;}',
        // A pure-black panel behind a pure-black screenshot reads as one flat
        // murky field. Lifting the top gives the device a surface to sit ON,
        // which is what makes it read as an object rather than a hole.
        '.panel{position:relative;width:' + W + 'px;height:' + H + 'px;overflow:hidden;',
        '  background:linear-gradient(180deg,#141418 0%,#0A0A0C 38%,#000 78%);',
        '  display:flex;flex-direction:column;align-items:center;}',
        '.glow{position:absolute;left:50%;top:' + px(1020) + ';width:' + px(1720) + ';height:' + px(1720) + ';',
        '  transform:translate(-50%,-50%);border-radius:50%;',
        '  background:radial-gradient(circle,' + panel.accent + '33 0%,' + panel.accent + '14 34%,transparent 64%);',
        '  filter:blur(' + px(60) + ');}',
        '.copy{position:relative;z-index:2;width:100%;padding:' + px(112) + ' ' + px(76) + ' 0;text-align:center;}',
        '.eyebrow{font-family:"Lexend";font-weight:400;font-size:' + px(23) + ';letter-spacing:' + px(5.5) + ';',
        '  text-transform:uppercase;color:' + panel.accent + ';opacity:.9;}',
        '.title{font-family:"Lexend";font-weight:700;font-size:' + px(76) + ';line-height:1.08;',
        '  letter-spacing:' + px(-1.8) + ';color:#fff;margin-top:' + px(28) + ';}',
        '.support{font-family:"Lexend";font-weight:400;font-size:' + px(27) + ';line-height:1.5;',
        '  color:rgba(255,255,255,.52);margin-top:' + px(24) + ';max-width:' + px(900) + ';',
        '  margin-left:auto;margin-right:auto;}',
        // The device runs off the bottom edge: the screen is the subject, so it
        // shows large rather than a whole phone being shrunk into frame.
        '.device{position:relative;z-index:2;margin-top:' + px(70) + ';width:' + px(DEVICE_W) + ';',
        '  border-radius:' + px(58) + ' ' + px(58) + ' 0 0;background:#000;',
        '  padding:' + px(10) + ' ' + px(10) + ' 0;',
        '  box-shadow:0 0 ' + px(140) + ' ' + panel.accent + '2E, 0 ' + px(24) + ' ' + px(80) + ' rgba(0,0,0,.95);}',
        // Bezel as an overlay so its top edge can catch a brighter highlight,
        // the way the app's own glass cards do.
        '.device:before{content:"";position:absolute;inset:0;border-radius:' + px(58) + ' ' + px(58) + ' 0 0;',
        '  border:1px solid rgba(255,255,255,.16);border-bottom:none;',
        '  background:linear-gradient(180deg,rgba(255,255,255,.10),transparent 12%);',
        '  pointer-events:none;z-index:4;}',
        '.screen{position:relative;border-radius:' + px(49) + ' ' + px(49) + ' 0 0;overflow:hidden;background:#000;}',
        // The web build renders no status bar. Without one the capture reads as
        // a cropped rectangle rather than a phone, so it is drawn here.
        '.status{position:relative;z-index:3;height:' + px(52) + ';display:flex;align-items:center;',
        '  justify-content:space-between;padding:0 ' + px(40) + ';font-family:"Lexend";',
        '  font-weight:700;font-size:' + px(25) + ';color:#fff;}',
        '.island{position:absolute;left:50%;top:' + px(9) + ';transform:translateX(-50%);',
        '  width:' + px(122) + ';height:' + px(35) + ';border-radius:' + px(18) + ';background:#000;z-index:4;}',
        '.icons{display:flex;align-items:flex-end;gap:' + px(7) + ';}',
        '.bar{width:' + px(5) + ';background:#fff;border-radius:' + px(1.5) + ';}',
        '.batt{width:' + px(30) + ';height:' + px(15) + ';border:' + px(2) + ' solid rgba(255,255,255,.85);',
        '  border-radius:' + px(4) + ';padding:' + px(2) + ';margin-left:' + px(5) + ';}',
        '.batt i{display:block;width:78%;height:100%;background:#fff;border-radius:' + px(1.5) + ';}',
        '.screen img{display:block;width:100%;height:' + px(SCREEN_H) + ';object-fit:cover;object-position:top;}',
        '</style></head><body>',
        '<div class="panel">',
        '  <div class="glow"></div>',
        '  <div class="copy">',
        '    <div class="eyebrow">' + panel.eyebrow + '</div>',
        '    <div class="title">' + panel.title + '</div>',
        '    <div class="support">' + panel.support + '</div>',
        '  </div>',
        '  <div class="device">',
        '    <div class="screen">',
        '      <div class="island"></div>',
        '      <div class="status">',
        '        <span>9:41</span>',
        '        <span class="icons">',
        '          <i class="bar" style="height:' + px(8) + '"></i>',
        '          <i class="bar" style="height:' + px(11) + '"></i>',
        '          <i class="bar" style="height:' + px(14) + '"></i>',
        '          <i class="bar" style="height:' + px(17) + '"></i>',
        '          <span class="batt"><i></i></span>',
        '        </span>',
        '      </div>',
        '      <img src="data:image/png;base64,' + shotB64 + '">',
        '    </div>',
        '  </div>',
        '</div></body></html>',
    ].join('\n');
}

const browser = await chromium.launch();

for (const t of TARGETS) {
    const outDir = path.join(MOBILE, 'store-listing', t.key);
    fs.mkdirSync(outDir, { recursive: true });

    const page = await browser.newPage({
        viewport: { width: t.w, height: t.h },
        deviceScaleFactor: 1,
    });

    for (const panel of PANELS) {
        const src = path.join(SHOTS, panel.file);
        if (!fs.existsSync(src)) {
            console.log('  skip ' + panel.file + ' — no capture in store-screenshots/device/');
            continue;
        }
        await page.setContent(html(panel, b64(src), t.w, t.h), { waitUntil: 'load' });
        await page.evaluate(() => document.fonts.ready);
        await page.screenshot({ path: path.join(outDir, panel.file) });
    }

    console.log(t.key + ': ' + t.w + 'x' + t.h + ' -> ' + outDir);
    await page.close();
}

await browser.close();
