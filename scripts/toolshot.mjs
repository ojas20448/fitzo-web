import { chromium } from "playwright";
const b = await chromium.launch();
const slug = process.env.SLUG || "bmr-calculator";
const w = Number(process.env.W || 390), h = Number(process.env.H || 844);
const p = await (await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:2})).newPage();
await p.goto(`http://localhost:3002/tools/${slug}`,{waitUntil:"networkidle"});
await p.waitForTimeout(1500);
await p.screenshot({path:`output/shots/tool-${slug}-${w}.png`, fullPage:true});
console.log("shot saved:", `output/shots/tool-${slug}-${w}.png`);
// also check the back link is present and works
const backLink = await p.$('header a[href="/"]');
console.log("back link present:", !!backLink);
await b.close();
