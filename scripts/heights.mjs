import { chromium } from "playwright";
const b = await chromium.launch();
const w = Number(process.env.W || 390), h = Number(process.env.H || 844);
const p = await (await b.newContext({ viewport:{width:w,height:h} })).newPage();
await p.goto("http://localhost:3002", { waitUntil:"networkidle" });
await p.evaluate(async()=>{const H=document.body.scrollHeight;for(let y=0;y<H;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,40));}window.scrollTo(0,0);});
await p.waitForTimeout(1500);
const out = await p.evaluate((vh) => {
  const secs=[...document.querySelectorAll("main > section, footer")];
  const total=document.body.scrollHeight;
  return {
    total,
    screens:+(total/vh).toFixed(1),
    rows: secs.map(s=>{
      const r=s.getBoundingClientRect();
      const pt=parseFloat(getComputedStyle(s).paddingTop), pb=parseFloat(getComputedStyle(s).paddingBottom);
      return {
        id: s.id || s.tagName.toLowerCase(),
        h: Math.round(r.height),
        screens:+(r.height/vh).toFixed(2),
        pad: Math.round(pt+pb),
      };
    })
  };
}, h);
console.log(`VIEWPORT ${w}×${h}`);
console.log(`TOTAL ${out.total}px = ${out.screens} screens of scroll\n`);
console.log("section              height   screens   vertical padding");
out.rows.forEach(r=>console.log(`  ${r.id.padEnd(18)} ${String(r.h).padStart(6)}px ${String(r.screens).padStart(7)}  ${String(r.pad).padStart(6)}px`));
await b.close();
