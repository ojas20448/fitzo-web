/**
 * 1-bit Floyd–Steinberg ditherer.
 *
 *   node dither.mjs <in.jpg> <out.png> [width] [contrast] [brightness]
 *
 * Matches the look of the app's bundled *_dither.png assets: pure black and
 * white, no greys, subject reading as white pixels on a black ground.
 *
 * Runs the conversion on a browser canvas rather than pulling in sharp/jimp —
 * Playwright is already a dependency here, and this keeps the asset pipeline to
 * one toolchain.
 *
 * The output is deliberately small (default 820px). These are displayed at
 * ~1080px with image-rendering:pixelated, so the dots stay chunky and read as
 * 1-bit artwork instead of dissolving into grey noise at a glance.
 */
import { chromium } from 'playwright';
import { pathToFileURL } from 'url';
import fs from 'fs';
import path from 'path';

const [, , inFile, outFile, wArg, cArg, bArg] = process.argv;
if (!inFile || !outFile) {
    console.error('usage: node dither.mjs <in> <out.png> [width] [contrast] [brightness]');
    process.exit(1);
}
const W = parseInt(wArg || '820', 10);
const CONTRAST = parseFloat(cArg || '1.45');
const BRIGHT = parseFloat(bArg || '-8');

const browser = await chromium.launch();
const page = await browser.newPage();

const dataUrl = 'data:image/jpeg;base64,' + fs.readFileSync(path.resolve(inFile)).toString('base64');

const pngB64 = await page.evaluate(async ({ dataUrl, W, CONTRAST, BRIGHT }) => {
    const img = new Image();
    img.src = dataUrl;
    await img.decode();

    const H = Math.round((img.naturalHeight / img.naturalWidth) * W);
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, W, H);

    const im = ctx.getImageData(0, 0, W, H);
    const d = im.data;

    // Luminance, then contrast about mid-grey. Float buffer so the diffused
    // error stays sub-integer; quantising per pixel would lose the gradient.
    const g = new Float32Array(W * H);
    for (let i = 0, p = 0; i < d.length; i += 4, p++) {
        let v = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
        v = (v - 128) * CONTRAST + 128 + BRIGHT;
        g[p] = v;
    }

    // Floyd–Steinberg: push the quantisation error right and down.
    for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
            const p = y * W + x;
            const old = g[p];
            const nw = old < 128 ? 0 : 255;
            g[p] = nw;
            const err = old - nw;
            if (x + 1 < W)              g[p + 1]         += err * 7 / 16;
            if (x > 0 && y + 1 < H)     g[p + W - 1]     += err * 3 / 16;
            if (y + 1 < H)              g[p + W]         += err * 5 / 16;
            if (x + 1 < W && y + 1 < H) g[p + W + 1]     += err * 1 / 16;
        }
    }

    for (let i = 0, p = 0; i < d.length; i += 4, p++) {
        const v = g[p];
        d[i] = d[i + 1] = d[i + 2] = v;
        d[i + 3] = 255;
    }
    ctx.putImageData(im, 0, 0);
    return c.toDataURL('image/png').split(',')[1];
}, { dataUrl, W, CONTRAST, BRIGHT });

fs.writeFileSync(path.resolve(outFile), Buffer.from(pngB64, 'base64'));
await browser.close();

const kb = Math.round(fs.statSync(path.resolve(outFile)).size / 1024);
console.log(`dithered -> ${outFile}  (${W}px wide, contrast ${CONTRAST}, brightness ${BRIGHT}, ${kb}KB)`);
