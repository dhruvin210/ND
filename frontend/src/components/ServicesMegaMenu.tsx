"use client";

import Link from "next/link";
import { useState } from "react";
import { categories, getServicesByCategory } from "@/data/services";

export default function ServicesMegaMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 font-semibold text-foreground hover:text-brand transition-colors"
        aria-expanded={open}
      >
        Services
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 mt-3 w-[min(90vw,1100px)] -translate-x-1/2 rounded-2xl border border-border bg-white p-8 shadow-2xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-8">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-brand">
                  {category}
                </h3>
                <ul className="space-y-2.5">
                  {getServicesByCategory(category).map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}/`}
                        className="text-sm text-foreground/80 hover:text-brand transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}