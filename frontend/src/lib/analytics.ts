/** GA4 event helpers — typed wrappers around gtag. */

type GtagEvent =
  | "cta_click"
  | "form_submit"
  | "form_submit_error"
  | "download"
  | "chatbot_open"
  | "chatbot_message"
  | "chatbot_lead_captured"
  | "newsletter_subscribe"
  | "faq_open"
  | "process_step_open";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(
  event: GtagEvent,
  params: Record<string, string | number | boolean> = {},
) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event, params);
}

export function trackCta(label: string, location: string) {
  trackEvent("cta_click", { label, location });
}
