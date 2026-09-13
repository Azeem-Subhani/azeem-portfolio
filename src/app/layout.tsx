import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MobileCta } from "@/components/layout/mobile-cta";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { SiteIntro } from "@/components/motion/site-intro";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { PrivacyConsent } from "@/components/privacy/privacy-consent";
import { profile } from "@/content/profile";

import "lenis/dist/lenis.css";
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
  weight: ["200", "400", "500", "700", "900"],
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
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | Full-Stack & AI Application Engineer`,
    description:
      "SaaS, payments, booking, real-time, and AI application engineering.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${instrumentSerif.variable} ${inter.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var s=sessionStorage.getItem("azeem:intro-seen");document.documentElement.dataset.introState=s?"seen":"fresh";document.documentElement.dataset.heroReveal="pending"}catch{document.documentElement.dataset.introState="fresh";document.documentElement.dataset.heroReveal="pending"}',
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <SiteIntro />
          <SmoothScroll>
            <a
              href="#main-content"
              className="sr-only z-[100] rounded-md bg-background px-4 py-2 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
            >
              Skip to content
            </a>
            <Header />
            <main id="main-content">{children}</main>
            <MobileCta />
            <Footer />
          </SmoothScroll>
          <PrivacyConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
