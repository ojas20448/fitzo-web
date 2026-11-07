import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

// Run against a production build: node scripts/check-seo.mjs http://localhost:3012
const base = process.argv[2] || "http://localhost:3012";
const origin = "https://www.fitzoapp.in";
const decode = text => text.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, "> ").replace(/\s+/g, " ").trim();
const get = async path => {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 200, `${path} must return 200`);
  return response.text();
};
const sitemap = await get("/sitemap.xml");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert(urls.length >= 20, "Sitemap must include the guides and tools");
assert.equal(new Set(urls).size, urls.length, "Sitemap URLs must be unique");
assert(!urls.some(url => url.includes("/buddy")), "Invites must stay out of the sitemap");
const titles = new Set();
for (const url of urls) {
  assert(url.startsWith(origin), "Canonical origin must be consistent");
  const path = new URL(url).pathname;
  const html = await get(path);
  const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1] || "");
  assert(title && title !== "Fitzo", `${path}: descriptive title missing`);
  assert(!titles.has(title), `${path}: duplicate title ${title}`);
  titles.add(title);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.equal(canonical, url, `${path}: canonical must refer to this page`);
  assert(html.includes('property="og:image"'), `${path}: social image missing`);
  assert(html.includes('name="twitter:image"'), `${path}: Twitter image missing`);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${path}: exactly one H1 expected`);
  assert(!/<meta name="robots" content="[^"]*noindex/.test(html), `${path}: unexpectedly noindex`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
  assert(!schemas.some(schema => schema.potentialAction?.['@type'] === "SearchAction"), "Do not advertise nonexistent site search");
  if (path === "/") {
    const faq = schemas.find(schema => schema['@type'] === "FAQPage");
    assert(faq?.mainEntity.length >= 5, "Home FAQ schema missing");
    const visibleText = decode(html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " "));
    for (const item of faq.mainEntity) {
      assert(visibleText.includes(decode(item.name)), `FAQ question missing from HTML: ${item.name}`);
      assert(visibleText.includes(decode(item.acceptedAnswer.text)), `FAQ answer missing from HTML: ${item.name}`);
    }
    assert(!html.includes('src="https://www.googletagmanager.com'), "Google tag must wait for visitor consent");
  }
}
const robots = await get("/robots.txt");
assert(!robots.includes("Disallow: /_next/"), "Crawlers need access to rendering assets");
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
const llms = await get("/llms.txt");
assert(llms.startsWith("# Fitzo"));
assert(llms.includes(`${origin}/blog/`));
assert(llms.includes("## Common questions"));
const buddy = await get("/buddy");
assert(/<meta name="robots" content="[^"]*noindex/.test(buddy), "Invites must be noindex");
const missing = await fetch(`${base}/blog/this-article-does-not-exist`);
assert.equal(missing.status, 404, "Unknown article must return 404");

// Exercise the URL privacy boundary and event consent guard without a browser.
const compiled = ts.transpileModule(fs.readFileSync("lib/analytics.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const events = [];
const sandbox = { exports: {}, URL, process: { env: {} }, window: { gtag: (...args) => events.push(args) } };
vm.runInNewContext(compiled, sandbox);
const analytics = sandbox.exports;
assert.equal(analytics.analyticsUrl(`${origin}/buddy?u=private&id=secret#hidden`), `${origin}/buddy`);
assert.equal(analytics.analyticsUrl("javascript:alert(1)"), "");
assert.equal(analytics.analyticsUrl("invalid"), "");
analytics.trackAppStoreClick("ios");
assert.equal(events.length, 0, "No event without consent");
sandbox.window.fitzoAnalyticsEnabled = true;
analytics.trackAppStoreClick("android");
assert.equal(events[0][1], "app_store_click");
assert.equal(events[0][2].platform, "android");
sandbox.window.fitzoAnalyticsEnabled = false;
analytics.trackAppStoreClick("ios");
assert.equal(events.length, 1, "Revocation must stop events");
console.log(`PASS: ${urls.length} indexable pages; unique titles, canonical URLs, social images, headings, JSON-LD, FAQ HTML, sitemap, robots, llms.txt, invite noindex, 404 and analytics privacy checks.`);
