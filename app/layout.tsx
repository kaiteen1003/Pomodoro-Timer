import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  verification: {
    google: "wibE1p5nHviwBAkIhkZyoLbn80EHdwEdDNp4IlED7BY",
  },
  title: "52/17 Timer — Focus & Break Productivity Timer",
  description: "The 52/17 productivity timer. Work focused for 52 minutes, then take a 17-minute break. Free online timer with sound alerts, auto-switch, and 20 languages.",
  keywords: ["52/17 timer", "52 17 rule", "productivity timer", "focus timer", "pomodoro alternative", "work break timer", "study timer"],
  openGraph: {
    title: "52/17 Timer — Focus & Break Productivity Timer",
    description: "Work focused for 52 minutes, break for 17. The science-backed productivity timer.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "52/17 Timer",
    description: "Work focused for 52 minutes, break for 17. Free productivity timer.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
