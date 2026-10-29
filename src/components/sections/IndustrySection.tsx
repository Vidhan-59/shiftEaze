"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Check, Container as ContainerIcon, Layers, Ship, Target } from "@/components/ui/icons";
import { easeExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ICONS = [Ship, Layers, ContainerIcon, Target];
// One accent per industry: [gradient for the lead tile, solid accent, soft tint].
const ACCENTS = [
  { grad: "from-[#302e86] via-[#2f6bff] to-[#4db8ff]", solid: "#2f6bff", tint: "#eaf0ff" },
  { grad: "from-[#111318] via-[#2b2f38] to-[#4b515e]", solid: "#2f343d", tint: "#eceef2" },
  { grad: "from-[#155e75] via-[#0ea5a4] to-[#34d399]", solid: "#0ea5a4", tint: "#e4f8f6" },
  { grad: "from-[#1f1c52] via-[#5b59c9] to-[#8b8af0]", solid: "#5b59c9", tint: "#efeefc" },
];

const tile = (delay: number) => ({
  initial: { opacity: 0, y: 40, scale: 0.97 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.8, ease: easeExpo, delay },
});

/**
 * One Industries scene laid out as a bento grid: a colour-coded lead tile (the
 * grey copy), a dark tile carrying the live product panel, a white tile with
 * the full blue copy (and any headline stats), and a strip of capability
 * tiles. The accent colour and the side the panel sits on change per industry.
 * No photography — a deliberately different composition from Solutions.
 */
export function IndustrySection({
  id,
  index,
  total,
  heading,
  paragraphs,
  chips,
  Card,
  tags,
}: {
  id: string;
  index: number;
  total: number;
  heading: string;
  paragraphs: string[];
  chips?: { value: string; label: string }[];
  Card?: ComponentType;
  tags?: string[];
}) {
  const flip = index % 2 === 1;
  const a = ACCENTS[index % ACCENTS.length];
  const Icon = ICONS[index % ICONS.length];
  const n = String(index + 1).padStart(2, "0");
  const [lead, body] = paragraphs;
  // The body copy, sentence by sentence, as bullet points (wording unchanged).
  const points = body.split(/(?<=[.])\s+(?=[A-Z])/).map((t) => t.trim()).filter(Boolean);

  return (
    <section
      id={id}
      className="relative scroll-mt-[76px] overflow-hidden bg-[#f6f8ff] py-12 sm:py-14 lg:py-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(48,46,134,0.13)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(70%_70%_at_50%_30%,#000,transparent)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -top-10 h-80 w-80 rounded-full opacity-25 blur-3xl"
        style={{ background: a.solid, [flip ? "right" : "left"]: "-5rem" }}
      />

      <Container className="relative max-w-[1480px] lg:!px-6 xl:!px-10">
        {/* Header */}
        <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
          <motion.span
            className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl font-display text-[24px] font-extrabold text-white shadow-float"
            style={{ background: a.solid }}
            initial={{ opacity: 0, rotate: -12, scale: 0.8 }}
            whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeExpo }}
          >
            {n}
          </motion.span>
          <div className="min-w-0 flex-1">
            <span className="font-mono text-[12.5px] font-bold uppercase tracking-[0.18em]" style={{ color: a.solid }}>
              {n} / {String(total).padStart(2, "0")}
            </span>
            <SectionTitle title={heading} align="left" className="max-w-none" />
          </div>
        </div>

        {/* Bento */}
        <div className="mt-8 grid gap-4 lg:grid-cols-12 lg:gap-5">
          {/* A: colour lead tile */}
          <motion.div
            {...tile(0)}
            className={cn(
              "group relative isolate overflow-hidden rounded-[30px] bg-gradient-to-br p-7 text-white shadow-float sm:p-9",
              a.grad,
              flip ? "lg:col-span-7 lg:col-start-6" : "lg:col-span-7 lg:col-start-1",
            )}
          >
            <span className="pointer-events-none absolute -right-10 -top-10 -z-10 h-56 w-56 animate-aurora rounded-full bg-white/20 blur-3xl" />
            <span
              className="pointer-events-none absolute -bottom-12 -right-8 -z-10 text-white/15"
              style={{ animation: "orbit-spin 60s linear infinite" }}
              aria-hidden
            >
              <Icon width={220} height={220} />
            </span>
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/20 backdrop-blur-md">
              <Icon width={22} height={22} />
            </span>
            <p className="mt-5 max-w-[34rem] text-balance font-display [text-shadow:0_2px_12px_rgba(60,25,0,0.35)] text-[clamp(1.3rem,2.2vw,1.85rem)] font-extrabold leading-[1.25] tracking-tight">
              {lead}
            </p>
            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 animate-[frame-sweep_7s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </motion.div>

          {/* B: live panel on a dark tile */}
          {Card && (
            <motion.div
              {...tile(0.12)}
              className={cn(
                "relative isolate flex items-center justify-center overflow-hidden rounded-[30px] bg-[#0d0c2b] p-5 shadow-float sm:p-8 lg:row-span-2",
                flip ? "lg:col-span-5 lg:col-start-1 lg:row-start-1" : "lg:col-span-5 lg:col-start-8",
              )}
            >
              <span className="pointer-events-none absolute -left-10 -top-10 -z-10 h-56 w-56 animate-aurora rounded-full opacity-60 blur-3xl" style={{ background: a.solid }} />
              <span className="pointer-events-none absolute -bottom-16 -right-10 -z-10 h-56 w-56 animate-aurora rounded-full bg-[#d51f2c]/30 blur-3xl [animation-delay:-8s]" />
              <span className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(70%_70%_at_50%_50%,#000,transparent)]" />
              {/* radar rings pulsing out from behind the panel */}
              {[0, 1, 2].map((r) => (
                <span
                  key={r}
                  className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full border border-white/25"
                  style={{ animationDelay: `${r * 0.9}s`, animationDuration: "3.6s" }}
                />
              ))}
              <div className="w-full max-w-[460px]" style={{ animation: "frame-float 8s ease-in-out infinite" }}>
                <Card />
              </div>
            </motion.div>
          )}

          {/* C: body copy */}
          <motion.div
            {...tile(0.2)}
            className={cn(
              "relative overflow-hidden rounded-[30px] border border-line-strong bg-white p-7 shadow-card sm:p-9",
              flip ? "lg:col-span-7 lg:col-start-6" : "lg:col-span-7 lg:col-start-1",
            )}
          >
            <span className="absolute inset-y-0 left-0 w-1.5" style={{ background: a.solid }} />
            {chips && (
              <div className="mb-6 grid grid-cols-2 gap-3">
                {chips.map((c, i) => (
                  <div key={c.label} className="rounded-2xl px-4 py-3" style={{ background: a.tint }}>
                    <div className="font-display text-[30px] font-extrabold leading-none" style={{ color: a.solid }}>
                      {c.value}
                    </div>
                    <div className="mt-1 text-[13px] font-semibold text-[#1f2340]">{c.label}</div>
                  </div>
                ))}
              </div>
            )}
            <ul className="space-y-3.5">
              {points.map((t, k) => (
                <motion.li
                  key={k}
                  className="flex items-start gap-3.5 text-[16px] font-medium leading-relaxed text-[#1f2340]"
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, ease: easeExpo, delay: Math.min(k, 6) * 0.05 }}
                >
                  <span className="mt-[3px] grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full text-white" style={{ background: a.solid }}>
                    <Check width={12} height={12} />
                  </span>
                  <span>{t}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* D: capability tiles */}
        {tags && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:mt-5 lg:grid-cols-4 lg:gap-5">
            {tags.map((t, i) => (
              <motion.div
                key={t}
                {...tile(0.1 + i * 0.08)}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-line-strong bg-white p-5 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
              >
                <span
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-[0.2] transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: a.solid }}
                />
                <span className="font-mono text-[12px] font-bold" style={{ color: a.solid }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mt-2 font-display text-[17px] font-extrabold leading-snug text-fg">{t}</div>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
