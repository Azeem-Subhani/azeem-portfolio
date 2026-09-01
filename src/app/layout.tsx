import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { profile } from "@/content/profile";

import "./globals.css";

// Only the display face (hero h1) is preloaded. Inter still loads, just
// without competing for bandwidth during the initial paint.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FDF6E3" },
    { media: "(prefers-color-scheme: dark)", color: "#002B36" },
  ],
};

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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${inter.variable}`}
    >
      <body className="antialiased">
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
