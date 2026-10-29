"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** "What teams use ShiftEaze for": a grid of cards, one per use case. Cards stay on the page: a click just highlights one. */
export function UseCasesGrid({
  id,
  heading,
  rows,
}: {
  id: string;
  heading: string;
  rows: { useCase: string; line: string; href: string }[];
}) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <section id={id} className="relative scroll-mt-[76px] overflow-hidden bg-[#0d0c2b] py-14 text-white sm:py-16 lg:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[8%] -top-[20%] h-[70%] w-[40%] animate-aurora rounded-full bg-[#302e86] opacity-80 blur-[110px]" />
        <div className="absolute -right-[6%] bottom-[-20%] h-[60%] w-[36%] animate-aurora rounded-full bg-[#d51f2c] opacity-25 blur-[120px] [animation-delay:-8s]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(80%_80%_at_50%_40%,#000,transparent)]" />
      </div>
      <Container className="relative max-w-[1240px]">
        <SectionTitle title={heading} tone="dark" accent="blue" />
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.07}>
          {rows.map((r, i) => (
            <RevealItem key={r.href + r.useCase} className="h-full">
              <button
                type="button"
                aria-pressed={picked === i}
                onClick={() => setPicked(picked === i ? null : i)}
                className={cn(
                  "group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border p-5 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#4db8ff]/70 hover:bg-white/[0.1] hover:shadow-[0_24px_50px_-20px_rgba(47,107,255,0.7)]",
                  picked === i ? "-translate-y-1.5 border-[#4db8ff] bg-white/[0.12] shadow-[0_24px_50px_-20px_rgba(47,107,255,0.7)]" : "border-white/15 bg-white/[0.06]",
                )}
              >
                <span className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#2f6bff]/0 blur-2xl transition-colors duration-500 group-hover:bg-[#2f6bff]/40" />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[12px] font-bold text-[#4db8ff]">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 font-display text-[18px] font-bold leading-snug text-white">{r.useCase}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/70">{r.line}</p>
              </button>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
