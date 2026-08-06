"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

const budgets = [
  "Under $25k",
  "$25k – $50k",
  "$50k – $100k",
  "$100k – $250k",
  "$250k+",
] as const;

const timelines = [
  "ASAP",
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "Flexible",
] as const;

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  company: z.string().min(1, "Please enter your company name"),
  email: z.string().email("Enter a valid work email"),
  phone: z
    .string()
    .min(7, "Enter a valid phone number")
    .regex(/^[+\d\s().-]+$/, "Enter a valid phone number")
    .or(z.literal("")),
  projectDetails: z
    .string()
    .min(20, "Tell us a little more — at least 20 characters"),
  budget: z.enum(budgets, { message: "Select a budget range" }),
  timeline: z.enum(timelines, { message: "Select a timeline" }),
  /** Honeypot — must stay empty; bots fill it. */
  website: z.string().max(0).optional(),
});

type ContactValues = z.infer<typeof contactSchema>;

/** Inline homepage contact form — Design Review "TOP PRIORITY" #11.
 *  Validated with Zod, submitted to FastAPI which forwards to HubSpot. */
export function ContactSection() {
  const [status, setStatus] = React.useState<"idle" | "ok" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactValues) {
    setStatus("idle");
    try {
      const res = await fetch(`${site.apiUrl}/api/v1/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      trackEvent("form_submit", { form: "contact" });
      setStatus("ok");
      reset();
    } catch {
      trackEvent("form_submit_error", { form: "contact" });
      setStatus("error");
    }
  }

  const err = (field: keyof ContactValues) =>
    errors[field] ? (
      <p role="alert" className="mt-1 text-xs text-error">
        {errors[field]?.message as string}
      </p>
    ) : null;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-padding bg-surface/30"
    >
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <span className="eyebrow">Ready to Start?</span>
            <h2 id="contact-heading" className="section-heading mt-5">
              Build What&apos;s Next
            </h2>
            <p className="section-subheading">
              From idea to launch, we help companies move faster, build
              smarter, and scale with confidence. Tell us about your project
              and we&apos;ll reply within one business day.
            </p>
            <dl className="mt-8 space-y-3 text-sm">
              <div className="flex gap-2">
                <dt className="font-semibold text-foreground">Email:</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="text-brand hover:underline">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold text-foreground">Phone:</dt>
                <dd>
                  <a
                    href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                    className="text-brand hover:underline"
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
            </dl>
            <p className="mt-8 inline-flex rounded-full border border-brand/40 bg-brand/10 px-5 py-2.5 text-sm font-medium text-brand">
              Get a Free Website &amp; AI Readiness Audit — No Commitment
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="rounded-2xl border border-border bg-surface p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="contact-name">Full Name *</Label>
                <Input
                  id="contact-name"
                  autoComplete="name"
                  className="mt-1.5"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
                {err("name")}
              </div>
              <div>
                <Label htmlFor="contact-company">Company *</Label>
                <Input
                  id="contact-company"
                  autoComplete="organization"
                  className="mt-1.5"
                  aria-invalid={!!errors.company}
                  {...register("company")}
                />
                {err("company")}
              </div>
              <div>
                <Label htmlFor="contact-email">Work Email *</Label>
                <Input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  className="mt-1.5"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                {err("email")}
              </div>
              <div>
                <Label htmlFor="contact-phone">Phone</Label>
                <Input
                  id="contact-phone"
                  type="tel"
                  autoComplete="tel"
                  className="mt-1.5"
                  aria-invalid={!!errors.phone}
                  {...register("phone")}
                />
                {err("phone")}
              </div>
              <div>
                <Label htmlFor="contact-budget">Budget *</Label>
                <Select
                  id="contact-budget"
                  className="mt-1.5"
                  defaultValue=""
                  aria-invalid={!!errors.budget}
                  {...register("budget")}
                >
                  <option value="" disabled>
                    Select a range
                  </option>
                  {budgets.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </Select>
                {err("budget")}
              </div>
              <div>
                <Label htmlFor="contact-timeline">Timeline *</Label>
                <Select
                  id="contact-timeline"
                  className="mt-1.5"
                  defaultValue=""
                  aria-invalid={!!errors.timeline}
                  {...register("timeline")}
                >
                  <option value="" disabled>
                    Select a timeline
                  </option>
                  {timelines.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </Select>
                {err("timeline")}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="contact-details">Project Details *</Label>
                <Textarea
                  id="contact-details"
                  placeholder="What are you building? What problem does it solve?"
                  className="mt-1.5"
                  aria-invalid={!!errors.projectDetails}
                  {...register("projectDetails")}
                />
                {err("projectDetails")}
              </div>
              {/* Honeypot field — hidden from real users */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px]"
                {...register("website")}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="mt-7 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending…" : "Schedule Consultation →"}
            </Button>

            {status === "ok" && (
              <p
                role="status"
                className="mt-4 flex items-center gap-2 text-sm text-success"
              >
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                Thanks — your message is in. We&apos;ll reply within one
                business day.
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="mt-4 text-sm text-error">
                Something went wrong sending your message. Please retry or
                email us directly at {site.email}.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
