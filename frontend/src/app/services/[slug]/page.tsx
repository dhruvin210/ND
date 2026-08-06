import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { site } from "@/lib/site";
import LeadForm from "@/components/LeadForm";
import FaqAccordion from "@/components/FaqAccordion";
import { ContactSection } from "@/components/sections/ContactSection";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return buildMetadata({
    title: `${service.title} Services — NextDynamix`,
    description: `NextDynamix delivers expert ${service.title} solutions engineered for measurable business outcomes.`,
    path: `/services/${service.slug}`,
  });
}

// ── Section 1: top-level "why us" pair (matches "Customised Solutions / Expertise Panel") ──
const whyUsPair = [
  { title: "Customised Solutions", desc: "creates client-centric strategies built around your unique goals — never a one-size-fits-all package." },
  { title: "Expertise Panel", desc: "a team with deep, real-world delivery experience guiding you through every complexity." },
];

// ── Section 2: second pair ("Scalable Solutions / Data-Driven Insights") ──
const scalablePair = [
  { title: "Scalable Solutions", desc: "engineered to fit businesses of every size, adapting as your needs evolve — from start-up to enterprise." },
  { title: "Data-Driven Insights", desc: "we turn raw information into actionable insight, helping you make confident, informed decisions." },
];

// ── Section 3: six-phase illustrated process ──
const phases = [
  { title: "Initial Evaluation", desc: "We start by understanding your current setup, goals, and constraints." },
  { title: "Strategic Planning", desc: "A tailored roadmap is built around your specific requirements and budget." },
  { title: "Solution Design", desc: "The right approach is architected and reviewed with you before anything is built." },
  { title: "Implementation", desc: "Our team executes the plan with clear communication and predictable milestones." },
  { title: "Optimisation", desc: "We refine and tune the solution based on real-world performance." },
  { title: "Monitoring and Support", desc: "Ongoing monitoring and support keep things running long after launch." },
];

// ── Section 4: eight-card "key focus areas" grid ──
const focusAreas = [
  { title: "Security", desc: "Best-practice safeguards built into every engagement." },
  { title: "Scalability", desc: "Solutions designed to grow with your business." },
  { title: "Cost Effectiveness", desc: "Transparent, pay-for-value pricing." },
  { title: "Flexibility", desc: "We adapt to you, not the other way around." },
  { title: "Reliability", desc: "Robust infrastructure built for high availability." },
  { title: "Global Reach", desc: "Delivery and support across time zones and markets." },
  { title: "Innovation", desc: "Access to modern tooling where it adds real value." },
  { title: "Support and Expertise", desc: "Guidance from people who've solved this before." },
];

const faqs = (title: string) => [
  { q: `What is ${title}?`, a: `${title} from NextDynamix covers strategy, implementation, and ongoing support — tailored to your business rather than a generic template.` },
  { q: `How do I choose the right ${title} provider?`, a: `Look for real delivery history, transparent pricing, and a team that starts with a free evaluation before recommending anything — which is exactly how NextDynamix works.` },
  { q: `What does NextDynamix's ${title} process involve?`, a: `Evaluation, strategic planning, solution design, implementation, optimisation, and ongoing monitoring and support — a complete lifecycle, not a one-off delivery.` },
];

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const title = service.title;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Services", url: `${site.url}/services` },
            { name: title, url: `${site.url}/services/${service.slug}` },
          ]),
        )}
      />

      {/* HERO — heading/copy + lead capture form */}
      <section className="border-b border-border bg-gradient-to-br from-[#0a1e3f] to-[#0a1e3f]/90">
        <div className="site-container grid gap-10 py-16 lg:grid-cols-2 lg:items-center">
          <div className="text-white">
            <h1 className="text-3xl font-extrabold uppercase leading-tight tracking-tight md:text-5xl">
              {title}
            </h1>
            <p className="mt-6 max-w-xl text-white/85">
              With experienced expertise by their side, Team NextDynamix
              loves to join your shoulders in helping you get the best out of{" "}
              {title}.
            </p>
            <p className="mt-4 max-w-xl text-white/85">
              Is your business ready to embrace a strategic {title.toLowerCase()} approach?
            </p>
            <a
              href="#lead-form"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-brand transition-transform hover:-translate-y-0.5"
            >
              Schedule A Free Consultation →
            </a>
          </div>

          <div id="lead-form" className="rounded-2xl bg-white p-8 shadow-2xl">
            <h2 className="text-center text-xl font-bold text-brand">
              You seem Interesting!
            </h2>
            <p className="mt-1 text-center text-sm text-muted">
              Please fill in your details below, we love making contacts!
            </p>
            <LeadForm serviceTitle={title} />
          </div>
        </div>
      </section>

      {/* DESCRIPTION + IMAGE */}
      <section className="site-container grid gap-10 py-16 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-2xl font-extrabold uppercase leading-snug text-[#0a1e3f] md:text-3xl">
            Take the Leap with NextDynamix {title}
          </h2>
          <p className="mt-5 text-muted">
            Enhance your business with NextDynamix {title}. Transform ideas
            into outcomes, innovate with dependable execution, and make your
            mark with a team that treats your project like their own.
          </p>
          <p className="mt-4 text-muted">
            Let us unlock what's possible with the right {title.toLowerCase()} approach.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-brand/20 via-surface to-[#0a1e3f]/20" />
      </section>

      {/* WHY US — first pair */}
      <section className="border-t border-border bg-surface py-16">
        <div className="site-container">
          <h2 className="text-center text-2xl font-extrabold uppercase text-[#0a1e3f] md:text-3xl">
            Why NextDynamix {title}?
          </h2>
          <p className="section-subheading text-center">
            Along with sound technology, NextDynamix also believes in core
            business values that have helped us stand out.
          </p>
          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            {whyUsPair.map((item) => (
              <div key={item.title} className="text-center">
                <h3 className="text-lg font-bold text-brand">{item.title}</h3>
                <p className="mt-3 text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US — second pair */}
      <section className="site-container py-16">
        <div className="grid gap-10 sm:grid-cols-2">
          {scalablePair.map((item) => (
            <div key={item.title} className="text-center">
              <h3 className="text-lg font-bold text-brand">{item.title}</h3>
              <p className="mt-3 text-sm text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SIX-PHASE PROCESS */}
      <section className="border-t border-border bg-surface py-16">
        <div className="site-container">
          <h2 className="text-center text-2xl font-extrabold uppercase text-[#0a1e3f] md:text-3xl">
            Phases of NextDynamix {title} Solutions
          </h2>
          <p className="section-subheading text-center">
            Here are the phases NextDynamix goes through once a {title.toLowerCase()} requirement is received.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {phases.map((phase) => (
              <div key={phase.title} className="overflow-hidden rounded-2xl border border-border bg-white">
                <div className="aspect-[4/3] bg-gradient-to-br from-brand/15 to-[#0a1e3f]/15" />
                <div className="bg-[#0a1e3f] px-4 py-3 text-center font-bold text-white">
                  {phase.title}
                </div>
                <p className="p-4 text-sm text-muted">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-gradient-to-r from-brand to-[#0a1e3f]">
        <div className="site-container flex flex-col items-start justify-between gap-6 py-14 lg:flex-row lg:items-center">
          <div className="text-white">
            <h2 className="text-2xl font-bold md:text-3xl">
              Leverage {title} Solutions
            </h2>
            <p className="mt-2 max-w-xl text-white/85">
              Are you ready to explore the combination of experienced
              experts and tailored {title.toLowerCase()} solutions?
            </p>
          </div>
          <a
            href="#lead-form"
            className="whitespace-nowrap rounded-lg bg-white px-6 py-3 font-bold text-brand"
          >
            Schedule a call
          </a>
        </div>
      </section>

      {/* FOCUS AREAS — 8-card grid */}
      <section className="site-container py-16">
        <h2 className="text-center text-2xl font-extrabold uppercase text-[#0a1e3f] md:text-3xl">
          NextDynamix {title} Key Focus Areas
        </h2>
        <p className="section-subheading text-center">
          With different solutions that make up a complete {title.toLowerCase()} approach, here are a few elements NextDynamix focuses on.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map((b) => (
            <div key={b.title} className="rounded-2xl border border-border bg-surface p-6 text-center">
              <h3 className="text-lg font-bold text-brand">{b.title}</h3>
              <p className="mt-2 text-sm text-muted">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-surface py-16">
        <div className="site-container">
          <h2 className="text-center text-2xl font-extrabold uppercase text-[#0a1e3f] md:text-3xl">
            {title}: Let Us Explore More
          </h2>
          <div className="mx-auto mt-8 max-w-3xl">
            <FaqAccordion items={faqs(title)} />
          </div>
        </div>
      </section>

      {/* PREMIER SOLUTIONS */}
      <section className="site-container py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a1e3f]/20 via-surface to-brand/20" />
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[#0a1e3f] md:text-3xl">
              NextDynamix Premier {title} Services
            </h2>
            <p className="mt-5 text-muted">
              With innovative and customised approaches, our commitment to
              responsible, high-quality delivery ensures your {title.toLowerCase()} initiative
              is not only effective but built to last.
            </p>
            <p className="mt-4 text-muted">
              NextDynamix loves to make it pocket-friendly, dependable, and
              simply excellent — ready to help your business move forward.
              Are you ready?
            </p>
          </div>
        </div>
      </section>

      {/* FULL CONTACT FORM — reusing the site's existing ContactSection component */}
      <ContactSection />
    </>
  );
}