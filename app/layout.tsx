import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

/* ━━━ SEO Metadata ━━━ */
export const metadata: Metadata = {
  metadataBase: new URL("https://www.fitzoapp.in"),
  title: {
    default: "Fitzo — Train Smarter, Build Faster",
    template: "%s — Fitzo",
  },
  description:
    "Track workouts, macros, and progress with precision. 10+ training splits, AI nutrition, and science-backed education. Built for lifters who value data.",
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
      "Track workouts, macros, and progress with precision. 10+ training splits, AI nutrition, and science-backed education. Built for lifters who value data.",
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
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("scroll-smooth dark", "font-sans", geist.variable)} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black text-black dark:text-white transition-colors duration-300`}
      >
        <ThemeProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
