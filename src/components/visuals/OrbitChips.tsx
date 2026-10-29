"use client";

import { useRef, type ReactNode } from "react";
import { useAnimationFrame } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Item = { icon: ReactNode; label: string };

const TILT = -13; // degrees, like the Moon-around-Earth reference
const RINGS = [
  { a: 380, b: 104, speed: 0.00022, dir: 1 },
  { a: 250, b: 66, speed: 0.00032, dir: -1 },
];

/**
 * Numbered chips travelling on two tilted elliptical orbits around the centre.
 * Each chip scales and brightens as it swings to the near side and passes
 * behind the centre content on the far side, which sells the depth.
 */
export function OrbitChips({ items }: { items: Item[] }) {
  const reduced = usePrefersReducedMotion();
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  // Split items alternately across the two rings.
  const placed = items.map((item, i) => {
    const ring = i % 2;
    const inRing = items.filter((_, k) => k % 2 === ring);
    return { item, n: i + 1, ring, slot: inRing.indexOf(item), count: inRing.length };
  });

  useAnimationFrame((t) => {
    const time = reduced ? 0 : t;
    const rad = (TILT * Math.PI) / 180;
    placed.forEach((p, i) => {
      const el = refs.current[i];
      if (!el) return;
      const r = RINGS[p.ring];
      const th = time * r.speed * r.dir + (p.slot / p.count) * Math.PI * 2 + p.ring * 0.9;
      const x0 = Math.cos(th) * r.a;
      const y0 = Math.sin(th) * r.b;
      const x = x0 * Math.cos(rad) - y0 * Math.sin(rad);
      const y = x0 * Math.sin(rad) + y0 * Math.cos(rad);
      const depth = Math.sin(th); // -1 far, +1 near
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${(0.82 + 0.26 * depth).toFixed(3)})`;
      el.style.opacity = String(0.62 + 0.38 * ((depth + 1) / 2));
      el.style.zIndex = depth > 0 ? "20" : "0";
    });
  });

  return (
    <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden>
      {/* Orbit paths */}
      <svg className="absolute left-1/2 top-1/2 overflow-visible" width="1" height="1">
        {RINGS.map((r, i) => (
          <ellipse
            key={i}
            rx={r.a}
            ry={r.b}
            transform={`rotate(${TILT})`}
            fill="none"
            stroke="white"
            strokeOpacity={i ? 0.3 : 0.5}
            strokeWidth={1.6}
            strokeDasharray={i ? "3 7" : "none"}
          />
        ))}
      </svg>

      <div className="absolute left-1/2 top-1/2">
        {placed.map((p, i) => (
          <span
            key={p.n}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="absolute -left-[23px] -top-[23px] block h-[46px] w-[46px] will-change-transform"
            title={p.item.label}
          >
            <span className="relative grid h-full w-full place-items-center rounded-2xl bg-white/20 text-white shadow-[0_10px_26px_-8px_rgba(0,0,0,0.7)] ring-1 ring-white/45 backdrop-blur-md">
              {p.item.icon}
              <span className="absolute -right-1.5 -top-1.5 grid h-[18px] w-[18px] place-items-center rounded-full bg-[#2f6bff] font-mono text-[9.5px] font-bold text-white ring-2 ring-[#1f1c52]">
                {p.n}
              </span>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
