import { chromium } from "playwright";
const b = await chromium.launch();
const p = await (await b.newContext()).newPage();
await p.goto("http://localhost:3002",{waitUntil:"networkidle"});
const hrefs = await p.evaluate(()=>[...new Set([...document.querySelectorAll("a[href]")]
  .map(a=>a.getAttribute("href"))
  .filter(h=>h && h.startsWith("/") && !h.startsWith("//")))]);
console.log("internal links found:", hrefs.length);
for (const h of hrefs) {
  const path = h.split("#")[0] || "/";
  const r = await p.request.get("http://localhost:3002"+path);
  console.log(`  ${r.status()===200?"OK ":"DEAD"} ${r.status()}  ${h}`);
}
await b.close();
