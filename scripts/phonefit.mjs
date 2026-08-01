import { chromium } from "playwright";
const b = await chromium.launch();
for (const [w,h,label] of [[1440,900,"desktop"],[390,844,"mobile"]]) {
  const p = await (await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:2})).newPage();
  await p.goto("http://localhost:3002",{waitUntil:"networkidle"});
  await p.waitForTimeout(2200);
  // measure overflow inside the hero phone screen for each of the 4 tabs
  const rows = [];
  for (let i=0;i<4;i++){
    const btns = await p.$$('section >> [aria-label^="Show "]');
    if (btns[i]) { await btns[i].click(); await p.waitForTimeout(700); }
    const m = await p.evaluate(()=>{
      const sc=document.querySelector('section .absolute.inset-0.overflow-hidden');
      if(!sc) return null;
      const inner=sc.firstElementChild;
      if(!inner) return null;
      return { clipped: Math.max(0, Math.round(inner.scrollHeight - sc.clientHeight)),
               screenH: sc.clientHeight, contentH: inner.scrollHeight };
    });
    rows.push(m);
  }
  console.log(label, JSON.stringify(rows));
  await p.screenshot({path:`output/shots/fit-${label}.png`});
  await p.close();
}
await b.close();
