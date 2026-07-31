import { chromium } from "playwright";
const b = await chromium.launch();
for (const [w,h,label] of [[1440,900,"desktop"],[390,844,"mobile"]]) {
  const p = await (await b.newContext({viewport:{width:w,height:h}})).newPage();
  await p.goto("http://localhost:3002",{waitUntil:"networkidle"});
  await p.waitForTimeout(1200);
  const r = await p.evaluate(()=>{
    const h1=document.querySelector("h1");
    const cs=getComputedStyle(h1);
    const lines=Math.round(h1.getBoundingClientRect().height/parseFloat(cs.lineHeight));
    return {fontSize:cs.fontSize, lines, height:Math.round(h1.getBoundingClientRect().height)};
  });
  console.log(label, JSON.stringify(r));
  await p.close();
}
await b.close();
