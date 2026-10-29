"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Photo } from "@/components/ui/Photo";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/icons";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { solutionsTeaser } from "@/content/home";
import { useCases } from "@/content/solutions";
import { page, section } from "@/content/siteMap";
import { cn } from "@/lib/utils";

const CYCLE_MS = 4500;

/** Backdrop photo and the existing one-line use-case copy for each solution. */
const META: Record<string, { photo: string; useCase: string }> = {
  "shift-based-workforce-management": { photo: "yard-operator-call", useCase: "Rotating Shift Management" },
  "multi-site-workforce-management": { photo: "terminal-aerial", useCase: "Multi-Site Workforce Management" },
  "workforce-scheduling-optimization": { photo: "control-room", useCase: "Automated Employee Scheduling" },
  "overtime-backfill-management": { photo: "warehouse-fulfillment", useCase: "Overtime & Backfill" },
  "workforce-attendance-payroll-accuracy": { photo: "factory-assembly", useCase: "Geofenced Attendance" },
};

export function SolutionsTeaser() {
  const solutions = page("solutions");
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const inView = useInView(rootRef, { amount: 0.3 });
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  const cards = solutionsTeaser.cards.map((id) => {
    const s = section("solutions", id);
    const meta = META[id];
    return {
      label: s.name,
      href: `${solutions.href}#${s.id}`,
      photo: meta.photo,
      line: useCases.find((u) => u.useCase === meta.useCase)?.line ?? "",
    };
  });

  const shown = hovered ?? active;

  // Walk through the solutions on their own; hovering a row takes over.
  useEffect(() => {
    if (reduced || !inView || hovered !== null) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % cards.length), CYCLE_MS);
    return () => clearTimeout(id);
  }, [reduced, inView, hovered, active, cards.length]);

  return (
    <section ref={rootRef} className="relative isolate overflow-hidden bg-[#0d0c2b] py-14 text-white sm:py-16 lg:py-20">
      {/* Backdrop: the photo for the active solution cross-fades in, slowly zooming */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {cards.map((c, i) => (
          <Photo
            key={c.photo}
            name={c.photo}
            alt=""
            ratio="fill"
            sizes="100vw"
            className={cn(
              "absolute inset-0 !bg-transparent transition-opacity duration-[1400ms] ease-out",
              i === shown ? "opacity-100" : "opacity-0"
            )}
            imgClassName={cn(
              "transition-transform duration-[7000ms] ease-out",
              i === shown ? "scale-110" : "scale-100"
            )}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0c2b]/90 via-[#0d0c2b]/60 to-[#0d0c2b]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c2b]/70 via-transparent to-[#0d0c2b]/40" />
      </div>

      <Container className="relative max-w-[1480px] lg:!px-6 xl:!px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <div>
            <SectionTitle title={solutionsTeaser.heading} align="left" tone="dark" accent="blue" />

            <Reveal delay={0.15}>
              {/* Stage tracker: the active stage lights up in step with the list */}
              <div className="mt-10 flex items-center gap-3" aria-hidden>
                {cards.map((c, i) => (
                  <span key={c.href} className="flex items-center gap-3">
                    <span className="relative flex h-3.5 w-3.5">
                      {i === shown && (
                        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#4db8ff]/70" />
                      )}
                      <span
                        className={cn(
                          "relative h-3.5 w-3.5 rounded-full border-2 transition-all duration-500",
                          i <= shown ? "border-white bg-[#2f6bff] scale-110" : "border-white/50 bg-transparent"
                        )}
                      />
                    </span>
                    {i < cards.length - 1 && (
                      <span className="relative h-[3px] w-8 overflow-hidden rounded-full bg-white/25 sm:w-12">
                        <span
                          className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-white to-[#4db8ff] transition-transform duration-700"
                          style={{ transform: `scaleX(${i < shown ? 1 : 0})` }}
                        />
                      </span>
                    )}
                  </span>
                ))}
              </div>
              <p className="mt-5 font-mono text-[13px] font-bold tracking-[0.18em] text-white/80">
                {String(shown + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}
              </p>
            </Reveal>
          </div>

          <RevealGroup
            className="overflow-hidden rounded-3xl border border-white/30 bg-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-xl"
            gap={0.08}
          >
            {cards.map((c, i) => {
              const isActive = i === shown;
              return (
                <RevealItem key={c.href}>
                  <Link
                    href={c.href}
                    onPointerEnter={() => setHovered(i)}
                    onPointerLeave={() => {
                      setHovered(null);
                      setActive(i);
                    }}
                    onFocus={() => setHovered(i)}
                    onBlur={() => setHovered(null)}
                    className={cn(
                      "group relative flex items-center gap-5 border-b border-white/15 px-6 py-5 transition-all duration-500 last:border-b-0 sm:gap-7 sm:px-8",
                      isActive ? "bg-white/20" : "hover:bg-white/10"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute inset-y-0 left-0 w-[5px] origin-top bg-gradient-to-b from-[#4db8ff] to-[#2f6bff] transition-transform duration-500",
                        isActive ? "scale-y-100" : "scale-y-0"
                      )}
                      aria-hidden
                    />
                    <span
                      className={cn(
                        "font-display text-[34px] font-extrabold leading-none transition-colors duration-500 sm:text-[42px]",
                        isActive ? "text-[#4db8ff]" : "text-white/35"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-[19px] font-bold leading-snug tracking-tight text-white sm:text-[22px]">
                        {c.label}
                      </span>
                      <span
                        className={cn(
                          "grid transition-all duration-500 ease-out",
                          isActive ? "mt-1.5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        )}
                      >
                        <span className="overflow-hidden">
                          <span className="block text-[14.5px] leading-relaxed text-white/80">{c.line}</span>
                        </span>
                      </span>
                    </span>
                    <span
                      className={cn(
                        "grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-500",
                        isActive
                          ? "border-[#2f6bff] bg-[#2f6bff] text-white"
                          : "border-white/40 text-white group-hover:border-white"
                      )}
                      aria-hidden
                    >
                      <ArrowRight width={18} height={18} />
                    </span>
                    {/* Timer: fills while this stage is up next */}
                    {isActive && !reduced && hovered === null && (
                      <span
                        key={`t-${active}`}
                        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-white/70"
                        style={{ animation: `solution-timer ${CYCLE_MS}ms linear forwards` }}
                        aria-hidden
                      />
                    )}
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
