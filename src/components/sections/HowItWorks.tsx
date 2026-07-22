"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PipelineGraph } from "@/components/visuals/PipelineGraph";
import { pipeline } from "@/content/sections";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function HowItWorks() {
  const reduced = usePrefersReducedMotion();
  const stepsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = pipeline.length;

  useEffect(() => {
    const el = stepsRef.current;
    if (!el) return;
    const clamp = (v: number) => Math.max(0, Math.min(n - 1, v));

    // Reduced motion: derive active from which step is centered, no scrubbing.
    if (reduced) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const idx = Number((e.target as HTMLElement).dataset.index);
              setActive(idx);
            }
          });
        },
        { rootMargin: "-45% 0px -45% 0px" }
      );
      el.querySelectorAll("[data-index]").forEach((s) => io.observe(s));
      return () => io.disconnect();
    }

    // Core scrub: map scroll progress across the steps column to the active stage.
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 55%",
      end: "bottom 55%",
      scrub: true,
      onUpdate: (self) => setActive(clamp(Math.round(self.progress * (n - 1)))),
    });
    return () => st.kill();
  }, [reduced, n]);

  return (
    <section id="how-it-works" className="relative scroll-mt-20 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-60" aria-hidden />
      <Container className="relative">
        <SectionHeading
          eyebrow="How the AI works"
          title={
            <>
              Two stages, retrained weekly.{" "}
              <span className="text-fg-muted">No black box.</span>
            </>
          }
          lead="The prediction that flags a no-show isn't a mystery number. Deterministic rules decide what's certain; a trained scorecard estimates the rest — and it keeps re-learning each terminal's patterns."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_1fr] lg:gap-16">
          {/* Sticky graph (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <PipelineGraph active={active} />
            </div>
          </div>

          {/* Steps */}
          <div ref={stepsRef}>
            {pipeline.map((s, i) => (
              <div
                key={s.step}
                data-index={i}
                className="flex min-h-[62vh] flex-col justify-center py-6 lg:min-h-[68vh]"
              >
                <div
                  className={cn(
                    "transition-all duration-500",
                    i === active ? "opacity-100" : "lg:opacity-40"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-teal-500/30 bg-teal-500/10 font-mono text-[13px] font-semibold text-teal-300">
                      {s.step}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-fg-faint">
                      {s.kicker}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-tight tracking-tight text-fg">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-fg-muted">
                    {s.text}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-ink-800/50 px-3.5 py-1.5 font-mono text-[11px] text-teal-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-300" />
                    {s.tag}
                  </div>

                  {/* Mobile inline graph under the first step */}
                  {i === 0 && (
                    <div className="mt-8 lg:hidden">
                      <PipelineGraph active={active} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
