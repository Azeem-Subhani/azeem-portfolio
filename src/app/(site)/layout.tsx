import { SmoothScroll } from "@/components/motion/smooth-scroll";

import "lenis/dist/lenis.css";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SmoothScroll>{children}</SmoothScroll>;
}
