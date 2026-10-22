import type { Variants } from "framer-motion";

/** Shared easing — the "expo-out" curve used across the site for calm, premium motion. */
export const easeExpo = [0.16, 1, 0.3, 1] as const;

/** Fade + subtle rise. Used for most scroll-in reveals. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeExpo },
  },
};

/** Parent container that staggers its children. */
export function stagger(delayChildren = 0.05, stagger = 0.09): Variants {
  return {
    hidden: {},
    show: {
      transition: { delayChildren, staggerChildren: stagger },
    },
  };
}

/** Standard viewport config for whileInView reveals. */
export const viewportOnce = { once: true, amount: 0.3 } as const;
