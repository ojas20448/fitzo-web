import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fitzo Gym Buddy Invite",
  description: "Open a gym buddy invitation in the Fitzo app.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/buddy" },
};

export default function BuddyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
