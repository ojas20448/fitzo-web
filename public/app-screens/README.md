# Real Fitzo app screens

Captured on 7 November 2026 from the neighbouring `Fitzo/mobile` repository at commit `91965c8`, using its current Expo web export. These are app renders, not recreated website UI. The account, diary, friends and gym activity are fictional sample data.

| Asset | App route |
| --- | --- |
| workout.webp | / |
| food.webp | /food |
| gym.webp | /gym |
| friends.webp | /buddies |
| profile.webp | /profile |

Each image is 440 × 874 pixels. The website adds a decorative status bar and home indicator to form a 440:956 phone display; it does not stretch or redraw the app. Five compressed WebP assets total approximately 171 KB. `InteractiveDemo.tsx` provides the website's screen selectors and descriptive image alternatives.

To refresh, export the current mobile app with `EXPO_PUBLIC_API_URL` pointed at a local fixture server. Use the sample fixtures from `Fitzo/mobile/store-listing/tools/capture-offline.mjs`, with dates and response shapes updated for the current app. Capture the five routes at 440 × 874 after fonts, images and data have loaded, then convert to WebP at quality 92 using the website's installed Sharp dependency. Review every screen before replacing these files.

This capture used the local build and fixture harness in the website's ignored `output/real-app-*` files. Its fixture server allowed only local API connections; no live account was used. The app content is from the web renderer; native iOS/Android parity has not been device-verified. The surrounding phone hardware is presentation artwork.
