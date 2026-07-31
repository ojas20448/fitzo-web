import { chromium } from "playwright";
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2 });
const p = await c.newPage();
await p.goto("http://localhost:3002", { waitUntil:"networkidle" });
await p.waitForTimeout(1500);
const targets = ["#demo","#features","#science","#testimonials","#founder","#faq","#download"];
for (const sel of targets) {
  await p.evaluate((s)=>{ const el=document.querySelector(s); if(el) el.scrollIntoView({block:"start"}); }, sel);
  await p.waitForTimeout(1400);
  const name = sel.replace("#","sec-");
  await p.screenshot({ path:`output/shots/${name}.png` });
  console.log("shot:", name);
}
await b.close();
