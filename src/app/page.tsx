import { Capabilities } from "@/components/sections/capabilities";
import { Certificates } from "@/components/sections/certificates";
import { ContactCta } from "@/components/sections/contact-cta";
import { Experience } from "@/components/sections/experience";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Experience />
      <Capabilities />
      <Certificates />
      <ContactCta />
    </>
  );
}
