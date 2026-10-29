"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Bolt, Calendar, Layers, Refresh, Shield, Target } from "@/components/ui/icons";
import type { PlatformCard } from "@/content/platformCards";

const ICONS = [Layers, Refresh, Calendar, Bolt, Target, Shield];

const AUTO_MS = 3200;
/** After a manual interaction, wait this long before auto-advance resumes. */
const RESUME_MS = 4500;
const SPRING = { type: "spring", stiffness: 210, damping: 28 } as const;

/**
 * Centre-spotlight carousel in a soft glass style. The active card sits in the
 * middle, raised, with a light that travels around its edge; the others sit
 * flat and frosted either side. It auto-advances (pausing when off-screen) and
 * also responds to clicks, swipes, arrow keys, dots and the prev/next buttons.
 */
export function FocusCarousel({
  cards,
  tag,
}: {
  cards: PlatformCard[];
  tag: string;
  /** Kept for the callers that still pass the section image; the cards no longer crop it. */
  image?: string;
}) {
  const n = cards.length;
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [width, setWidth] = useState(1100);
  const rootRef = useRef<HTMLDivElement>(null);
  const prevOffsets = useRef<number[]>([]);
  const drag = useRef<{ x: number; moved: boolean } | null>(null);
  const lastTouch = useRef(0);
  const touch = () => (lastTouch.current = Date.now());

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  // Auto-advance. A manual interaction only holds it back for RESUME_MS.
  useEffect(() => {
    if (!inView || n < 2) return;
    const t = setInterval(() => {
      if (Date.now() - lastTouch.current < RESUME_MS) return;
      setActive((a) => (a + 1) % n);
    }, AUTO_MS);
    return () => clearInterval(t);
  }, [inView, n]);

  const go = (dir: 1 | -1) => {
    touch();
    setActive((a) => (a + dir + n) % n);
  };
  const select = (i: number) => {
    touch();
    setActive(i);
  };

  const GAP = 14;
  const PAD = 26;
  const cardW = Math.max(132, Math.floor((width - PAD * 2 - GAP * 2) / 3));
  const cardH = Math.round(Math.max(270, cardW * 1.85));
  const step = cardW + GAP;
  // Three cards show at once (previous, current, next); the rest wait off-stage.
  const reach = 1;

  const offsetOf = (i: number) => {
    let d = (i - active) % n;
    if (d > n / 2) d -= n;
    if (d <= -n / 2) d += n;
    return d;
  };
  const offsets = cards.map((_, i) => offsetOf(i));
  useEffect(() => {
    prevOffsets.current = offsets;
  });

  return (
    <div
      ref={rootRef}
      className="motion-always relative outline-none"
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${tag} features`}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      {/* soft neumorphic stage: three cards side by side, the active one raised */}
      <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#f4f4f6] to-[#e9e9ed] shadow-[inset_0_2px_0_rgba(255,255,255,0.9),inset_0_-10px_30px_rgba(0,0,0,0.04),0_30px_60px_-34px_rgba(30,30,70,0.35)] ring-1 ring-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:120px_120px]" />
        <div
          className="relative mx-auto overflow-hidden"
          style={{ height: cardH + 60, touchAction: "pan-y" }}
          onPointerDown={(e) => {
            touch();
            drag.current = { x: e.clientX, moved: false };
          }}
          onPointerMove={(e) => {
            if (drag.current && Math.abs(e.clientX - drag.current.x) > 8) drag.current.moved = true;
          }}
          onPointerUp={(e) => {
            if (!drag.current) return;
            const dx = e.clientX - drag.current.x;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            setTimeout(() => (drag.current = null), 0);
          }}
        >
          {cards.map((card, i) => {
            const off = offsets[i];
            const abs = Math.abs(off);
            const isActive = off === 0;
            const hidden = abs > reach;
            const jumped = prevOffsets.current[i] !== undefined && Math.abs(off - prevOffsets.current[i]) > 2;
            const Icon = ICONS[i % ICONS.length];

            return (
              <motion.div
                key={card.title}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${n}`}
                aria-hidden={hidden}
                className="absolute left-1/2 top-[30px] cursor-pointer select-none"
                style={{ width: cardW, height: cardH, marginLeft: -cardW / 2, zIndex: 10 - abs }}
                initial={false}
                animate={{ x: off * step, y: isActive ? -8 : 0, opacity: hidden ? 0 : 1 }}
                transition={jumped ? { duration: 0 } : SPRING}
                onClick={() => {
                  if (drag.current?.moved) return;
                  select(i);
                }}
              >
                {/* colour edge on the raised card, like a light catching its corner */}
                <div
                  className={`relative h-full rounded-[26px] p-[2px] transition-all duration-500 ${
                    isActive ? "bg-[linear-gradient(215deg,#6d5cff_0%,#ff7a8a_14%,#ffa35c_26%,transparent_44%)] shadow-[0_28px_50px_-18px_rgba(30,30,70,0.38),0_6px_14px_-6px_rgba(30,30,70,0.2)]" : "bg-transparent"
                  }`}
                >
                  <div
                    className={`flex h-full flex-col rounded-[24px] p-4 transition-colors duration-500 sm:p-5 ${
                      isActive ? "bg-gradient-to-b from-white to-[#f6f6f8]" : "bg-transparent"
                    }`}
                  >
                    <h3 className={`font-mono text-[14.5px] font-extrabold leading-snug tracking-tight transition-colors duration-500 ${isActive ? "text-[#14161f]" : "text-[#3d414d]"}`}>{card.title}</h3>
                    <span className="mt-2.5 block h-[7px] w-full rounded-full bg-[#dedee3]" aria-hidden />
                    <p className="mt-4 font-mono text-[12.5px] leading-[1.65] text-[#5c606c]">{card.text}</p>

                    <div className="mt-auto flex items-center gap-3 pt-4">
                      <span className="grid h-[50px] w-[50px] shrink-0 place-items-center rounded-full bg-gradient-to-b from-white to-[#ececf0] text-[#2f6bff] shadow-[0_8px_16px_-6px_rgba(30,30,70,0.3),inset_0_1px_0_#fff] ring-1 ring-black/5">
                        <Icon width={21} height={21} />
                      </span>
                      <span className="min-w-0 font-mono leading-tight">
                        <span className="block truncate text-[11px] font-bold uppercase tracking-wide text-[#8a8e99]">{tag}</span>
                        <span className="mt-1.5 block h-[5px] w-full rounded-full bg-[#dedee3]" aria-hidden />
                        <span className="mt-1 block text-[11px] font-bold text-[#8a8e99]">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous"
          className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#302e86] shadow-[0_8px_18px_-8px_rgba(48,46,134,0.5)] ring-1 ring-[#302e86]/10 transition hover:-translate-x-0.5 hover:bg-[#302e86] hover:text-white"
        >
          ←
        </button>
        <div className="flex items-center gap-2">
          {cards.map((c, i) => (
            <button
              key={c.title}
              type="button"
              aria-label={`Show ${c.title}`}
              aria-current={i === active}
              onClick={() => select(i)}
              className={`h-2.5 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-[#302e86]" : "w-2.5 bg-[#302e86]/25 hover:bg-[#302e86]/50"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next"
          className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#302e86] shadow-[0_8px_18px_-8px_rgba(48,46,134,0.5)] ring-1 ring-[#302e86]/10 transition hover:translate-x-0.5 hover:bg-[#302e86] hover:text-white"
        >
          →
        </button>
      </div>
    </div>
  );
}
