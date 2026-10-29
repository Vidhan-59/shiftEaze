"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useInView } from "framer-motion";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Photo } from "@/components/ui/Photo";
import { ArrowUpRight } from "@/components/ui/icons";
import { usePauseOffscreen } from "@/hooks/usePauseOffscreen";
import { useLoopStep } from "@/hooks/useLoopStep";
import { cn } from "@/lib/utils";

// One set per industry: the port panel alone cycles three different port scenes.
const PHOTOS = [
  ["control-room-night", "terminal-aerial", "yard-operator-call"],
  ["factory-assembly", "mining-operation"],
  ["warehouse-fulfillment", "control-room"],
  ["yard-operator-call", "control-room-night"],
];

/**
 * Industries hero: a full-width accordion of four photographs. The active
 * panel opens wide (auto-advancing, or whichever one you hover) and the rest
 * fold to slim vertical strips.
 */
export function IndustriesHero({
  tag,
  heading,
  industries,
}: {
  tag: string;
  heading: string;
  industries: { id: string; name: string }[];
}) {
  const ref = useRef<HTMLElement>(null);
  usePauseOffscreen(ref);
  const inView = useInView(ref, { amount: 0.3 });
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useLoopStep(industries.length, 4200, inView && !hovered);
  const [sub] = useLoopStep(6, 2300, inView);

  const words = heading.split(" ");
  const last = words.pop();

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-[#0d0c2b] pb-10 pt-28 text-white sm:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-[10%] -top-[30%] h-[80%] w-[50%] animate-aurora rounded-full bg-[#302e86] opacity-70 blur-[110px]" />
        <div className="absolute -left-[6%] bottom-0 h-[50%] w-[36%] animate-aurora rounded-full bg-[#d51f2c] opacity-25 blur-[120px] [animation-delay:-8s]" />
      </div>

      <Breadcrumbs pageKey="industries" tone="dark" />
      <Container className="mt-8 max-w-[1480px] lg:!px-6 xl:!px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="animate-fade-up">
              <Tag tone="dark">{tag}</Tag>
            </div>
            <h1
              className="mt-4 animate-fade-up text-balance font-display text-[clamp(2.2rem,4.8vw,4rem)] font-extrabold leading-[1.04] tracking-tight"
              style={{ animationDelay: "0.1s" }}
            >
              {words.join(" ")}{" "}
              <span className="inline-block animate-shimmer bg-gradient-to-r from-[#ff5468] via-[#4db8ff] to-[#ff5468] bg-[length:200%_auto] bg-clip-text text-transparent">
                {last}
              </span>
            </h1>
          </div>
          <ul className="flex animate-fade-up gap-2" style={{ animationDelay: "0.2s" }} aria-hidden>
            {industries.map((_, i) => (
              <li key={i} className="h-1.5 w-12 overflow-hidden rounded-full bg-white/20">
                <span
                  className={cn("block h-full rounded-full bg-white transition-all duration-700", i === active ? "w-full" : "w-0")}
                />
              </li>
            ))}
          </ul>
        </div>

        <div
          className="mt-8 flex h-[620px] animate-fade-up flex-col gap-3 md:h-[480px] md:flex-row lg:h-[520px]"
          style={{ animationDelay: "0.3s" }}
          onPointerLeave={() => setHovered(false)}
        >
          {industries.map((ind, i) => {
            const on = i === active;
            return (
              <Link
                key={ind.id}
                href={`#${ind.id}`}
                onPointerEnter={() => {
                  setHovered(true);
                  setActive(i);
                }}
                onFocus={() => setActive(i)}
                className="group relative min-h-0 min-w-0 overflow-hidden rounded-[26px] ring-1 ring-white/15 transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ flexGrow: on ? 5 : 1, flexBasis: 0 }}
              >
                {/* Each panel cross-fades through its own set of photographs */}
                {PHOTOS[i % PHOTOS.length].map((name, k, set) => (
                  <Photo
                    key={name}
                    name={name}
                    alt=""
                    ratio="fill"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className={cn("absolute inset-0 h-full transition-opacity duration-1000", k === sub % set.length ? "opacity-100" : "opacity-0")}
                    imgClassName={cn("object-cover transition-transform duration-[2600ms]", on ? "scale-105" : "scale-125")}
                  />
                ))}
                <div
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700",
                    on
                      ? "bg-gradient-to-t from-[#0d0c2b]/90 via-[#0d0c2b]/25 to-transparent"
                      : "bg-[#0d0c2b]/65 group-hover:bg-[#0d0c2b]/50",
                  )}
                />

                <span className="absolute left-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/15 font-mono text-[13px] font-bold text-white ring-1 ring-white/30 backdrop-blur-md">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Collapsed label */}
                <span
                  className={cn(
                    "absolute bottom-5 left-5 right-5 font-display text-[16px] font-bold leading-tight text-white transition-opacity duration-500 md:bottom-6 md:left-1/2 md:right-auto md:-translate-x-1/2 md:text-[17px] md:[writing-mode:vertical-rl] md:rotate-180",
                    on ? "pointer-events-none opacity-0" : "opacity-100",
                  )}
                >
                  {ind.name}
                </span>

                {/* Expanded caption */}
                <div
                  className={cn(
                    "absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 transition-all duration-700",
                    on ? "translate-y-0 opacity-100 delay-200" : "pointer-events-none translate-y-4 opacity-0",
                  )}
                >
                  <span className="text-balance font-display text-[clamp(1.4rem,2.4vw,2.1rem)] font-extrabold leading-[1.1] tracking-tight text-white">
                    {ind.name}
                  </span>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#2f6bff] text-white shadow-[0_12px_30px_-8px_rgba(47,107,255,0.9)] transition-transform group-hover:rotate-45">
                    <ArrowUpRight width={20} height={20} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
