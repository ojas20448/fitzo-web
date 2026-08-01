# Fitzo — Design system

The durable visual rules for fitzoapp.in. Exact token values live in
`app/globals.css`; this file records *why* they are what they are, so a future
change is a decision rather than a drift.

---

## 1. The world

**Instrument panel / training log.** The site is a readout of work already
done, not a brochure about work you might do. Every section shows something
measured: numbers that count, bars that fill, volume that accumulates.

What it refuses, on purpose:

- The SaaS bento of near-invisible cards (6% borders on black).
- Borrowed-logo trust bars. Proof comes from what the product does, not
  from other people's brands.
- A tracked uppercase eyebrow over every section.
- One identical fade-up entrance on every section.

**Dark is not a category default here.** The use scene decides it: a phone held
at arm's length on a gym floor, under hard overhead light, between sets. That
scene forces a black ground.

### Single theme — deliberately

There is **no light mode and no theme toggle.** The previous build shipped a
toggle whose light branch was unreadable: three sections hard-coded `bg-black`,
and ~70 hard-coded `text-white` classes rendered white-on-white. Rather than
maintain two worlds, the product committed to one.

`<html>` carries a permanent `dark` class so any residual `dark:` utility still
resolves. **Do not reintroduce `next-themes` or a toggle** without rebuilding
every surface for both themes.

---

## 2. Surfaces

A panel is **milled plate, not fog.** Three things make it read as an object:

| Layer | Value |
|---|---|
| Ground | `#000` |
| Panel fill | vertical `--panel-raised` → `--panel` |
| Edge | 1px `--edge` (9% white) |
| Inner top highlight | `inset 0 1px 0` at 6% white |
| Cast shadow | `0 1px 2px` + `0 12px 32px -12px`, both near-black |

Use the classes, not ad-hoc utilities:

- `.panel` — any raised object (feature cell, quote, instrument).
- `.panel-interactive` — adds a 2px lift and a brighter edge on hover. The
  **edge** responds to the pointer; the content does not move.
- `.well` — inset surface for app screenshots and data. Darker than the ground
  with an inner shadow, so screens sit *inside* the panel.
- `.kicker` — the one section-label style. **At most four on the page.** It
  was on seven of nine sections, which is grammar nobody chose; drop it wherever
  the heading already names the section.

**Never nest panels.** A `.well` inside a `.panel` is the maximum depth. The
previous build nested TiltCard → MagicCard → card → well, four deep.

---

## 3. Colour

Neutrals plus a **macro triad**, where each colour has exactly one job. These
are the app's own macro colours, so the site and the product agree.

| Token | Job |
|---|---|
| `--protein` green | live · complete · gain · primary CTA hover |
| `--carbs` amber | streak · energy · effort |
| `--fat` rose | load · intensity · limit |

A colour used outside its job weakens all three. Green is not "the accent" — it
is what *done* looks like.

### Text ramp

Every step clears 4.5:1 on the black ground. Verified by
`node scripts/audit.mjs`, which currently reports **0 contrast failures across
all routes**.

| Token | Use |
|---|---|
| `text-white` / `--text-primary` | headings, values, primary labels |
| `text-ink-muted` | body copy, descriptions |
| `text-ink-faint` | meta, units, captions |

**Do not use `text-neutral-400/500/600/700` on the dark ground.** They measure
between 1.9:1 and 4.43:1 and were the source of every contrast failure in the
previous build. They remain correct *inside the white receipt artifacts*
(`FounderStory`, `Features`), where the ground is paper.

---

## 4. Type

| Face | Role |
|---|---|
| **Archivo** (`--font-sans`) | display + UI. A signage grotesque with real width authority; holds at 900 for headlines and 400 for body. |
| **Martian Mono** (`--font-mono`) | measured values only. |

Inter was replaced deliberately: Inter-as-display is the default that says the
typography decision was never made.

**Mono is not a costume for "technical".** It is reserved for time, weight, and
receipt-style measurement — `00:42:18`, `4 × 80`, `128/150g`. Counts and
headline figures use Archivo with `tabular-nums`, because Martian Mono is too
wide at display size.

Scale: headings are `clamp()` so they hold at every breakpoint. Display
tracking is `-0.04em`; body measure caps at ~62ch.

---

## 5. Motion

Defined once in `lib/motion.ts`. One idea: **the page behaves like an
instrument coming online.** Nothing slides in from off-screen — things settle
into calibration. Short travel, a blur that resolves, an exponential ease-out
that decelerates hard at the end, the way a needle finds its reading.

Five gestures, each with one job:

| Gesture | Job |
|---|---|
| `rise` | section entrance — 24px, resolves from blur |
| `settle` | instrument panels locking on |
| `sweep` | readouts and rows filling left→right |
| `stack` / `stackItem` | lists and grids, **accelerating** stagger |
| `press` | the only gesture that answers input |

Easing is one family: `EASE_OUT_EXPO` `cubic-bezier(0.16, 1, 0.3, 1)`.

### The one authored moment

`WeeklyReadout` is the page's motion set piece: a scroll-scrubbed week of
training. Every value is bound to scroll progress, so the visitor drives the
instrument. There is exactly one of these — a second would make neither
memorable.

### Reduced motion

`MotionProvider` sets `<MotionConfig reducedMotion="user">`, so Framer drops
transform and layout animation while opacity and colour keep animating. This is
**not** a blanket `0.01ms` kill: state changes and hierarchy stay legible.

The CSS block in `globals.css` collapses travel but explicitly preserves
`opacity, color, background-color, border-color, box-shadow, outline-color`
transitions. Looping ambience carries `data-motion="ambient"` and stops fully.

⚠️ **`useReducedMotion()` returns `false` during SSR and `true` on a
reduced-motion client.** Never branch rendered markup (inline `style`,
`initial`) directly off it — that hydration-mismatches. Either gate it behind a
mount flag (see `WeeklyReadout`) or branch only on non-serialised props like
`transition` (see `Hero`'s `DockButton`).

Anything driven by `rAF`, `setInterval` or canvas must gate on
`useReducedMotion()` at its own call site — `MotionConfig` does not cover it.

---

## 6. Honesty rules

**Distribution status (confirmed with the product owner):** Android is live on
Google Play; iOS is in **open TestFlight beta**, not on the public App Store.
Copy must say "TestFlight" or "beta" for iOS — never "Download on the App
Store". Both URLs live in `lib/links.ts`; never hard-code them.

The site previously contradicted itself on this — the changelog and press page
said it was live on both stores, the CTA said "launching soon", and there was
not one real store URL anywhere.

Removed in this pass, and not to be restored:

- The "Trusted by athletes from" marquee — eight invented gym brands.
- `aggregateRating: 4.8` in JSON-LD — unverifiable review markup served to
  Google, which risks a structured-data penalty. See the note in
  `lib/structured-data.ts` before restoring it.
- "Download iOS" / "Google Play" buttons that scrolled to an email form.
- Three social icons pointing at `href="#"`.
- "50K+ lines of code" — a vanity metric no lifter weighs.
- Testimonials attributed to invented full names and cities. The quotes are
  real; the identities weren't. Attribution is now first name + initial, and a
  name goes back only with that person's consent.
- `/compare` rows asserting that a named competitor sells user data, plus
  undated pricing. Only rows checkable from a competitor's own public
  material belong there, and the table carries a `LAST_CHECKED` date.

Standing rules:

- Demonstration data is design material. Author it at full fidelity and **label
  it** — see the `DEMO DATA` chip in `WeeklyReadout`.
- Commercial and factual claims are not inventable: prices, customers,
  ratings, benchmarks, competitor capabilities.
- Beta numbers are framed as beta numbers, never as launch metrics.
- A link that does not go anywhere is a defect, not a placeholder.
- Every canonical, sitemap and JSON-LD URL derives from `SITE_URL` in
  `lib/links.ts`. These once named a different domain than the one serving the
  pages, which tells Google the content belongs elsewhere.

---

## 7. Accessibility floor

Enforced by `node scripts/audit.mjs` (runs against a live dev server):

- Text contrast ≥ 4.5:1 (≥ 3:1 for large). **Currently 0 failures, all routes.**
- Exactly one `h1` per route; no heading-level skips.
- Every same-page anchor resolves to a real `id`.
- Every `<img>` has an `alt` (decorative images use `alt=""`).
- No horizontal overflow at 375px.
- Tap targets clear WCAG 2.2 AA (24×24); interactive controls aim for 44px.
- `:focus-visible` is a 2px protein-green outline at 3px offset, defined once
  globally. **Never remove an outline without replacing it.**
- Every route has `<main id="main">` for the layout's skip link.
- Decorative chrome inside mockups renders as `<span>`, never `<button>` —
  keyboard users must not land on controls that do nothing.

---

## 8. Verification scripts

Kept in `scripts/`, all run against a dev server on `:3002`:

| Script | Purpose |
|---|---|
| `audit.mjs` | contrast, tap targets, anchors, alt, heading order, overflow. `ROUTES=/,/blog,…` |
| `shots.mjs` | viewport + full-page screenshots |
| `sections.mjs` | one screenshot per homepage section |
| `readout.mjs` | the set piece at three scroll positions |
| `reduced.mjs` | reduced-motion render + stranded-content check |
| `mobile.mjs` | 390px renders |
| `console.mjs` / `prodcheck.mjs` | runtime console and network errors |

| `clipcheck.mjs` | asserts the hero's AI-coach line clears the phone dock |
| `h1check.mjs` | headline line-count at each breakpoint |
| `routes.mjs` | one screenshot per secondary route |
| `heights.mjs` | per-section scroll cost; `W`/`H` env vars set the viewport |
| `msec.mjs` | one mobile section shot + per-card heights (`SEL=#features`) |
| `polish-audit.mjs` | keyboard path, focus rings, scroll-region reachability, hover states, CLS, console |
| `phonefit.mjs` | asserts no phone-mockup screen overflows its bezel |

Run `audit.mjs` after any UI change. It is the floor, not the ceiling.

---

## 9. Mobile

The page ran to **20.6 phone screens** of scroll. It is now **13.8**. Every
structural change below is breakpoint-scoped — desktop composition is
untouched.

| Device | Below `sm` (phones) | `sm`–`md` | `lg`+ (desktop) |
|---|---|---|---|
| Section padding | 56px | 96px | 128px — unchanged |
| Testimonials | snap-scrolling rail, one card at a time | grid | grid — unchanged |
| Comparison | Fitzo column only | both columns | both — unchanged |
| Feature cells | 2-up; app screens only on the three showcase cells | 2-up | 3-col bento — unchanged |
| Readout track | 165vh | 210vh | 240vh — unchanged |
| Footer | 3-up link columns | 3-up | 4-col — unchanged |

Two rules that came out of this:

- **A phone is not a narrow desktop.** Stacking a desktop grid is what made
  this page four screens of features. Re-compose instead: pair the cards, rail
  the quotes, drop the half of an argument that only restates the heading.
- **Long copy is a mobile layout problem.** A 90-character description wraps to
  five lines in a 173px cell. The feature descriptions were shortened
  globally — this is the one change in the mobile pass that also affects
  desktop, and it improved both.

Measure with `W=390 H=844 node scripts/heights.mjs`, which prints per-section
height in screens. Anything over ~2 screens on a phone needs a reason.

---

## 10. Known gaps

- `components/Pricing.tsx`, `components/Waitlist.tsx` and `components/Blog.tsx`
  are unimported. They still carry the pre-redesign palette. Delete them or
  migrate them before they get reused.
- `TESTER_NUMBERS` in `Testimonials.tsx` has not been checked against a real
  dashboard.
- `/press`, `/terms` and `/privacy-policy` use `press@` and `support@` on a
  domain the site does not appear to own; the rest of the site uses
  `contact@fitzoapp.in`.
