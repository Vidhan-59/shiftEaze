import type Lenis from "lenis";

/**
 * Handle on the single live Lenis instance created by SmoothScroll.
 *
 * Anything that locks the page (the mobile nav overlay, a modal) has to stop
 * Lenis as well as setting `overflow: hidden` — Lenis drives scrolling itself,
 * so the body style alone won't hold it and the page glides on underneath.
 */
let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis(): Lenis | null {
  return instance;
}
