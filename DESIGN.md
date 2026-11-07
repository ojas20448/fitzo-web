# Fitzo — Liquid chrome design

Updated 7 November 2026. Product facts follow published app releases through 30 October 2026.

## Direction

Fitzo is a workout and Indian-food tracker. The website should make its current daily loop understandable and take visitors to the real app stores.

The visual signature is polished chrome around a dark, readable product screen. The elliptical reflection behind the phone recalls the collars on a loaded bar. A glass navigation capsule and metallic primary actions carry that material into the rest of the site. Avoid adding floating ornaments, neon accents or more competing hero effects.

The original all-black instrument-panel plan was revised to introduce clearly visible reflective surfaces. The chrome is concentrated in the hero, navigation and download controls; content sections remain quiet enough to read.

## Tokens

Exact values live in app/globals.css.

| Role | Colour |
| --- | --- |
| Graphite ground | #080a0d |
| Raised graphite | #20242b |
| Cool secondary text | #afb9c6 |
| Silver reflection | #dce3eb |
| White highlight | #f6f9ff |
| Keyboard focus | #bddbff |

Archivo remains the display and interface face. Headlines use tight tracking and responsive sizes; body copy keeps a comfortable measure and line height. Martian Mono is reserved for measured values in existing readouts. Colour in the app previews communicates nutrition, progress or completion.

## Composition

Desktop keeps the proposition and download action on the left, with an interactive phone on the right. Mobile gives the headline and store path priority, then places the phone at readable size.

```text
[ Fitzo             The app / Try Fitzo / What's new / Journal       Get Fitzo ]
[                                                                  ]
[ Built for             chrome collar + interactive app             ]
[ your next rep.        Workout / Food / Gym / Friends / Profile    ]
[ Description                                                       ]
[ Get Fitzo / Details                                               ]
[                                                                  ]
[ Two product showcases: workouts and Indian food                    ]
[ Exercise library / My Gym / optional Spotter                       ]
[ Setup steps / weekly readout / everyday use / founder / FAQ        ]
[ App Store + Google Play                                           ]
```

The phone is a simplified website preview with labelled sample data, not a screenshot or connection to a real account. It never sends friend notifications or saves nutrition to the app. Tabs, set completion, reorder, sample food, gym expansion and kudos work locally. Do not auto-cycle tabs or overwrite visitor choices.

## Shared components

- .panel / .glass-card: graphite with cool highlights and a visible edge.
- .well: inset data surface.
- .chrome-button: high-contrast silver action with dark text.
- .chrome-header: secondary-route glass header.
- ToolLayout and CalculatorControls: keep all calculator routes on the same surface and button system.
- Store destinations stay in lib/links.ts. FAQ content and FAQ JSON-LD share lib/product.ts.
- Footer links expose release notes, calculators, privacy and account deletion.

Keep the existing single dark theme. A light-mode toggle is outside this change.

## Product sources and claims

Read the neighbouring app repository, rather than treating an old marketing page as evidence:

- ../../Fitzo/docs/CONTEXT.md and docs/SCREENS.md: product structure and five-tab navigation.
- ../../Fitzo/docs/releases/2026-10-12-fitzo-1.4.0.md: training-first setup, optional food targets and meal ideas.
- ../../Fitzo/docs/releases/2026-10-29-more-exercises-batch-2-ota.md: 246 distinct offline movements.
- ../../Fitzo/docs/releases/2026-10-29-workout-logging-ota.md: draft preservation and save status.
- ../../Fitzo/docs/releases/2026-10-30-*.md: automatic timing, resume, reordering, guides, discovery and My Gym.
- ../../Fitzo/docs/store/DATA_MAP.md and DATA_SAFETY.md: shared AI choice, provider retention and optional worker handling.
- ../../Fitzo/docs/reviews/2026-10-17-oracle-migration.md: current API host.

The public changelog groups published updates by date; it does not invent app versions for OTA releases. My Gym's demo crowd is sample data. Offline library/drafts do not imply that AI, remote food search, account sync or social updates work offline. Indian-food database counts are not advertised without evidence.

Privacy copy follows the app's documented processing flows. Google's paid API data handling is described with links to its [terms](https://ai.google.dev/gemini-api/terms) and [abuse-monitoring policy](https://ai.google.dev/gemini-api/docs/usage-policies). Do not claim photos or recordings are universally "never stored".

## Accessibility and verification

Maintain one h1, logical headings, labelled controls, a working skip link, visible focus, and real anchor destinations. The preview tablist supports left/right arrows and Home/End. The mobile navigation is a disclosure, not a modal; Escape closes it and restores the toggle's focus.

Respect reduced motion and reduced transparency. Decorative chrome is noninteractive and hidden from assistive technology. Forced colours retain readable headline text and control borders.

```powershell
npm run lint
npm run build
# Against a running local server:
node scripts/chrome-check.mjs
$env:BASE='http://127.0.0.1:3002'
$env:ROUTES='/,/changelog,/blog,/tools/bmr-calculator,/compare,/privacy-policy,/terms,/delete-account'
node scripts/audit.mjs
```

chrome-check.mjs verifies meaningful preview interactions, keyboard navigation, undo and state preservation, FAQ/schema parity, anchors, the mobile menu, reduced motion and widths from 320 to 1440 pixels. Screenshots are saved in output/chrome-review (ignored by Git).

The legacy audit approximates contrast from computed solid colours; it is not a full accessibility certification. It reports intentionally clipped decorative chrome and horizontally scrollable comparison tables as element overflow even when document width matches the viewport. Review screenshots and the actual page width as well.

To avoid colliding with another local build, set FITZO_BUILD_DIR to an ignored directory such as output/chrome-next before starting Next. The default production build path remains .next.

Some older scripts target the previous hero's markup. Use chrome-check.mjs for the new hero. Unimported Pricing, Waitlist, Blog and Testimonials components are outside the active homepage.

## Verified in this update

- Production build succeeded (31 generated pages); lint passed without warnings or errors.
- Preview interaction and responsive checks passed at 320, 390, 768, 1280 and 1440 pixels, including loaded Archivo fonts and the default phone screen fitting its frame.
- Eight representative routes were audited. After fixing the account-deletion footer, the audit reported no contrast failures, broken anchors, missing image alt attributes or heading skips. Every document stayed within the mobile viewport.
- Fourteen production routes returned HTTP 200, with no application JavaScript errors in the production smoke check.
- Local production requests to Vercel's analytics script paths return 404 outside Vercel; those hosting integrations were retained.
- Verification used desktop Chromium and emulated mobile sizes. Physical-device browsers, Safari and assistive-technology testing remain unverified. This change was not deployed.
