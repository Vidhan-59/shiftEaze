"use client";

import { useRef } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { FillButton } from "@/components/ui/FillButton";
import { Photo } from "@/components/ui/Photo";
import { Tag } from "@/components/ui/Tag";
import { Calendar, Check, Shield, Target } from "@/components/ui/icons";
import { usePauseOffscreen } from "@/hooks/usePauseOffscreen";

/** The three voices the page features (named in its intro line). */
const VOICES = [
  { label: "Planners", Icon: Calendar },
  { label: "HR leads", Icon: Shield },
  { label: "Site heads", Icon: Target },
];

/** Supporting copy written for this hero (the page's own copy sits below it). */
const LEAD = "Real teams, real shifts. See how the people who plan, staff and run the floor move from spreadsheets and phone rounds to one calm, connected way of working.";
const POINTS = ["Told by the people who use it every shift", "From first rostering cycle to a whole terminal live", "Calmer shift starts, a record that stays with the worker"];

/** Case Studies hero: the title and a short introduction over a photo of a worker on the job. */
export function CaseStudiesHero({ tag, heading }: { tag: string; heading: string }) {
  const ref = useRef<HTMLElement>(null);
  usePauseOffscreen(ref);
  const words = heading.split(" ");
  const last = words.pop();

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-[#0b0a24] pb-16 pt-28 text-white sm:pb-20 sm:pt-32">
      {/* background: a worker on the job, fading into the navy on the text side */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[68%] [mask-image:linear-gradient(to_right,transparent,#000_40%)]">
          <Photo name="yard-operator-call" alt="" ratio="fill" sizes="70vw" priority className="h-full" imgClassName="object-cover object-[50%_28%] animate-[kenburns_26s_ease-in-out_infinite_alternate]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0a24] via-[#0b0a24]/80 to-[#0b0a24]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a24] via-transparent to-[#0b0a24]/60" />
        <div className="absolute -left-[10%] bottom-[-25%] h-[70%] w-[46%] rounded-full bg-[#302e86] opacity-70 blur-[110px]" />
      </div>

      <Breadcrumbs pageKey="case-studies" tone="dark" />
      <Container className="mt-8">
        <div className="max-w-[640px]">
          <div className="animate-fade-up">
            <Tag tone="dark">{tag}</Tag>
          </div>
          <h1 className="mt-5 animate-fade-up text-balance font-display text-[clamp(2.8rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-tight" style={{ animationDelay: "0.1s" }}>
            {words.join(" ")}{" "}
            <span className="inline-block animate-shimmer bg-gradient-to-r from-[#7cc4ff] via-white to-[#7cc4ff] bg-[length:200%_auto] bg-clip-text text-transparent">{last}</span>
          </h1>
          <span className="mt-6 block h-[5px] w-40 animate-fade-up rounded-full bg-gradient-to-r from-white via-[#4d7cff] to-transparent" style={{ animationDelay: "0.2s" }} aria-hidden />

          <p className="mt-7 animate-fade-up text-[clamp(1.05rem,1.5vw,1.25rem)] font-medium leading-relaxed text-white/90" style={{ animationDelay: "0.28s" }}>
            {LEAD}
          </p>

          <ul className="mt-6 animate-fade-up space-y-2.5" style={{ animationDelay: "0.36s" }}>
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[15.5px] font-semibold text-white">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-[#302e86]">
                  <Check width={13} height={13} />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex animate-fade-up flex-wrap gap-2.5" style={{ animationDelay: "0.44s" }}>
            {VOICES.map((v) => (
              <span key={v.label} className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-[13.5px] font-bold text-white ring-1 ring-white/30 backdrop-blur-md">
                <v.Icon width={15} height={15} />
                {v.label}
              </span>
            ))}
          </div>

          <div className="mt-9 animate-fade-up" style={{ animationDelay: "0.52s" }}>
            <FillButton href="#mundra-port-workforce-management-case-study" tone="blue" className="ring-2 ring-white/70">
              Read the Mundra story
            </FillButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
