import { chromium } from "playwright";
const b = await chromium.launch();
const c = await b.newContext({ viewport:{width:390,height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true });
const p = await c.newPage();
await p.goto("http://localhost:3002", { waitUntil:"networkidle" });
await p.waitForTimeout(1600);
await p.screenshot({ path:"output/shots/m-hero.png" });
console.log("shot: m-hero");
const {top,h} = await p.evaluate(()=>{const s=document.getElementById("readout");return{top:s.offsetTop,h:s.offsetHeight};});
await p.evaluate(y=>window.scrollTo(0,y), top + (h-844)*0.9);
await p.waitForTimeout(1400);
await p.screenshot({ path:"output/shots/m-readout.png" });
console.log("shot: m-readout");
for (const [sel,name] of [["#features","m-features"],["#founder","m-founder"]]) {
  await p.evaluate(s=>document.querySelector(s).scrollIntoView({block:"start"}), sel);
  await p.waitForTimeout(1400);
  await p.screenshot({ path:`output/shots/${name}.png` });
  console.log("shot:", name);
}
await b.close();
