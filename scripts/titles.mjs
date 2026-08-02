import { chromium } from "playwright";
const b = await chromium.launch();
const p = await (await b.newContext()).newPage();
for (const r of ["/","/blog","/compare","/changelog","/press","/privacy-policy","/terms","/blog/protein-indian-foods"]) {
  await p.goto("http://localhost:3002"+r,{waitUntil:"domcontentloaded"});
  console.log(`${r.padEnd(30)} "${await p.title()}"`);
}
await b.close();
