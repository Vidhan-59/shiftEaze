"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const styles: Record<Variant, string> = {
  primary:
    "bg-teal-400 text-white font-semibold shadow-[0_12px_30px_-10px_rgba(48,46,134,0.55)] hover:shadow-[0_18px_38px_-10px_rgba(48,46,134,0.65)] hover:bg-teal-500",
  secondary:
    "glass text-fg hover:border-teal-400/40 hover:bg-teal-500/[0.05] hover:shadow-card-hover",
  ghost: "text-fg-muted hover:bg-teal-500/[0.06] hover:text-fg",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[14.5px]",
  lg: "h-[52px] px-7 text-[15.5px]",
};

type Props = {
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  "aria-label"?: string;
  magnetic?: boolean;
  external?: boolean;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  onClick,
  type = "button",
  magnetic = true,
  external,
  ...rest
}: Props) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 300, damping: 20 });
  const y = useSpring(my, { stiffness: 300, damping: 20 });

  const handleMove = (e: React.PointerEvent) => {
    if (reduced || !magnetic || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 10);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const cls = cn(
    "btn-magnetic group rounded-full font-medium tracking-tight",
    "transition-colors duration-200 focus-visible:outline-teal-300",
    styles[variant],
    sizes[size],
    className
  );

  const inner = (
    <span className="relative z-10 inline-flex items-center gap-2 [&>svg:last-child]:transition-transform [&>svg:last-child]:duration-300 group-hover:[&>svg:last-child]:translate-x-1">
      {children}
    </span>
  );

  const shared = {
    onClick,
    onPointerMove: handleMove,
    onPointerLeave: reset,
    whileHover: reduced ? undefined : { scale: 1.035 },
    whileTap: reduced ? undefined : { scale: 0.96 },
    transition: { type: "spring", stiffness: 400, damping: 24 },
    style: { x, y },
    className: cls,
    ...rest,
  } as const;

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...shared}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      {...shared}
    >
      {inner}
    </motion.button>
  );
}
