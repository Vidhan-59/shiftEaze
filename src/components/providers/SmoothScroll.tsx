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

/** Clearance under the fixed navbar for targets without their own scroll-mt. */
const NAV_OFFSET = 84;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

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
      // Frame-rate independent glide toward the wheel target. Reads smoother
      // than a fixed-duration tween, which restarts on every trackpad event.
      lerp: 0.1,
      smoothWheel: true,
      // Kill leftover wheel momentum when a link leaves the page, otherwise
      // the glide carries on into the next route and drags it off the top.
      stopInertiaOnNavigate: true,
    });

    document.documentElement.classList.add("lenis");
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const glideTo = (el: HTMLElement) => {
      // Lenis already subtracts the target's scroll-margin-top, so only fall
      // back to the navbar clearance when the section doesn't set one.
      const hasMargin = parseFloat(getComputedStyle(el).scrollMarginTop) > 0;
      const distance = Math.abs(el.getBoundingClientRect().top);
      lenis.scrollTo(el, {
        offset: hasMargin ? 0 : -NAV_OFFSET,
        // Short hops stay snappy, long jumps get room to ease in and out.
        duration: Math.min(1.6, Math.max(0.7, 0.5 + distance / 3000)),
        easing: easeInOutCubic,
      });
    };

    // Same-page hash links (`#id`, or `/platform#id` while on /platform) glide
    // through Lenis. Runs in the capture phase so it gets in before Next's
    // <Link>, which skips its own instant jump once the click is prevented.
    const onClick = (e: MouseEvent) => {
      // Leave modified clicks alone — swallowing these broke ctrl/cmd-click
      // (open in new tab), shift-click (new window) and middle-click.
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement)?.closest?.(
        "a[href]"
      ) as HTMLAnchorElement | null;
      if (!anchor || (anchor.target && anchor.target !== "_self")) return;

      const url = new URL(anchor.href, window.location.href);
      if (
        url.origin !== window.location.origin ||
        url.pathname !== window.location.pathname ||
        url.search !== window.location.search ||
        url.hash.length < 2
      ) {
        return;
      }

      // getElementById takes a raw id, so it can't throw on ids that aren't
      // valid selectors (leading digit, "." or ":") the way querySelector would.
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;

      e.preventDefault();

      // The mobile menu stops Lenis while open; the same click closes it, so
      // wait for it to restart rather than dropping the scroll.
      let tries = 0;
      const run = () => {
        if (lenis.isStopped && tries++ < 30) {
          requestAnimationFrame(run);
          return;
        }
        glideTo(el);
      };
      run();

      // Keep the URL deep-linkable and move keyboard focus with the scroll —
      // preventDefault() suppresses the browser doing either for us, which
      // silently stranded screen-reader and keyboard users at the old spot.
      history.replaceState(history.state, "", url.hash);
      const hadTabIndex = el.hasAttribute("tabindex");
      if (!hadTabIndex) el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
      if (!hadTabIndex) el.removeAttribute("tabindex");
    };
    window.addEventListener("click", onClick, true);

    // Back/forward: drop any glide in flight so it can't fight the browser's
    // scroll restoration.
    const onPopState = () => {
      if (lenis.isStopped) return;
      lenis.stop();
      lenis.start();
    };
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
      document.documentElement.classList.remove("lenis");
    };
  }, [reduced]);

  return <>{children}</>;
}
