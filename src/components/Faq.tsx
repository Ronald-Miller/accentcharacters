"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { Faq } from "@/lib/content";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number>(0);
  return (
    <div className="divide-y frame-line divide-[var(--color-line)] border-y frame-line">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className="text-lg font-extrabold leading-snug sm:text-xl">
                {f.q}
              </span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border frame-line transition-all duration-300 ${
                  isOpen
                    ? "rotate-45 border-transparent bg-gradient-to-br from-[#c007ed] to-[#7c3aed] text-white"
                    : "hover:border-[#c007ed] hover:text-signal"
                }`}
              >
                <Plus size={15} />
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-6 leading-relaxed text-ink-soft">
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
