"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckCircle2, ChevronDown, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { countries } from "@/content/countries";
import { profile } from "@/content/profile";
import { contactFormSchema, type ContactFormValues } from "@/lib/schemas";

type SubmitState = "idle" | "success" | "error";

const sortedCountries = [...countries].sort((a, b) => a.name.localeCompare(b.name));

export function ContactForm() {
  const formId = useId();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState("US");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
  const countryMenuRef = useRef<HTMLDivElement>(null);
  const countryTriggerRef = useRef<HTMLButtonElement>(null);
  const countryOptionRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const typeaheadRef = useRef({ query: "", lastTypedAt: 0 });
  const [highlightedCountryCode, setHighlightedCountryCode] = useState("US");

  const selectedCountry = countries.find(({ code }) => code === countryCode) ?? countries[0];

  const focusCountryOption = (code: string) => {
    setHighlightedCountryCode(code);
    window.requestAnimationFrame(() => {
      const option = countryOptionRefs.current[code];
      option?.focus({ preventScroll: true });
      option?.scrollIntoView({ block: "nearest" });
    });
  };

  const handleCountryMenuKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    const currentIndex = sortedCountries.findIndex(
      ({ code }) => code === highlightedCountryCode,
    );
    const activeIndex = currentIndex >= 0 ? currentIndex : 0;

    if (event.key === "Escape") {
      event.preventDefault();
      setIsCountryMenuOpen(false);
      countryTriggerRef.current?.focus();
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex = (activeIndex + direction + sortedCountries.length) % sortedCountries.length;
      const nextCountry = sortedCountries[nextIndex];
      if (!isCountryMenuOpen) setIsCountryMenuOpen(true);
      focusCountryOption(nextCountry.code);
      return;
    }

    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const nextCountry =
        event.key === "Home"
          ? sortedCountries[0]
          : sortedCountries[sortedCountries.length - 1];
      if (!nextCountry) return;
      if (!isCountryMenuOpen) setIsCountryMenuOpen(true);
      focusCountryOption(nextCountry.code);
      return;
    }

    if (!/^[a-z]$/i.test(event.key)) return;

    event.preventDefault();
    const now = Date.now();
    const previous = typeaheadRef.current;
    const character = event.key.toLocaleLowerCase();
    const withinTypeaheadWindow = now - previous.lastTypedAt < 500;
    const query = withinTypeaheadWindow ? `${previous.query}${character}` : character;
    const findMatch = (searchQuery: string) => {
      const matches = sortedCountries.filter(({ name }) =>
        name.trim().toLocaleLowerCase().startsWith(searchQuery),
      );
      return (
        matches.find(
          ({ code }) => sortedCountries.findIndex((country) => country.code === code) > activeIndex,
        ) ?? matches[0]
      );
    };

    // Repeated letters cycle through the countries beginning with that letter.
    let matchedQuery = query;
    let match = findMatch(matchedQuery);
    if (!match && query.length > 1) {
      matchedQuery = character;
      match = findMatch(matchedQuery);
    }
    typeaheadRef.current = {
      query: match ? matchedQuery : character,
      lastTypedAt: now,
    };

    if (match) {
      if (!isCountryMenuOpen) setIsCountryMenuOpen(true);
      focusCountryOption(match.code);
    }
  };

  useEffect(() => {
    if (!isCountryMenuOpen) {
      typeaheadRef.current = { query: "", lastTypedAt: 0 };
      return;
    }

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!countryMenuRef.current?.contains(event.target as Node)) {
        setIsCountryMenuOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCountryMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isCountryMenuOpen]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      company: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitState("idle");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        setSubmitState("error");
        setErrorMessage(
          data?.message ?? "Something went wrong. Please try again.",
        );
        return;
      }

      setSubmitState("success");
      reset();
      setPhoneNumber("");
    } catch {
      setSubmitState("error");
      setErrorMessage(
        "Couldn't reach the server. Please try again or email me directly.",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Contact form"
      className="relative flex flex-col gap-6 rounded-2xl border border-border bg-surface/80 p-6 shadow-[0_18px_50px_rgb(var(--shadow-color)/0.08)] backdrop-blur-sm sm:p-8"
    >
      {/* Honeypot: hidden from sighted users and assistive tech. Real visitors never fill it. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${formId}-company`}>Company</label>
        <input
          id={`${formId}-company`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor={`${formId}-name`}>Name</Label>
          <Input
            id={`${formId}-name`}
            required
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            {...register("name")}
          />
          {errors.name ? (
            <p id={`${formId}-name-error`} className="text-sm text-error">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <Label htmlFor={`${formId}-email`}>Email</Label>
          <Input
            id={`${formId}-email`}
            required
            placeholder="you@example.com"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            {...register("email")}
          />
          {errors.email ? (
            <p id={`${formId}-email-error`} className="text-sm text-error">
              {errors.email.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`${formId}-phone`}>
          Phone <span className="text-muted-foreground">(optional)</span>
        </Label>
        <div
          className={`flex min-h-12 w-full items-center rounded-2xl border bg-surface-elevated px-3 transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20 ${errors.phone ? "border-error" : "border-muted-foreground/35"}`}
        >
          <div ref={countryMenuRef} className="relative shrink-0">
            <button
              type="button"
              ref={countryTriggerRef}
              aria-label="Choose country"
              aria-haspopup="listbox"
              aria-expanded={isCountryMenuOpen}
              aria-controls={`${formId}-country-menu`}
              className="flex h-9 items-center gap-2 rounded-md px-1 text-xl leading-none outline-none transition-colors hover:bg-background focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => {
                setIsCountryMenuOpen((open) => !open);
                if (!isCountryMenuOpen) setHighlightedCountryCode(countryCode);
              }}
              onKeyDown={handleCountryMenuKeyDown}
            >
              <span aria-hidden="true">{selectedCountry.flag}</span>
              <ChevronDown
                aria-hidden="true"
                className={`size-4 text-muted-foreground transition-transform ${isCountryMenuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isCountryMenuOpen ? (
              <div
                id={`${formId}-country-menu`}
                role="listbox"
                aria-label="Country list"
                onKeyDown={handleCountryMenuKeyDown}
                data-lenis-prevent-wheel
                data-lenis-prevent-touch
                className="absolute left-0 top-[calc(100%+0.75rem)] z-30 max-h-72 w-[min(21rem,calc(100vw-4rem))] overscroll-contain overflow-y-auto rounded-md border border-border bg-background p-2 shadow-2xl shadow-black/20"
              >
                {sortedCountries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    ref={(element) => {
                      countryOptionRefs.current[country.code] = element;
                    }}
                    role="option"
                    aria-selected={country.code === countryCode}
                    data-highlighted={country.code === highlightedCountryCode}
                    className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left text-sm transition-colors hover:bg-surface-elevated aria-[selected=true]:bg-accent/15 data-[highlighted=true]:bg-surface-elevated"
                    onClick={() => {
                      setCountryCode(country.code);
                      setHighlightedCountryCode(country.code);
                      setIsCountryMenuOpen(false);
                      countryTriggerRef.current?.focus();
                      setValue(
                        "phone",
                        phoneNumber ? `${country.dialCode} ${phoneNumber}` : "",
                        { shouldValidate: true },
                      );
                    }}
                  >
                    <span className="w-8 text-xl leading-none" aria-hidden="true">
                      {country.flag}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-base">{country.name}</span>
                    <span className="text-base text-muted-foreground">{country.dialCode}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <span className="mx-3 h-6 w-px bg-border" aria-hidden="true" />
          <span className="shrink-0 text-base text-foreground" aria-hidden="true">
            {selectedCountry.dialCode}
          </span>
          <Input
            id={`${formId}-phone`}
            type="tel"
            inputMode="tel"
            placeholder="Phone number"
            autoComplete="tel-national"
            {...register("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
            className="h-10 min-w-0 border-0 bg-transparent px-3 shadow-none focus-visible:outline-none"
            value={phoneNumber}
            onChange={(event) => {
              const nextPhoneNumber = event.target.value;
              setPhoneNumber(nextPhoneNumber);
              setValue(
                "phone",
                nextPhoneNumber
                  ? `${selectedCountry.dialCode} ${nextPhoneNumber}`
                  : "",
                { shouldValidate: true },
              );
            }}
          />
        </div>
        {errors.phone ? (
          <p id={`${formId}-phone-error`} className="text-sm text-error">
            {errors.phone.message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`${formId}-message`}>Message</Label>
        <Textarea
          id={`${formId}-message`}
          required
          placeholder="What are you hoping to build?"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          {...register("message")}
        />
        {errors.message ? (
          <p id={`${formId}-message-error`} className="text-sm text-error">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-fit">
          {isSubmitting ? (
            <>
              <Loader2 aria-hidden="true" className="mr-2 size-4 animate-spin" />
              Sending
            </>
          ) : (
            "Send message"
          )}
        </Button>

        <p role="status" aria-live="polite" className="text-sm">
          {submitState === "success" ? (
            <span className="flex items-center gap-2 text-accent">
              <CheckCircle2 aria-hidden="true" className="size-4" />
              Message sent. I&apos;ll get back to you soon.
            </span>
          ) : null}
          {submitState === "error" ? (
            <span className="text-error">
              {errorMessage}{" "}
              <a href={`mailto:${profile.email}`} className="underline">
                {profile.email}
              </a>
            </span>
          ) : null}
        </p>
      </div>
    </form>
  );
}
