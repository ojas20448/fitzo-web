import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import InteractiveDemo from "@/components/InteractiveDemo";

export default function Hero() {
  return (
    <section className="chrome-hero relative overflow-hidden">
      <div className="hero-light" aria-hidden="true" />
      <div className="site-container hero-grid">
        <div className="hero-copy">
          <Link href="/changelog" className="release-link">
            <span className="release-dot" /> A new rhythm for your routine
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <h1 className="chrome-title">Built for<br />your next rep.</h1>
          <p className="hero-description">
            Your lifts, your meals, your progress. One fitness app that gets
            Indian food and life between sets.
          </p>
          <div className="hero-actions">
            <a href="#download" className="chrome-button">Get Fitzo free <ArrowUpRight size={18} aria-hidden="true" /></a>
            <a href="#features" className="quiet-button">Take a closer look <ArrowDown size={16} aria-hidden="true" /></a>
          </div>
          <p className="hero-availability">Available on iOS &amp; Android</p>
          <div className="hero-promises">
            <span><Check size={14} aria-hidden="true" /> No ads</span>
            <span><Check size={14} aria-hidden="true" /> Indian food, included</span>
            <span><Check size={14} aria-hidden="true" /> Start with any routine</span>
          </div>
        </div>
        <div className="hero-product">
          <div className="chrome-orbit" aria-hidden="true" />
          <InteractiveDemo />
        </div>
      </div>
      <div className="site-container">
        <div className="hero-footnote">
          <p>Built around the work you put in.</p>
          <div><span>246 movements</span><span>Indian meal ideas</span><span>Optional AI coaching</span></div>
        </div>
      </div>
    </section>
  );
}
