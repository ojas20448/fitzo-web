/**
 * Render Media/brief/index.html -> Media/Fitzo-Product-Brief.pdf
 *
 * Playwright is a devDependency of this project, not of the app repo, so the
 * renderer lives here and reaches across. Overflow is checked explicitly: the
 * pages set `overflow:hidden` to guarantee exact A4, which means content that
 * does not fit is CLIPPED rather than erroring — silently losing a paragraph.
 */
import { chromium } from 'playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const REPO = path.resolve('../../Fitzo');
const HTML = path.join(REPO, 'Media/brief/index.html');
const PDF  = path.join(REPO, 'Media/Fitzo-Product-Brief.pdf');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });

const problems = [];
page.on('console', m => { if (m.type() === 'error') problems.push(`console: ${m.text()}`); });
page.on('requestfailed', r => problems.push(`asset failed: ${r.url().split('/').pop()}`));

await page.goto(pathToFileURL(HTML).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

const report = await page.evaluate(() => {
    const pages = [...document.querySelectorAll('.page')];
    return {
        count: pages.length,
        overflowing: pages
            .map((p, i) => ({ page: i + 1, by: p.scrollHeight - p.clientHeight }))
            .filter(x => x.by > 2),
        brokenImages: [...document.images]
            .filter(i => !(i.complete && i.naturalWidth > 0))
            .map(i => i.getAttribute('src')),
        fontsOk: document.fonts.check('900 38pt Archivo') && document.fonts.check('400 10pt "Martian Mono"'),
    };
});

if (!report.fontsOk) problems.push('webfonts did not load (needs network)');
if (report.brokenImages.length) problems.push(`broken images: ${report.brokenImages.join(', ')}`);
if (report.overflowing.length) {
    problems.push(`content clipped on page(s): ${report.overflowing.map(x => `${x.page} (+${x.by}px)`).join(', ')}`);
}

await page.pdf({ path: PDF, printBackground: true, width: '210mm', height: '297mm' });
await browser.close();

console.log(`${report.count} pages -> ${PDF}`);
if (problems.length) {
    console.error('\nPROBLEMS:\n  ' + problems.join('\n  '));
    process.exit(1);
}
console.log('no overflow, no broken assets, fonts loaded');
