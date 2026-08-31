import type { Metadata } from "next";
import { DM_Mono, Inter_Tight, Syne } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { profile } from "@/content/profile";

import "./globals.css";

// Only the display font (used in the above-the-fold hero h1) is preloaded.
// Body and mono fonts still load, just without competing for bandwidth
// during the initial paint.
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
  preload: false,
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} | Full-Stack & AI Application Engineer`,
    template: `%s | ${profile.name}`,
  },
  description:
    "Senior full-stack engineer building SaaS, payments, booking, real-time, and AI-enabled applications with React, Next.js, NestJS, Django, PostgreSQL, and AWS.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: profile.name,
    title: `${profile.name} | Full-Stack & AI Application Engineer`,
    description:
      "SaaS, payments, booking, real-time, and AI application engineering.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | Full-Stack & AI Application Engineer`,
    description:
      "SaaS, payments, booking, real-time, and AI application engineering.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${interTight.variable} ${dmMono.variable} antialiased`}
      >
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only z-[100] rounded-md bg-background px-4 py-2 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
