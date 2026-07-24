"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { RosterWall } from "./RosterWall";
import { HeroPoster } from "./HeroPoster";
import { useDeviceTier } from "./hooks/useDeviceTier";
import { usePauseWhenHidden } from "./hooks/usePauseWhenHidden";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Signature hero WebGL scene. Mounted only via `next/dynamic({ ssr:false })`
 * (see Hero.tsx) so three.js never touches SSR or the critical path.
 *
 * Note: rendered on a transparent canvas over the light hero (no dark void /
 * no post-processing bloom) so it never regresses the light theme or risks an
 * opaque composer background. Motion — not glow — carries the effect here.
 */
export function HeroScene({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const tier = useDeviceTier();
  const wrapRef = useRef<HTMLDivElement>(null);
  const paused = usePauseWhenHidden(wrapRef);

  // Reduced motion → never create a WebGL context at all.
  if (reduced) return <HeroPoster className={className} />;

  const rows = tier === "low" ? 8 : 12;
  const cols = tier === "low" ? 12 : 20;

  return (
    <div
      ref={wrapRef}
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden
    >
      <Canvas
        dpr={[1, 1.75]}
        frameloop={paused ? "never" : "always"}
        camera={{ position: [0, 9, 12], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.85} />
        <directionalLight position={[5, 9, 6]} intensity={1} />
        <directionalLight position={[-6, 4, -3]} intensity={0.35} color="#d51f2c" />
        <RosterWall rows={rows} cols={cols} />
      </Canvas>
    </div>
  );
}
