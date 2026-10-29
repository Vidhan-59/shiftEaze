"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Check, Layers, Bolt, Shield, Chart, Brain } from "@/components/ui/icons";
import {
  pricingComparison,
  pricingCompareTiers,
  pricingTiers,
  type CompareGroup,
  type CompareValue,
} from "@/content/pricing";
import { cn } from "@/lib/utils";

const GRID_STYLE = { gridTemplateColumns: "minmax(13rem,1.5fr) repeat(3,minmax(9rem,1fr))" };
const TIER_ICONS = [Layers, Bolt, Shield];
const GROUP_ICONS = [Layers, Chart, Brain, Shield];
const GRID = "grid items-stretch gap-0";

const included = (v: CompareValue) => v.level !== "none";
const same = (vals: CompareValue[]) => vals.every((v) => v.level === vals[0].level && v.text === vals[0].text);

/**
 * A cell carries one of four states plus free text. The glyph alone is
 * meaningless to a screen reader, so every state also renders visually-hidden
 * wording naming the tier — otherwise a row reads as its feature name followed
 * by three silences.
 */
function Cell({ value, tier }: { value: CompareValue; tier: string }) {
  const { level, text } = value;

  if (level === "none") {
    return (
      <span className="flex flex-col items-center gap-1">
        <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full bg-[#eef1f8] text-[16px] font-bold text-[#9aa3bd]">
          –
        </span>
        <span className="text-[12px] font-bold text-[#9aa3bd]" aria-hidden>
          Not included
        </span>
        <span className="sr-only">{tier}: not included</span>
      </span>
    );
  }

  if (level === "text") {
    return (
      <span className="inline-block rounded-xl bg-[#eef3ff] px-3.5 py-2 text-[14px] font-extrabold leading-snug text-[#1b1f4b] ring-1 ring-[#2f6bff]/15">
        <span className="sr-only">{tier}: </span>
        {text}
      </span>
    );
  }

  const tone =
    level === "full"
      ? "bg-gradient-to-br from-[#2f6bff] to-[#4db8ff] text-white shadow-[0_8px_18px_-6px_rgba(47,107,255,0.85)] ring-4 ring-[#2f6bff]/15"
      : level === "partial"
        ? "bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] text-[#4a2e00] shadow-[0_8px_18px_-6px_rgba(245,158,11,0.85)] ring-4 ring-[#fbbf24]/25"
        : "border-2 border-[#d51f2c] bg-white text-[#d51f2c] shadow-[0_8px_18px_-8px_rgba(213,31,44,0.5)] ring-4 ring-[#d51f2c]/10";

  const word = level === "full" ? "included" : level === "partial" ? "limited" : "paid add-on";
  const label = level === "full" ? "Included" : level === "partial" ? "Limited" : "Add-on";
  const labelTone = level === "full" ? "text-[#2f6bff]" : level === "partial" ? "text-[#a16207]" : "text-[#d51f2c]";

  return (
    <span className="flex flex-col items-center gap-1.5">
      <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:scale-110", tone)}>
        {level === "full" ? (
          <Check width={17} height={17} aria-hidden />
        ) : level === "partial" ? (
          <span className="text-[17px] font-bold leading-none" aria-hidden>
            ◐
          </span>
        ) : (
          <span className="text-[19px] font-bold leading-none" aria-hidden>
            +
          </span>
        )}
        <span className="sr-only">
          {tier}: {word}
        </span>
      </span>
      <span className={cn("font-mono text-[10.5px] font-bold uppercase tracking-wider", labelTone)} aria-hidden>
        {label}
      </span>
      {text && <span className="max-w-[210px] text-center text-[13px] font-semibold leading-snug text-[#1f2340]">{text}</span>}
    </span>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("transition-transform duration-300", open && "rotate-180")}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/** Wraps the matched part of a feature name so a search hit is easy to spot. */
function Highlight({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded bg-[#fde68a] px-0.5 text-fg">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

/** Coverage of each plan, computed from the table itself: how many listed capabilities it includes. */
function useCoverage() {
  return useMemo(() => {
    const rows = pricingComparison.flatMap((g) => g.rows);
    return pricingCompareTiers.map((_, i) => ({ have: rows.filter((r) => included(r.values[i])).length, total: rows.length }));
  }, []);
}

/** Section tabs: one compact card shows a single section at a time instead of one very long table. */
function SectionTabs({ groups, tab, setTab, className }: { groups: CompareGroup[]; tab: string; setTab: (g: string) => void; className?: string }) {
  return (
    <div role="tablist" data-lenis-prevent-horizontal aria-label="Capability sections" className={cn("flex gap-2 overflow-x-auto px-1 py-2.5 lg:gap-3 lg:overflow-visible", className)}>
      {groups.map((g, gi) => {
        const on = g.group === tab;
        const Icon = GROUP_ICONS[gi % GROUP_ICONS.length];
        return (
          <button
            key={g.group}
            role="tab"
            aria-selected={on}
            onClick={() => setTab(g.group)}
            className={cn(
              "relative inline-flex shrink-0 items-center justify-center gap-2.5 rounded-2xl border px-4 py-3 text-[13px] font-extrabold transition-all duration-300 lg:flex-1",
              on
                ? "border-transparent bg-gradient-to-br from-[#2f6bff] to-[#302e86] text-white shadow-[0_14px_28px_-12px_rgba(47,107,255,0.9)]"
                : "border-line-strong bg-white text-[#302e86] hover:-translate-y-0.5 hover:border-[#2f6bff]/60 hover:text-[#2f6bff]",
            )}
          >
            <span className={cn("grid h-7 w-7 place-items-center rounded-lg", on ? "bg-white/20" : "bg-[#eaf0ff] text-[#2f6bff]")}>
              <Icon width={15} height={15} />
            </span>
            {g.group}
            <span className={cn("rounded-full px-2 py-0.5 font-mono text-[10.5px] font-bold", on ? "bg-white/25" : "bg-[#2f6bff]/10 text-[#2f6bff]")}>{g.rows.length}</span>
          </button>
        );
      })}
    </div>
  );
}

/** Desktop: one card. Plan headers stay on top, section tabs switch the rows, the Professional column runs as a highlighted band. */
function DesktopTable({
  groups,
  tab,
  setTab,
  q,
  focus,
  setFocus,
  pinned,
  setPinned,
}: {
  groups: CompareGroup[];
  tab: string;
  setTab: (g: string) => void;
  q: string;
  focus: number | null;
  setFocus: (i: number | null) => void;
  pinned: number | null;
  setPinned: (i: number | null) => void;
}) {
  const coverage = useCoverage();
  const active = pinned ?? focus;
  const current = groups.find((g) => g.group === tab) ?? groups[0];

  const colTint = (i: number) =>
    cn(
      "transition-all duration-300",
      i === 1 && "bg-gradient-to-b from-[#2f6bff]/[0.09] to-[#2f6bff]/[0.05] border-x border-[#2f6bff]/25",
      active === i && "bg-[#2f6bff]/[0.09]",
      active !== null && active !== i && "opacity-45",
    );

  return (
    <div className="mt-6 hidden overflow-clip rounded-[28px] border border-line-strong bg-white shadow-[0_30px_80px_-30px_rgba(20,24,70,0.35)] lg:block">
      {/* Plan headers: name, price and action for each plan */}
      <div style={GRID_STYLE} className={cn(GRID, "border-b border-line-strong bg-white")} onPointerLeave={() => setFocus(null)}>
        <div className="flex flex-col justify-end px-6 py-5">
          <span className="font-display text-[20px] font-extrabold leading-tight text-fg">Compare plans</span>
          <span className="mt-1 text-[12.5px] font-medium text-fg-muted">Hover a plan to focus it · click to pin</span>
        </div>
        {pricingTiers.map((t, i) => {
          const c = coverage[i];
          const Icon = TIER_ICONS[i];
          const featured = i === 1;
          return (
            <div
              key={t.id}
              onPointerEnter={() => setFocus(i)}
              onClick={() => setPinned(pinned === i ? null : i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setPinned(pinned === i ? null : i)}
              aria-pressed={pinned === i}
              className={cn(
                "relative cursor-pointer px-4 pb-4 pt-5 text-center",
                featured && "border-x border-[#2f6bff]/20 bg-gradient-to-b from-[#2f6bff]/[0.12] to-[#2f6bff]/[0.04]",
                active === i && !featured && "bg-[#2f6bff]/[0.06]",
              )}
            >
              {featured && <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2f6bff] to-[#302e86]" />}
              {featured && (
                <span className="absolute right-3 top-3 rounded-full bg-[#2f6bff] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-white shadow-[0_6px_14px_-6px_rgba(47,107,255,0.9)]">
                  Most popular
                </span>
              )}
              <span className={cn("mx-auto grid h-9 w-9 place-items-center rounded-xl", featured ? "bg-[#2f6bff] text-white" : i === 2 ? "bg-[#302e86] text-white" : "bg-[#eaf0ff] text-[#2f6bff]")}>
                <Icon width={18} height={18} />
              </span>
              <div className="mt-2 font-display text-[17px] font-extrabold text-fg">{t.name}</div>
              <div className="mt-0.5 flex items-baseline justify-center gap-1">
                <span className="font-display text-[22px] font-extrabold leading-none text-fg">{t.rate ? t.rate.annual : "Custom"}</span>
                <span className="text-[11px] font-semibold text-fg-faint">{t.rate ? t.unit : "volume"}</span>
              </div>
              <div className="mx-auto mt-2.5 h-1.5 w-full max-w-[150px] overflow-hidden rounded-full bg-[#e3e9f8]">
                <motion.span
                  className="block h-full rounded-full bg-gradient-to-r from-[#2f6bff] to-[#4db8ff]"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(c.have / c.total) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <div className="mt-1 font-mono text-[10px] font-semibold text-fg-faint">
                {c.have} of {c.total} capabilities
              </div>
              <Link
                href={t.cta.href}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "mt-3 inline-block rounded-full px-5 py-2 text-[12.5px] font-bold transition-all duration-300 hover:-translate-y-0.5",
                  featured
                    ? "bg-[#302e86] text-white shadow-[0_10px_22px_-10px_rgba(48,46,134,0.9)] hover:bg-[#262261]"
                    : "border border-[#302e86]/30 bg-white text-[#302e86] hover:border-[#2f6bff] hover:text-[#2f6bff]",
                )}
              >
                {t.cta.label}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Section headings as tabs */}
      <SectionTabs groups={groups} tab={current.group} setTab={setTab} className="border-b border-line bg-[#f6f8ff] px-5" />

      {/* The chosen section's rows */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current.group}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
        >
          {current.rows.map((row, ri) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: ri * 0.035 }}
              style={GRID_STYLE}
              className={cn(GRID, "group relative border-b border-[#e6ebf7] last:border-b-0 hover:bg-gradient-to-r hover:from-[#2f6bff]/[0.05] hover:to-transparent")}
            >
              <span className="relative flex items-center gap-3 px-6 py-5 text-[15.5px] font-extrabold leading-snug text-[#12153d] transition-colors group-hover:text-[#2f6bff]">
                <span className="absolute inset-y-3 left-0 w-1 origin-center scale-y-0 rounded-r-full bg-[#2f6bff] transition-transform duration-300 group-hover:scale-y-100" />
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#2f6bff]/50 transition-all duration-300 group-hover:scale-125 group-hover:bg-[#2f6bff]" />
                <span>
                  <Highlight text={row.feature} q={q} />
                </span>
              </span>
              {row.values.map((v, vi) => (
                <span key={vi} className={cn("flex items-center justify-center px-3 py-5 text-center", colTint(vi))}>
                  <Cell value={v} tier={pricingCompareTiers[vi]} />
                </span>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/**
 * Narrow screens: one plan at a time, one section at a time. Three columns of
 * dense comparison text can't be made readable at 390px, and side-scrolling a
 * table is worse than choosing a plan and reading straight down it.
 */
function MobileAccordion({ groups, tab, setTab }: { groups: CompareGroup[]; tab: string; setTab: (g: string) => void }) {
  const [tier, setTier] = useState(1);
  const current = groups.find((g) => g.group === tab) ?? groups[0];

  return (
    <div className="mt-6 lg:hidden">
      <div className="flex gap-2 rounded-full border border-white/70 bg-white/60 p-1 shadow-card backdrop-blur-xl">
        {pricingCompareTiers.map((t, i) => (
          <button
            key={t}
            onClick={() => setTier(i)}
            aria-pressed={tier === i}
            className={cn(
              "flex-1 rounded-full px-3 py-2 text-[13px] font-bold transition-all duration-300",
              tier === i ? "bg-gradient-to-r from-[#2f6bff] to-[#302e86] text-white shadow-[0_8px_20px_-8px_rgba(47,107,255,0.8)]" : "text-[#302e86] hover:bg-white/70",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <SectionTabs groups={groups} tab={current.group} setTab={setTab} className="mt-3 pb-1" />

      <div className="mt-3 overflow-hidden rounded-2xl border border-line-strong bg-white shadow-card">
        {current.rows.map((row, ri) => (
          <div key={row.feature} className={cn("flex items-start justify-between gap-4 px-4 py-3", ri % 2 === 1 && "bg-ink-850/50")}>
            <span className="text-[13px] font-medium leading-snug text-fg">{row.feature}</span>
            <span className="shrink-0 basis-[45%] text-right">
              <Cell value={row.values[tier]} tier={pricingCompareTiers[tier]} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Legend({ tone, glyph, label }: { tone: string; glyph: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn("grid h-4 w-4 place-items-center rounded-full", tone)}>
        {glyph === "check" ? (
          <Check width={9} height={9} aria-hidden />
        ) : (
          <span className="text-[10px] font-bold leading-none" aria-hidden>
            {glyph}
          </span>
        )}
      </span>
      {label}
    </span>
  );
}

/** Smoothly counts a number towards `target` (used for the plan-fit percentages). */
function useCount(target: number) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = from.current;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 700);
      const e = 1 - Math.pow(1 - p, 3);
      const val = start + (target - start) * e;
      setV(val);
      from.current = val;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return Math.round(v);
}

/** One plan's fit for the capabilities you picked: a ring gauge, the count and the action. */
function FitCard({ index, covered, addons, picked, best }: { index: number; covered: number; addons: number; picked: number; best: boolean }) {
  const t = pricingTiers[index];
  const Icon = TIER_ICONS[index];
  const pct = picked ? Math.round(((covered + addons) / picked) * 100) : 0;
  const shown = useCount(pct);
  const R = 38;
  const C = 2 * Math.PI * R;
  return (
    <motion.div
      layout
      animate={{ y: best ? -8 : 0, scale: best ? 1.03 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn(
        "relative overflow-hidden rounded-[26px] border px-3 py-5 text-center transition-shadow duration-500",
        best
          ? "border-transparent bg-gradient-to-br from-[#2f6bff] via-[#3a52d6] to-[#302e86] text-white shadow-[0_30px_70px_-26px_rgba(47,107,255,0.9)]"
          : "border-line-strong bg-white text-fg shadow-card",
      )}
    >
      {best && <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 animate-[frame-sweep_4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent" />}
      <AnimatePresence>
        {best && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute right-3 top-3 rounded-full bg-white px-2.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-[#302e86] shadow-float"
          >
            Best fit
          </motion.span>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center gap-2">
        <span className={cn("grid h-10 w-10 place-items-center rounded-xl", best ? "bg-white/20 text-white" : i2bg(index))}>
          <Icon width={19} height={19} />
        </span>
        <div className="text-center">
          <div className="font-display text-[18px] font-extrabold leading-tight">{t.name}</div>
          <div className={cn("text-[12.5px] font-semibold", best ? "text-white/80" : "text-fg-muted")}>{t.rate ? `${t.rate.annual}${t.unit}` : "Volume pricing"}</div>
        </div>
      </div>

      <div className="relative mx-auto mt-4 grid h-[104px] w-[104px] place-items-center">
        <svg viewBox="0 0 104 104" className="absolute inset-0 -rotate-90">
          <circle cx="52" cy="52" r={R} fill="none" stroke={best ? "rgba(255,255,255,0.25)" : "#e3e9f8"} strokeWidth="9" />
          <circle
            cx="52"
            cy="52"
            r={R}
            fill="none"
            stroke={best ? "#fff" : "url(#fit-ring)"}
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - pct / 100)}
            style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.16,1,0.3,1)" }}
          />
          <defs>
            <linearGradient id="fit-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2f6bff" />
              <stop offset="100%" stopColor="#4db8ff" />
            </linearGradient>
          </defs>
        </svg>
        <span className="font-display text-[22px] font-extrabold tabular-nums">{picked ? shown : "–"}{picked ? "%" : ""}</span>
      </div>

      <div className={cn("mt-3 text-[13px] font-semibold", best ? "text-white/90" : "text-fg-muted")}>
        {picked ? (
          <>
            Covers <span className="font-extrabold">{covered}</span> of {picked}
            {addons > 0 && <span className={cn("ml-1.5 rounded-full px-2 py-0.5 text-[11px] font-bold", best ? "bg-white/20" : "bg-accent-500/10 text-accent-600")}>+{addons} add-on</span>}
          </>
        ) : (
          "Pick capabilities below"
        )}
      </div>

      <Link
        href={t.cta.href}
        className={cn(
          "mt-4 inline-block rounded-full px-4 py-2 text-[12.5px] font-bold transition-all duration-300 hover:-translate-y-0.5",
          best ? "bg-white text-[#302e86] shadow-float" : "border border-[#302e86]/30 bg-white text-[#302e86] hover:border-[#2f6bff] hover:text-[#2f6bff]",
        )}
      >
        {t.cta.label}
      </Link>
    </motion.div>
  );
}

const i2bg = (i: number) => (i === 2 ? "bg-[#302e86] text-white" : "bg-[#eaf0ff] text-[#2f6bff]");

export function PricingComparison() {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState<string | null>(null);
  const [diffOnly, setDiffOnly] = useState(false);
  const [onlyPicked, setOnlyPicked] = useState(false);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [focus, setFocus] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const [tab, setTab] = useState<string>("");

  const allRows = useMemo(() => pricingComparison.flatMap((g) => g.rows.map((r) => ({ ...r, group: g.group }))), []);
  const togglePick = (f: string) =>
    setPicked((s) => {
      const n = new Set(s);
      if (n.has(f)) n.delete(f);
      else n.add(f);
      return n;
    });

  // Plan fit for the picked capabilities
  const fit = useMemo(() => {
    const rows = allRows.filter((r) => picked.has(r.feature));
    return pricingCompareTiers.map((_, i) => ({
      covered: rows.filter((r) => r.values[i].level !== "none" && r.values[i].level !== "addon").length,
      addons: rows.filter((r) => r.values[i].level === "addon").length,
    }));
  }, [allRows, picked]);
  const bestIndex = useMemo(() => {
    if (!picked.size) return -1;
    let best = 0;
    fit.forEach((f, i) => {
      const reach = f.covered + f.addons;
      const bestReach = fit[best].covered + fit[best].addons;
      // reach more of what was picked; on a tie prefer the plan that needs fewer paid add-ons
      if (reach > bestReach || (reach === bestReach && f.addons < fit[best].addons)) best = i;
    });
    return best;
  }, [fit, picked]);

  const groups = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return pricingComparison
      .filter((g) => !group || g.group === group)
      .map((g) => ({
        ...g,
        rows: g.rows.filter(
          (r) =>
            (!needle || r.feature.toLowerCase().includes(needle)) &&
            (!diffOnly || !same(r.values)) &&
            (!onlyPicked || picked.has(r.feature)),
        ),
      }))
      .filter((g) => g.rows.length > 0);
  }, [q, group, diffOnly, onlyPicked, picked]);

  const chipRows = allRows.filter(
    (r) => (!group || r.group === group) && (!q.trim() || r.feature.toLowerCase().includes(q.trim().toLowerCase())),
  );
  const shown = groups.reduce((n, g) => n + g.rows.length, 0);
  const total = pricingComparison.reduce((n, g) => n + g.rows.length, 0);
  const filtered = q || group || diffOnly || onlyPicked;
  const reset = () => {
    setQ("");
    setGroup(null);
    setDiffOnly(false);
    setOnlyPicked(false);
  };

  return (
    <div className="mt-16">
      {/* Big animated heading */}
      <div className="relative text-center">
        <span className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-40 w-[70%] -translate-x-1/2 -translate-y-1/2 animate-aurora rounded-full bg-[#2f6bff]/15 blur-3xl" />
        <span className="inline-flex items-center gap-2 rounded-full bg-[#eaf0ff] px-3.5 py-1 font-mono text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#2f6bff]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#2f6bff]" />
            <span className="relative h-2 w-2 rounded-full bg-[#2f6bff]" />
          </span>
          {total} capabilities · 3 plans
        </span>
        <h3 className="mt-4 text-balance font-display text-[clamp(2.4rem,5.2vw,4.2rem)] font-extrabold leading-[1.04] tracking-tight text-fg">
          Compare every{" "}
          <span className="inline-block animate-shimmer bg-gradient-to-r from-[#e0263a] via-[#2f6bff] to-[#e0263a] bg-[length:200%_auto] bg-clip-text text-transparent">capability</span>
        </h3>
        <span className="mx-auto mt-5 block h-[6px] w-32 rounded-full bg-gradient-to-r from-teal-400 via-teal-300 to-accent-500" aria-hidden />
        <p className="mx-auto mt-5 max-w-xl text-[17px] font-medium leading-relaxed text-[#1f2340]">
          One platform end to end. Each tier adds scope and autonomy, not a different product.
        </p>
      </div>

      {/* Capability matcher */}
      <div className="relative mx-auto mt-10 overflow-hidden rounded-[34px] border border-white/70 bg-white/65 p-5 shadow-[0_40px_100px_-40px_rgba(47,107,255,0.55)] ring-1 ring-[#2f6bff]/15 backdrop-blur-xl sm:p-8">
        <span className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 animate-aurora rounded-full bg-[#2f6bff]/15 blur-3xl" />
        <span className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 animate-aurora rounded-full bg-accent-500/10 blur-3xl [animation-delay:-8s]" />
        <span className="absolute inset-x-0 top-0 h-1 animate-shimmer bg-gradient-to-r from-[#e0263a] via-[#2f6bff] to-[#e0263a] bg-[length:200%_auto]" />

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          {/* left: pick what you need */}
          <div>
            <div className="font-display text-[22px] font-extrabold text-fg">What do you need?</div>
            <p className="mt-1 text-[14px] font-medium text-fg-muted">Tap the capabilities that matter. The plans on the right react live.</p>

            <label className="relative mt-4 block">
              <svg className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#2f6bff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search a capability, e.g. geofencing"
                aria-label="Search capabilities"
                className="w-full rounded-full border border-line-strong bg-white py-3 pl-11 pr-11 text-[14.5px] font-medium text-fg outline-none transition-shadow placeholder:text-fg-faint focus:border-[#2f6bff] focus:shadow-[0_0_0_4px_rgba(47,107,255,0.15)]"
              />
              {q && (
                <button onClick={() => setQ("")} aria-label="Clear search" className="absolute right-3.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-[#eef3ff] text-[13px] font-bold text-[#2f6bff] hover:bg-[#dbe6ff]">
                  ×
                </button>
              )}
            </label>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {[null, ...pricingComparison.map((g) => g.group)].map((g) => (
                <button
                  key={g ?? "all"}
                  onClick={() => setGroup(g)}
                  aria-pressed={group === g}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-[12.5px] font-bold transition-all duration-300",
                    group === g
                      ? "border-transparent bg-gradient-to-r from-[#2f6bff] to-[#302e86] text-white shadow-[0_8px_20px_-8px_rgba(47,107,255,0.8)]"
                      : "border-line-strong bg-white text-[#302e86] hover:-translate-y-0.5 hover:border-[#2f6bff]/50",
                  )}
                >
                  {g ?? "All"}
                </button>
              ))}
            </div>

            <div data-lenis-prevent className="mt-4 flex max-h-[230px] flex-wrap gap-2 overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {chipRows.map((r) => {
                  const on = picked.has(r.feature);
                  return (
                    <motion.button
                      layout
                      key={r.feature}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => togglePick(r.feature)}
                      aria-pressed={on}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-bold transition-colors duration-300",
                        on
                          ? "border-transparent bg-[#2f6bff] text-white shadow-[0_10px_22px_-10px_rgba(47,107,255,0.9)]"
                          : "border-line-strong bg-white text-[#1f2340] hover:border-[#2f6bff]/60 hover:text-[#2f6bff]",
                      )}
                    >
                      <span className={cn("grid h-4 w-4 place-items-center rounded-full text-[10px] transition-all", on ? "bg-white text-[#2f6bff]" : "bg-[#eaf0ff] text-transparent")}>
                        <Check width={10} height={10} />
                      </span>
                      <Highlight text={r.feature} q={q.trim()} />
                    </motion.button>
                  );
                })}
              </AnimatePresence>
              {chipRows.length === 0 && <span className="py-2 text-[13.5px] font-medium text-fg-muted">No capability matches that.</span>}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <button
                role="switch"
                aria-checked={diffOnly}
                onClick={() => setDiffOnly((v) => !v)}
                className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-white px-3.5 py-2 text-[13px] font-bold text-[#302e86] transition-all hover:border-[#2f6bff]/50"
              >
                <span className={cn("relative h-5 w-9 rounded-full transition-colors duration-300", diffOnly ? "bg-[#2f6bff]" : "bg-[#cfd6ea]")}>
                  <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all duration-300", diffOnly ? "left-[18px]" : "left-0.5")} />
                </span>
                Differences only
              </button>
              <button
                role="switch"
                aria-checked={onlyPicked}
                disabled={!picked.size}
                onClick={() => setOnlyPicked((v) => !v)}
                className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-white px-3.5 py-2 text-[13px] font-bold text-[#302e86] transition-all hover:border-[#2f6bff]/50 disabled:opacity-40"
              >
                <span className={cn("relative h-5 w-9 rounded-full transition-colors duration-300", onlyPicked ? "bg-[#2f6bff]" : "bg-[#cfd6ea]")}>
                  <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all duration-300", onlyPicked ? "left-[18px]" : "left-0.5")} />
                </span>
                Only my picks
              </button>
              {picked.size > 0 && (
                <button onClick={() => { setPicked(new Set()); setOnlyPicked(false); }} className="text-[12.5px] font-bold text-[#2f6bff] underline decoration-[#2f6bff]/30 underline-offset-4 hover:text-teal-400">
                  Clear {picked.size} pick{picked.size > 1 ? "s" : ""}
                </button>
              )}
            </div>
          </div>

          {/* right: live plan fit */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-fg-faint">Plan fit</span>
              <span className="font-mono text-[11px] font-semibold text-fg-faint">{picked.size ? `${picked.size} picked` : "nothing picked yet"}</span>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-2">
              {pricingCompareTiers.map((_, i) => (
                <FitCard key={i} index={i} covered={fit[i].covered} addons={fit[i].addons} picked={picked.size} best={i === bestIndex} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[10.5px] uppercase tracking-wider text-fg-faint">
        <Legend tone="bg-[#2f6bff] text-white" glyph="check" label="Included" />
        <Legend tone="bg-[#fbbf24] text-[#5b3a00]" glyph="◐" label="Limited" />
        <Legend tone="border-2 border-[#d51f2c]/50 bg-white text-[#d51f2c]" glyph="+" label="Paid add-on" />
        <span className="inline-flex items-center gap-1.5">
          <span className="text-fg-faint/50">—</span> Not available
        </span>
        <span className="text-[#2f6bff]">
          Showing {shown} of {total}
        </span>
        {filtered && (
          <button onClick={reset} className="text-[#2f6bff] underline decoration-[#2f6bff]/30 underline-offset-4 hover:text-teal-400">
            Reset filters
          </button>
        )}
        <span className="hidden text-[#2f6bff] lg:inline">Hover a plan to focus its column · click to pin</span>
      </div>

      {shown === 0 ? (
        <div className="mx-auto mt-8 max-w-xl rounded-3xl border border-dashed border-line-strong bg-white p-8 text-center shadow-card">
          <div className="font-display text-[20px] font-extrabold text-fg">No capability matches that.</div>
          <button onClick={reset} className="mt-4 rounded-full bg-[#2f6bff] px-5 py-2 text-[13.5px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(47,107,255,0.8)] hover:bg-[#1f55d9]">
            Reset filters
          </button>
        </div>
      ) : (
        <>
          <DesktopTable groups={groups} tab={tab} setTab={setTab} q={q.trim()} focus={focus} setFocus={setFocus} pinned={pinned} setPinned={setPinned} />
          <MobileAccordion groups={groups} tab={tab} setTab={setTab} />
        </>
      )}
    </div>
  );
}
