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

function saveConsent(value: Exclude<Consent, null>) {
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

export function PrivacyConsent() {
  const consent = useSyncExternalStore(
    (onChange) => {
      window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
      window.addEventListener("storage", onChange);
      return () => {
        window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
        window.removeEventListener("storage", onChange);
      };
    },
    readConsent,
    () => null,
  );

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
