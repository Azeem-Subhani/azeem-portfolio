import Link from "next/link";

import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { primaryNav, serviceNav } from "@/content/nav";
import { profile } from "@/content/profile";

const workNav = primaryNav.filter((item) => item.href !== "/");

const socialLinks = [
  { href: profile.githubUrl, label: "GitHub", icon: GithubIcon },
  { href: profile.linkedinUrl, label: "LinkedIn", icon: LinkedinIcon },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface px-4 py-16 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg font-normal tracking-tight">
            {profile.name}
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-3 block text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {profile.email}
          </a>
        </div>

        <nav aria-label="Services">
          <p className="text-sm font-medium">Services</p>
          <ul className="mt-3 grid gap-2 text-sm">
            {serviceNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Work">
          <p className="text-sm font-medium">Work</p>
          <ul className="mt-3 grid gap-2 text-sm">
            {workNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Social">
          <p className="text-sm font-medium">Contact</p>
          <ul className="mt-3 grid gap-2 text-sm">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon aria-hidden="true" className="size-4" />
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <p className="mx-auto mt-12 max-w-7xl text-xs text-muted-foreground">
        © {year} {profile.name}
      </p>
    </footer>
  );
}
