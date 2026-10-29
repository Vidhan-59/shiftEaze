"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useInView } from "framer-motion";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { pricingTiers } from "@/content/pricing";
import { usePauseOffscreen } from "@/hooks/usePauseOffscreen";
import { useLoopStep } from "@/hooks/useLoopStep";
import { cn } from "@/lib/utils";

const HEIGHTS = ["h-[62%]", "h-[80%]", "h-[100%]"];
const FILLS = [
  "from-white to-[#e8efff] text-fg",
  "from-[#4a48c4] to-[#302e86] text-white",
  "from-[#302e86] to-[#1f1c52] text-white",
];

// Faint ₹ watermarks scattered over the background: [left %, top %, size px, rotate deg, delay s].
const MARKS: [number, number, number, number, number][] = [
  [6, 14, 96, -14, 0],
  [34, 74, 70, 10, -3],
  [58, 10, 60, 18, -6],
  [90, 64, 110, -8, -2],
  [78, 88, 64, 22, -5],
  [18, 52, 54, -20, -8],
];

/**
 * Pricing hero: a light, money-themed band. Three price "steps" rise from the
 * floor with a trend line climbing across them; rupee watermarks, coins and
 * little price tags (all drawn from the real plan data) float around them.
 */
export function PricingHero({ tag, heading, lead }: { tag: string; heading: string; lead: string }) {
  const ref = useRef<HTMLElement>(null);
  usePauseOffscreen(ref);
  const inView = useInView(ref, { amount: 0.3 });
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useLoopStep(pricingTiers.length, 2800, inView && !hovered, 1);

  const words = heading.split(" ");
  const last = words.pop();

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-[#0d0c2b] pb-16 pt-28 sm:pt-32 text-white"
    >
      {/* Money-themed backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
                {/* Same backdrop as the Industries hero: deep navy with an indigo glow top-right and a wine-red glow low-left */}
        <div className="absolute -right-[10%] -top-[30%] h-[80%] w-[50%] animate-aurora rounded-full bg-[#302e86] opacity-70 blur-[110px]" />
        <div className="absolute -left-[6%] bottom-0 h-[50%] w-[36%] animate-aurora rounded-full bg-[#d51f2c] opacity-25 blur-[120px] [animation-delay:-8s]" />
        {MARKS.map(([l, t, s, r, d], i) => (
          <span
            key={i}
            className="absolute select-none font-display font-extrabold leading-none text-white/[0.06]"
            style={{ left: `${l}%`, top: `${t}%`, fontSize: s, transform: `rotate(${r}deg)`, animation: `frame-float ${9 + (i % 3) * 2}s ease-in-out ${d}s infinite` }}
          >
            ₹
          </span>
        ))}
      </div>

      <Breadcrumbs pageKey="pricing" tone="dark" />
      <Container className="mt-8 max-w-[1280px]">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div>
            <div className="animate-fade-up">
              <Tag tone="dark">{tag}</Tag>
            </div>
            <h1
              className="mt-5 animate-fade-up text-balance font-display text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold leading-[1.04] tracking-tight text-white"
              style={{ animationDelay: "0.1s" }}
            >
              {words.join(" ")}{" "}
              <span className="inline-block animate-shimmer bg-gradient-to-r from-[#ff5468] via-[#4db8ff] to-[#ff5468] bg-[length:200%_auto] bg-clip-text text-transparent">
                {last}
              </span>
            </h1>
            <span
              className="mt-7 block h-[6px] w-28 animate-fade-up rounded-full bg-gradient-to-r from-white via-[#ff3b4e] to-transparent"
              style={{ animationDelay: "0.2s" }}
              aria-hidden
            />
            <p className="mt-6 max-w-xl animate-fade-up text-[17px] font-semibold leading-relaxed text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]" style={{ animationDelay: "0.25s" }}>
              {lead}
            </p>
            <p
              className="mt-6 inline-flex animate-fade-up items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[14px] font-semibold text-white backdrop-blur-md"
              style={{ animationDelay: "0.3s" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#2f6bff]" />
                <span className="relative h-2 w-2 rounded-full bg-[#2f6bff]" />
              </span>
              Billed annually in advance: two months free versus monthly.
            </p>
          </div>

          {/* Rising price steps */}
          <div
            className="relative mx-auto h-[420px] w-full max-w-[580px] animate-fade-up"
            style={{ animationDelay: "0.35s" }}
            onPointerLeave={() => setHovered(false)}
          >
            <div className="absolute inset-x-0 bottom-0 flex h-[84%] items-end gap-3 sm:gap-4">
              {pricingTiers.map((t, i) => {
                const on = i === active;
                return (
                  <Link
                    key={t.id}
                    href="#pricing-plans"
                    onPointerEnter={() => {
                      setHovered(true);
                      setActive(i);
                    }}
                    onFocus={() => setActive(i)}
                    className={cn(
                      "relative flex min-w-0 flex-1 origin-bottom flex-col justify-end overflow-hidden rounded-t-3xl bg-gradient-to-b p-4 shadow-float transition-all duration-700 sm:p-5",
                      FILLS[i],
                      HEIGHTS[i],
                      on ? "-translate-y-3 ring-4 ring-[#2f6bff]/40" : "ring-1 ring-line-strong",
                    )}
                    style={{ animation: `step-rise 0.9s cubic-bezier(0.16,1,0.3,1) ${0.4 + i * 0.15}s both` }}
                  >
                    {on && (
                      <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 animate-[frame-sweep_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                    )}
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] opacity-70">{t.name}</span>
                    <span className="mt-1 font-display text-[clamp(1.5rem,3.2vw,2.3rem)] font-extrabold leading-none tracking-tight">
                      {t.rate ? t.rate.annual : "Custom"}
                    </span>
                    <span className="mt-1 text-[12px] font-semibold opacity-80">{t.rate ? t.unit : "Volume pricing"}</span>
                    <span className="mt-3 hidden text-[12.5px] font-medium leading-snug opacity-90 sm:block">{t.tagline}</span>
                    <span className="mt-2 hidden rounded-full bg-black/10 px-2.5 py-0.5 text-center text-[11px] font-bold sm:block">
                      {t.meta[0].value} operators
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* growth line over the steps, one marker per plan */}
            <svg viewBox="0 0 580 420" className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible" aria-hidden>
              <defs>
                <linearGradient id="trend" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2f6bff" />
                  <stop offset="100%" stopColor="#d51f2c" />
                </linearGradient>
              </defs>
              <path d="M 97 190 S 200 150, 290 126 S 420 86, 483 56" fill="none" stroke="url(#trend)" strokeWidth="4" strokeLinecap="round" strokeDasharray="1 9" />
              {[
                [97, 190],
                [290, 126],
                [483, 56],
              ].map(([x, y]) => (
                <g key={x}>
                  <circle cx={x} cy={y} r="11" fill="#fff" />
                  <circle cx={x} cy={y} r="6" fill="#2f6bff" />
                </g>
              ))}
            </svg>

            {/* floating price tags, wording straight from the plans */}
            <div
              className="absolute -left-2 top-[8%] hidden rounded-xl bg-white px-3 py-2 text-[12px] font-bold text-[#302e86] shadow-float ring-1 ring-line-strong sm:block"
              style={{ animation: "frame-float 7s ease-in-out infinite" }}
            >
              <span className="mr-1.5 inline-block rounded bg-[#34d399] px-1.5 py-0.5 text-[10px] font-extrabold text-[#0d0c2b]">FREE</span>
              {pricingTiers[0].subLabels[0]}
            </div>
            <div
              className="absolute -bottom-6 right-0 hidden rounded-xl bg-white px-3 py-2 text-[12px] font-bold text-[#302e86] shadow-float ring-1 ring-line-strong sm:block"
              style={{ animation: "frame-float 8s ease-in-out -3s infinite" }}
            >
              {pricingTiers[2].subLabels[0]}
            </div>

            </div>
        </div>
      </Container>
    </section>
  );
}
