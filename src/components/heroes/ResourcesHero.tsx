"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useInView } from "framer-motion";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { CoverArt } from "@/components/visuals/CoverArt";
import { ArrowLeft, ArrowRight, ArrowUpRight, Brain, Calendar, Chart, Database, Layers, Ship } from "@/components/ui/icons";
import { usePauseOffscreen } from "@/hooks/usePauseOffscreen";
import { useLoopStep } from "@/hooks/useLoopStep";
import { cn } from "@/lib/utils";

const ICONS = [Layers, Calendar, Brain, Database, Chart, Ship];
const COVERS = [
  "from-[#4a48c4] to-[#262261]",
  "from-[#2f6bff] to-[#302e86]",
  "from-[#9f1d4a] to-[#4a0f2e]",
  "from-[#0f9d9a] to-[#0b4f6c]",
  "from-[#5b59c9] to-[#1f1c52]",
  "from-[#334155] to-[#0f172a]",
];

type Topic = { id: string; name: string; count: number; articles: string[] };

/** Pose for a card by its distance from the front card, in a loop of n cards. */
function pose(rel: number, n: number) {
  if (rel === 0) return { t: "translateX(0%) rotate(0deg) scale(1)", o: 1, z: 6 };
  if (rel === 1) return { t: "translateX(40%) rotate(6deg) scale(0.9)", o: 1, z: 5 };
  if (rel === 2) return { t: "translateX(72%) rotate(11deg) scale(0.8)", o: 0.8, z: 4 };
  if (rel === n - 1) return { t: "translateX(-40%) rotate(-6deg) scale(0.9)", o: 1, z: 5 };
  if (rel === n - 2) return { t: "translateX(-72%) rotate(-11deg) scale(0.8)", o: 0.8, z: 4 };
  return { t: "translateX(0%) rotate(0deg) scale(0.7)", o: 0, z: 1 };
}

function Mark({ text, q }: { text: string; q: string }) {
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (!q || i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded bg-[#fde68a] px-0.5 text-[#0d0c2b]">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

/**
 * Resources hero, on the same deep navy backdrop as the Industries hero. A
 * search box finds any article title and jumps to its topic; a stack of guide
 * covers rotates on its own (arrows and chips take over), and the front cover
 * tilts toward your pointer and previews its real article titles.
 */
export function ResourcesHero({ tag, heading, topics }: { tag: string; heading: string; topics: Topic[] }) {
  const ref = useRef<HTMLElement>(null);
  usePauseOffscreen(ref);
  const inView = useInView(ref, { amount: 0.3 });
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useLoopStep(topics.length, 4500, inView && !hovered);
  const [q, setQ] = useState("");
  const raf = useRef(0);
  const [focused, setFocused] = useState(false);
  const n = topics.length;

  const words = heading.split(" ");
  const last = words.pop();

  const needle = q.trim();
  const results = needle
    ? topics.flatMap((t) => t.articles.filter((a) => a.toLowerCase().includes(needle.toLowerCase())).map((a) => ({ a, t }))).slice(0, 6)
    : [];

  const step = (d: number) => {
    setHovered(true);
    setActive((a) => (a + d + n) % n);
  };

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-[#0d0c2b] pb-14 pt-28 text-white sm:pb-16 sm:pt-32">
      {/* Same backdrop as the Industries hero */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-[10%] -top-[30%] h-[80%] w-[50%] animate-aurora rounded-full bg-[#302e86] opacity-70 blur-[110px]" />
        <div className="absolute -left-[6%] bottom-0 h-[50%] w-[36%] animate-aurora rounded-full bg-[#d51f2c] opacity-25 blur-[120px] [animation-delay:-8s]" />
      </div>

      <Breadcrumbs pageKey="resources" tone="dark" />
      <Container className="mt-8 max-w-[1280px]">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
          <div className="min-w-0">
            <div className="animate-fade-up">
              <Tag tone="dark">{tag}</Tag>
            </div>
            <h1
              className="mt-5 animate-fade-up text-balance font-display text-[clamp(2.1rem,4.6vw,3.7rem)] font-extrabold leading-[1.06] tracking-tight"
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

            {/* Search: type a few letters, jump straight to the topic */}
            <div className="relative z-30 mt-7 max-w-xl animate-fade-up" style={{ animationDelay: "0.28s" }}>
              <label className="relative block">
                <svg className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#4db8ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onFocus={() => {
                    setFocused(true);
                    setHovered(true);
                  }}
                  onBlur={() => {
                    setTimeout(() => setFocused(false), 150);
                    setHovered(false);
                  }}
                  placeholder="Search guides, e.g. attendance"
                  aria-label="Search guides"
                  className="w-full rounded-full border border-white/25 bg-white/10 py-3.5 pl-11 pr-11 text-[14.5px] font-medium text-white outline-none backdrop-blur-md transition-all placeholder:text-white/55 focus:border-[#4db8ff] focus:bg-white/15 focus:shadow-[0_0_0_4px_rgba(77,184,255,0.2)]"
                />
                {q && (
                  <button onClick={() => setQ("")} aria-label="Clear search" className="absolute right-3.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-[13px] font-bold text-white hover:bg-white/30">
                    ×
                  </button>
                )}
              </label>

              {focused && needle && (
                <ul className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-white/15 bg-[#15144d] p-1.5 shadow-[0_24px_50px_-18px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                  {results.length === 0 && <li className="px-3 py-2.5 text-[13.5px] font-medium text-white/60">No guide matches that.</li>}
                  {results.map(({ a, t }) => (
                    <li key={a}>
                      <Link href={`#${t.id}`} className="flex items-start gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-semibold leading-snug text-white transition-colors hover:bg-white/10">
                        <span className="min-w-0 flex-1">
                          <Mark text={a} q={needle} />
                        </span>
                        <span className="shrink-0 rounded-full bg-[#2f6bff]/40 px-2 py-0.5 font-mono text-[10px] font-bold text-[#cfe0ff]">{t.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Topic chips: scroll sideways on phones */}
            <ul data-lenis-prevent-horizontal className="no-scrollbar -mx-1 mt-5 flex animate-fade-up gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible" style={{ animationDelay: "0.34s" }}>
              {topics.map((t, i) => (
                <li key={t.id} className="shrink-0">
                  <button
                    onPointerEnter={() => {
                      setHovered(true);
                      setActive(i);
                    }}
                    onPointerLeave={() => setHovered(false)}
                    onClick={() => setActive(i)}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-all duration-300",
                      i === active
                        ? "border-white bg-white text-[#302e86] shadow-[0_10px_24px_-10px_rgba(255,255,255,0.7)]"
                        : "border-white/25 bg-white/10 text-white/85 backdrop-blur-md hover:border-white/60",
                    )}
                  >
                    {t.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Card stack: scales down on small screens */}
          <div className="relative mx-auto w-full max-w-[660px] animate-fade-up" style={{ animationDelay: "0.35s" }} onPointerLeave={() => setHovered(false)}>
            <div className="relative mx-auto h-[340px] w-full sm:h-[500px]">
              <div className="absolute left-1/2 top-1/2 h-[480px] w-[740px] -translate-x-1/2 -translate-y-1/2 scale-[0.46] [perspective:1200px] min-[420px]:scale-[0.58] sm:scale-[0.8] lg:scale-[0.82] xl:scale-[0.9]">
                {/* floating labels, taken from the page's own intro: guides, checklists, explainers */}
                {[
                  { w: "Guides", c: "left-[2%] top-[8%]", d: "0s" },
                  { w: "Checklists", c: "right-[0%] top-[0%]", d: "-2s" },
                  { w: "Explainers", c: "right-[2%] bottom-[4%]", d: "-4s" },
                ].map((k) => (
                  <span
                    key={k.w}
                    className={cn("absolute z-20 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[12.5px] font-bold text-white shadow-float backdrop-blur-md", k.c)}
                    style={{ animation: `frame-float 7s ease-in-out ${k.d} infinite` }}
                    aria-hidden
                  >
                    {k.w}
                  </span>
                ))}

                {topics.map((t, i) => {
                  const rel = (i - active + n) % n;
                  const p = pose(rel, n);
                  const Icon = ICONS[i % ICONS.length];
                  const front = rel === 0;
                  return (
                    <div
                      key={t.id}
                      className="absolute left-1/2 top-1/2 -ml-[155px] -mt-[210px] h-[420px] w-[310px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ transform: p.t, opacity: p.o, zIndex: p.z }}
                    >
                      <Link
                        href={`#${t.id}`}
                        onPointerEnter={() => setHovered(true)}
                        onClick={(e) => {
                          if (!front) {
                            e.preventDefault();
                            setActive(i);
                          }
                        }}
                        onPointerMove={(e) => {
                          if (!front || raf.current) return;
                          const el = e.currentTarget;
                          const { clientX, clientY } = e;
                          raf.current = requestAnimationFrame(() => {
                            raf.current = 0;
                            const r = el.getBoundingClientRect();
                            const x = (clientX - r.left) / r.width - 0.5;
                            const y = (clientY - r.top) / r.height - 0.5;
                            el.style.transition = "none";
                            el.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
                          });
                        }}
                        onPointerLeave={(e) => {
                          cancelAnimationFrame(raf.current);
                          raf.current = 0;
                          e.currentTarget.style.transition = "transform 0.4s ease";
                          e.currentTarget.style.transform = "";
                        }}
                        tabIndex={front ? 0 : -1}
                        aria-hidden={!front || undefined}
                        className={cn(
                          "group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[26px] bg-gradient-to-br p-6 text-white ring-1 [will-change:transform]",
                          COVERS[i % COVERS.length],
                          front ? "shadow-[0_40px_80px_-30px_rgba(77,184,255,0.55)] ring-white/50" : "shadow-float ring-white/20",
                        )}
                      >
                        <span className="pointer-events-none absolute inset-x-3 top-3 h-[60%]" aria-hidden>
                          <CoverArt index={i} />
                        </span>
                        <span className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/20 blur-2xl" />
                        {front && <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 animate-[frame-sweep_5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />}
                        <span className="relative flex items-center justify-between">
                          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">{String(i + 1).padStart(2, "0")}</span>
                          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 ring-1 ring-white/30">
                            <Icon width={20} height={20} />
                          </span>
                        </span>
                        <span className="relative">
                          <span className="block text-balance font-display text-[26px] font-extrabold leading-[1.08] tracking-tight [text-shadow:0_2px_14px_rgba(0,0,0,0.45)]">{t.name}</span>
                          {/* the real article titles, previewed on the front cover */}
                          <span className={cn("mt-3 block space-y-1.5 overflow-hidden transition-all duration-500", front ? "max-h-[120px] opacity-100" : "max-h-0 opacity-0")}>
                            {t.articles.slice(0, 3).map((a) => (
                              <span key={a} className="flex items-start gap-1.5 text-[12.5px] font-medium leading-snug text-white/90">
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/70" />
                                <span className="line-clamp-1">{a}</span>
                              </span>
                            ))}
                          </span>
                          <span className="mt-3 flex items-center justify-between text-[12.5px] font-semibold text-white/80">
                            {t.count} articles
                            <ArrowUpRight width={16} height={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </span>
                        </span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* controls */}
            <div className="mt-2 flex items-center justify-center gap-4">
              <button onClick={() => step(-1)} aria-label="Previous guide" className="grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all hover:-translate-x-0.5 hover:border-white/60 hover:bg-white/20">
                <ArrowLeft width={16} height={16} />
              </button>
              <div className="flex items-center gap-1.5">
                {topics.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setHovered(true);
                      setActive(i);
                    }}
                    aria-label={`Show ${t.name}`}
                    className={cn("h-1.5 rounded-full transition-all duration-500", i === active ? "w-7 bg-white" : "w-1.5 bg-white/35 hover:bg-white/60")}
                  />
                ))}
              </div>
              <button onClick={() => step(1)} aria-label="Next guide" className="grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all hover:translate-x-0.5 hover:border-white/60 hover:bg-white/20">
                <ArrowRight width={16} height={16} />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
