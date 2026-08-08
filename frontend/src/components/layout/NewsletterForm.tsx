"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { site } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

export function NewsletterForm() {
  const [status, setStatus] = React.useState<"idle" | "ok" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: "onTouched" });

  async function onSubmit(values: FormValues) {
    setStatus("idle");
    try {
      const res = await fetch(`${site.apiUrl}/api/v1/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      trackEvent("newsletter_subscribe");
      setStatus("ok");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-lg"
      noValidate
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Work email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Enter your work email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "newsletter-error" : undefined}
            className={cn(
              "h-12 w-full rounded-xl border bg-surface-elevated px-4 text-sm text-foreground transition-all duration-200 placeholder:text-muted-faint focus:outline-none focus:ring-2 focus:ring-brand/25",
              errors.email
                ? "border-error/70 focus:border-error focus:ring-error/20"
                : "border-border-strong focus:border-brand",
            )}
            {...register("email")}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-semibold text-white transition-all duration-300 ease-premium hover:bg-brand-fierce hover:shadow-lift-brand disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
              Subscribing…
            </>
          ) : (
            <>
              Subscribe
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1"
              />
            </>
          )}
        </button>
      </div>

      {/* Status region — reserved space is not needed, messages are short */}
      {errors.email && (
        <p
          id="newsletter-error"
          role="alert"
          className="mt-2.5 flex items-center gap-1.5 text-xs text-error"
        >
          <AlertCircle aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
          {errors.email.message}
        </p>
      )}
      {status === "ok" && (
        <p
          role="status"
          className="mt-2.5 flex items-center gap-1.5 text-xs text-success"
        >
          <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
          Subscribed — welcome aboard.
        </p>
      )}
      {status === "error" && (
        <p
          role="alert"
          className="mt-2.5 flex items-center gap-1.5 text-xs text-error"
        >
          <AlertCircle aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
