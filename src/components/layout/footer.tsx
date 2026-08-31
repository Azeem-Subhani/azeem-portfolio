import Link from "next/link";
import { Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/content/profile";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: profile.githubUrl, label: "GitHub profile", icon: GithubIcon },
  { href: profile.linkedinUrl, label: "LinkedIn profile", icon: LinkedinIcon },
  { href: `mailto:${profile.email}`, label: "Send an email", icon: Mail },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold tracking-tight">
            {profile.name}
          </p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            {profile.title} based in {profile.location}.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  aria-label={link.label}
                  className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon aria-hidden="true" className="size-4" />
                </a>
              );
            })}
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="grid gap-2 text-sm">
            {navigation.map((item) => (
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
      </div>

      <p className="mx-auto mt-10 max-w-7xl text-xs text-muted-foreground">
        © {year} {profile.name}. Built with Next.js and Tailwind CSS.
      </p>
    </footer>
  );
}
