"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * The container yard — ShiftEaze's roster, drawn as a stacked terminal yard.
 *
 * Each block is a shipping container, coloured by what that slot is doing:
 * navy for a Day shift, deep navy for Night, pale slate for Off, with rust
 * and brand-red boxes scattered through the stacks the way a real yard looks.
 * A few slots run the signature beat — a container flares red (AI-predicted
 * absence), then resolves to fresh indigo (auto-backfilled).
 *
 * Deliberately NOT WebGL. An earlier three.js version rendered inconsistently
 * across machines (a failed context just showed nothing) and cost a large
 * runtime chunk for a decorative backdrop. This is plain CSS: it renders
 * identically everywhere, and degrades to a still yard — not an empty box —
 * whenever animation is unavailable or unwanted.
 *
 * See globals.css (`.yard*`) for the performance contract this relies on:
 * flat static tiles, one shared texture overlay, compositor-only animation.
 */

const TILE_COUNT = 210;

/** Slots that run the absence→backfill beat. Spread out, never adjacent. */
const BEAT_SLOTS: number[] = [17, 46, 79, 103, 148, 181];
const BEAT_SET = new Set(BEAT_SLOTS);

/**
 * Yard palette. Weighted so the stacks read mostly navy/slate — the working
 * roster — with red boxes rare enough to stay an accent rather than noise.
 *
 * The weights are tuned against the *realized* counts over the fixed 210
 * slots below, not against their theoretical ratios: at this sample size the
 * two diverge noticeably, and it's the realized mix that you actually see.
 * As rendered that lands on ~46 day / 39 night / 24 indigo / 33 off /
 * 21 slate / 20 rust / 10 brand-red, with 17 empty slots.
 */
const PALETTE: { color: string; weight: number }[] = [
  { color: "#302e86", weight: 29 }, // Day shift — brand navy
  { color: "#211d55", weight: 22 }, // Night shift — deep navy
  { color: "#4b49ab", weight: 15 }, // indigo
  { color: "#c2c8e2", weight: 15 }, // Off — pale slate
  { color: "#98a0c4", weight: 10 }, // weathered slate
  { color: "#a8323b", weight: 18 }, // rust red
  { color: "#d51f2c", weight: 7 }, // brand red — sparse
];
const TOTAL_WEIGHT = PALETTE.reduce((s, p) => s + p.weight, 0);

const C_ABSENCE = "#d51f2c";
const C_BACKFILL = "#4b49ab";

/** Share of slots left empty, so the stacks have gaps like a working yard. */
const EMPTY_RATE = 0.0414;

/**
 * Deterministic value hash → [0,1).
 *
 * Not an index modulo (that produced visible diagonal banding across the
 * grid) and not Math.random (that would desync the server and client render).
 * This is the `lowbias32` finalizer — an earlier, weaker mix here avalanched
 * poorly enough at small `n` to skew the palette badly, landing roughly twice
 * the intended number of brand-red containers.
 */
function noise(n: number, salt: number): number {
  let h = (Math.imul(n + 1, 0x9e3779b1) ^ salt) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 0x21f0aaad);
  h = Math.imul(h ^ (h >>> 15), 0x735a2d97);
  return ((h ^ (h >>> 15)) >>> 0) / 4294967296;
}

function pickColor(n: number): string {
  let r = noise(n, 0x9e3779b9) * TOTAL_WEIGHT;
  for (const p of PALETTE) {
    r -= p.weight;
    if (r <= 0) return p.color;
  }
  return PALETTE[0].color;
}

type Tile = { key: number; color: string | null; beat: number };

const TILES: Tile[] = Array.from({ length: TILE_COUNT }, (_, i) => {
  const beat = BEAT_SET.has(i) ? BEAT_SLOTS.indexOf(i) : -1;
  // Beat slots must always hold a container, and a working (non-Off) one, so
  // the flare reads as a shift losing its operator.
  if (beat >= 0) return { key: i, color: "#302e86", beat };
  const empty = noise(i, 0x1b873593) < EMPTY_RATE;
  return { key: i, color: empty ? null : pickColor(i), beat };
});

export function ContainerYard({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  // Freeze the beats when the yard is offscreen or the tab is hidden. A single
  // data-attribute flip drives a CSS `animation-play-state` rule — no React
  // state, no re-render, no per-frame work.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    let onscreen = true;
    const sync = () => {
      el.dataset.paused = !onscreen || document.hidden ? "true" : "false";
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        onscreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      data-paused="false"
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="yard relative">
        <div className="yard-grid">
          {TILES.map((t) =>
            t.color === null ? (
              // Empty slot — a gap in the stack. No paint, no animation.
              <span key={t.key} className="yard-tile" />
            ) : (
              <span
                key={t.key}
                className={cn(
                  "yard-tile relative",
                  t.beat >= 0 && "yard-beat animate-yard-lift"
                )}
                style={{
                  backgroundColor: t.color,
                  animationDelay: t.beat >= 0 ? `${t.beat * 1.5}s` : undefined,
                }}
              >
                {t.beat >= 0 && (
                  <>
                    {/* Predicted absence — flares over the container. */}
                    <span
                      className="yard-beat animate-yard-absence absolute inset-0 rounded-[2px]"
                      style={
                        {
                          backgroundColor: C_ABSENCE,
                          animationDelay: `${t.beat * 1.5}s`,
                        } as CSSProperties
                      }
                    />
                    {/* Auto-backfilled — resolves to a fresh indigo box. */}
                    <span
                      className="yard-beat animate-yard-backfill absolute inset-0 rounded-[2px]"
                      style={
                        {
                          backgroundColor: C_BACKFILL,
                          animationDelay: `${t.beat * 1.5}s`,
                        } as CSSProperties
                      }
                    />
                  </>
                )}
              </span>
            )
          )}
        </div>

        {/* Corrugation + bevel + door seam, tiled once over the whole yard. */}
        <div className="yard-texture pointer-events-none absolute inset-0" />
      </div>

      {/* Fade the yard into the page instead of masking it (far cheaper). */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-[#f5f7fd]" />
    </div>
  );
}
