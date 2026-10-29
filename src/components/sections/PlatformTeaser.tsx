"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight, Brain, Calendar, Chart, Database, Phone, Refresh, Target } from "@/components/ui/icons";
import { PLATFORM_VISUALS } from "@/components/visuals/PlatformVisuals";
import { usePauseOffscreen } from "@/hooks/usePauseOffscreen";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { easeExpo } from "@/lib/motion";
import { platformTeaser } from "@/content/home";
import { page, section } from "@/content/siteMap";
import { cn } from "@/lib/utils";

const ICONS = [Calendar, Brain, Target, Chart, Phone, Database, Refresh];
const STEP_MS = 4500;

export function PlatformTeaser() {
  const platform = page("platform");
  const cards = platformTeaser.cards.map((id) => {
    const s = section("platform", id);
    return { label: s.name, href: `${platform.href}#${s.id}` };
  });

  const sectionRef = useRef<HTMLElement>(null);
  usePauseOffscreen(sectionRef);
  const inView = useInView(sectionRef, { amount: 0.3 });
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);

  const running = inView && !hovered && !reduced;

  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % cards.length), STEP_MS);
    return () => clearTimeout(id);
  }, [running, active, cards.length]);

  const Visual = PLATFORM_VISUALS[active % PLATFORM_VISUALS.length];
  const ActiveIcon = ICONS[active % ICONS.length];
  const current = cards[active];

  return (
    <section ref={sectionRef} className="bg-white py-12 sm:py-14 lg:py-16">
      <Container className="max-w-[1480px] lg:!px-6 xl:!px-10">
        <SectionTitle title={platformTeaser.heading} lead={platformTeaser.intro} href="/platform" />

        <Reveal className="mt-10">
          <div
            className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-stretch lg:gap-8"
            onPointerLeave={() => setHovered(false)}
          >
            {/* Module list: hover (or focus) to preview, click to open */}
            <ul className="flex flex-col gap-2.5">
              {cards.map((c, i) => {
                const Icon = ICONS[i % ICONS.length];
                const isActive = i === active;
                return (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      onPointerEnter={() => {
                        setHovered(true);
                        setActive(i);
                      }}
                      onFocus={() => setActive(i)}
                      className={cn(
                        "group relative flex items-center gap-4 overflow-hidden rounded-2xl border px-4 py-4 transition-all duration-300",
                        isActive
                          ? "translate-x-1.5 border-teal-400 bg-gradient-to-r from-teal-400 to-teal-600 text-white shadow-float"
                          : "border-line-strong bg-ink-850 text-fg hover:border-teal-300/40"
                      )}
                    >
                      <span
                        className={cn(
                          "grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-all duration-300",
                          isActive ? "scale-105 bg-white/15 text-white" : "bg-teal-400 text-white"
                        )}
                      >
                        <Icon width={20} height={20} />
                      </span>
                      <span
                        className={cn(
                          "w-6 shrink-0 font-mono text-[12px] font-bold tabular-nums",
                          isActive ? "text-white/70" : "text-fg-faint"
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="min-w-0 flex-1 font-display text-[16.5px] font-extrabold leading-snug tracking-tight">
                        {c.label}
                      </h3>
                      <span
                        className={cn(
                          "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300",
                          isActive
                            ? "border-white/40 bg-white text-teal-500"
                            : "border-line-strong group-hover:border-accent-500 group-hover:bg-accent-500 group-hover:text-white"
                        )}
                        aria-hidden
                      >
                        <ArrowUpRight width={16} height={16} />
                      </span>
                      {isActive && (
                        <span
                          key={`${active}-${running}`}
                          className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-[#ff5468] via-[#4db8ff] to-[#2f6bff]"
                          style={
                            running
                              ? { animation: `solution-timer ${STEP_MS}ms linear forwards` }
                              : { transform: "scaleX(1)" }
                          }
                          aria-hidden
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Animated stage */}
            <div className="relative min-h-[600px] overflow-hidden rounded-[28px] bg-[#0d0c2b] shadow-float sm:min-h-[540px] lg:min-h-0">
              <span
                className="pointer-events-none absolute -left-24 -top-24 h-[340px] w-[340px] animate-[blob-b_16s_ease-in-out_infinite] rounded-full bg-[#2f6bff]/30 blur-3xl"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute -bottom-28 -right-20 h-[320px] w-[320px] animate-[blob-c_18s_ease-in-out_infinite] rounded-full bg-[#d51f2c]/25 blur-3xl"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                  WebkitMaskImage: "radial-gradient(75% 70% at 50% 45%, #000 35%, transparent 100%)",
                  maskImage: "radial-gradient(75% 70% at 50% 45%, #000 35%, transparent 100%)",
                }}
                aria-hidden
              />

              <div className="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
                <ActiveIcon width={14} height={14} />
                {String(active + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}
              </div>

              <div className="absolute inset-x-0 bottom-[84px] top-14 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.45, ease: easeExpo }}
                  >
                    <Visual />
                  </motion.div>
                </AnimatePresence>
              </div>

              <Link
                href={current.href}
                className="group absolute inset-x-4 bottom-4 z-10 flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-black/40 px-5 py-4 backdrop-blur transition-colors hover:border-[#4db8ff]"
              >
                <span className="font-display text-[18px] font-extrabold leading-tight tracking-tight text-white">
                  {current.label}
                </span>
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#2f6bff] text-white transition-transform duration-300 group-hover:rotate-12"
                  aria-hidden
                >
                  <ArrowUpRight width={16} height={16} />
                </span>
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
