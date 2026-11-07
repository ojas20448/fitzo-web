import Link from "next/link";
import FitzoLogo from "./FitzoLogo";
import { CONTACT_EMAIL } from "@/lib/links";

const groups = [
  { title: "Explore", links: [["The app", "/#features"], ["What's new", "/changelog"], ["Journal", "/blog"], ["Compare apps", "/compare"]] },
  { title: "Free tools", links: [["Calorie needs", "/tools/tdee-calculator"], ["Macro calculator", "/tools/macro-calculator"], ["Protein calculator", "/tools/protein-calculator"], ["One-rep max", "/tools/1rm-calculator"], ["BMR calculator", "/tools/bmr-calculator"], ["Body fat estimate", "/tools/body-fat-calculator"]] },
  { title: "Here to help", links: [["Contact", `mailto:${CONTACT_EMAIL}`], ["Privacy", "/privacy-policy"], ["Terms", "/terms"], ["Delete account", "/delete-account"]] },
];

export default function Footer() {
  return (
    <footer className="pb-10 pt-8 sm:pb-12">
      <div className="site-container">
        <div className="footer-grid">
          <div className="footer-brand"><Link href="/" aria-label="Fitzo home"><FitzoLogo size="md" /></Link><p>For the meals you know, the gym you call home, and the work you put in.</p></div>
          {groups.map(group => <div key={group.title}><h2>{group.title}</h2><ul>{group.links.map(([name, href]) => <li key={href}><Link href={href}>{name}</Link></li>)}</ul></div>)}
        </div>
        <div className="footer-bottom"><p>&copy; {new Date().getFullYear()} Fitzo. All rights reserved.</p><p>Made in India. Built for your everyday.</p></div>
      </div>
    </footer>
  );
}
