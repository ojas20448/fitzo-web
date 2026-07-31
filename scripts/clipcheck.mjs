import { chromium } from "playwright";
const b = await chromium.launch();
for (const [w,h,label] of [[1440,900,"desktop"],[390,844,"mobile"]]) {
  const p = await (await b.newContext({viewport:{width:w,height:h}})).newPage();
  await p.goto("http://localhost:3002",{waitUntil:"networkidle"});
  await p.waitForTimeout(2600);
  const r = await p.evaluate(()=>{
    const coach=[...document.querySelectorAll("p")].find(e=>e.textContent.includes("closes it before bed"));
    if(!coach) return "coach line not found (screen may have cycled)";
    const card=coach.closest("div").parentElement;
    const dock=document.querySelector('[aria-label="Show Home screen"]')?.closest("div");
    const cb=card.getBoundingClientRect(), db=dock?.getBoundingClientRect();
    const scroller=card.closest(".scrollbar-hide");
    const sb=scroller?.getBoundingClientRect();
    return {
      cardBottom:+cb.bottom.toFixed(1),
      dockTop: db? +db.top.toFixed(1): null,
      hiddenUnderDock: db ? +(cb.bottom-db.top).toFixed(1) : null,
      scrollerBottom: sb? +sb.bottom.toFixed(1):null,
      clippedOutside: sb ? +(cb.bottom-sb.bottom).toFixed(1) : null,
    };
  });
  console.log(label, JSON.stringify(r));
  await p.close();
}
await b.close();
