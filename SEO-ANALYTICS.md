# Search relevance and Google Analytics

## Google Analytics 4

- Account: Fitzo (`415340244`), owned by the signed-in Ojas account.
- Property: Fitzo Website (`563090710`). Reporting time zone: India; currency: INR.
- Web stream: `https://www.fitzoapp.in` (`16292091219`).
- Measurement ID: `G-R6SYM45NL3` (public, not a secret).
- [Open the property](https://analytics.google.com/analytics/web/#/a415340244p563090710/reports/intelligenthome).

The public ID is configured in `lib/analytics.ts`. `NEXT_PUBLIC_GA_ID` can override it for a separate property. Analytics is enabled in production builds, disabled in normal development and Vercel previews. Google is contacted only after the visitor chooses **Allow analytics**. **Cookie settings** reopens that choice.

Events: `page_view` on initial consent and subsequent route changes; `app_store_click` with `platform` set to `android` or `ios`. The store-click event is registered as a key event, counted once per session with no monetary value. A store click measures intent to download, not an installed app or an app signup.

Enhanced measurement is **off** in the stream. Keep it off: the website sends its own page views to avoid duplicates and strips query strings and hashes before setting page location/referrer. Do not add another Google tag via Tag Manager. Advertising storage, ad personalization and Google signals are denied/disabled. Buddy invite pages are excluded. Form values, calculator inputs and fitness data are never sent by this integration. Existing Vercel analytics remains separate.

After deploying, open the live site, allow analytics, navigate between pages and click a store link. Confirm `page_view` and `app_store_click` in Realtime/DebugView. Browser blockers can prevent delivery. The new property has no historical data; creating it alone does not update the deployed site.

## Search and AI discovery

Each indexable page has its own descriptive title, description, canonical URL and social preview. The site language is English for India. The root no longer assigns every page a homepage language alternate. Rendering assets are crawlable. Static sitemap entries omit invented modification dates; articles retain their publication dates.

`/llms.txt` is generated from the same product FAQs and blog inventory as the site, keeping its answers and links current on rebuild. It is a supplementary discovery convention, not a ranking guarantee. Core content and matching structured data remain the foundation; Google documents that [AI features use ordinary SEO best practices](https://developers.google.com/search/docs/appearance/ai-features).

Organization, website and app entities have stable IDs. Store links identify the app. The nonexistent blog search action is removed. No invented ratings are added. FAQ markup describes the visible answers and does not imply eligibility for Google FAQ rich results.

## Page intent map

No Search Console data was available during this pass. This is a URL/content audit, not measured keyword demand or evidence of rankings.

| Page | Primary purpose |
| --- | --- |
| `/` | Fitzo workout and Indian food tracker; product discovery and download |
| `/compare` | Direct Fitzo/MyFitnessPal/Strong/Hevy feature comparison |
| `/blog/best-fitness-apps-india-2026` | How to choose an app for Indian meals and workouts |
| `/blog` | Fitness and nutrition guide directory |
| `/tools/bmr-calculator` | Resting calorie estimate |
| `/tools/tdee-calculator` | Daily energy estimate including activity |
| `/tools/macro-calculator` | Protein/carbohydrate/fat targets |
| `/tools/protein-calculator` | Daily protein range |
| `/tools/body-fat-calculator` | US Navy body fat estimate |
| `/tools/1rm-calculator` | One-rep maximum estimate |
| `/changelog` | Product release history |
| `/privacy-policy`, `/terms`, `/delete-account` | Policy and account support |
| `/buddy` | Individual invitation, excluded from indexing and GA4 |

Articles keep their specific training/nutrition topics; related links prioritize the same category. The comparison guide title is separated from the direct comparison page. No duplicate location landing pages or unsupported local-business address markup are added.

## Verification

Run `npm run lint`, `npm run build`, then `npm run start -- --port 3012` and `node scripts/check-seo.mjs http://localhost:3012`.

The smoke check verifies every sitemap page, titles, canonicals, share images, one H1, JSON-LD, FAQ parity in initial HTML, crawler files, invitation indexing, missing-article 404s, URL sanitization and the event consent guard. Browser verification should additionally cover accept/reject, route navigation, preference persistence and withdrawal. Do not send real forms merely to test analytics.

After deployment, submit `/sitemap.xml` in Search Console and inspect the homepage plus a calculator/article URL. Search rankings, Google indexing and AI citations require observation over time; local tests cannot confirm them.

Implementation references: [GA4 single-page applications](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications), [Google consent mode](https://developers.google.com/tag-platform/security/guides/consent).
