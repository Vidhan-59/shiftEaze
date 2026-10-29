"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useInView } from "framer-motion";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Bolt, Calendar, Check, Layers, Refresh } from "@/components/ui/icons";
import { usePauseOffscreen } from "@/hooks/usePauseOffscreen";
import { useLoopStep } from "@/hooks/useLoopStep";
import { cn } from "@/lib/utils";

const ICONS = [Refresh, Layers, Calendar, Bolt, Check];
const CYCLE = ["D", "D", "N", "N", "O", "O"] as const;
const CHIP = {
  D: "bg-[#2f6bff] text-white",
  N: "bg-[#5b59c9] text-white",
  O: "bg-white/10 text-white/50",
} as const;

/** One endlessly scrolling ribbon of rotation chips (D D N N O O). */
function Ribbon({ reverse, className }: { reverse?: boolean; className?: string }) {
  const row = Array.from({ length: 10 }, () => CYCLE).flat();
  return (
    <div className={cn("flex w-max gap-2", className)} style={{ animation: `ribbon-x 60s linear infinite ${reverse ? "reverse" : ""}` }}>
      {[0, 1].map((k) =>
        row.map((c, i) => (
          <span key={`${k}-${i}`} className={cn("grid h-9 w-9 place-items-center rounded-lg font-mono text-[12px] font-bold", CHIP[c])}>
            {c}
          </span>
        )),
      )}
    </div>
  );
}

/**
 * Solutions hero: a centred headline over a conveyor of the five stages.
 * A packet travels the rail and each stage lights up in turn; hover takes over.
 */
export function SolutionsHero({
  heading,
  stages,
}: {
  heading: string;
  stages: { id: string; name: string }[];
}) {
  const ref = useRef<HTMLElement>(null);
  usePauseOffscreen(ref);
  const inView = useInView(ref, { amount: 0.2 });
  const [hovered, setHovered] = useState(false);
  const [step, setStep] = useLoopStep(stages.length, 2600, inView && !hovered);

  const words = heading.split(" ");
  const last = words.pop();

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-[#0d0c2b] pb-14 pt-28 text-white sm:pb-16 sm:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-[10%] -top-[30%] h-[80%] w-[50%] animate-aurora rounded-full bg-[#302e86] opacity-80 blur-[110px]" />
        <div className="absolute -right-[8%] top-[10%] h-[70%] w-[40%] animate-aurora rounded-full bg-[#d51f2c] opacity-30 blur-[120px] [animation-delay:-9s]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(70%_70%_at_50%_30%,#000,transparent)]" />
        {/* Rotation ribbons drifting in opposite directions */}
        <div className="absolute inset-x-0 top-[26%] opacity-[0.22] [mask-image:linear-gradient(90deg,transparent,#000_20%,#000_80%,transparent)]">
          <Ribbon />
        </div>
        <div className="absolute inset-x-0 top-[26%] mt-12 opacity-[0.16] [mask-image:linear-gradient(90deg,transparent,#000_20%,#000_80%,transparent)]">
          <Ribbon reverse />
        </div>
      </div>

      <Breadcrumbs pageKey="solutions" tone="dark" />
      <Container className="mt-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1
            className="animate-fade-up text-balance font-display text-[clamp(2.4rem,5.4vw,4.4rem)] font-extrabold leading-[1.04] tracking-tight"
            style={{ animationDelay: "0.1s" }}
          >
            {words.join(" ")}{" "}
            <span className="inline-block animate-shimmer bg-gradient-to-r from-[#ff5468] via-[#4db8ff] to-[#ff5468] bg-[length:200%_auto] bg-clip-text text-transparent">
              {last}
            </span>
          </h1>
          <span
            className="mx-auto mt-7 block h-[5px] w-40 animate-fade-up rounded-full bg-gradient-to-r from-white via-[#ff3b4e] to-transparent"
            style={{ animationDelay: "0.2s" }}
            aria-hidden
          />
        </div>

        {/* Conveyor */}
        <div
          className="relative mx-auto mt-14 max-w-6xl animate-fade-up"
          style={{ animationDelay: "0.35s" }}
          onPointerLeave={() => setHovered(false)}
        >
          {/* rail + travelling packet (desktop) */}
          <div className="absolute inset-x-[10%] top-[34px] hidden h-[3px] rounded-full bg-white/15 md:block" aria-hidden>
            <span
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#2f6bff] to-[#4db8ff] transition-[width] duration-700 ease-out"
              style={{ width: `${(step / (stages.length - 1)) * 100}%` }}
            />
            <span
              className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_6px_rgba(47,107,255,0.35),0_0_24px_6px_rgba(77,184,255,0.6)] transition-[left] duration-700 ease-out"
              style={{ left: `${(step / (stages.length - 1)) * 100}%` }}
            />
          </div>

          <ol className="relative z-10 grid gap-3 md:grid-cols-5 md:gap-4">
            {stages.map((s, i) => {
              const Icon = ICONS[i % ICONS.length];
              const on = i === step;
              const done = i < step;
              return (
                <li key={s.id}>
                  <Link
                    href={`#${s.id}`}
                    onPointerEnter={() => {
                      setHovered(true);
                      setStep(i);
                    }}
                    onFocus={() => setStep(i)}
                    className="group flex items-center gap-4 md:flex-col md:gap-3 md:text-center"
                  >
                    <span
                      className={cn(
                        "relative grid h-[68px] w-[68px] shrink-0 place-items-center rounded-2xl border transition-all duration-500",
                        on
                          ? "-translate-y-1 border-[#4db8ff] bg-[#2f6bff] text-white shadow-[0_18px_40px_-12px_rgba(47,107,255,0.9)]"
                          : done
                            ? "border-[#2f6bff]/60 bg-[#1b2a73] text-[#9cc2ff]"
                            : "border-white/15 bg-[#1a1950] text-white/70",
                      )}
                    >
                      {on && <span className="absolute inset-0 animate-pulse-ring rounded-2xl bg-[#2f6bff]/50" />}
                      <Icon width={26} height={26} />
                      <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-[#0d0c2b] font-mono text-[11px] font-bold text-white ring-1 ring-white/30">
                        {i + 1}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "text-[14.5px] font-semibold leading-snug transition-colors duration-500 md:min-h-[2.8em] md:px-1",
                        on ? "text-white" : "text-white/65 group-hover:text-white",
                      )}
                    >
                      {s.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
