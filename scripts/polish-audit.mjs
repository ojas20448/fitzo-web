/**
 * Polish evidence pass: the things a screenshot cannot show.
 * Keyboard path, focus visibility, scrollable-region reachability,
 * interactive states, layout shift, and console health.
 */
import { chromium } from "playwright";

const BASE = process.env.BASE || "http://localhost:3002";
const browser = await chromium.launch();

/* ─────────── 1. Keyboard path + focus visibility ─────────── */
{
  const p = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto(BASE, { waitUntil: "networkidle" });
  await p.waitForTimeout(1200);

  const stops = [];
  for (let i = 0; i < 40; i++) {
    await p.keyboard.press("Tab");
    const info = await p.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const label =
        el.getAttribute("aria-label") ||
        (el.textContent || "").trim().slice(0, 34) ||
        el.getAttribute("placeholder") ||
        el.tagName;
      // is a focus ring actually painted?
      const ring =
        (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0) ||
        cs.boxShadow.includes("rgb");
      return {
        tag: el.tagName,
        label,
        ring,
        inView: r.top >= -2 && r.bottom <= innerHeight + 2 && r.width > 0,
        w: Math.round(r.width),
        h: Math.round(r.height),
      };
    });
    if (!info) break;
    stops.push(info);
  }
  const noRing = stops.filter((s) => !s.ring);
  console.log(`\n── KEYBOARD PATH ── ${stops.length} stops reached`);
  console.log(`   focus ring missing on ${noRing.length}:`);
  noRing.slice(0, 10).forEach((s) => console.log(`     ${s.tag} "${s.label}"`));
  const offscreen = stops.filter((s) => !s.inView);
  console.log(`   focused while out of view: ${offscreen.length}`);
  offscreen.slice(0, 6).forEach((s) => console.log(`     ${s.tag} "${s.label}"`));
  await p.close();
}

/* ─────────── 2. Scrollable regions reachable by keyboard ─────────── */
{
  const p = await (await browser.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  await p.goto(BASE, { waitUntil: "networkidle" });
  await p.waitForTimeout(1000);
  const regions = await p.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll("*")) {
      const cs = getComputedStyle(el);
      const scrollsX = /auto|scroll/.test(cs.overflowX) && el.scrollWidth > el.clientWidth + 4;
      const scrollsY = /auto|scroll/.test(cs.overflowY) && el.scrollHeight > el.clientHeight + 4;
      if (!scrollsX && !scrollsY) continue;
      const focusable = el.tabIndex >= 0;
      const hasFocusableChild = !!el.querySelector(
        "a[href],button,input,select,textarea,[tabindex]:not([tabindex='-1'])"
      );
      out.push({
        cls: (el.className || "").toString().slice(0, 46),
        axis: scrollsX ? "x" : "y",
        focusable,
        hasFocusableChild,
        role: el.getAttribute("role"),
        label: el.getAttribute("aria-label"),
      });
    }
    return out;
  });
  console.log(`\n── SCROLLABLE REGIONS (mobile) ── ${regions.length}`);
  regions.forEach((r) => {
    const reachable = r.focusable || r.hasFocusableChild;
    console.log(
      `   [${r.axis}] ${reachable ? "OK  " : "TRAP"} tabIndex=${r.focusable} child=${r.hasFocusableChild}  .${r.cls}`
    );
  });
  await p.close();
}

/* ─────────── 3. Interactive states actually change something ─────────── */
{
  const p = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto(BASE, { waitUntil: "networkidle" });
  await p.waitForTimeout(1000);

  const snapshot = (sel) =>
    p.evaluate((s) => {
      const el = document.querySelector(s);
      if (!el) return null;
      const cs = getComputedStyle(el);
      return `${cs.backgroundColor}|${cs.color}|${cs.borderColor}|${cs.transform}|${cs.boxShadow.slice(0, 30)}`;
    }, sel);

  const targets = [
    ['a[href="#download"]', "hero primary CTA"],
    ['a[href="#demo"]', "hero secondary CTA"],
    ["#features article", "feature cell"],
    ["#faq button", "FAQ trigger"],
  ];
  console.log("\n── HOVER STATE CHANGES ──");
  for (const [sel, name] of targets) {
    const before = await snapshot(sel);
    if (!before) {
      console.log(`   ${name}: NOT FOUND (${sel})`);
      continue;
    }
    await p.hover(sel).catch(() => {});
    await p.waitForTimeout(450);
    const after = await snapshot(sel);
    console.log(`   ${name}: ${before !== after ? "changes" : "NO CHANGE on hover"}`);
    await p.mouse.move(0, 0);
    await p.waitForTimeout(250);
  }
  await p.close();
}

/* ─────────── 4. Layout shift + console health ─────────── */
{
  const p = await (await browser.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  const msgs = [];
  p.on("console", (m) => /error|warning/i.test(m.type()) && msgs.push(`[${m.type()}] ${m.text().slice(0, 110)}`));
  p.on("pageerror", (e) => msgs.push("PAGEERROR " + e.message.slice(0, 110)));

  await p.addInitScript(() => {
    window.__cls = 0;
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
    }).observe({ type: "layout-shift", buffered: true });
  });
  await p.goto(BASE, { waitUntil: "networkidle" });
  await p.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
  });
  await p.waitForTimeout(1500);
  const cls = await p.evaluate(() => window.__cls);
  console.log(`\n── CUMULATIVE LAYOUT SHIFT ── ${cls.toFixed(4)} ${cls > 0.1 ? "(POOR, >0.1)" : cls > 0.02 ? "(ok)" : "(good)"}`);
  console.log(`── CONSOLE ── ${msgs.length} issue(s)`);
  [...new Set(msgs)].slice(0, 8).forEach((m) => console.log("   " + m));
  await p.close();
}

await browser.close();
