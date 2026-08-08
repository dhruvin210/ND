"use client";

import * as React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { site } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

/**
 * Short-form lead capture that sits in the service detail hero. Deliberately
 * three fields — the full qualification form lives at the bottom of the page,
 * and asking for budget/timeline this early costs conversions.
 */
export function ServiceLeadForm({ serviceTitle }: { serviceTitle: string }) {
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [form, setForm] = React.useState({ name: "", email: "", phone: "" });
  const [website, setWebsite] = React.useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch(`${site.apiUrl}/api/v1/consultation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          // The consultation contract validates `interest` against a fixed AI
          // list, so the service name travels in projectDetails instead — it
          // is what reaches both the leads table and HubSpot.
          interest: "Other",
          projectDetails: `Service enquiry: ${serviceTitle}`,
          source: "website_contact_form",
          website,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      trackEvent("form_submit", { form: "service_lead", service: serviceTitle });
      setStatus("success");
      setForm({ name: "", email: "", phone: "" });
    } catch {
      trackEvent("form_submit_error", {
        form: "service_lead",
        service: serviceTitle,
      });
      setStatus("error");
    }
  }

  const fieldClass =
    "h-11 w-full rounded-xl border border-border-strong bg-surface px-4 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted-faint focus:border-brand/50";

  return (
    <div className="panel-elevated p-7 md:p-8">
      <p className="eyebrow-plain">
        <span aria-hidden="true" className="h-px w-6 bg-brand/60" />
        Free Evaluation
      </p>
      <h2 className="mt-4 text-xl font-bold tracking-[-0.015em] text-foreground">
        Get a {serviceTitle} scope
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Tell us where to reach you. An engineer — not a sales rep — replies
        within one business day.
      </p>

      {status === "success" ? (
        <p
          role="status"
          className="mt-7 flex items-start gap-3 rounded-xl border border-success/30 bg-success/10 px-5 py-4 text-sm text-foreground"
        >
          <CheckCircle2
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-success"
          />
          Thanks — your request is in. We&apos;ll be in touch within one
          business day.
        </p>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-3.5">
          <div>
            <label htmlFor="lead-name" className="sr-only">
              Full name
            </label>
            <input
              id="lead-name"
              type="text"
              autoComplete="name"
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="lead-email" className="sr-only">
              Work email
            </label>
            <input
              id="lead-email"
              type="email"
              autoComplete="email"
              placeholder="Work email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="lead-phone" className="sr-only">
              Phone number
            </label>
            <input
              id="lead-phone"
              type="tel"
              autoComplete="tel"
              placeholder="Phone number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              className={fieldClass}
            />
          </div>

          {/* Honeypot — hidden from real users; bots fill it and get dropped. */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="absolute left-[-9999px]"
          />

          {status === "error" && (
            <p role="alert" className="text-sm text-error">
              Something went wrong. Please retry, or email us at {site.email}.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand text-sm font-semibold text-white transition-all duration-300 ease-premium hover:bg-brand-fierce hover:shadow-lift-brand disabled:opacity-60"
          >
            {status === "loading" ? "Sending…" : "Request my evaluation"}
            {status !== "loading" && (
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1"
              />
            )}
          </button>

          <p className="pt-1 text-center text-xs text-muted-faint">
            No obligation. We never share your details.
          </p>
        </form>
      )}
    </div>
  );
}
