import { chromium } from "playwright";
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2 });
const p = await c.newPage();
for (const [route,name] of [["/blog","r-blog"],["/compare","r-compare"],["/changelog","r-changelog"],["/press","r-press"],["/terms","r-terms"],["/nope","r-404"]]) {
  await p.goto("http://localhost:3002"+route, { waitUntil:"networkidle" });
  await p.waitForTimeout(1200);
  await p.screenshot({ path:`output/shots/${name}.png` });
  console.log("shot:", name);
}
await b.close();
