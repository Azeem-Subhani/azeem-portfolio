import {
  Cloud,
  CreditCard,
  Database,
  Film,
  Globe,
  GraduationCap,
  Heart,
  House,
  Layers,
  ShoppingCart,
  Smartphone,
  Truck,
} from "lucide-react";

export const serviceIcons = {
  cloud: Cloud,
  web: Globe,
  mobile: Smartphone,
  data: Database,
} as const;

export const industryIcons = {
  fintech: CreditCard,
  healthtech: Heart,
  ecommerce: ShoppingCart,
  saas: Layers,
  education: GraduationCap,
  "real-estate": House,
  logistics: Truck,
  media: Film,
} as const;
