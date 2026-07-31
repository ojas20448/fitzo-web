import type { Metadata, Viewport } from "next";
import { Archivo, Martian_Mono } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

/* ━━━ Display + UI: Archivo. A signage grotesque with real width authority —
       it holds up at 900 weight for headlines and at 400 for body. ━━━ */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

/* ━━━ Measured values only: sets, weights, macros, receipts. ━━━ */
const martianMono = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

/* ━━━ SEO Metadata ━━━ */
export const metadata: Metadata = {
  metadataBase: new URL("https://www.fitzoapp.in"),
  title: {
    default: "Fitzo — Train Smarter, Build Faster",
    template: "%s — Fitzo",
  },
  description:
    "Track workouts, macros, and progress with precision. 10+ training splits, AI nutrition, QR gym check-in, gym buddies, and science-backed education. Built for lifters who value data.",
  keywords: [
    "fitness tracker",
    "macro tracking",
    "workout app",
    "science-based training",
    "gym app",
    "PPL split",
    "nutrition tracker",
    "AI nutrition",
    "evidence-based fitness",
    "calorie counter",
    "hypertrophy training",
    "gym check-in app",
    "gym buddies",
    "indian food calorie tracker",
    "gym class booking",
  ],
  authors: [{ name: "Fitzo" }],
  creator: "Fitzo",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.fitzoapp.in",
    title: "Fitzo — Train Smarter, Build Faster",
    description:
      "Track workouts, macros, and progress with precision. 10+ training splits, AI nutrition, QR gym check-in, gym buddies, and science-backed education. Built for lifters who value data.",
    siteName: "Fitzo",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fitzo — Science-Based Fitness Tracking",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fitzo — Train Smarter, Build Faster",
    description:
      "Track workouts, macros, and progress with precision. Built for lifters who value data.",
    creator: "@fitzoapp",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* Single committed dark world — `dark` is permanent, not a toggle state. */
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${archivo.variable} ${martianMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-protein focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-black"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
