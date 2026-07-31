import { chromium } from "playwright";
const b = await chromium.launch();
for (const w of [360, 390, 430]) {
  const p = await (await b.newContext({viewport:{width:w,height:844}})).newPage();
  await p.goto("http://localhost:3002",{waitUntil:"networkidle"});
  await p.evaluate(()=>document.querySelector("#testimonials").scrollIntoView({block:"start"}));
  await p.waitForTimeout(1800);
  const r = await p.evaluate(()=>[...document.querySelectorAll("#testimonials .panel p")].slice(0,3).map(e=>({
    t:e.textContent.trim().slice(0,12),
    lines:Math.round(e.getBoundingClientRect().height/parseFloat(getComputedStyle(e).lineHeight||"1"))||1,
    h:Math.round(e.getBoundingClientRect().height)})));
  console.log(w+"px:", JSON.stringify(r));
  await p.close();
}
await b.close();
