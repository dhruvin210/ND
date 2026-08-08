import { AiStack } from "@/components/solutions/AiStack";
import { CaseStudyProof } from "@/components/solutions/CaseStudyProof";
import { ConsultationSection } from "@/components/solutions/ConsultationSection";
import { ImpactStats } from "@/components/solutions/ImpactStats";
import { SolutionProcess } from "@/components/solutions/SolutionProcess";
import { SolutionsFaq } from "@/components/solutions/SolutionsFaq";
import { SolutionsHero } from "@/components/solutions/SolutionsHero";
import { SolutionsShowcase } from "@/components/solutions/SolutionsShowcase";
import { UseCasesSection } from "@/components/solutions/UseCasesSection";
import { WhyNextDynamix } from "@/components/solutions/WhyNextDynamix";
import {
  getFaqs,
  getFeaturedCaseStudies,
  getSolutions,
  getSolutionsPageContent,
} from "@/lib/cms";
import {
  breadcrumbSchema,
  faqSchemaFrom,
  jsonLd,
  solutionsItemListSchema,
  solutionsSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "AI Solutions for Enterprise — Chatbots, Agents, Search & Automation",
  description:
    "Production-ready AI solutions built for business outcomes: AI chatbots, agentic AI, enterprise search, document intelligence, workflow automation, and sales AI.",
  path: "/solutions",
});

/** Revalidated hourly; individual CMS fetches carry their own ISR windows. */
export const revalidate = 3600;

export default async function SolutionsPage() {
  // Fetched in parallel — none of these depend on each other.
  const [pageContent, solutions, caseStudies, faqs] = await Promise.all([
    getSolutionsPageContent(),
    getSolutions(),
    getFeaturedCaseStudies(3),
    getFaqs("solutions"),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Solutions", url: `${site.url}/solutions` },
          ]),
          solutionsItemListSchema(solutions),
          faqSchemaFrom(faqs),
          ...solutionsSchema(solutions),
        ])}
      />

      {/* Business problem → solutions → technology → process → use cases →
          proof → why us → consultation. */}
      <SolutionsHero content={pageContent.hero} />
      <ImpactStats stats={pageContent.stats} />
      <SolutionsShowcase solutions={solutions} />
      <SolutionProcess />
      <AiStack />
      <UseCasesSection />
      <CaseStudyProof caseStudies={caseStudies} />
      <WhyNextDynamix />
      <ConsultationSection content={pageContent.consultation} />
      <SolutionsFaq faqs={faqs} />
    </>
  );
}
