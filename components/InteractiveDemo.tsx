"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Building2, Dumbbell, Signal, UserRound, Users, Utensils, Wifi } from "lucide-react";

const screens = [
  { name: "Workout", icon: Dumbbell, src: "/app-screens/workout.webp", description: "Your plan. Your next session. Your progress.", alt: "Fitzo's Workout screen with today's Upper / Lower plan, exercise library, workout history and weekly progress." },
  { name: "Food", icon: Utensils, src: "/app-screens/food.webp", description: "Everyday meals, all in one food diary.", alt: "Fitzo's Food screen with calorie and macro totals, food logging options and an Indian meal diary." },
  { name: "Gym", icon: Building2, src: "/app-screens/gym.webp", description: "A familiar place to put in the work.", alt: "Fitzo's My gym screen with the demo gym, a connected gym and check-in information." },
  { name: "Friends", icon: Users, src: "/app-screens/friends.webp", description: "A little company for the work you put in.", alt: "Fitzo's Friends screen with gym buddies, workout activity and training streaks." },
  { name: "Profile", icon: UserRound, src: "/app-screens/profile.webp", description: "Your activity, your progress, your Fitzo.", alt: "Fitzo's Profile screen with a member profile, training activity and nutrition history." },
] as const;

export default function InteractiveDemo() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div id="demo" className="product-demo">
      <div className="phone-shell">
        <div className="phone-side-buttons" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="phone-screen">
          <div className="phone-status" aria-hidden="true">
            <span>9:41</span><span className="phone-island" />
            <div><Signal size={13} /><Wifi size={13} /><span className="phone-battery" /></div>
          </div>
          <div className="phone-captures">
            {screens.map((screen, i) => (
              <div key={screen.name} id={`preview-${screen.name.toLowerCase()}`} role="tabpanel"
                aria-labelledby={`tab-${screen.name.toLowerCase()}`} hidden={active !== i} tabIndex={0}>
                <Image src={screen.src} alt={screen.alt} width={440} height={874}
                  priority={i === 0} loading={i === 0 ? undefined : "eager"} unoptimized className="app-capture" />
              </div>
            ))}
          </div>
          <div className="phone-home-area" aria-hidden="true"><span /></div>
        </div>
      </div>
      <div className="screen-picker" role="tablist" aria-label="Explore real Fitzo app screens">
        {screens.map(({ name, icon: Icon }, i) => (
          <button key={name} ref={el => { tabRefs.current[i] = el; }} type="button" role="tab"
            id={`tab-${name.toLowerCase()}`} aria-controls={`preview-${name.toLowerCase()}`}
            aria-selected={active === i} tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)} onKeyDown={event => {
              let next = i;
              if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (i + 1) % screens.length;
              else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (i - 1 + screens.length) % screens.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = screens.length - 1;
              else return;
              event.preventDefault();
              setActive(next);
              tabRefs.current[next]?.focus();
            }}>
            <Icon size={16} strokeWidth={1.7} aria-hidden="true" /><span>{name}</span>
          </button>
        ))}
      </div>
      <p className="screen-description" aria-live="polite">{screens[active].description}</p>
      <p className="preview-hint">Actual app screens. Sample account.</p>
    </div>
  );
}
