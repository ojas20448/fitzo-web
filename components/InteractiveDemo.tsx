"use client";

import { useRef, useState } from "react";
import {
  ArrowDown, ArrowUp, ArrowUpRight, BookOpen, Check, ChevronRight,
  Dumbbell, Flame, Heart, MapPin, Plus, QrCode, ShieldCheck,
  Signal, Sparkles, UserRound, Users, Utensils, Wifi,
} from "lucide-react";

const tabs = [
  { name: "Workout", icon: Dumbbell },
  { name: "Food", icon: Utensils },
  { name: "Gym", icon: MapPin },
  { name: "Friends", icon: Users },
  { name: "Profile", icon: UserRound },
] as const;
type Tab = (typeof tabs)[number]["name"];

const exercises = [
  { name: "Bench press", detail: "3 sets · 60 kg" },
  { name: "Seated cable row", detail: "3 sets · 45 kg" },
  { name: "Lateral raise", detail: "3 sets · 8 kg" },
];

export default function InteractiveDemo() {
  const [tab, setTab] = useState<Tab>("Workout");
  const [resumed, setResumed] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [foodAdded, setFoodAdded] = useState(false);
  const [gymOpen, setGymOpen] = useState(false);
  const [kudos, setKudos] = useState(false);
  const [order, setOrder] = useState(exercises);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function moveExercise(index: number, direction: number) {
    const next = [...order];
    [next[index], next[index + direction]] = [next[index + direction], next[index]];
    setOrder(next);
  }

  return (
    <div id="demo" className="product-demo">
      <div className="phone-shell">
        <div className="phone-screen">
          <div className="phone-status" aria-hidden="true">
            <span>9:41</span><span className="phone-island" />
            <div><Signal size={12} /><Wifi size={12} /><span className="phone-battery" /></div>
          </div>
          <div className="preview-label">Interactive preview · sample data</div>
          <div id="preview-panel" role="tabpanel" aria-labelledby={`tab-${tab.toLowerCase()}`} className="preview-content" tabIndex={0}>
            {tab === "Workout" && <>
              <div className="preview-heading"><div><p>Let&apos;s get a little stronger.</p><h2>Your workout</h2></div><span className="streak"><Flame size={14} /> 4</span></div>
              <button className="resume-card" onClick={() => setResumed(!resumed)} aria-pressed={resumed}>
                <span className="resume-icon"><Dumbbell size={21} /></span>
                <span><strong>{resumed ? "Workout in progress" : "Resume workout"}</strong><small>Upper body A · {completed ? "7" : "6"}/12 sets</small></span>
                <ArrowUpRight size={18} />
              </button>
              <div className="preview-subheading"><strong>{resumed ? "Your next set" : "Upper body A"}</strong><span>32:18 elapsed</span></div>
              {resumed ? <div className="active-set">
                <p>Seated cable row</p><div className="set-values"><span><strong>45</strong> kg</span><span><strong>12</strong> reps</span></div>
                <button className="preview-action" onClick={() => setCompleted(!completed)} aria-pressed={completed}>
                  {completed ? <Check size={16} /> : <Plus size={16} />}{completed ? "Set complete · undo" : "Complete set"}
                </button>
                <p className="saved-note" role="status">{completed ? "7 of 12 sets complete in this preview" : "Tap to try logging a set"}</p>
              </div> : <div className="exercise-list">
                {order.map((exercise, i) => <div className="exercise-row" key={exercise.name}>
                  <span className="exercise-number">{String(i + 1).padStart(2, "0")}</span>
                  <div><strong>{exercise.name}</strong><small>{exercise.detail}</small></div>
                  <div className="reorder-controls">
                    <button aria-label={`Move ${exercise.name} up`} disabled={i === 0} onClick={() => moveExercise(i, -1)}><ArrowUp size={12} /></button>
                    <button aria-label={`Move ${exercise.name} down`} disabled={i === order.length - 1} onClick={() => moveExercise(i, 1)}><ArrowDown size={12} /></button>
                  </div>
                </div>)}
              </div>}
              <div className="preview-note"><ShieldCheck size={15} /><span>{resumed ? "Try a set. Your real history stays untouched." : "Try reordering. Your entered sets stay with you."}</span></div>
              <div className="preview-week"><span>This week</span><div>{["M", "T", "W", "T", "F", "S", "S"].map((day, i) => <span key={i} className={i < 4 ? "day-done" : ""}>{i < 4 ? <Check size={12} /> : day}</span>)}</div></div>
            </>}
            {tab === "Food" && <>
              <div className="preview-heading"><div><p>Familiar food. A clearer picture.</p><h2>Your food diary</h2></div><Utensils size={22} /></div>
              <div className="nutrition-summary"><span>Today&apos;s logged food</span><p><strong>{foodAdded ? "1,960" : "1,640"}</strong> kcal</p><div className="macro-track"><i /><i /><i /></div><div className="macro-labels"><span>Protein <b>{foodAdded ? "106" : "88"}g</b></span><span>Carbs <b>{foodAdded ? "235" : "203"}g</b></span><span>Fat <b>{foodAdded ? "65" : "51"}g</b></span></div></div>
              <div className="preview-subheading"><strong>Lunch</strong><span>Reviewed portions</span></div>
              <div className="food-row"><span className="food-symbol">R</span><div><strong>Rajma chawal</strong><small>1 bowl · estimated</small></div><span>420 kcal</span></div>
              <div className="food-row"><span className="food-symbol">D</span><div><strong>Dahi</strong><small>1 katori · estimated</small></div><span>90 kcal</span></div>
              {foodAdded && <div className="food-row"><span className="food-symbol">P</span><div><strong>Paneer bhurji</strong><small>Sample serving · estimated</small></div><span>320 kcal</span></div>}
              <button className="preview-action" onClick={() => setFoodAdded(!foodAdded)} aria-pressed={foodAdded}>{foodAdded ? <Check size={15} /> : <Plus size={15} />}{foodAdded ? "Meal added · undo" : "Try adding paneer bhurji"}</button>
              <p className="saved-note" role="status">{foodAdded ? "Sample diary updated. Nothing saved to an account." : "Sample values. Recipes and portions vary."}</p>
            </>}
            {tab === "Gym" && <>
              <div className="preview-heading"><div><p>Your place to put in the work.</p><h2>My Gym</h2></div><MapPin size={22} /></div>
              <div className="gym-preview-art"><Dumbbell size={72} strokeWidth={1} /><span>Explore the demo gym</span><small>Sample space · sample activity</small></div>
              <button className="preview-action" onClick={() => setGymOpen(!gymOpen)} aria-expanded={gymOpen} aria-controls="demo-gym-equipment">{gymOpen ? "Hide equipment" : "Explore equipment"}<ChevronRight size={15} /></button>
              <div id="demo-gym-equipment" className="equipment-list" hidden={!gymOpen}><span>Free weights</span><span>Strength machines</span><span>Cardio</span><p>In Fitzo, open a machine to see its exercise guide.</p></div>
              <div className="preview-note"><QrCode size={24} /><span>Connect a participating gym with its Fitzo QR or access code.</span></div>
              <p className="saved-note">You can train without joining a gym.</p>
            </>}
            {tab === "Friends" && <>
              <div className="preview-heading"><div><p>A little encouragement goes far.</p><h2>Your gym circle</h2></div><Users size={22} /></div>
              <div className="buddy-preview"><div className="buddy-avatar">A</div><div><strong>Aarav</strong><small>Finished Upper body A</small></div><span>Today</span></div>
              <div className="friend-session"><Dumbbell size={28} /><strong>One more session in the books.</strong><div><span>45 min</span><span>16 sets</span><span>1 personal best</span></div></div>
              <button className="preview-action" onClick={() => setKudos(!kudos)} aria-pressed={kudos}><Heart size={16} fill={kudos ? "currentColor" : "none"} />{kudos ? "Kudos sent · undo" : "Try sending kudos"}</button>
              <p className="saved-note" role="status">{kudos ? "A little encouragement, just in this preview." : "Sample friend. No real notification is sent."}</p>
              <div className="preview-note"><Users size={18} /><span>Find friends by QR or search. Share your training focus and celebrate their work.</span></div>
            </>}
            {tab === "Profile" && <>
              <div className="preview-heading"><div><p>Make Fitzo yours.</p><h2>Your profile</h2></div><UserRound size={22} /></div>
              <div className="profile-preview"><div className="buddy-avatar">Y</div><strong>Your training, your pace.</strong><span>4 sessions this week</span></div>
              {[{ icon: Dumbbell, title: "Training preferences", text: "Your goal, equipment and routine" }, { icon: BookOpen, title: "Learn & progress", text: "Lessons, trends and personal records" }, { icon: Heart, title: "Health connections", text: "Optional Apple Health / Health Connect" }, { icon: Sparkles, title: "Fitzo AI", text: "One permission. Always your choice." }].map(item => <div className="profile-option" key={item.title}><item.icon size={17} /><div><strong>{item.title}</strong><small>{item.text}</small></div></div>)}
            </>}
          </div>
          <div className="phone-tabbar" role="tablist" aria-label="Explore Fitzo screens">
            {tabs.map(({ name, icon: Icon }, i) => <button
              key={name} ref={el => { tabRefs.current[i] = el; }} type="button" role="tab"
              id={`tab-${name.toLowerCase()}`} aria-controls="preview-panel" aria-selected={tab === name} tabIndex={tab === name ? 0 : -1}
              onClick={() => setTab(name)} onKeyDown={event => {
                let next = i;
                if (event.key === "ArrowRight") next = (i + 1) % tabs.length;
                else if (event.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = tabs.length - 1;
                else return;
                event.preventDefault(); setTab(tabs[next].name); tabRefs.current[next]?.focus();
              }}><Icon size={18} strokeWidth={1.7} /><span>{name}</span></button>)}
          </div>
          <div className="phone-home-bar" aria-hidden="true" />
        </div>
      </div>
      <p className="preview-hint">Go on, try the tabs.</p>
    </div>
  );
}
