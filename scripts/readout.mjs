import { chromium } from "playwright";
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2 });
const p = await c.newPage();
await p.goto("http://localhost:3002", { waitUntil:"networkidle" });
const { top, h } = await p.evaluate(() => {
  const s = document.getElementById("readout");
  return { top: s.offsetTop, h: s.offsetHeight };
});
// scrollYProgress 0..1 maps across (sectionHeight - viewportHeight)
const range = h - 900;
for (const [name, frac] of [["readout-25",0.25],["readout-55",0.55],["readout-90",0.90]]) {
  await p.evaluate((y) => window.scrollTo(0, y), top + range*frac);
  await p.waitForTimeout(900);
  await p.screenshot({ path:`output/shots/${name}.png` });
  console.log("shot:", name);
}
await b.close();
