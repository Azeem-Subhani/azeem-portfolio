"use client";

import Script from "next/script";
import Link from "next/link";
import { useSyncExternalStore } from "react";

const ANALYTICS_ID = process.env.NEXT_PUBLIC_GA_ID;
const CONSENT_COOKIE = "azeem-analytics-consent";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 180;
const CONSENT_CHANGE_EVENT = "azeem-analytics-consent-change";

type Consent = "accepted" | "rejected" | null;

function readConsent(): Consent {
  if (typeof document === "undefined") return null;

  const value = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${CONSENT_COOKIE}=`))
    ?.split("=")[1];

  return value === "accepted" || value === "rejected" ? value : null;
}

function writeConsentCookie(value: string, maxAge: number) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
}

/**
 * Stops Google Analytics for the rest of this page load and deletes the
 * cookies it set. GA writes `_ga` and `_ga_<id>` on the current host or a
 * parent domain, so each is expired on every domain level it could live on.
 */
function setAnalyticsDisabled(disabled: boolean) {
  if (ANALYTICS_ID) {
    (window as unknown as Record<string, boolean>)[`ga-disable-${ANALYTICS_ID}`] = disabled;
  }
}

function disableAnalytics() {
  setAnalyticsDisabled(true);

  const hostParts = window.location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < hostParts.length - 1; i++) {
    const domain = hostParts.slice(i).join(".");
    domains.push(`; Domain=${domain}`, `; Domain=.${domain}`);
  }

  document.cookie
    .split(";")
    .map((part) => part.trim().split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_"))
    .forEach((name) => {
      domains.forEach((domain) => {
        document.cookie = `${name}=; Max-Age=0; Path=/${domain}`;
      });
    });
}

function saveConsent(value: Exclude<Consent, null>) {
  writeConsentCookie(value, COOKIE_MAX_AGE);
  if (value === "rejected") disableAnalytics();
  else setAnalyticsDisabled(false);
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

/** Forgets the stored choice so the consent banner shows again. */
function resetConsent() {
  writeConsentCookie("", 0);
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
}

/**
 * Footer control that lets a visitor change or withdraw their analytics
 * choice at any time. Renders nothing when analytics is not configured.
 */
export function ConsentSettingsButton({ className }: { className?: string }) {
  if (!ANALYTICS_ID) return null;

  return (
    <button type="button" onClick={resetConsent} className={className}>
      Cookie settings
    </button>
  );
}

export function PrivacyConsent() {
  const consent = useSyncExternalStore(subscribe, readConsent, () => null);

  // There is nothing to consent to until a measurement ID is configured.
  if (!ANALYTICS_ID) return null;

  const chooseConsent = (value: Exclude<Consent, null>) => {
    saveConsent(value);
  };

  return (
    <>
      {consent === "accepted" ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ANALYTICS_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}

      {consent === null ? (
        <aside
          role="dialog"
          aria-labelledby="analytics-consent-title"
          className="fixed inset-x-3 bottom-3 z-[60] rounded-2xl border border-border bg-background/95 p-5 shadow-2xl shadow-black/15 backdrop-blur-xl sm:inset-x-auto sm:right-6 sm:max-w-sm"
        >
          <h2 id="analytics-consent-title" className="text-sm font-medium">
            A small privacy choice
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            I use Google Analytics only to understand which pages are useful.
            It stays off unless you choose to allow it. {" "}
            <Link href="/privacy" className="underline underline-offset-4">
              Read the privacy policy.
            </Link>
          </p>
          <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => chooseConsent("rejected")}
              className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-surface-elevated"
            >
              No thanks
            </button>
            <button
              type="button"
              onClick={() => chooseConsent("accepted")}
              className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-strong"
            >
              Allow analytics
            </button>
          </div>
        </aside>
      ) : null}
    </>
  );
}
