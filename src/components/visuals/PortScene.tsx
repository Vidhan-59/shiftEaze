"use client";

import { useRef } from "react";
import { usePauseOffscreen } from "@/hooks/usePauseOffscreen";

const BOX = ["#d51f2c", "#2f6bff", "#e6e8f6", "#4b49ab", "#4db8ff", "#ff5468"];
const STACK = ["#8a1c2b", "#1d3f9e", "#4b49ab", "#8f95c4", "#a8283a", "#2b57c9"];

/** Wavy line, `n` ripples long, starting at the origin. */
const wave = (n: number) => `M-60 0 ${Array.from({ length: n }, () => "q 14 -5 28 0 t 28 0").join(" ")}`;

function Crane({ x, scale = 1, delay = 0 }: { x: number; scale?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} 440) scale(${scale})`}>
      {/* legs + portal beams */}
      <g fill="#171546" stroke="#5654b8" strokeWidth="1.4">
        <rect x="-4" y="-190" width="9" height="190" />
        <rect x="116" y="-190" width="9" height="190" />
        <rect x="-4" y="-120" width="129" height="7" />
        <rect x="-4" y="-190" width="129" height="9" />
      </g>
      <path d="M-4 -120 L125 -190 M125 -120 L-4 -190" stroke="#5654b8" strokeWidth="1.2" opacity="0.7" />
      {/* tower, boom, backstays */}
      <path d="M30 -199 L90 -199 L60 -250 Z" fill="#171546" stroke="#5654b8" strokeWidth="1.4" />
      <path d="M60 -250 L-185 -199 M60 -250 L215 -199" stroke="#8f95c4" strokeWidth="1.2" opacity="0.8" />
      <rect x="-190" y="-203" width="410" height="7" fill="#171546" stroke="#5654b8" strokeWidth="1.4" />
      {/* trolley + spreader sliding along the boom */}
      <g
        style={{ animation: `port-trolley 11s ease-in-out ${delay}s infinite alternate` }}
      >
        <rect x="-60" y="-212" width="26" height="12" rx="2" fill="#ff5468" />
        <line x1="-47" y1="-200" x2="-47" y2="-128" stroke="#e6e8f6" strokeWidth="1" opacity="0.7" />
        <rect x="-62" y="-128" width="30" height="9" fill="#4db8ff" opacity="0.9" />
      </g>
      {/* warning beacon */}
      <circle
        cx="60"
        cy="-254"
        r="3.2"
        fill="#ff5468"
        style={{ animation: `port-blink 2.2s ease-in-out ${delay}s infinite` }}
      />
    </g>
  );
}

/** Original dusk illustration of a container port: gantry cranes, a laden ship, stacks and moving water. */
export function PortScene({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  usePauseOffscreen(ref);

  // Ship deck: 3 tiers of boxes
  const deck: { x: number; y: number; c: string }[] = [];
  for (let col = 0; col < 15; col++)
    for (let row = 0; row < 3; row++)
      if (!(row === 2 && col % 5 === 4)) deck.push({ x: 535 + col * 36, y: 384 - (row + 1) * 21, c: BOX[(col * 2 + row * 3) % BOX.length] });

  // Distant stacks on the far shore
  const far = Array.from({ length: 34 }, (_, i) => ({ x: i * 49 + ((i * 7) % 13), h: 10 + ((i * 11) % 5) * 7 }));

  // Foreground stacks, left and right heavy so the middle stays calm
  const near: { x: number; levels: number; c: string }[] = [];
  for (let i = 0; i < 40; i++) {
    const x = i * 42 - 10;
    const edge = Math.abs(x - 800) / 800;
    near.push({ x, levels: 1 + Math.round(edge * 2) - (i % 4 === 0 ? 1 : 0), c: STACK[(i * 5) % STACK.length] });
  }

  return (
    <div ref={ref} aria-hidden className={className}>
      <svg
        viewBox="0 150 1600 370"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
        role="presentation"
      >
        <defs>
          <radialGradient id="ps-glow" cx="0.78" cy="0.78" r="0.55">
            <stop offset="0" stopColor="#ff5468" stopOpacity="0.5" />
            <stop offset="0.45" stopColor="#d51f2c" stopOpacity="0.16" />
            <stop offset="1" stopColor="#d51f2c" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ps-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2f6bff" stopOpacity="0.38" />
            <stop offset="1" stopColor="#0d0c2b" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="ps-land" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#16143f" />
            <stop offset="1" stopColor="#0a0924" />
          </linearGradient>
        </defs>

        <rect x="0" y="150" width="1600" height="370" fill="url(#ps-glow)" />

        {/* far shore */}
        <g opacity="0.7" fill="#262261">
          {far.map((f, i) => (
            <rect key={i} x={f.x} y={398 - f.h} width="40" height={f.h} />
          ))}
        </g>

        {/* water */}
        <rect x="0" y="396" width="1600" height="50" fill="url(#ps-water)" />
        <g stroke="#8fb5ff" strokeWidth="1.1" fill="none" opacity="0.4">
          {[408, 420, 432].map((y, i) => (
            <g key={y} transform={`translate(0 ${y})`}>
              <path d={wave(32)} style={{ animation: `port-wave ${4 + i * 1.5}s linear infinite` }} />
            </g>
          ))}
        </g>

        {/* ship, drifting gently */}
        <g transform="translate(90 0)">
        <g style={{ animation: "port-drift 36s ease-in-out infinite alternate" }}>
          <path d="M520 384 L1135 384 L1100 428 L555 428 Z" fill="#0f0e33" stroke="#4b49ab" strokeWidth="1.4" />
          <path d="M527 396 L1128 396 L1121 404 L534 404 Z" fill="#d51f2c" opacity="0.9" />
          {deck.map((b, i) => (
            <rect key={i} x={b.x} y={b.y} width="34" height="19" rx="1.5" fill={b.c} opacity="0.88" />
          ))}
          <rect x="1075" y="326" width="52" height="58" fill="#171546" stroke="#5654b8" strokeWidth="1.3" />
          <rect x="1068" y="318" width="66" height="12" fill="#1f1c52" stroke="#5654b8" strokeWidth="1.3" />
          {[1084, 1100, 1114].map((x) => (
            <rect key={x} x={x} y="334" width="8" height="7" fill="#ffd27a" opacity="0.9" />
          ))}
        </g>
        </g>

        {/* quay */}
        <rect x="0" y="440" width="1600" height="90" fill="url(#ps-land)" />
        <rect x="0" y="440" width="1600" height="2" fill="#5654b8" opacity="0.55" />

        <Crane x={90} scale={1.02} delay={0} />
        <Crane x={380} scale={1.02} delay={-4} />
        <Crane x={1300} scale={1.02} delay={-8} />

        {/* foreground stacks */}
        {near.map((s, i) => (
          <g key={i}>
            {Array.from({ length: Math.max(1, s.levels) }, (_, l) => (
              <rect
                key={l}
                x={s.x}
                y={496 - (l + 1) * 22}
                width="39"
                height="21"
                rx="1.5"
                fill={s.c}
                opacity={0.92 - l * 0.08}
              />
            ))}
          </g>
        ))}
        <rect x="0" y="496" width="1600" height="30" fill="#0a0924" />
      </svg>
    </div>
  );
}
