"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

export function NewsletterForm() {
  const [status, setStatus] = React.useState<"idle" | "ok" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

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
      className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
      noValidate
    >
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <Input
          id="newsletter-email"
          type="email"
          placeholder="Your email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "newsletter-error" : undefined}
          {...register("email")}
        />
        {errors.email && (
          <p id="newsletter-error" role="alert" className="mt-1 text-xs text-error">
            {errors.email.message}
          </p>
        )}
        {status === "ok" && (
          <p role="status" className="mt-1 text-xs text-success">
            Subscribed — welcome aboard!
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="mt-1 text-xs text-error">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Subscribing…" : "Subscribe"}
      </Button>
    </form>
  );
}
