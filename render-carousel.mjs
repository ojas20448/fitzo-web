/**
 * Render an Instagram carousel to 1080x1350 PNGs.
 *
 *   node render-carousel.mjs hidden-oil
 *
 * Reads  ../../Fitzo/Media/carousels/<name>/index.html
 * Writes ../../Fitzo/Media/carousels/<name>/out/slide-NN.png
 *
 * Playwright is a devDependency of the website project, not the app repo, so the
 * renderer lives here and reaches across — same arrangement as render-brief.mjs.
 *
 * Slides are a FIXED canvas: anything taller than 1350px is silently cropped by
 * Instagram-sized output rather than erroring, so overflow is checked explicitly
 * and the script exits non-zero. A clipped slide is the one failure mode you
 * cannot see until it is already posted.
 */
import { chromium } from 'playwright';
import { pathToFileURL } from 'url';
import fs from 'fs';
import path from 'path';

const name = process.argv[2];
if (!name) {
    console.error('usage: node render-carousel.mjs <carousel-name>');
    process.exit(1);
}

const DIR = path.resolve('../../Fitzo/Media/carousels', name);
const HTML = path.join(DIR, 'index.html');
const OUT = path.join(DIR, 'out');

if (!fs.existsSync(HTML)) {
    console.error(`no such carousel: ${HTML}`);
    process.exit(1);
}
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });

const problems = [];
page.on('console', m => { if (m.type() === 'error') problems.push(`console: ${m.text()}`); });
page.on('requestfailed', r => problems.push(`asset failed: ${r.url().split('/').pop()}`));

await page.goto(pathToFileURL(HTML).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

const report = await page.evaluate(() => {
    const slides = [...document.querySelectorAll('.slide')];
    return {
        count: slides.length,
        fontOk: document.fonts.check('800 92px Lexend'),
        overflowing: slides
            .map((s, i) => ({ slide: i + 1, by: Math.round(s.scrollHeight - s.clientHeight) }))
            .filter(x => x.by > 1),
    };
});

if (!report.fontOk) problems.push('Lexend did not load (needs network)');
if (report.overflowing.length) {
    problems.push('content clipped on slide(s): '
        + report.overflowing.map(x => `${x.slide} (+${x.by}px)`).join(', '));
}

const slides = await page.$$('.slide');
for (let i = 0; i < slides.length; i++) {
    const n = String(i + 1).padStart(2, '0');
    await slides[i].screenshot({ path: path.join(OUT, `slide-${n}.png`) });
}

await browser.close();

console.log(`${report.count} slides -> ${OUT}`);
if (problems.length) {
    console.error('\nPROBLEMS:\n  ' + problems.join('\n  '));
    process.exit(1);
}
console.log('1080x1350, no overflow, fonts loaded');
