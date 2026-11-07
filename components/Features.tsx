import Link from "next/link";
import { ArrowUpRight, BookOpen, Check, Dumbbell, GripVertical, MapPin, Mic, Sparkles, Utensils } from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="features-section">
      <div className="site-container">
        <div className="features-heading">
          <h2 className="section-title">Less admin.<br />More good sessions.</h2>
          <p>From the first warm-up to your last meal, Fitzo keeps the details together so you can get on with your day.</p>
        </div>
        <div className="feature-showcases">
          <article className="panel feature-showcase">
            <span className="feature-icon"><Dumbbell size={21} aria-hidden="true" /></span>
            <h3>A logger that keeps up.</h3>
            <p>Start empty or use a routine. Resume a saved draft, reorder exercises, and see your previous numbers while you lift. Your session times itself.</p>
            <div className="feature-detail training-detail">
              <p className="feature-detail-label">Example session · Upper body A</p>
              {[["Bench press", "60 kg × 10 reps", "3 sets"], ["Seated cable row", "45 kg × 12 reps", "2 sets"], ["Lateral raise", "8 kg × 15 reps", "1 set"]].map(([name, detail, sets]) => <div key={name}><GripVertical size={15} className="text-ink-faint" aria-hidden="true" /><span><strong>{name}</strong><small>{detail}</small></span><span className="set-check">{sets} <Check size={12} className="inline" aria-hidden="true" /></span></div>)}
            </div>
          </article>
          <article className="panel feature-showcase">
            <span className="feature-icon"><Utensils size={20} aria-hidden="true" /></span>
            <h3>Your food belongs here.</h3>
            <p>Rajma chawal, rotis, your usual paneer. Search Indian foods, review portions, and keep a diary you can edit. Use recipes or eight practical meal ideas.</p>
            <div className="feature-detail food-detail">
              <p className="feature-detail-label">Familiar meals · portions you can review</p>
              <div><strong>Rajma chawal</strong><span>By bowl or grams</span></div>
              <div><strong>Paneer bhurji</strong><span>Adjust your portion</span></div>
              <div><strong>Your saved recipes</strong><span>Log again, easily</span></div>
            </div>
            <p className="flex items-center gap-2 !mt-4 !text-xs"><Mic size={14} aria-hidden="true" /> Prefer to speak or snap? Optional AI can help.</p>
          </article>
        </div>
        <div className="feature-rows">
          <article className="feature-row">
            <span className="feature-icon"><BookOpen size={19} aria-hidden="true" /></span>
            <h3>Know your next move.</h3>
            <p>246 distinct exercise movements with bundled photos and instructions. Explore Fitzo and community workouts, warm-up guides, and lessons in Learn.</p>
          </article>
          <article className="feature-row">
            <span className="feature-icon"><MapPin size={19} aria-hidden="true" /></span>
            <h3>Find your gym rhythm.</h3>
            <p>Explore the demo gym or connect a participating gym by QR or code. Keep your gym buddies close and give their next session a little encouragement.</p>
          </article>
          <article className="feature-row">
            <span className="feature-icon"><Sparkles size={19} aria-hidden="true" /></span>
            <h3>A spotter, when you want one.</h3>
            <p>Choose to enable Fitzo AI for coaching with your training context, voice logs and food-photo estimates. One shared permission, controlled from Profile.</p>
          </article>
        </div>
        <div className="feature-release">
          <p>Recently added: saved set drafts, exercise reordering, and a simpler My Gym.</p>
          <Link href="/changelog">See what&apos;s new <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
