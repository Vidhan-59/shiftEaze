import { Logo } from "@/components/layout/Logo";
import { ArrowRight } from "@/components/ui/icons";
import { nav, cta } from "@/content/site";
import { hero } from "@/content/home";

/**
 * A frozen, non-interactive preview of the site's own header + hero, for
 * inside the Home hero's `BrowserFrame` ("live" self-referential visual,
 * Beew/5U-style). This deliberately reconstructs the look from the same
 * `hero`/`nav` content/data the real `Navbar`/`Hero` render from — rather
 * than mounting those components a second time, which would duplicate the
 * real fixed header and nest `<Hero>` inside itself infinitely.
 */
export function HomeHeroPreview() {
  return (
    <div className="pointer-events-none select-none bg-[#f5f7fd] px-5 pt-4 sm:px-7 sm:pt-5">
      <div className="flex items-center justify-between border-b border-line pb-3">
        <Logo height={16} />
        <div className="hidden items-center gap-3 sm:flex">
          {nav.slice(0, 4).map((item) => (
            <span key={item.label} className="text-[10px] text-fg-faint">
              {item.label}
            </span>
          ))}
        </div>
        <span className="rounded-full bg-teal-400 px-2.5 py-1 text-[9px] font-medium text-white">
          {cta.primary.label}
        </span>
      </div>

      <div className="py-6 sm:py-8">
        <span className="font-mono text-[9px] font-medium uppercase tracking-[0.1em] text-teal-400">
          {hero.h1}
        </span>
        <p className="mt-2 text-balance font-display text-[20px] font-extrabold leading-[1.05] tracking-tight text-fg sm:text-[24px]">
          {hero.headline}
        </p>
        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-teal-400 px-3 py-1.5 text-[10.5px] font-medium text-white">
          {cta.primary.label}
          <ArrowRight width={11} height={11} />
        </div>
      </div>
    </div>
  );
}
