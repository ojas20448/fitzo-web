"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import FitzoLogo from "@/components/FitzoLogo";

const links = [
  { href: "/#features", label: "The app" },
  { href: "/#demo", label: "Try Fitzo" },
  { href: "/changelog", label: "What's new" },
  { href: "/blog", label: "Journal" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    }
    function onPointer(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    }
    const desktop = window.matchMedia("(min-width: 768px)");
    const close = () => setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    desktop.addEventListener("change", close);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      desktop.removeEventListener("change", close);
    };
  }, [open]);

  return (
    <header ref={header} className="site-nav">
      <nav className="nav-shell" aria-label="Main">
        <Link href="/" className="nav-brand" aria-label="Fitzo home"><FitzoLogo size="md" /></Link>
        <div className="nav-links">{links.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}</div>
        <div className="nav-download"><a href="/#download" className="chrome-button">Get Fitzo <ArrowUpRight size={15} aria-hidden="true" /></a></div>
        <button ref={toggle} className="mobile-menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={20} /> : <Menu size={20} />}</button>
      </nav>
      {open && <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile">
        {links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
        <a href="/#download" className="chrome-button" onClick={() => setOpen(false)}>Get Fitzo free <ArrowUpRight size={16} /></a>
      </nav>}
    </header>
  );
}
