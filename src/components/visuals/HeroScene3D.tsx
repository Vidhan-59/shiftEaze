"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePauseOffscreen } from "@/hooks/usePauseOffscreen";
import { Check } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/** Decorative roster rows: D day, N night, W week-off, A absent (same legend as the product). */
const ROWS = ["DDNNWWA", "NNWWDDN", "WWDDNNW", "DNWADDN", "ANNWWDD"];
const CHIP: Record<string, string> = {
  D: "bg-emerald-100 text-emerald-700",
  N: "bg-indigo-100 text-indigo-700",
  W: "bg-violet-100 text-violet-700",
  A: "bg-red-100 text-red-600",
};

const t3d = (z: number) => ({ transform: `translateZ(${z}px)` });

/** Resting pose: an isometric-ish tilt. */
const REST = { x: 8, y: -20 };
/** How long a dragged pose is held before the scene eases back to rest. */
const HOLD_MS = 2200;

/**
 * A pure-CSS 3D "operations deck": a tilted glass roster floating over a grid
 * plate, with a KPI card, a verified-punch ring and an orbiting marker at
 * different depths.
 *
 * Interaction: hovering gives a light parallax; press-and-drag spins the whole
 * stack in any direction (with a little throw on release), then it eases back
 * to rest. Spring-smoothed, no canvas / WebGL, and the ambient loops freeze
 * when scrolled away. It is deliberately exempt from the global reduced-motion
 * rule (see `.motion-always` in globals.css): it is a small, contained,
 * user-driven element, and the loops are slow and low-amplitude.
 */
export function HeroScene3D({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  usePauseOffscreen(ref);

  const ry = useMotionValue(REST.y);
  const rx = useMotionValue(REST.x);
  const rotateY = useSpring(ry, { stiffness: 90, damping: 16, mass: 0.6 });
  const rotateX = useSpring(rx, { stiffness: 90, damping: 16, mass: 0.6 });

  const drag = useRef({ down: false, held: false, x: 0, y: 0, vx: 0, vy: 0 });
  const timer = useRef<ReturnType<typeof setTimeout>>();
  /** Whole turns (in degrees) the scene is currently offset from REST. */
  const turns = useRef(0);
  const [grabbing, setGrabbing] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => () => clearTimeout(timer.current), []);

  function toRest() {
    // Settle on the nearest equivalent of the rest pose, so a scene that was
    // spun several turns takes the short way home instead of unwinding.
    turns.current = 360 * Math.round((ry.get() - REST.y) / 360);
    ry.set(REST.y + turns.current);
    rx.set(REST.x);
    drag.current.held = false;
  }

  function onDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    clearTimeout(timer.current);
    Object.assign(drag.current, { down: true, held: true, x: e.clientX, y: e.clientY, vx: 0, vy: 0 });
    setGrabbing(true);
    setTouched(true);
  }

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (d.down) {
      const dx = e.clientX - d.x;
      const dy = e.clientY - d.y;
      d.x = e.clientX;
      d.y = e.clientY;
      d.vx = dx;
      d.vy = dy;
      ry.set(ry.get() + dx * 0.6);
      rx.set(Math.max(-55, Math.min(75, rx.get() - dy * 0.45)));
    } else if (!d.held) {
      const r = e.currentTarget.getBoundingClientRect();
      ry.set(REST.y + turns.current + ((e.clientX - r.left) / r.width - 0.5) * 34);
      rx.set(REST.x - ((e.clientY - r.top) / r.height - 0.5) * 22);
    }
  }

  function onUp() {
    const d = drag.current;
    if (!d.down) return;
    d.down = false;
    setGrabbing(false);
    // A little throw in the direction of the last movement.
    ry.set(ry.get() + d.vx * 7);
    rx.set(Math.max(-55, Math.min(75, rx.get() - d.vy * 5)));
    timer.current = setTimeout(toRest, HOLD_MS);
  }

  function onLeave() {
    const d = drag.current;
    if (!d.down && !d.held) toRest();
  }

  return (
    <div
      ref={ref}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onPointerLeave={onLeave}
      className={cn(
        "motion-always relative mx-auto h-[380px] w-full max-w-[540px] select-none [perspective:1300px] [touch-action:pan-y]",
        grabbing ? "cursor-grabbing" : "cursor-grab",
        className
      )}
      aria-hidden
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="absolute inset-0 [transform-style:preserve-3d]"
      >
        <div className="absolute inset-0 animate-sway [transform-style:preserve-3d]">
          {/* Grid plate */}
          <div
            className="absolute inset-x-2 inset-y-6 rounded-[2rem] border border-white/20 bg-[radial-gradient(70%_70%_at_50%_45%,rgba(255,255,255,0.18),rgba(255,255,255,0.03))] shadow-[0_40px_80px_-30px_rgba(0,0,10,0.6)]"
            style={t3d(-70)}
          >
            <div className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:34px_34px] [mask-image:radial-gradient(70%_70%_at_50%_50%,#000,transparent)]" />
          </div>

          {/* Orbit ring + marker */}
          <div
            className="absolute left-1/2 top-1/2 -ml-[215px] -mt-[215px] h-[430px] w-[430px] [transform-style:preserve-3d]"
            style={{ transform: "translateZ(-20px) rotateX(74deg)" }}
          >
            <div className="absolute inset-0 animate-orbit-spin rounded-full border border-dashed border-white/35">
              <span className="absolute -top-[7px] left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-accent-400 shadow-[0_0_18px_6px_rgba(230,76,90,0.55)]" />
            </div>
          </div>

          {/* Roster panel */}
          <div
            className="absolute left-6 top-14 w-[330px] overflow-hidden rounded-xl bg-white shadow-[0_30px_60px_-20px_rgba(0,0,20,0.55)]"
            style={t3d(0)}
          >
            <div className="flex items-center gap-1.5 bg-teal-400 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-white/40" />
              <span className="h-2 w-2 rounded-full bg-white/40" />
              <span className="h-2 w-2 rounded-full bg-white/40" />
              <span className="ml-2 font-mono text-[9px] uppercase tracking-widest text-white/80">
                Scheduler Dashboard
              </span>
            </div>
            <div className="relative space-y-1.5 p-3">
              {ROWS.map((row, r) => (
                <div key={r} className="flex items-center gap-2">
                  <span className="h-2 w-12 shrink-0 rounded-full bg-ink-600" />
                  <div className="flex flex-1 justify-between gap-1">
                    {row.split("").map((c, i) => (
                      <span
                        key={i}
                        className={cn(
                          "grid h-[22px] w-[22px] place-items-center rounded-md text-[9.5px] font-bold",
                          CHIP[c]
                        )}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              {/* Scanning highlight that sweeps the grid */}
              <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-scan-x bg-gradient-to-r from-transparent via-teal-400/15 to-transparent" />
            </div>
          </div>

          {/* KPI card */}
          <div className="absolute right-3 top-5 w-[160px]" style={t3d(70)}>
            <div className="animate-float-y rounded-xl bg-white p-3.5 shadow-[0_24px_50px_-16px_rgba(0,0,20,0.55)]">
              <div className="font-mono text-[9px] uppercase tracking-widest text-fg-faint">Active</div>
              <div className="mt-0.5 font-display text-[28px] font-extrabold leading-none text-fg">1,127</div>
              <div className="mt-1 text-[10px] text-fg-muted">Active Employees</div>
              <div className="mt-2.5 flex h-7 items-end gap-1">
                {[40, 62, 48, 80, 58, 92, 70].map((h, i) => (
                  <span
                    key={i}
                    className="w-full rounded-sm bg-gradient-to-t from-teal-400 to-teal-300"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Verified punch ring */}
          <div className="absolute bottom-6 left-0 w-[176px]" style={t3d(115)}>
            <div
              className="animate-float-y rounded-xl border border-white/30 bg-white/15 p-3 text-white shadow-[0_24px_50px_-16px_rgba(0,0,20,0.6)] backdrop-blur-md"
              style={{ animationDelay: "-2s" }}
            >
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 44 44" className="h-11 w-11 -rotate-90">
                  <circle cx="22" cy="22" r="17" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="4" />
                  <circle
                    cx="22"
                    cy="22"
                    r="17"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="4"
                    strokeLinecap="round"
                    pathLength={100}
                    strokeDasharray="100"
                    className="animate-ring-draw"
                  />
                </svg>
                <div>
                  <div className="flex items-center gap-1 text-[12px] font-semibold">
                    <Check width={12} height={12} /> Punch verified
                  </div>
                  <div className="text-[10px] text-white/70">Inside terminal geofence</div>
                </div>
              </div>
            </div>
          </div>

          {/* Risk pill */}
          <div className="absolute bottom-10 right-2" style={t3d(150)}>
            <div
              className="animate-float-y flex items-center gap-2 rounded-full bg-accent-500 px-3.5 py-2 text-[11px] font-semibold text-white shadow-[0_18px_36px_-12px_rgba(213,31,44,0.8)]"
              style={{ animationDelay: "-3.5s" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-white/80" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              Absence risk flagged
            </div>
          </div>

          {/* Spinning wireframe cube */}
          <div className="absolute left-3 top-1 h-12 w-12" style={t3d(90)}>
            <div className="h-full w-full animate-cube-spin [transform-style:preserve-3d]">
              {[
                "rotateY(0deg)",
                "rotateY(90deg)",
                "rotateY(180deg)",
                "rotateY(270deg)",
                "rotateX(90deg)",
                "rotateX(-90deg)",
              ].map((f) => (
                <span
                  key={f}
                  className="absolute inset-0 border border-white/60 bg-white/10 backdrop-blur-[1px]"
                  style={{ transform: `${f} translateZ(24px)` }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {(
        <div
          className={cn(
            "pointer-events-none absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/80 backdrop-blur transition-opacity duration-500",
            touched && "opacity-0"
          )}
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4" />
          </svg>
          Drag to rotate
        </div>
      )}
    </div>
  );
}
