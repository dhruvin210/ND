import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  /** Heading content. Use <br /> for an intentional line break. */
  title: React.ReactNode;
  description?: string;
  /** Used for aria-labelledby on the parent section. */
  id?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Shared section header so every section on the page uses the same eyebrow →
 * display heading → supporting copy hierarchy. Server component.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  id,
  align = "left",
  className,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "max-w-3xl",
        centered && "mx-auto text-center",
        className,
      )}
    >
      <p className={cn("eyebrow-plain", centered && "justify-center")}>
        <span
          aria-hidden="true"
          className="h-px w-6 bg-brand/60"
        />
        {eyebrow}
      </p>

      <h2 id={id} className="display-heading mt-5">
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed text-muted-strong md:text-[1.0625rem]",
            centered && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
