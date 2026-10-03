import Link from "next/link";

import { MagneticButton } from "@/components/motion/magnetic-button";
import { Button } from "@/components/ui/button";
import { profile } from "@/content/profile";
import { servicePath, services } from "@/content/services";
import type { ServicePageContent } from "@/types/content";

export function ServiceOutro({ service }: { service: ServicePageContent }) {
  const siblings = services.filter((item) => item.slug !== service.slug);

  return (
    <section aria-labelledby="service-cta-title" className="relative z-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-20 lg:flex-row lg:items-end lg:justify-between lg:py-28">
        <div className="max-w-2xl">
          <h2
            id="service-cta-title"
            className="text-balance font-display font-normal text-[clamp(2rem,4vw,3.75rem)] leading-[0.98]"
          >
            {service.ctaTitle}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
            {service.ctaCopy}
          </p>
          <nav aria-label="Other services" className="service-hero-also">
            <ul>
              {siblings.map((item) => (
                <li key={item.slug}>
                  <Link href={servicePath(item.slug)}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="grid w-full max-w-[17rem] gap-4" data-inline-cta>
          <MagneticButton className="w-full">
            <Button asChild size="lg" className="w-full">
              <Link href="/contact">Start a conversation</Link>
            </Button>
          </MagneticButton>
          <Button asChild size="lg" variant="outline" className="w-full">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
