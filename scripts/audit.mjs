import { chromium } from "playwright";

const BASE = process.env.BASE || "http://localhost:3002";
const ROUTES = (process.env.ROUTES || "/").split(",");

const srgb = (c) => {
  c /= 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};
const lum = ([r, g, b]) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};
const parse = (s) => {
  const m = s && s.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const p = m[1].split(",").map((n) => parseFloat(n));
  return { rgb: [p[0], p[1], p[2]], a: p[3] === undefined ? 1 : p[3] };
};

const browser = await chromium.launch();

for (const route of ROUTES) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + route, { waitUntil: "networkidle" });
  // settle every whileInView reveal so nothing is measured mid-animation
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 300) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(2000);

  const out = await page.evaluate(() => {
      const srgb = (c) => { c /= 255; return c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); };
      const lum = ([r,g,b]) => 0.2126*srgb(r) + 0.7152*srgb(g) + 0.0722*srgb(b);
      const ratio = (a,b) => { const [l1,l2] = [lum(a),lum(b)].sort((x,y)=>y-x); return (l1+0.05)/(l2+0.05); };
      const parse = (str) => {
        const m = str && str.match(/rgba?\(([^)]+)\)/);
        if (!m) return null;
        const q = m[1].split(",").map((n)=>parseFloat(n));
        return { rgb:[q[0],q[1],q[2]], a: q[3]===undefined ? 1 : q[3] };
      };

      const bgOf = (el) => {
        let n = el;
        while (n && n !== document.documentElement) {
          const c = parse(getComputedStyle(n).backgroundColor);
          if (c && c.a > 0.85) return c.rgb;
          n = n.parentElement;
        }
        return [0, 0, 0];
      };

      const res = { contrast: [], targets: [], anchors: [], alt: [], headings: [] };

      // ── contrast ──
      for (const el of document.querySelectorAll("p,span,a,li,h1,h2,h3,h4,dt,dd,label,button,figcaption,blockquote,time,td,th")) {
        if (!el.textContent.trim()) continue;
        if (el.children.length && el.textContent.trim() !== [...el.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join("").trim()) continue;
        const cs = getComputedStyle(el);
        if (cs.visibility === "hidden" || cs.display === "none" || +cs.opacity < 0.15) continue;
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        const fg = parse(cs.color);
        if (!fg || fg.a < 0.5) continue;
        const size = parseFloat(cs.fontSize);
        const bold = +cs.fontWeight >= 700;
        const large = size >= 24 || (size >= 18.66 && bold);
        const cr = ratio(fg.rgb, bgOf(el));
        const floor = large ? 3 : 4.5;
        if (cr < floor) {
          res.contrast.push({
            text: el.textContent.trim().slice(0, 48),
            color: cs.color,
            size: +size.toFixed(1),
            ratio: +cr.toFixed(2),
            floor,
            cls: (el.className || "").toString().slice(0, 70),
          });
        }
      }

      // ── touch targets ──
      for (const el of document.querySelectorAll("a,button,[role=button],input,select")) {
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden") continue;
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        if (r.width < 44 || r.height < 44) {
          res.targets.push({
            tag: el.tagName,
            label: (el.getAttribute("aria-label") || el.textContent.trim()).slice(0, 40),
            w: Math.round(r.width),
            h: Math.round(r.height),
          });
        }
      }

      // ── in-page anchors that point nowhere ──
      for (const a of document.querySelectorAll('a[href*="#"]')) {
        const href = a.getAttribute("href");
        const hash = href.slice(href.indexOf("#") + 1);
        if (!hash) { res.anchors.push({ href, why: "bare #" }); continue; }
        const path = href.split("#")[0];
        if (path && path !== location.pathname) continue;
        if (!document.getElementById(hash)) res.anchors.push({ href, why: "no matching id" });
      }

      // ── images ──
      for (const img of document.querySelectorAll("img")) {
        if (img.getAttribute("alt") === null) res.alt.push(img.getAttribute("src"));
      }

      // ── heading order ──
      let prev = 0;
      for (const h of document.querySelectorAll("h1,h2,h3,h4,h5,h6")) {
        const lvl = +h.tagName[1];
        if (prev && lvl > prev + 1)
          res.headings.push({ from: `h${prev}`, to: `h${lvl}`, text: h.textContent.trim().slice(0, 40) });
        prev = lvl;
      }
      res.h1count = document.querySelectorAll("h1").length;

      return res;
  });

  // horizontal overflow at mobile
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(700);
  const overflow = await page.evaluate(() => {
    const bad = [];
    const vw = document.documentElement.clientWidth;
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0) continue;
      if (r.right > vw + 1.5 || r.left < -1.5) {
        const cs = getComputedStyle(el);
        if (cs.position === "fixed" || cs.overflow === "hidden") continue;
        bad.push({
          tag: el.tagName,
          cls: (el.className || "").toString().slice(0, 60),
          left: Math.round(r.left),
          right: Math.round(r.right),
          vw,
        });
      }
    }
    return { scrollW: document.documentElement.scrollWidth, vw, bad: bad.slice(0, 8) };
  });

  console.log(`\n${"═".repeat(64)}\n ROUTE ${route}\n${"═".repeat(64)}`);
  console.log(`h1 count: ${out.h1count}`);
  console.log(`\n── CONTRAST FAILURES (${out.contrast.length}) ──`);
  out.contrast.slice(0, 14).forEach((c) =>
    console.log(`  ${c.ratio}:1 (need ${c.floor})  ${c.size}px  "${c.text}"  ${c.color}`)
  );
  console.log(`\n── TOUCH TARGETS < 44px (${out.targets.length}) ──`);
  out.targets.slice(0, 12).forEach((t) => console.log(`  ${t.w}×${t.h}  ${t.tag}  "${t.label}"`));
  console.log(`\n── BROKEN ANCHORS (${out.anchors.length}) ──`);
  out.anchors.forEach((a) => console.log(`  ${a.href}  — ${a.why}`));
  console.log(`\n── IMG WITHOUT alt (${out.alt.length}) ──`);
  out.alt.forEach((s) => console.log(`  ${s}`));
  console.log(`\n── HEADING SKIPS (${out.headings.length}) ──`);
  out.headings.forEach((h) => console.log(`  ${h.from} → ${h.to}  "${h.text}"`));
  console.log(
    `\n── MOBILE OVERFLOW ── scrollWidth ${overflow.scrollW} vs viewport ${overflow.vw} (${overflow.bad.length} offenders)`
  );
  overflow.bad.forEach((b) => console.log(`  ${b.tag}.${b.cls}  [${b.left} → ${b.right}]`));

  await ctx.close();
}

await browser.close();
