import { ContactCta } from "@/components/sections/contact-cta";
import { FeatureCards } from "@/components/sections/feature-cards";
import { Hero } from "@/components/sections/hero";
import { ServiceChapters } from "@/components/sections/service-chapters";
import { TechStack } from "@/components/sections/tech-stack";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureCards />
      <TechStack />
      <ServiceChapters />
      <ContactCta />
    </>
  );
}
