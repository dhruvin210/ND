"use client";

import { useState } from "react";

export default function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q} className="overflow-hidden rounded-lg">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between bg-gradient-to-r from-brand to-[#0a1e3f] px-6 py-4 text-left font-semibold text-white"
              aria-expanded={isOpen}
            >
              {item.q}
              <span className="ml-4 text-xl leading-none">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <div className="border border-t-0 border-border bg-surface px-6 py-4 text-sm text-muted">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}