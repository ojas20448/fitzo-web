const details = [
  ["Your routine changes.", "Start an empty session, choose a published workout, or keep your own split."],
  ["Life interrupts a session.", "Return to a local workout draft, including the set you were still typing."],
  ["Yesterday's meal needs an edit.", "Change its portion or move the entry to the right diary date."],
  ["You want a clearer picture.", "Review muscle volume, personal records, body measurements and weekly trends."],
  ["You decide what to connect.", "Food targets, AI, Apple Health and Health Connect are all optional."],
];

export default function Comparison() {
  return (
    <section id="science" className="py-14 sm:py-24">
      <div className="site-container fitzo-routine">
        <div>
          <h2 className="section-title">Real life has a routine of its own.</h2>
          <p>Fitzo leaves room for it. Start where you are, change what you need, and keep the work you&apos;ve already put in.</p>
        </div>
        <dl>{details.map(([title, text]) => <div key={title} className="routine-row"><dt>{title}</dt><dd>{text}</dd></div>)}</dl>
      </div>
    </section>
  );
}
