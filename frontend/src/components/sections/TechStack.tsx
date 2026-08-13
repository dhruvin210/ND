import { techStack } from "@/data/tech-stack";

/** Technology expertise — categorized stacks with badge pills. */
export function TechStack() {
  return (
    <section
      id="tech-stack"
      aria-labelledby="tech-heading"
      className="section-padding"
    >
      <div className="site-container text-center">
        <h2 id="tech-heading" className="section-heading">
          Built With Modern Technology
        </h2>
        <p className="section-subheading mx-auto">
          We use proven tools and platforms to build reliable, scalable
          digital systems.
        </p>

        <div className="mt-12 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((category) => (
            <div
              key={category.name}
              className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-brand/40"
            >
              <h3 className="font-semibold text-foreground">{category.name}</h3>
              {/* Fixed columns, not flex-wrap: auto-width pills left every row
               *  a different ragged length across the five cards. */}
              <ul className="mt-4 grid grid-cols-2 gap-2">
                {category.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-center text-xs font-medium text-muted transition-colors hover:border-brand/50 hover:text-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
