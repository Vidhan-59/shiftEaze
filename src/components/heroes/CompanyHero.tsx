"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LogoIcon } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Bolt, Layers, Shield, Target } from "@/components/ui/icons";
import { usePauseOffscreen } from "@/hooks/usePauseOffscreen";
import { useLoopStep } from "@/hooks/useLoopStep";
import { hero } from "@/content/home";
import { cn } from "@/lib/utils";

const ICONS = [Target, Shield, Layers, Bolt];
const TONES = ["#2f6bff", "#ff5468", "#4db8ff", "#34d399"];
/** Resting angle of each belief in degrees: North, East, South, West. */
const BASE = [-90, 0, 90, 180];
const R = 25; // distance from the logo centre to each pill’s inner edge, in % of the stage

type Belief = { lead: string; text: string };

/** The point a belief sits at for a given rotation, in % of the stage. */
function useSpot(rot: MotionValue<number>, base: number) {
  const x = useTransform(rot, (r) => 50 + R * Math.cos(((base + r) * Math.PI) / 180));
  const y = useTransform(rot, (r) => 50 + R * Math.sin(((base + r) * Math.PI) / 180));
  return { x, y };
}

/** A belief pill. Always on the N / E / S / W axes when the rotation is at rest. */
function BeliefNode({
  belief,
  index,
  rot,
  active,
  onActivate,
}: {
  belief: Belief;
  index: number;
  rot: MotionValue<number>;
  active: boolean;
  onActivate: () => void;
}) {
  const { x, y } = useSpot(rot, BASE[index]);
  const left = useTransform(x, (v) => `${v}%`);
  const top = useTransform(y, (v) => `${v}%`);
  const tx = useTransform(rot, (r) => `${-50 + 50 * Math.cos(((BASE[index] + r) * Math.PI) / 180)}%`);
  const ty = useTransform(rot, (r) => `${-50 + 50 * Math.sin(((BASE[index] + r) * Math.PI) / 180)}%`);
  const Icon = ICONS[index % ICONS.length];
  return (
    <motion.button
      type="button"
      onPointerEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      aria-pressed={active}
      className="absolute z-20"
      style={{ left, top, x: tx, y: ty }}
    >
      <span
        className={cn(
          "flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-2 text-[12.5px] font-bold backdrop-blur-md transition-all duration-500",
          active ? "scale-110 border-transparent text-[#0d0c2b]" : "border-white bg-white text-[#12153d] shadow-[0_10px_26px_-10px_rgba(0,0,0,0.7),0_0_0_3px_rgba(77,184,255,0.25)] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px_rgba(0,0,0,0.8),0_0_0_4px_rgba(77,184,255,0.45)]",
        )}
        style={active ? { background: TONES[index], boxShadow: `0 0 0 6px ${TONES[index]}33, 0 0 38px 6px ${TONES[index]}88, 0 18px 36px -12px ${TONES[index]}` } : undefined}
      >
        <Icon width={14} height={14} className={active ? undefined : "text-[#2f6bff]"} />
        {belief.lead}
      </span>
    </motion.button>
  );
}

/** The line from the logo to a belief; the lit one glows and carries a travelling pulse. */
function Spoke({ index, rot, active }: { index: number; rot: MotionValue<number>; active: boolean }) {
  const { x, y } = useSpot(rot, BASE[index]);
  const t = useMotionValue(0);
  const px = useTransform([t, x], ([tt, xx]: number[]) => 50 + (xx - 50) * tt);
  const py = useTransform([t, y], ([tt, yy]: number[]) => 50 + (yy - 50) * tt);
  const o = useTransform(t, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  useEffect(() => {
    if (!active) return;
    const c = animate(t, [0, 1], { duration: 1.6, repeat: Infinity, ease: "easeInOut" });
    return c.stop;
  }, [active, t]);

  return (
    <>
      <motion.line
        x1={50}
        y1={50}
        x2={x}
        y2={y}
        stroke={active ? TONES[index] : "rgba(160,215,255,0.6)"}
        strokeWidth={active ? 1 : 0.5}
        strokeDasharray={active ? "0" : "1.5 1.5"}
        filter={active ? "url(#spoke-glow)" : undefined}
        style={{ transition: "stroke 0.5s, stroke-width 0.5s" }}
      />
      {active && <motion.circle cx={px} cy={py} r={1.6} fill="#fff" filter="url(#spoke-glow)" style={{ opacity: o }} />}
    </>
  );
}

/**
 * Company hero on the Industries-style navy backdrop. The four beliefs sit at
 * North, East, South and West of the ShiftEaze mark. One is lit at a time; tap
 * the logo and all four turn a quarter-turn clockwise around it, landing back
 * on the four compass points.
 */
export function CompanyHero({
  tag,
  heading,
  mission,
  beliefs,
}: {
  tag: string;
  heading: string;
  mission: string;
  beliefs: Belief[];
}) {
  const ref = useRef<HTMLElement>(null);
  usePauseOffscreen(ref);
  const inView = useInView(ref, { amount: 0.3 });
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useLoopStep(beliefs.length, 3800, inView && !hovered);
  const [pulse, setPulse] = useState(0);
  const rot = useMotionValue(0);
  const turns = useRef(0);

  const rotate = () => {
    turns.current += 1;
    animate(rot, turns.current * 90, { type: "spring", stiffness: 55, damping: 14, mass: 0.9 });
    setPulse((p) => p + 1);
  };

  const words = heading.split(" ");
  const last = words.pop();
  const facts = hero.trustStrip.slice(0, 3);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-[#0d0c2b] pb-16 pt-28 text-white sm:pb-20 sm:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-[10%] -top-[30%] h-[80%] w-[50%] animate-aurora rounded-full bg-[#302e86] opacity-70 blur-[110px]" />
        <div className="absolute -left-[6%] bottom-0 h-[50%] w-[36%] animate-aurora rounded-full bg-[#d51f2c] opacity-25 blur-[120px] [animation-delay:-8s]" />
      </div>

      <Breadcrumbs pageKey="company" tone="dark" />
      <Container className="mt-8 max-w-[1280px]">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div>
            <div className="animate-fade-up">
              <Tag tone="dark">{tag}</Tag>
            </div>
            <h1
              className="mt-5 animate-fade-up text-balance font-display text-[clamp(2.6rem,5.6vw,4.6rem)] font-extrabold leading-[1.02] tracking-tight"
              style={{ animationDelay: "0.1s" }}
            >
              {words.join(" ")}{" "}
              <span className="inline-block animate-shimmer bg-gradient-to-r from-[#ff5468] via-[#4db8ff] to-[#ff5468] bg-[length:200%_auto] bg-clip-text text-transparent">
                {last}
              </span>
            </h1>
            <span
              className="mt-7 block h-[5px] w-40 animate-fade-up rounded-full bg-gradient-to-r from-white via-[#ff3b4e] to-transparent"
              style={{ animationDelay: "0.2s" }}
              aria-hidden
            />
            <p
              className="mt-7 max-w-xl animate-fade-up border-l-4 border-[#4db8ff] pl-5 font-display text-[clamp(1.2rem,2vw,1.6rem)] font-bold leading-snug"
              style={{ animationDelay: "0.3s" }}
            >
              {mission}
            </p>

            {/* proof, straight from the Home page */}
            <ul className="mt-8 flex animate-fade-up flex-wrap gap-2.5" style={{ animationDelay: "0.4s" }}>
              {facts.map((f) => (
                <li key={f} className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[13.5px] font-bold backdrop-blur-md">
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Belief compass */}
          <div className="relative mx-auto w-full max-w-[520px] animate-fade-up" style={{ animationDelay: "0.35s" }} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
            <div className="relative mx-auto aspect-square w-full max-w-[420px]">
              {/* glow layers */}
              <span className="absolute inset-[6%] animate-pulse rounded-full bg-[#2f6bff]/25 blur-3xl" aria-hidden />
              <span className="absolute inset-[22%] rounded-full blur-2xl transition-colors duration-700" style={{ background: `${TONES[active]}40` }} aria-hidden />
              <span className="absolute inset-[8%] rounded-full border border-dashed border-[#7cc4ff]/45 shadow-[0_0_40px_rgba(77,184,255,0.3)]" style={{ animation: "orbit-spin 60s linear infinite" }} aria-hidden />
              <span className="absolute inset-[25%] rounded-full border border-[#7cc4ff]/50 shadow-[0_0_30px_rgba(47,107,255,0.35)]" aria-hidden />
              {/* N / E / S / W tick marks */}
              {[
                "left-1/2 top-[25%] -translate-x-1/2 -translate-y-1/2",
                "right-[25%] top-1/2 translate-x-1/2 -translate-y-1/2",
                "bottom-[25%] left-1/2 -translate-x-1/2 translate-y-1/2",
                "left-[25%] top-1/2 -translate-x-1/2 -translate-y-1/2",
              ].map((c, i) => (
                <span key={i} className={cn("absolute h-2 w-2 rounded-full bg-[#7cc4ff] shadow-[0_0_10px_2px_rgba(124,196,255,0.8)]", c)} aria-hidden />
              ))}

              {/* spokes */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
                <defs>
                  <filter id="spoke-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1.4" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {beliefs.map((b, i) => (
                  <Spoke key={b.lead} index={i} rot={rot} active={i === active} />
                ))}
              </svg>

              {/* centre: tap to rotate */}
              <button
                type="button"
                onClick={rotate}
                aria-label="Turn the beliefs a quarter-turn"
                className="group absolute left-1/2 top-1/2 z-10 grid h-[112px] w-[112px] -translate-x-1/2 -translate-y-1/2 place-items-center"
              >
                <span className="absolute inset-[-10px] animate-spin rounded-full opacity-80 [animation-duration:8s]" style={{ background: `conic-gradient(from 0deg, transparent 0 55%, ${TONES[active]} 85%, transparent)`, WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 3px))", mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 3px))" }} />
                <span className="absolute inset-0 animate-pulse-ring rounded-full" style={{ background: `${TONES[active]}55` }} />
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-white/30 [animation-delay:1.1s]" />
                <span key={pulse} className="absolute inset-0 rounded-full border-2" style={{ borderColor: TONES[active], animation: pulse ? "ripple-out 0.8s ease-out both" : undefined }} />
                <span className="relative grid h-[104px] w-[104px] place-items-center rounded-full bg-white shadow-[0_0_50px_10px_rgba(77,184,255,0.45)] ring-4 ring-white/40 transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
                  <LogoIcon className="h-[48px]" />
                </span>
              </button>

              {beliefs.map((b, i) => (
                <BeliefNode key={b.lead} belief={b} index={i} rot={rot} active={i === active} onActivate={() => setActive(i)} />
              ))}
            </div>
            <p className="mt-3 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">Tap the logo to turn</p>

            {/* the belief in full */}
            <div className="relative mt-4 min-h-[92px] rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                  <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: TONES[active] }}>
                    <span>{String(active + 1).padStart(2, "0")}</span>
                    <span className="text-white/60">What we believe</span>
                  </div>
                  <p className="mt-1.5 text-[15px] font-semibold leading-snug">
                    <span className="font-extrabold">{beliefs[active].lead}</span> {beliefs[active].text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
