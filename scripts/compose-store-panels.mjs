/**
 * Compose app-store marketing panels from raw Fitzo app captures.
 *
 * Raw screenshots alone read as cramped — the store renders them small, the UI
 * gets no breathing room, and nothing tells a browsing user what they are
 * looking at. Competitors ship marketing panels instead: brand background, one
 * bold headline, device-framed screen.
 *
 * ── The design problem specific to Fitzo ────────────────────────────────────
 * MyFitnessPal fills its panels with brand blue. Fitzo's brand IS black, and
 * the app screenshots are black too — copying that formula gives eight flat
 * rectangles with the phone invisible against the background.
 *
 * Separation instead comes from the app's own glass language: a hairline
 * luminous bezel plus one soft accent glow behind the device. The accents are
 * the macro-ring colours the app already uses (teal protein, yellow carbs,
 * coral fat, green success), so they are derived from the product rather than
 * chosen decoratively — and they make the eight panels read as one set.
 *
 * The device deliberately BLEEDS off the bottom edge rather than sitting in a
 * floating box. That shows the screen large instead of shrinking a whole phone
 * into the panel, which is what made the raw captures feel cluttered.
 *
 * Rendered through Playwright rather than composited with sharp, because the
 * panels need real Lexend — the app's own typeface — and sharp's SVG renderer
 * will not load a local font file reliably.
 *
 *   node scripts/compose-store-panels.mjs
 *
 * Input : mobile/store-screenshots/{google-play,app-store}/NN-name.png
 * Output: mobile/store-listing/{google-play,app-store}/NN-name.png
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const MOBILE = 'C:/Users/PC/Documents/Code/Fitzo/mobile';
const FONTS = path.join(MOBILE, 'assets', 'fonts');

// Play caps screenshots at a 2:1 aspect ratio; Apple's 6.9" slot is 2.173:1.
// One set cannot satisfy both, so each is composed at its own native size.
const TARGETS = [
    { key: 'google-play', w: 1080, h: 2160 },
    { key: 'app-store', w: 1320, h: 2868 },
];

// Copy is plain and active — what the feature does, not how it is sold.
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
    // Everything scales from a 1080-wide design so both targets stay identical
    // in proportion rather than needing two hand-tuned layouts.
    const u = W / 1080;
    const px = (n) => (n * u).toFixed(2) + 'px';

    return [
        '<!doctype html><html><head><meta charset="utf-8"><style>',
        '@font-face{font-family:"Lexend";font-weight:700;src:url(data:font/ttf;base64,' + FONT_BOLD + ') format("truetype");}',
        '@font-face{font-family:"Lexend";font-weight:400;src:url(data:font/ttf;base64,' + FONT_REG + ') format("truetype");}',
        '*{margin:0;padding:0;box-sizing:border-box;}',
        'html,body{width:' + W + 'px;height:' + H + 'px;background:#000;overflow:hidden;}',
        // A pure-black panel behind a pure-black screenshot reads as one flat
        // murky field. Lifting the top of the panel a few points gives the
        // device a surface to sit ON, which is what makes it read as an object
        // rather than a hole. Still unmistakably the same near-black family.
        '.panel{position:relative;width:' + W + 'px;height:' + H + 'px;overflow:hidden;',
        '  background:linear-gradient(180deg,#141418 0%,#0A0A0C 38%,#000 78%);',
        '  display:flex;flex-direction:column;align-items:center;}',
        // Accent glow, strong enough to actually register behind the device.
        '.glow{position:absolute;left:50%;top:' + px(1020) + ';width:' + px(1720) + ';height:' + px(1720) + ';',
        '  transform:translate(-50%,-50%);border-radius:50%;',
        '  background:radial-gradient(circle,' + panel.accent + '33 0%,' + panel.accent + '14 34%,transparent 64%);',
        '  filter:blur(' + px(60) + ');}',
        '.copy{position:relative;z-index:2;width:100%;padding:' + px(118) + ' ' + px(76) + ' 0;text-align:center;}',
        '.eyebrow{font-family:"Lexend";font-weight:400;font-size:' + px(23) + ';letter-spacing:' + px(5.5) + ';',
        '  text-transform:uppercase;color:' + panel.accent + ';opacity:.9;}',
        '.title{font-family:"Lexend";font-weight:700;font-size:' + px(76) + ';line-height:1.08;',
        '  letter-spacing:' + px(-1.8) + ';color:#fff;margin-top:' + px(28) + ';}',
        '.support{font-family:"Lexend";font-weight:400;font-size:' + px(27) + ';line-height:1.5;',
        '  color:rgba(255,255,255,.52);margin-top:' + px(24) + ';max-width:' + px(900) + ';',
        '  margin-left:auto;margin-right:auto;}',
        // Wider than the space left below the copy, so the device runs off the
        // bottom edge. The screen is the subject — showing it large beats
        // shrinking a whole phone into frame, which is what felt cramped.
        '.device{position:relative;z-index:2;margin-top:' + px(76) + ';width:' + px(880) + ';',
        '  border-radius:' + px(56) + ' ' + px(56) + ' 0 0;background:#000;',
        '  padding:' + px(10) + ' ' + px(10) + ' 0;',
        '  box-shadow:0 0 ' + px(140) + ' ' + panel.accent + '2E, 0 ' + px(24) + ' ' + px(80) + ' rgba(0,0,0,.95);}',
        // Hairline bezel drawn as an overlay so the top edge can catch a
        // brighter highlight, the way the app's glass cards do.
        '.device:before{content:"";position:absolute;inset:0;border-radius:' + px(56) + ' ' + px(56) + ' 0 0;',
        '  border:1px solid rgba(255,255,255,.14);border-bottom:none;',
        '  background:linear-gradient(180deg,rgba(255,255,255,.10),transparent 14%);',
        '  pointer-events:none;z-index:3;}',
        '.device img{display:block;width:100%;border-radius:' + px(48) + ' ' + px(48) + ' 0 0;}',
        '</style></head><body>',
        '<div class="panel">',
        '  <div class="glow"></div>',
        '  <div class="copy">',
        '    <div class="eyebrow">' + panel.eyebrow + '</div>',
        '    <div class="title">' + panel.title + '</div>',
        '    <div class="support">' + panel.support + '</div>',
        '  </div>',
        '  <div class="device"><img src="data:image/png;base64,' + shotB64 + '"></div>',
        '</div></body></html>',
    ].join('\n');
}

const browser = await chromium.launch();

for (const t of TARGETS) {
    const inDir = path.join(MOBILE, 'store-screenshots', t.key);
    const outDir = path.join(MOBILE, 'store-listing', t.key);
    fs.mkdirSync(outDir, { recursive: true });

    const page = await browser.newPage({
        viewport: { width: t.w, height: t.h },
        deviceScaleFactor: 1,
    });

    for (const panel of PANELS) {
        const src = path.join(inDir, panel.file);
        if (!fs.existsSync(src)) {
            console.log('  skip ' + t.key + '/' + panel.file + ' — no raw capture');
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
