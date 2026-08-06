import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { Services } from "@/components/sections/Services";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { TechStack } from "@/components/sections/TechStack";
import { Process } from "@/components/sections/Process";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { Certifications } from "@/components/sections/Certifications";
import { Faq } from "@/components/sections/Faq";
import { ContactSection } from "@/components/sections/ContactSection";
import { LocationSection } from "@/components/sections/LocationSection";
import {
  organizationSchema,
  localBusinessSchema,
  webSiteSchema,
  faqPageSchema,
  servicesSchema,
  jsonLd,
} from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      {/* Structured data: Organization, LocalBusiness, WebSite, FAQPage, Service×8 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          organizationSchema(),
          localBusinessSchema(),
          webSiteSchema(),
          faqPageSchema(),
          ...servicesSchema(),
        ])}
      />
      <Hero />
      <TrustedBy />
      <Services />
      <WhyChoose />
      <TechStack />
      <Process />
      <CaseStudies />
      <Testimonials />
      <Certifications />
      <Faq />
      <ContactSection />
      <LocationSection />
    </>
  );
}
