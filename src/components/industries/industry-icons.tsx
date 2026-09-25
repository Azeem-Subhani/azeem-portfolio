import {
  BookOpen,
  Building2,
  CalendarDays,
  CreditCard,
  Database,
  Film,
  Fingerprint,
  Gauge,
  Globe,
  GraduationCap,
  Heart,
  House,
  KeyRound,
  Landmark,
  Layers,
  Lock,
  Map,
  MessageSquare,
  Radio,
  RefreshCw,
  Route,
  ScrollText,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Split,
  Stethoscope,
  Store,
  Trophy,
  Truck,
  Users,
  Bell,
  Video,
  Wallet,
  Waypoints,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { IndustryIcon, IndustryTone } from "@/types/content";

export const industryIconMap: Record<IndustryIcon, LucideIcon> = {
  card: CreditCard,
  wallet: Wallet,
  shield: ShieldCheck,
  key: KeyRound,
  lock: Lock,
  landmark: Landmark,
  refresh: RefreshCw,
  database: Database,
  fingerprint: Fingerprint,
  scroll: ScrollText,
  waypoints: Waypoints,
  split: Split,
  cart: ShoppingCart,
  store: Store,
  zap: Zap,
  layers: Layers,
  users: Users,
  gauge: Gauge,
  heart: Heart,
  stethoscope: Stethoscope,
  video: Video,
  calendar: CalendarDays,
  graduation: GraduationCap,
  book: BookOpen,
  sparkles: Sparkles,
  home: House,
  map: Map,
  building: Building2,
  truck: Truck,
  route: Route,
  radio: Radio,
  bell: Bell,
  film: Film,
  message: MessageSquare,
  globe: Globe,
  trophy: Trophy,
};

/**
 * Canvas and inline effects (ClickSpark, SpotlightCard) cannot read CSS variables, so each
 * tone carries its accent as literal values. Keep in step with [data-industry-tone] in globals.css.
 */
export const toneColors: Record<IndustryTone, { hex: string; spotlight: `rgba(${number}, ${number}, ${number}, ${number})` }> = {
  green: { hex: "#859900", spotlight: "rgba(133, 153, 0, 0.16)" },
  red: { hex: "#d3302d", spotlight: "rgba(211, 48, 45, 0.14)" },
  yellow: { hex: "#b58900", spotlight: "rgba(181, 137, 0, 0.16)" },
  cyan: { hex: "#2aa198", spotlight: "rgba(42, 161, 152, 0.16)" },
  violet: { hex: "#6367b4", spotlight: "rgba(99, 103, 180, 0.16)" },
  orange: { hex: "#c24815", spotlight: "rgba(194, 72, 21, 0.14)" },
  blue: { hex: "#1f74b0", spotlight: "rgba(31, 116, 176, 0.16)" },
  magenta: { hex: "#c8337b", spotlight: "rgba(200, 51, 123, 0.14)" },
};

export function IconMark({ icon, className }: { icon: IndustryIcon; className?: string }) {
  const Icon = industryIconMap[icon];
  return (
    <span
      aria-hidden="true"
      data-im-icon
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-background/60 text-[var(--accent-readable)] transition-colors duration-300 group-hover:border-accent/50",
        className,
      )}
    >
      <Icon
        className="size-5 transition-transform duration-500 ease-out group-hover:-rotate-12 group-hover:scale-110 motion-reduce:transition-none"
        strokeWidth={1.6}
      />
    </span>
  );
}
