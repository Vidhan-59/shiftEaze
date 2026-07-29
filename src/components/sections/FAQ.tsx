"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pricingFaqs } from "@/content/sections";
import { cn } from "@/lib/utils";

function PlusToggle({ open }: { open: boolean }) {
  return (
    <span className="relative grid h-6 w-6 shrink-0 place-items-center">
      <span className="absolute h-0.5 w-3 rounded-full bg-teal-400" />
      <span
        className={cn(
          "absolute h-3 w-0.5 rounded-full bg-teal-400 transition-transform duration-300",
          open ? "rotate-90" : ""
        )}
      />
    </span>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Questions,{" "}
              <span className="text-fg-muted">answered.</span>
            </>
          }
          lead="Everything ops and procurement usually ask before a pilot. Still unsure? Book a demo and we'll walk your terminals through it."
        />

        <div className="mx-auto mt-12 max-w-3xl">
          {pricingFaqs.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q} className="border-b border-line first:border-t">
                {/* Wrapped in a heading so the FAQ is navigable by heading —
                    a bare list of buttons gives screen readers no structure. */}
                <h3>
                  <button
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span
                      className={cn(
                        "text-[16px] font-medium transition-colors",
                        open ? "text-fg" : "text-fg-muted"
                      )}
                    >
                      {item.q}
                    </span>
                    <PlusToggle open={open} />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-5 pr-10 text-[15px] leading-relaxed text-fg-muted">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
