import { chromium } from "playwright";
const b = await chromium.launch();
const p = await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2})).newPage();
await p.goto("http://localhost:3002",{waitUntil:"networkidle"});
await p.evaluate(async()=>{const H=document.body.scrollHeight;for(let y=0;y<H;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,50));}window.scrollTo(0,0);});
await p.waitForTimeout(1200);
const sel = process.env.SEL || "#features";
await p.evaluate(s=>document.querySelector(s).scrollIntoView({block:"start"}), sel);
await p.waitForTimeout(1200);
await p.screenshot({path:`output/shots/m${sel.replace("#","-")}.png`});
// per-card heights
const cards = await p.evaluate(s=>[...document.querySelectorAll(s+" article")].map(a=>({
  t:a.querySelector("h3")?.textContent.trim().slice(0,26),
  h:Math.round(a.getBoundingClientRect().height),
  w:Math.round(a.getBoundingClientRect().width)})), sel);
console.log(JSON.stringify(cards,null,1));
await b.close();
