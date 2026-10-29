"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { LogoIcon } from "@/components/layout/Logo";
import { Bolt, Check, Layers, Phone, Shield, Target } from "@/components/ui/icons";
import { easeExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ICONS = [Target, Shield, Layers, Bolt];
/** Three steps of the story: scattered records, one captured record, a record that travels. */
const STEPS = [
  { key: "scattered", label: "Scattered", note: "Good work lives in spreadsheets, phone calls and paper." },
  { key: "captured", label: "Captured", note: "ShiftEaze gathers it into one record as the work happens." },
  { key: "carried", label: "Carried", note: "The record goes with the worker to the next employer." },
] as const;

/** The intro, word for word, with its key phrases picked out in the brand colour. */
const QUOTE_MARKS = ["AI-autonomous workforce operations platform", "spreadsheets, phone calls and paper", "good work was disappearing"];

function QuoteText({ text }: { text: string }) {
  const re = new RegExp(`(${QUOTE_MARKS.map((m) => m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`);
  return (
    <>
      {text.split(re).map((part, i) =>
        QUOTE_MARKS.includes(part) ? (
          <span key={i} className="bg-gradient-to-r from-[#302e86] to-[#2f6bff] bg-clip-text text-transparent">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

const STEP_MS = 4200;

function SourceCard({ title, children, rotate, delay }: { title: string; children: React.ReactNode; rotate: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 0.6, ease: easeExpo, delay }}
      className="w-[128px] rounded-xl bg-white p-2.5 text-[#12153d] shadow-[0_20px_36px_-12px_rgba(0,0,0,0.65)]"
    >
      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay }}>
        <div className="mb-2 text-[11px] font-extrabold uppercase tracking-wide text-[#6b7392]">{title}</div>
        {children}
      </motion.div>
    </motion.div>
  );
}

function ScatteredStage() {
  return (
    <div className="relative flex h-full items-center justify-center gap-3">
      <SourceCard title="Spreadsheets" rotate={-6} delay={0}>
        <div className="grid grid-cols-3 gap-[3px]">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className={cn("h-3 rounded-[2px]", i % 5 === 0 ? "bg-[#2f6bff]/45" : "bg-[#dfe4f6]")} />
          ))}
        </div>
      </SourceCard>
      <SourceCard title="Phone calls" rotate={3} delay={0.12}>
        <div className="space-y-1.5">
          {["Called in sick", "Swap shift?", "Missed call"].map((t) => (
            <div key={t} className="rounded-md bg-[#eaf0ff] px-1.5 py-1 text-[10px] font-bold">
              {t}
            </div>
          ))}
        </div>
      </SourceCard>
      <SourceCard title="Paper" rotate={-3} delay={0.24}>
        <div className="space-y-1.5">
          {[90, 70, 85, 55, 75].map((w, i) => (
            <span key={i} className="block h-1 rounded-full bg-[#c9cfe6]" style={{ width: `${w}%` }} />
          ))}
        </div>
      </SourceCard>
      {/* work that drops off */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute bottom-1 rounded-full bg-white/15 px-2 py-0.5 text-[9.5px] font-bold text-white/80"
          style={{ left: `${18 + i * 28}%` }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: [0, 1, 0], y: [-20, 6, 16] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: 0.6 + i * 0.7 }}
        >
          lost
        </motion.span>
      ))}
    </div>
  );
}

const ENTRIES = ["Shift completed on time", "Safety induction passed", "Equipment certified"];

function CapturedStage() {
  return (
    <div className="grid h-full grid-cols-[auto_1fr_auto] items-center gap-3">
      <ul className="space-y-2">
        {SOURCES.map((s, i) => (
          <motion.li key={s} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }} className="rounded-lg border border-white/25 bg-white/15 px-3 py-2 text-[12px] font-bold text-white">
            {s}
          </motion.li>
        ))}
      </ul>
      <div className="relative h-full min-h-[120px]" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span key={i} className="absolute left-0 right-0 h-px bg-gradient-to-r from-white/10 via-[#7cc4ff] to-white/10" style={{ top: `${22 + i * 28}%` }}>
            <span className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_4px_rgba(124,196,255,0.9)]" style={{ animation: `packet-x 1.8s linear ${i * 0.4}s infinite` }} />
          </span>
        ))}
      </div>
      <div className="w-[170px] rounded-2xl bg-white p-3 text-[#12153d] shadow-[0_22px_46px_-16px_rgba(0,0,0,0.7)] ring-2 ring-[#7cc4ff]/70">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#eaf0ff]">
            <LogoIcon className="h-4" />
          </span>
          <div className="leading-tight">
            <div className="font-display text-[13px] font-extrabold">One record</div>
            <div className="text-[10px] font-semibold text-[#6b7392]">building live</div>
          </div>
        </div>
        <div className="mt-2.5 space-y-1.5">
          {ENTRIES.map((t, i) => (
            <motion.div key={t} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.5, duration: 0.4 }} className="flex items-center gap-1.5 text-[10.5px] font-bold">
              <span className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full bg-[#2f6bff] text-white">
                <Check width={8} height={8} />
              </span>
              {t}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CarriedStage() {
  return (
    <div className="relative flex h-full items-center justify-between gap-2">
      <div className="w-[104px] shrink-0 rounded-xl bg-white/15 p-2.5 text-center text-white/75 ring-1 ring-white/25">
        <div className="text-[10px] font-bold uppercase tracking-wide">Last employer</div>
        <div className="mt-1 text-[12px] font-extrabold text-white">Site A</div>
      </div>
      <div className="relative flex-1">
        <span className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-white/10 via-[#7cc4ff] to-white/10" aria-hidden />
        <motion.div
          initial={{ x: "-90%" }}
          animate={{ x: ["-90%", "90%"] }}
          transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6 }}
          className="relative mx-auto w-[132px] rounded-xl bg-white p-2.5 text-[#12153d] shadow-[0_18px_40px_-14px_rgba(0,0,0,0.7)] ring-2 ring-[#7cc4ff]/70"
        >
          <div className="flex items-center gap-1.5">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#eaf0ff]">
              <LogoIcon className="h-3.5" />
            </span>
            <div className="leading-tight">
              <div className="font-display text-[12px] font-extrabold">One record</div>
              <div className="text-[9.5px] font-semibold text-[#6b7392]">goes with the worker</div>
            </div>
          </div>
          <div className="mt-2 space-y-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="grid h-3 w-3 place-items-center rounded-full bg-[#2f6bff] text-white">
                  <Check width={7} height={7} />
                </span>
                <span className="h-1 flex-1 rounded-full bg-[#dfe4f6]" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="w-[104px] shrink-0 rounded-xl bg-[#2f6bff] p-2.5 text-center ring-1 ring-white/40">
        <div className="text-[10px] font-bold uppercase tracking-wide text-white/75">New employer</div>
        <div className="mt-1 text-[12px] font-extrabold text-white">Site B</div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 3, repeat: Infinity, times: [0.5, 0.65, 0.95, 1] }} className="mt-1 inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[9.5px] font-extrabold text-[#302e86]">
          <Check width={8} height={8} /> Verified
        </motion.div>
      </div>
    </div>
  );
}

/** The three things the intro says were being used before. */
const SOURCES = ["Spreadsheets", "Phone calls", "Paper"];

/**
 * A three-step explainer next to the intro: Scattered, Captured, Carried. It plays
 * on its own with a progress bar, hover pauses it, and each step is a button.
 */
function Story({ intro }: { intro: string }) {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setStep((s) => (s + 1) % STEPS.length), STEP_MS);
    return () => clearTimeout(id);
  }, [step, paused]);

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
      <Reveal>
        <figure className="relative pl-2 pt-10">
          <span aria-hidden className="pointer-events-none absolute -left-1 -top-3 select-none font-display text-[120px] font-extrabold leading-none text-[#302e86]">
            &ldquo;
          </span>
          <blockquote className="font-display text-[clamp(1.25rem,2vw,1.6rem)] font-extrabold leading-[1.4] tracking-tight text-[#12153d]">
            <QuoteText text={intro} />
            <span aria-hidden className="ml-1 align-text-bottom font-display text-[44px] leading-[0] text-[#302e86]">
              &rdquo;
            </span>
          </blockquote>
        </figure>
      </Reveal>

      <Reveal delay={0.1}>
        <div
          className="relative isolate overflow-hidden rounded-[30px] bg-gradient-to-br from-[#f4f7ff] to-[#e3eaff] p-4 shadow-float ring-1 ring-[#302e86]/15 sm:p-6"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          <span className="pointer-events-none absolute -right-12 -top-12 -z-10 h-52 w-52 animate-aurora rounded-full bg-[#2f6bff]/20 blur-3xl" />

          {/* step tabs with progress */}
          <div className="grid grid-cols-3 gap-2" role="tablist">
            {STEPS.map((s, i) => {
              const on = i === step;
              return (
                <button
                  key={s.key}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setStep(i)}
                  className={cn("group relative overflow-hidden rounded-xl px-3 py-2.5 text-left ring-1 transition-colors duration-300", on ? "bg-[#302e86] ring-[#302e86]" : "bg-white ring-[#302e86]/15 hover:bg-white/60")}
                >
                  <span className={cn("block font-mono text-[10.5px] font-bold", on ? "text-[#9fd2ff]" : "text-[#302e86]/50")}>0{i + 1}</span>
                  <span className={cn("block text-[13.5px] font-extrabold", on ? "text-white" : "text-[#12153d]")}>{s.label}</span>
                  {on && (
                    <motion.span
                      key={`${step}-${paused}`}
                      className="absolute bottom-0 left-0 h-[3px] bg-[#4db8ff]"
                      initial={{ width: paused ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: paused ? 0 : STEP_MS / 1000, ease: "linear" }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* stage */}
          <div className="relative mt-4 h-[236px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#3f3dba] via-[#302e86] to-[#1f1c52] p-3 shadow-[inset_0_0_60px_rgba(77,184,255,0.18)] ring-1 ring-[#302e86] sm:p-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={step} className="h-full" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
                {step === 0 && <ScatteredStage />}
                {step === 1 && <CapturedStage />}
                {step === 2 && <CarriedStage />}
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="mt-4 text-center text-[14px] font-semibold leading-snug text-[#12153d]" aria-live="polite">
            {STEPS[step].note}
          </p>
        </div>
      </Reveal>
    </div>
  );
}

/** The deeper reading shown when a belief opens (supporting copy written for this panel, one list per belief). */
const BELIEF_DETAIL: { heading: string; points: string[] }[] = [
  { heading: "How it works day to day", points: ["Open shifts and skill gaps are visible ahead of time", "The right certified people are matched to each shift", "Gaps get fixed before they ever reach the gate"] },
  { heading: "What it means for the worker", points: ["Certifications and shift history stay with the person", "The record is portable between employers", "Good work stays provable wherever they work next"] },
  { heading: "What it means for the team", points: ["One live schedule for planners and operators", "A change made on the floor shows up for everyone", "No separate spreadsheets, call logs or paper"] },
  { heading: "How we build", points: ["Designed around how floor teams actually work", "Simple taps that work on any phone", "Available in English, Hindi and Gujarati"] },
];

const GRADS = [
  "from-[#2f6bff] to-[#302e86]",
  "from-[#d51f2c] to-[#5b1236]",
  "from-[#5b59c9] to-[#1f1c52]",
  "from-[#0ea5a4] to-[#134e5e]",
];

/** The four beliefs as panels: hover or tap one and it opens wide with the full statement and a deeper reading. */
function Beliefs({ beliefs }: { beliefs: { lead: string; text: string }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <Reveal>
        <h2 className="font-mono text-[15px] font-bold uppercase tracking-[0.18em] text-fg-muted">What we believe</h2>
      </Reveal>
      <div className="mt-6 flex flex-col gap-4 lg:h-[600px] lg:flex-row">
        {beliefs.map((b, i) => {
          const Icon = ICONS[i % ICONS.length];
          const on = i === active;
          const detail = BELIEF_DETAIL[i];
          return (
            <motion.button
              key={b.lead}
              type="button"
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-expanded={on}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: easeExpo, delay: i * 0.08 }}
              className={cn(
                "group relative isolate overflow-hidden rounded-[32px] bg-gradient-to-br p-7 text-left lg:p-9 text-white shadow-float transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                GRADS[i % GRADS.length],
              )}
              style={{ flexGrow: on ? 4.2 : 1, flexBasis: 0 }}
            >
              <span className="pointer-events-none absolute -right-10 -top-10 -z-10 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
              <span className="pointer-events-none absolute -bottom-6 right-2 -z-10 font-display text-[170px] font-extrabold leading-none text-white/10">{String(i + 1).padStart(2, "0")}</span>
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/20 ring-1 ring-white/30 backdrop-blur-md">
                <Icon width={30} height={30} />
              </span>
              <h3 className="mt-7 font-display text-[clamp(1.5rem,2.1vw,2.2rem)] font-extrabold leading-tight">{b.lead}</h3>
              <div className={cn("grid transition-all duration-500", on ? "grid-rows-[1fr] opacity-100 delay-200" : "grid-rows-[0fr] opacity-0")}>
                <div className="overflow-hidden">
                  <p className="mt-4 max-w-xl text-[18px] font-medium leading-relaxed text-white/95">{b.text}</p>
                  <div className="mt-6 max-w-xl rounded-3xl bg-black/20 p-6 ring-1 ring-white/20 backdrop-blur-sm">
                    <div className="font-mono text-[12.5px] font-bold uppercase tracking-[0.16em] text-white/75">{detail.heading}</div>
                    <ul className="mt-4 space-y-3.5">
                      {detail.points.map((pt, k) => (
                        <li
                          key={pt}
                          className={cn("flex items-start gap-3 text-[16.5px] font-semibold leading-snug transition-all duration-500", on ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0")}
                          style={{ transitionDelay: on ? `${350 + k * 110}ms` : "0ms" }}
                        >
                          <span className="mt-[1px] grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-[#302e86]">
                            <Check width={13} height={13} />
                          </span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/** Mission statement band: one calm statement on the brand navy, with faint orbit rings behind it. */
function MissionBand({ mission }: { mission: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-r from-[#302e86] via-[#262261] to-[#15144d] py-14 text-white sm:py-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#2f6bff]/30 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[#4d7cff]/20 blur-3xl" />
        {[300, 480, 660].map((d, i) => (
          <span key={d} className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-white/15" style={{ width: d, height: d, marginLeft: -d / 2, marginTop: -d / 2, animation: `orbit-spin ${40 + i * 18}s linear infinite ${i % 2 ? "reverse" : ""}` }} />
        ))}
      </div>
      <Container className="max-w-[980px] text-center">
        <Reveal>
          <span className="font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-[#9fd2ff]">Our mission</span>
          <p className="mt-4 text-balance font-display text-[clamp(1.7rem,3.6vw,2.9rem)] font-extrabold leading-[1.15] tracking-tight">{mission}</p>
          <span className="mx-auto mt-6 block h-px w-24 bg-white/40" aria-hidden />
        </Reveal>
      </Container>
    </section>
  );
}

/** About: the story, the mission band and the four beliefs. */
export function AboutSection({
  id,
  intro,
  mission,
  beliefs,
}: {
  id: string;
  intro: string;
  mission: string;
  beliefs: { lead: string; text: string }[];
}) {
  return (
    <>
      <section id={id} className="relative scroll-mt-[76px] overflow-hidden bg-white py-12 sm:py-14 lg:py-16">
        <Container className="max-w-[1240px]">
          <Story intro={intro} />
        </Container>
      </section>

      <MissionBand mission={mission} />

      <section className="bg-[#f6f8ff] py-16 sm:py-20 lg:py-24">
        <Container className="max-w-[1480px] lg:!px-6 xl:!px-10">
          <Beliefs beliefs={beliefs} />
        </Container>
      </section>
    </>
  );
}

const iconProps = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const PinIcon = () => (
  <svg {...iconProps} aria-hidden>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
const MailIcon = () => (
  <svg {...iconProps} aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

/** Soft curves, glossy spheres and a dotted corner behind the details. */
function ContactBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <span className="absolute -left-24 top-10 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#dfe6ff] to-transparent blur-2xl" />
      <span className="absolute -bottom-28 right-0 h-[380px] w-[380px] rounded-full bg-[#2f6bff]/15 blur-3xl" />
      <motion.span
        className="absolute right-[10%] top-[16%] h-6 w-6 rounded-full bg-[radial-gradient(circle_at_30%_30%,#9db4ff,#302e86_70%)] shadow-[0_8px_18px_-4px_rgba(48,46,134,0.6)]"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute bottom-[22%] right-[26%] h-7 w-7 rounded-full bg-[radial-gradient(circle_at_30%_30%,#9db4ff,#302e86_70%)] shadow-[0_8px_18px_-4px_rgba(48,46,134,0.6)]"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <span className="absolute -bottom-2 -left-2 h-40 w-56 bg-[radial-gradient(rgba(48,46,134,0.3)_1.4px,transparent_1.4px)] bg-[size:16px_16px] [mask-image:linear-gradient(to_top_right,#000,transparent_75%)]" />
    </div>
  );
}

/** One contact line: a navy icon disc and the value; the whole row is a link when it has one. */
function ContactItem({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const body = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#3f3dba] to-[#262261] text-white shadow-[0_14px_26px_-8px_rgba(48,46,134,0.85)] ring-2 ring-white transition-transform duration-300 group-hover:scale-110">{icon}</span>
      <span className="min-w-0 leading-tight">
        <span className="block font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#6b7392]">{label}</span>
        <span className="block break-words text-[15.5px] font-bold text-[#12153d]">{value}</span>
      </span>
    </>
  );
  const cls = "group flex items-center gap-3";
  return href ? (
    <a href={href} className={cls}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

/** Contact: one white card, details on the left and the form on a brand-navy panel on the right. */
export function ContactSection({
  id,
  heading,
  line,
  email,
  phone,
  location,
  initialTopic,
}: {
  id: string;
  heading: string;
  line: string;
  email?: string;
  phone?: string;
  location?: string;
  initialTopic?: string;
}) {
  return (
    <section id={id} className="relative scroll-mt-[76px] overflow-hidden bg-[#eef1fa] py-12 sm:py-14 lg:py-16">
      <Container className="max-w-[1480px] lg:!px-6 xl:!px-10">
        <Reveal>
          <div className="relative isolate grid gap-8 overflow-hidden rounded-[34px] bg-white p-5 shadow-float ring-1 ring-[#302e86]/10 sm:p-7 lg:grid-cols-[1fr_1fr] lg:gap-10 lg:p-8">
            <ContactBackdrop />
            <div className="flex flex-col justify-center px-1 py-2 lg:px-6">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#302e86]/25 bg-[#eef1ff] py-1 pl-1 pr-4 font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-[#302e86]">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#302e86] text-white">
                  <Bolt width={13} height={13} />
                </span>
                Get in touch
              </span>
              <h2 className="mt-5 text-balance font-display text-[clamp(2.6rem,5vw,4.2rem)] font-extrabold leading-[1.03] tracking-tight text-[#12153d]">
                {heading.slice(0, -3)}
                <span className="bg-gradient-to-r from-[#302e86] to-[#2f6bff] bg-clip-text text-transparent">{heading.slice(-3)}</span>
              </h2>
              <p className="mt-5 max-w-md text-[16.5px] font-medium leading-relaxed text-[#4a5072]">{line}</p>
              {/* Each line hides when its value is missing: never a guessed value. */}
              <div className="mt-8 flex flex-col gap-4">
                {phone && <ContactItem icon={<Phone width={18} height={18} />} label="Phone" value={phone} href={`tel:${phone.replace(/\s+/g, "")}`} />}
                {location && <ContactItem icon={<PinIcon />} label="Location" value={location} />}
                {email && <ContactItem icon={<MailIcon />} label="Email" value={email} href={`mailto:${email}`} />}
              </div>
            </div>

            <div className="relative isolate overflow-hidden rounded-[26px] bg-gradient-to-br from-[#3b3fd0] via-[#2b2aa0] to-[#1a1870] p-6 text-white shadow-[0_30px_60px_-24px_rgba(38,34,97,0.8),inset_0_0_80px_rgba(77,184,255,0.18)] ring-1 ring-white/30 sm:p-9">
              <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 -z-10 h-56 w-56 animate-aurora rounded-full bg-[#4d7cff]/50 blur-3xl" />
              <span aria-hidden className="pointer-events-none absolute -bottom-10 left-6 -z-10 h-40 w-40 animate-aurora rounded-full bg-[#7cc4ff]/40 blur-3xl [animation-delay:-6s]" />
              <span aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/[0.14] via-transparent to-transparent" />
              <svg aria-hidden viewBox="0 0 400 400" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 -z-10 h-full w-full">
                <path d="M400 250 C 320 270, 290 340, 200 400 L 400 400 Z" fill="rgba(124,150,255,0.22)" />
                <path d="M400 300 C 340 320, 330 370, 280 400 L 400 400 Z" fill="rgba(160,190,255,0.22)" />
                <path d="M400 0 C 360 30, 330 20, 250 0 Z" fill="rgba(160,190,255,0.25)" />
              </svg>
              <ContactForm initialTopic={initialTopic} tone="navy" />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
