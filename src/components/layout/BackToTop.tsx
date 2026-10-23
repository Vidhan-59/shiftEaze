"use client";

import { getLenis } from "@/lib/lenis";

/** Round "back to top" control for the footer; routes through Lenis so the scroll stays smooth. */
export function BackToTop() {
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => {
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(0, { duration: 1.4 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="group grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition hover:-translate-y-1 hover:border-white/60 hover:bg-white hover:text-teal-400"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
