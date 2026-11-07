import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const base = process.env.BASE || "http://127.0.0.1:3002";
const out = "output/chrome-review";
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("pageerror", error => errors.push(error.message));
try {
  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const declineAnalytics = page.getByRole("button", { name: "No thanks", exact: true });
  if (await declineAnalytics.count()) await declineAnalytics.click();
  assert.match(await page.locator("body").evaluate(el => getComputedStyle(el).fontFamily), /Archivo/);
  assert.ok(await page.locator(".preview-content").evaluate(el => el.scrollHeight <= el.clientHeight + 1), "Default workout preview must fit");
  await page.screenshot({ path: out + "/desktop.png" });
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(await page.getByRole("tab").count(), 5);

  const rows = page.locator(".exercise-row");
  await page.getByRole("button", { name: "Move Seated cable row up", exact: true }).click();
  assert.match(await rows.first().innerText(), /Seated cable row/);
  assert.match(await rows.first().innerText(), /45 kg/);
  await page.getByRole("button", { name: /Resume workout/ }).click();
  await page.getByRole("button", { name: "Complete set", exact: true }).click();
  assert.match(await page.locator(".resume-card").innerText(), /7\/12 sets/);

  await page.getByRole("tab", { name: "Food", exact: true }).click();
  await page.getByRole("button", { name: "Try adding paneer bhurji" }).click();
  assert.match(await page.locator(".nutrition-summary").innerText(), /1,960/);
  await page.getByRole("button", { name: "Meal added · undo" }).click();
  assert.match(await page.locator(".nutrition-summary").innerText(), /1,640/);

  await page.getByRole("tab", { name: "Gym", exact: true }).click();
  await page.getByRole("button", { name: "Explore equipment", exact: true }).click();
  assert.equal(await page.locator("#demo-gym-equipment").isVisible(), true);
  await page.getByRole("button", { name: "Hide equipment", exact: true }).click();
  assert.equal(await page.locator("#demo-gym-equipment").isVisible(), false);

  await page.getByRole("tab", { name: "Friends", exact: true }).click();
  await page.getByRole("button", { name: "Try sending kudos" }).click();
  assert.equal(await page.getByRole("button", { name: "Kudos sent · undo" }).getAttribute("aria-pressed"), "true");

  await page.getByRole("tab", { name: "Workout", exact: true }).click();
  assert.match(await page.locator(".resume-card").innerText(), /7\/12 sets/);
  await page.getByRole("button", { name: "Set complete · undo" }).click();
  await page.getByRole("button", { name: /Workout in progress/ }).click();
  assert.match(await rows.first().innerText(), /Seated cable row/);
  await page.getByRole("tab", { name: "Workout", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  assert.equal(await page.getByRole("tab", { name: "Food", exact: true }).getAttribute("aria-selected"), "true");
  await page.keyboard.press("End");
  assert.equal(await page.getByRole("tab", { name: "Profile", exact: true }).getAttribute("aria-selected"), "true");
  await page.keyboard.press("Home");
  assert.equal(await page.getByRole("tab", { name: "Workout", exact: true }).getAttribute("aria-selected"), "true");

  const faqSchema = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes => nodes.map(n=>JSON.parse(n.textContent)).find(n=>n["@type"] === "FAQPage"));
  for (const entry of faqSchema.mainEntity) {
    const detail = page.locator("#faq details").filter({ has: page.locator("summary", { hasText: entry.name }) });
    if (!await detail.evaluate(el => el.open)) await detail.locator("summary").click();
    assert.equal((await detail.locator("p").innerText()).trim(), entry.acceptedAnswer.text);
  }

  for (const width of [320, 390, 768, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(250);
    const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, viewport: document.documentElement.clientWidth }));
    assert.ok(dimensions.scroll <= dimensions.viewport, "Horizontal overflow at " + width);
    if (width === 390) {
      await page.screenshot({ path: out + "/mobile.png" });
      await page.getByRole("button", { name: "Open menu", exact: true }).click();
      await page.getByRole("navigation", { name: "Mobile", exact: true }).waitFor();
      await page.keyboard.press("Escape");
      assert.equal(await page.getByRole("button", { name: "Open menu", exact: true }).evaluate(el => el === document.activeElement), true);
      await page.getByRole("button", { name: "Open menu", exact: true }).click();
      await page.getByRole("navigation", { name: "Mobile", exact: true }).getByRole("link", { name: "The app", exact: true }).click();
      assert.equal(await page.getByRole("navigation", { name: "Mobile", exact: true }).count(), 0);
      await page.locator("#features").screenshot({ path: out + "/features-mobile.png" });
    }
  }

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.locator("#features").screenshot({ path: out + "/features-desktop.png" });
  await page.locator("#download").screenshot({ path: out + "/download-desktop.png" });
  const ids = await page.locator("[id]").evaluateAll(nodes => nodes.map(n=>n.id));
  assert.equal(ids.length, new Set(ids).size, "Duplicate IDs");
  for (const href of await page.locator('a[href^="#"]').evaluateAll(nodes=>nodes.map(n=>n.getAttribute("href")).filter(h=>h.length>1))) {
    assert.ok(ids.includes(href.slice(1)), "Missing anchor " + href);
  }

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(base, { waitUntil: "networkidle" });
  assert.equal(await page.locator(".hero-copy").evaluate(el=>getComputedStyle(el).opacity), "1");
  await page.screenshot({ path: out + "/reduced-motion.png" });
  assert.deepEqual(errors, [], "Browser runtime errors");
  console.log("PASS: preview state, reorder, undo, all five tabs, keyboard navigation, FAQ/schema parity, mobile menu, anchors, reduced motion, and 5 viewport widths.");
  console.log("Screenshots: " + out);
} finally {
  await browser.close();
}
