import type { Variants, Transition } from "framer-motion";

/** Shared easing — the "expo-out" curve used across the site for calm, premium motion. */
export const easeExpo = [0.16, 1, 0.3, 1] as const;

export const springSoft: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 0.9,
};

/** Fade + subtle rise. Used for most scroll-in reveals. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: easeExpo } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: easeExpo } },
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
