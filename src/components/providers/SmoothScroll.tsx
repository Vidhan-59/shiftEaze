"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { setLenis } from "@/lib/lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Provides page-wide smooth scrolling via Lenis and keeps GSAP ScrollTrigger
 * perfectly in sync (single RAF loop). Skips entirely when the user prefers
 * reduced motion — native scroll then handles everything.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    document.documentElement.classList.add("lenis");
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links route through Lenis for a consistent glide.
    const onClick = (e: MouseEvent) => {
      // Leave modified clicks alone — swallowing these broke ctrl/cmd-click
      // (open in new tab), shift-click (new window) and middle-click.
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      // `href` is author-controlled but may not be a valid selector (an id
      // starting with a digit, or containing "." or ":") — getElementById
      // takes a raw id, so it can't throw the way querySelector would.
      const el = document.getElementById(href.slice(1));
      if (!el) return;

      e.preventDefault();
      lenis.scrollTo(el, { offset: -84 });

      // Keep the URL deep-linkable and move keyboard focus with the scroll —
      // preventDefault() suppresses the browser doing either for us, which
      // silently stranded screen-reader and keyboard users at the old spot.
      history.replaceState(null, "", href);
      const hadTabIndex = el.hasAttribute("tabindex");
      if (!hadTabIndex) el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
      if (!hadTabIndex) el.removeAttribute("tabindex");
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
      document.documentElement.classList.remove("lenis");
    };
  }, [reduced]);

  return <>{children}</>;
}
