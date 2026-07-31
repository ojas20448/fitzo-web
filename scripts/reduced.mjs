import { chromium } from "playwright";
const b = await chromium.launch();
const c = await b.newContext({
  viewport:{width:1440,height:900}, deviceScaleFactor:2, reducedMotion:"reduce"
});
const p = await c.newPage();
await p.goto("http://localhost:3002", { waitUntil:"networkidle" });
await p.waitForTimeout(1800);
await p.screenshot({ path:"output/shots/reduced-hero.png" });

// jump straight into the scroll-driven set piece without scrubbing it
const {top,h} = await p.evaluate(()=>{const s=document.getElementById("readout");return{top:s.offsetTop,h:s.offsetHeight};});
await p.evaluate(y=>window.scrollTo(0,y), top+50);
await p.waitForTimeout(1500);
await p.screenshot({ path:"output/shots/reduced-readout.png" });

// is any content stranded invisible?
const hidden = await p.evaluate(() => {
  const out=[];
  for (const el of document.querySelectorAll("h1,h2,h3,p,figure,article,li,dd")) {
    const cs=getComputedStyle(el);
    const r=el.getBoundingClientRect();
    if (r.height===0) continue;
    if (r.top>innerHeight||r.bottom<0) continue;
    if (+cs.opacity < 0.1) out.push({tag:el.tagName,text:el.textContent.trim().slice(0,44),opacity:cs.opacity});
  }
  return out;
});
console.log("Stranded (invisible) in-viewport content under reduced-motion:", hidden.length);
hidden.forEach(x=>console.log(`  ${x.tag} op=${x.opacity} "${x.text}"`));
await b.close();
