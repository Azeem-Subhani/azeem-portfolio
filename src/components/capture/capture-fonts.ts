import {
  Archivo,
  Hanken_Grotesk,
  Instrument_Sans,
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
  Playfair_Display,
} from "next/font/google";

/**
 * Typefaces for the live project captures, self-hosted through next/font.
 *
 * The capture stylesheets used to `@import` these from fonts.googleapis.com. A failed
 * import makes the browser fail the whole <link>, and the chunk loader then drops the
 * stylesheet, so one blocked or flaky font request left every mockup unstyled. Serving
 * the fonts from our own build removes that third-party dependency from the CSS path.
 *
 * Each capture root adds its set's variable classes; its stylesheet reads the
 * `--font-capture-*` properties. Nothing is preloaded: the files download only when a
 * capture actually renders text in that face.
 */

// Families the site shell doesn't load are variable fonts: one file covers every weight
// the captures use.
const archivo = Archivo({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-capture-archivo",
  display: "swap",
  preload: false,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-capture-jetbrains-mono",
  display: "swap",
  preload: false,
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-capture-instrument-sans",
  display: "swap",
  preload: false,
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-capture-hanken-grotesk",
  display: "swap",
  preload: false,
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-capture-playfair-display",
  display: "swap",
  preload: false,
});

// Inter and Instrument Serif are also loaded by the root layout. Static weights here
// (the ones the captures asked Google for) keep the shared weights on the same files.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-capture-inter",
  display: "swap",
  preload: false,
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-capture-instrument-serif",
  display: "swap",
  preload: false,
});

export const gamingGlobalFonts = `${archivo.variable} ${jetbrainsMono.variable}`;
export const oxymFonts = archivo.variable;
export const realTimeChatFonts = `${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`;
export const smartLivingFonts = inter.variable;
export const taskManagerFonts = `${hankenGrotesk.variable} ${instrumentSerif.variable}`;
export const trackHeroFonts = `${inter.variable} ${jetbrainsMono.variable}`;
export const woodyShopFonts = `${inter.variable} ${playfairDisplay.variable}`;
