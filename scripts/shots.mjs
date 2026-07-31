import { chromium } from "playwright";
import fs from "fs";

const BASE = process.env.BASE || "http://localhost:3002";
const OUT = "output/shots";
fs.mkdirSync(OUT, { recursive: true });

const targets = (process.env.TARGETS || "home-dark,home-light,home-mobile").split(",");

const run = async () => {
  const browser = await chromium.launch();

  const shot = async (name, { width, height, theme, path: route = "/", full = false, scrollTo = null }) => {
    const ctx = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    await page.addInitScript((t) => {
      try { localStorage.setItem("theme", t); } catch (e) {}
    }, theme);
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    if (full) {
      // trigger all whileInView animations
      await page.evaluate(async () => {
        const h = document.body.scrollHeight;
        for (let y = 0; y < h; y += 400) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(1500);
    }
    if (scrollTo) {
      await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (el) el.scrollIntoView({ block: "start" });
      }, scrollTo);
      await page.waitForTimeout(1400);
    }
    await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: full });
    console.log("shot:", name);
    await ctx.close();
  };

  for (const t of targets) {
    const [key, ...rest] = t.split(":");
    switch (key) {
      case "home-dark":
        await shot("home-dark", { width: 1440, height: 900, theme: "dark" });
        break;
      case "home-light":
        await shot("home-light", { width: 1440, height: 900, theme: "light" });
        break;
      case "home-mobile":
        await shot("home-mobile", { width: 390, height: 844, theme: "dark" });
        break;
      case "full-dark":
        await shot("full-dark", { width: 1440, height: 900, theme: "dark", full: true });
        break;
      case "full-light":
        await shot("full-light", { width: 1440, height: 900, theme: "light", full: true });
        break;
      case "full-mobile":
        await shot("full-mobile", { width: 390, height: 844, theme: "dark", full: true });
        break;
      case "sec": {
        // sec:<selector>:<theme>:<name>[:width]
        const [sel, theme, name, width] = rest;
        await shot(name, {
          width: width ? Number(width) : 1440,
          height: 900,
          theme,
          scrollTo: sel,
        });
        break;
      }
      case "route": {
        // route:<path>:<theme>:<name>
        const [route, theme, name] = rest;
        await shot(name, { width: 1440, height: 900, theme, path: route, full: true });
        break;
      }
    }
  }

  await browser.close();
};

run();
