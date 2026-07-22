"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardMock } from "@/components/visuals/DashboardMock";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type Kind = "manpower" | "shift" | "attendance" | "leave" | "roster";

/**
 * Plays a looping, muted product clip from /public/assets/video when present.
 * If the file is missing it falls back to an animated live-preview built from
 * the same dashboard visuals, so the section always looks intentional. Drop in
 * the real MP4 and it takes over automatically — no code change needed.
 */
export function ProductVideo({
  src = "/assets/video/product-overview.mp4",
  poster,
  fallbackKind = "shift",
  className,
}: {
  src?: string;
  poster?: string;
  fallbackKind?: Kind;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "relative aspect-[1200/620] w-full overflow-hidden bg-ink-850",
        className
      )}
    >
      {failed ? (
        <>
          <DashboardMock kind={fallbackKind} />
          {/* moving scanline to read as a live capture */}
          {!reduced && (
            <motion.div
              className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-teal-400/10 to-transparent"
              initial={{ top: "-20%" }}
              animate={{ top: ["-20%", "100%"] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
              aria-hidden
            />
          )}
        </>
      ) : (
        <video
          className="h-full w-full object-cover object-top"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          onError={() => setFailed(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* soft brand vignette + preview chip */}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" aria-hidden />
      <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-line bg-white/85 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-teal-300 shadow-sm backdrop-blur">
        <span className="grid h-4 w-4 place-items-center rounded-full bg-teal-400 text-white">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        {failed ? "Live preview" : "Product walkthrough"}
      </div>
    </div>
  );
}
