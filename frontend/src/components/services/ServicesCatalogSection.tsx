import { SectionHeader } from "@/components/solutions/SectionHeader";
import { ServicesCatalog } from "@/components/services/ServicesCatalog";

/** Header is server-rendered; only the filterable catalog below it hydrates. */
export function ServicesCatalogSection() {
  return (
    <section
      id="catalog"
      aria-labelledby="services-catalog-heading"
      className="section-shell border-b border-border"
    >
      <div className="site-container-wide">
        <SectionHeader
          id="services-catalog-heading"
          eyebrow="What We Do"
          title={
            <>
              Eight Disciplines,
              <br />
              Forty-Eight Services
            </>
          }
          description="Filter by discipline or search the whole catalog. Every service links to how we scope it, what the delivery looks like, and what it costs to start."
        />

        <div className="mt-14 lg:mt-16">
          <ServicesCatalog />
        </div>
      </div>
    </section>
  );
}
