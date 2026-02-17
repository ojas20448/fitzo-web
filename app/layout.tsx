import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  metadataBase: new URL("https://fitzo.app"),
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
    url: "https://fitzo.app",
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
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  other: {
    "apple-itunes-app": "app-id=XXXXXXXXXX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
