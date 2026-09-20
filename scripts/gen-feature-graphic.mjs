/**
 * Google Play feature graphic — 1024x500.
 *
 * The previous graphic failed the only test that matters: legibility. Play
 * renders this as small as ~380px wide, where four pills reading "Workout
 * Tracking / Macro Logging / AI Nutrition / Gym Buddies" and a 9px
 * "SCIENCE-BASED FITNESS TRACKING" line are illegible noise. A feature graphic
 * gets one job — say who you are, at a glance. So: the mark, the name, one
 * line, nothing else.
 *
 * Left-weighted rather than centred because Play overlays a play button dead
 * centre when the listing has a promo video; keeping the middle quiet means
 * the graphic survives that overlay instead of fighting it.
 *
 * Rendered through Playwright, not sharp, for the same reason compose-store-
 * panels.mjs is: sharp's SVG renderer will not load a local font file
 * reliably, and this needs real Lexend.
 *
 * The mark is trimmed from assets/icon.png rather than redrawn, so it carries
 * the true logo geometry — including the angled cut on the upper arm.
 *
 *   node scripts/gen-feature-graphic.mjs
 */
import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const MOBILE = 'C:/Users/PC/Documents/Code/Fitzo/mobile';
const FONTS = path.join(MOBILE, 'assets', 'fonts');
const OUT = path.join(MOBILE, 'feature-graphic.png');
const W = 1024, H = 500;

const b64 = p => fs.readFileSync(p).toString('base64');

// Trim the icon's black field down to the glyph itself so the lockup can be
// spaced optically rather than around the icon's built-in padding.
const markBuf = await sharp(path.join(MOBILE, 'assets', 'icon.png'))
    .trim({ threshold: 10 })
    .toBuffer();
const markMeta = await sharp(markBuf).metadata();
const MARK = markBuf.toString('base64');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face{font-family:"Lexend";font-weight:700;src:url(data:font/ttf;base64,${b64(path.join(FONTS,'Lexend-Bold.ttf'))}) format("truetype");}
  @font-face{font-family:"Lexend";font-weight:400;src:url(data:font/ttf;base64,${b64(path.join(FONTS,'Lexend-Regular.ttf'))}) format("truetype");}
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:${W}px;height:${H}px;overflow:hidden}
  body{
    background:#000;
    font-family:"Lexend",sans-serif;
    display:flex;flex-direction:column;justify-content:center;
    padding-left:88px;
    padding-top:18px;
    position:relative;
  }
  /* Soft lift so flat #000 does not read as a rendering fault on OLED. */
  .lift{
    position:absolute;inset:0;
    background:radial-gradient(58% 74% at 30% 44%,
      rgba(255,255,255,.11) 0%, rgba(255,255,255,.03) 52%, rgba(255,255,255,0) 100%);
  }
  .row{position:relative;display:flex;align-items:center;gap:38px}
  /* The icon ships as a white glyph on an opaque black field. screen
     drops that field against the dark background — black contributes
     nothing, white stays white — so the mark reads as a glyph rather
     than a pasted square sitting on top of the radial lift. */
  .mark{height:132px;width:auto;display:block;mix-blend-mode:screen}
  .name{font-weight:700;font-size:132px;line-height:1;letter-spacing:-5px;color:#fff}
  .tag{
    position:relative;
    margin-top:34px;
    font-weight:400;font-size:40px;line-height:1;
    color:rgba(255,255,255,.72);
  }
</style></head><body>
  <div class="lift"></div>
  <div class="row">
    <img class="mark" src="data:image/png;base64,${MARK}"/>
    <div class="name">Fitzo</div>
  </div>
  <div class="tag">Train smarter. Build faster.</div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: OUT });
await browser.close();

const m = await sharp(OUT).metadata();
console.log(`mark trimmed to ${markMeta.width}x${markMeta.height}`);
console.log(`${m.width}x${m.height}  ${(fs.statSync(OUT).size/1024).toFixed(0)} KB  -> ${OUT}`);
