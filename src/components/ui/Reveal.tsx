"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
};

/** Single fade-up reveal on scroll. */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const M = motion[as] as typeof motion.div;
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </M>
  );
}

/** Container that staggers direct <RevealItem> children into view. */
export function RevealGroup({
  children,
  className,
  delayChildren = 0.05,
  gap = 0.09,
}: {
  children: React.ReactNode;
  className?: string;
  delayChildren?: number;
  gap?: number;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={stagger(delayChildren, gap)}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
