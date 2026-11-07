import type { Metadata, Viewport } from "next";
import { Archivo, Martian_Mono } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_URL } from "@/lib/links";
import { HOME_TITLE, HOME_DESCRIPTION, pageMetadata } from "@/lib/seo";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import GoogleAnalytics from "@/components/GoogleAnalytics";

/* ━━━ Display + UI: Archivo. A signage grotesque with real width authority :
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
  themeColor: "#080a0d",
  colorScheme: "dark",
};

/* ━━━ SEO Metadata ━━━ */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...pageMetadata(HOME_TITLE, HOME_DESCRIPTION, "/"),
  authors: [{ name: "Fitzo" }],
  creator: "Fitzo",
  manifest: "/manifest.json",
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
    /* Single committed dark world: `dark` is permanent, not a toggle state. */
    <html lang="en-IN" className="dark scroll-smooth" suppressHydrationWarning>
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
        <GoogleAnalytics measurementId={process.env.NODE_ENV === "production" && process.env.VERCEL_ENV !== "preview" ? GA_MEASUREMENT_ID : undefined} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
