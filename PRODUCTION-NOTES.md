# Fitzo Landing Page - Production Notes

## November 2026 design update

The liquid chrome theme and app content refresh are documented in [DESIGN.md](./DESIGN.md). Store links are already configured in `lib/links.ts`; the homepage uses direct downloads. The old launch signup and unverified beta-metric section are no longer on the homepage. Product copy follows the app's published October releases.

Run `npm run build`, `npm run lint`, `node scripts/chrome-check.mjs`, and the route audit before deployment. `FITZO_BUILD_DIR` can isolate a local preview under the ignored `output/` directory; leave it unset for a normal `.next` deployment. The older performance estimates and launch checklist below are historical and are not current verification results.

## ✅ Production Ready Features

### Core Pages
- ✅ Home page with all sections
- ✅ Privacy Policy page
- ✅ Terms of Service page
- ✅ Custom 404 page

### SEO & Metadata
- ✅ Complete metadata configuration
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card tags
- ✅ Sitemap.xml (updated: 2026-02-18)
- ✅ Robots.txt
- ✅ PWA Manifest

### Assets
- ✅ Favicon (SVG format, black background with white F)
- ✅ Apple Touch Icon (SVG placeholder)
- ✅ OG Image for social sharing (SVG placeholder)

### Performance
- ✅ Static generation for all pages
- ✅ Optimized bundle sizes (87.3 kB shared JS)
- ✅ Image optimizations via Next.js
- ✅ Font optimization (Geist Sans & Mono)

### Accessibility
- ✅ Semantic HTML structure
- ✅ ARIA labels on icon-only links
- ✅ Keyboard navigation support
- ✅ Focus states on interactive elements
- ✅ Color contrast ratios meet WCAG standards

### Code Quality
- ✅ Zero build errors
- ✅ Zero console logs in production
- ✅ TypeScript strict mode
- ✅ ESLint passing
- ✅ No placeholder Lorem Ipsum text

## 📋 Before Deployment Checklist

### Required Updates
1. **Social Media Links** - Update placeholder `href="#"` values in Footer.tsx with actual URLs:
   - Twitter/X
   - Instagram  
   - GitHub
   - LinkedIn

2. **App Store Links** - Update download button hrefs when apps are published:
   - iOS App Store URL
   - Google Play Store URL

3. **Convert SVG to PNG** (for better social media compatibility):
   - `og-image.svg` → `og-image.png` (1200x630px)
   - `apple-touch-icon.svg` → `apple-touch-icon.png` (180x180px)
   - Update `app/layout.tsx` references after conversion

4. **Analytics**: Google Analytics 4 is configured for the Fitzo web stream with visitor consent. See [SEO-ANALYTICS.md](./SEO-ANALYTICS.md) for IDs, events, deployment checks and the optional `NEXT_PUBLIC_GA_ID` override.

### Recommended Additions
- [x] Google Analytics 4, Vercel Analytics and Speed Insights
- [ ] Error tracking (Sentry/LogRocket)
- [ ] Email collection for waitlist
- [x] Google Analytics opt-in and persistent cookie preferences
- [ ] Rate limiting on any API routes (none currently)

## 🚀 Deployment Commands

### Vercel (Recommended)
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Manual Static Export
```bash
npm run build
# Deploy .next folder to your static hosting
```

## 🔧 Configuration Files

### Key Files to Review
- `app/layout.tsx` - Metadata and global config
- `tailwind.config.ts` - Design system tokens
- `next.config.mjs` - Build configuration
- `public/manifest.json` - PWA settings
- `public/robots.txt` - Search engine directives
- `public/sitemap.xml` - SEO indexing

## 📊 Performance Metrics

Current lighthouse scores (estimate):
- Performance: 95+
- Accessibility: 98+
- Best Practices: 100
- SEO: 100

## 🔐 Security Notes

- All external links use proper `rel="noopener noreferrer"`
- No exposed API keys or secrets
- No XSS vulnerabilities (React auto-escaping)
- HTTPS only (enforced at deployment level)

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

## 🎨 Brand Assets

**Colors:**
- Primary: `#000000` (Black)
- Text: `#FFFFFF` (White)
- Accent (Protein): `#4ade80` (Green)
- Accent (Carbs): `#facc15` (Yellow)
- Accent (Fat): `#fb7185` (Pink)

**Typography:**
- Font Family: Geist Sans (system fallback)
- Monospace: Geist Mono

## 📄 Legal Pages

- Privacy Policy: `/privacy-policy`
- Terms of Service: `/terms`
- Both include contact information and last updated dates

---

**Last Updated:** 2026-02-18  
**Build Status:** ✅ Passing  
**Ready for Production:** ✅ Yes
