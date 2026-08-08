"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { selectChevronStyle } from "@/components/ui/select";
import { consultationInterests } from "@/data/solutions";
import { site } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const interests = consultationInterests as [string, ...string[]];

const consultationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Please enter your full name")
    .max(120, "That name is too long"),
  email: z.string().min(1, "Work email is required").email("Enter a valid work email"),
  phone: z
    .string()
    .max(32, "That phone number is too long")
    .regex(/^[+\d\s().-]*$/, "Enter a valid phone number")
    .optional(),
  interest: z.enum(interests, { message: "Select what you need help with" }),
  projectDetails: z
    .string()
    .max(5000, "Please keep this under 5000 characters")
    .optional(),
  /** Honeypot — must stay empty; bots fill it. */
  website: z.string().max(0).optional(),
});

type ConsultationValues = z.infer<typeof consultationSchema>;

/* Shared field styling — larger, calmer fields than the site default, with an
 * explicit focus ring so the active field is unmistakable on a dark surface. */
const fieldBase =
  "w-full rounded-xl border bg-surface-elevated px-4 text-sm text-foreground transition-all duration-200 placeholder:text-muted-faint focus:outline-none focus:ring-2 focus:ring-brand/25 disabled:cursor-not-allowed disabled:opacity-60";
const fieldIdle = "border-border-strong focus:border-brand";
const fieldError = "border-error/70 focus:border-error focus:ring-error/20";

const labelClass = "block text-[13px] font-medium text-muted-strong";

export function ConsultationForm({ privacyNote }: { privacyNote: string }) {
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationValues>({
    resolver: zodResolver(consultationSchema),
    // Inline validation as soon as a field has been interacted with.
    mode: "onTouched",
    defaultValues: { interest: undefined, phone: "", projectDetails: "" },
  });

  async function onSubmit(values: ConsultationValues) {
    setStatus("idle");
    try {
      const res = await fetch(`${site.apiUrl}/api/v1/consultation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.fullName,
          email: values.email,
          phone: values.phone || "",
          interest: values.interest,
          projectDetails: values.projectDetails || "",
          source: "solutions_consultation",
          website: values.website ?? "",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      trackEvent("form_submit", { form: "consultation" });
      setStatus("success");
      reset();
    } catch {
      trackEvent("form_submit_error", { form: "consultation" });
      setStatus("error");
    }
  }

  /** Inline error message + the aria-describedby wiring for its field. */
  const fieldError_ = (name: keyof ConsultationValues, id: string) =>
    errors[name] ? (
      <p
        id={`${id}-error`}
        role="alert"
        className="mt-2 flex items-center gap-1.5 text-xs text-error"
      >
        <AlertCircle aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
        {errors[name]?.message as string}
      </p>
    ) : null;

  const describedBy = (name: keyof ConsultationValues, id: string) =>
    errors[name] ? `${id}-error` : undefined;

  /* ------------------------------ Success state ----------------------------- */
  if (status === "success") {
    return (
      <div className="panel-elevated flex min-h-[32rem] flex-col items-center justify-center p-9 text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-success/30 bg-success/10 text-success">
          <CheckCircle2 aria-hidden="true" className="h-7 w-7" />
        </span>
        <h3
          role="status"
          className="mt-6 text-xl font-semibold tracking-[-0.01em] text-foreground"
        >
          Request received
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          A senior solutions architect will reply within 4 business hours with a
          personalised response. If it is urgent, email us at{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-brand hover:underline"
          >
            {site.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm font-semibold text-brand transition-colors hover:text-brand-soft"
        >
          Send another request
        </button>
      </div>
    );
  }

  /* -------------------------------- The form -------------------------------- */
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-labelledby="consultation-form-heading"
      className="panel-elevated p-7 md:p-9"
    >
      <h3
        id="consultation-form-heading"
        className="text-lg font-semibold tracking-[-0.01em] text-foreground"
      >
        Request your free consultation
      </h3>
      <p className="mt-1.5 text-sm text-muted">
        Fields marked with an asterisk are required.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        {/* Full name */}
        <div>
          <label htmlFor="consult-name" className={labelClass}>
            Full Name <span className="text-brand">*</span>
          </label>
          <input
            id="consult-name"
            type="text"
            autoComplete="name"
            placeholder="Jane Cooper"
            aria-required="true"
            aria-invalid={!!errors.fullName}
            aria-describedby={describedBy("fullName", "consult-name")}
            className={cn(
              fieldBase,
              "mt-2 h-12",
              errors.fullName ? fieldError : fieldIdle,
            )}
            {...register("fullName")}
          />
          {fieldError_("fullName", "consult-name")}
        </div>

        {/* Work email */}
        <div>
          <label htmlFor="consult-email" className={labelClass}>
            Work Email <span className="text-brand">*</span>
          </label>
          <input
            id="consult-email"
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email", "consult-email")}
            className={cn(
              fieldBase,
              "mt-2 h-12",
              errors.email ? fieldError : fieldIdle,
            )}
            {...register("email")}
          />
          {fieldError_("email", "consult-email")}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="consult-phone" className={labelClass}>
            Phone
          </label>
          <input
            id="consult-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 555 000 1234"
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("phone", "consult-phone")}
            className={cn(
              fieldBase,
              "mt-2 h-12",
              errors.phone ? fieldError : fieldIdle,
            )}
            {...register("phone")}
          />
          {fieldError_("phone", "consult-phone")}
        </div>

        {/* Interest */}
        <div>
          <label htmlFor="consult-interest" className={labelClass}>
            I need help with <span className="text-brand">*</span>
          </label>
          <select
            id="consult-interest"
            defaultValue=""
            aria-required="true"
            aria-invalid={!!errors.interest}
            aria-describedby={describedBy("interest", "consult-interest")}
            style={selectChevronStyle}
            className={cn(
              fieldBase,
              "mt-2 h-12 cursor-pointer appearance-none pr-10",
              "[&>option]:bg-surface-elevated [&>option]:text-foreground",
              errors.interest ? fieldError : fieldIdle,
            )}
            {...register("interest")}
          >
            <option value="" disabled>
              Select a solution
            </option>
            {consultationInterests.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {fieldError_("interest", "consult-interest")}
        </div>

        {/* Project details */}
        <div className="sm:col-span-2">
          <label htmlFor="consult-details" className={labelClass}>
            Project Details
          </label>
          <textarea
            id="consult-details"
            rows={4}
            placeholder="What are you trying to achieve, and which systems would this need to work with?"
            aria-invalid={!!errors.projectDetails}
            aria-describedby={describedBy("projectDetails", "consult-details")}
            className={cn(
              fieldBase,
              "mt-2 min-h-[7.5rem] resize-y py-3",
              errors.projectDetails ? fieldError : fieldIdle,
            )}
            {...register("projectDetails")}
          />
          {fieldError_("projectDetails", "consult-details")}
        </div>

        {/* Honeypot — hidden from real users */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
          {...register("website")}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand text-sm font-semibold text-white transition-all duration-300 ease-premium hover:bg-brand-fierce hover:shadow-lift-brand disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:shadow-none"
      >
        {isSubmitting ? (
          <>
            <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
            Sending your request…
          </>
        ) : (
          <>
            Get Free Consultation
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1"
            />
          </>
        )}
      </button>

      {status === "error" && (
        <p
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-xl border border-error/30 bg-error/[0.07] px-4 py-3 text-sm text-error"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            We could not send your request. Please try again, or email us
            directly at{" "}
            <a href={`mailto:${site.email}`} className="font-medium underline">
              {site.email}
            </a>
            .
          </span>
        </p>
      )}

      <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-muted-faint">
        <ShieldCheck aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        {privacyNote}
      </p>
    </form>
  );
}
