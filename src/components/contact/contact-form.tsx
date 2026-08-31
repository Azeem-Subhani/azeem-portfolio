"use client";

import { useId, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { profile } from "@/content/profile";
import { contactFormSchema, contactServices, type ContactFormValues } from "@/lib/schemas";

type SubmitState = "idle" | "success" | "error";

export function ContactForm() {
  const formId = useId();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
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
      className="flex flex-col gap-6 rounded-lg border border-border bg-surface p-6 sm:p-8"
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
        <Input
          id={`${formId}-phone`}
          type="tel"
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
          {...register("phone")}
        />
        {errors.phone ? (
          <p id={`${formId}-phone-error`} className="text-sm text-error">
            {errors.phone.message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`${formId}-service`}>Service</Label>
        <Controller
          control={control}
          name="service"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id={`${formId}-service`}
                aria-invalid={Boolean(errors.service)}
                aria-describedby={
                  errors.service ? `${formId}-service-error` : undefined
                }
              >
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {contactServices.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.service ? (
          <p id={`${formId}-service-error`} className="text-sm text-error">
            {errors.service.message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`${formId}-message`}>Message</Label>
        <Textarea
          id={`${formId}-message`}
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

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={isSubmitting} className="sm:w-fit">
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
            <span className="flex items-center gap-2 text-success">
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
