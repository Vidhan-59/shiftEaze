import Link from "next/link";
import { Logo } from "./Logo";
import { BackToTop } from "./BackToTop";
import { Container } from "@/components/ui/Container";
import { Aurora } from "@/components/visuals/Aurora";
import { footerNav, site } from "@/content/site";

/** Dark navy site footer with an animated top rule, drifting glows and a scrolling perspective grid. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-teal-700 to-teal-900 text-white">
      {/* Animated brand line along the top edge */}
      <div
        className="absolute inset-x-0 top-0 h-[3px] animate-gradient-x bg-gradient-to-r from-teal-300 via-accent-500 to-teal-300 bg-[length:200%_100%]"
        aria-hidden
      />

      {/* Ambient depth: drifting glows + a perspective grid floor that scrolls toward the viewer */}
      <Aurora variant="mixed" className="opacity-70 mix-blend-screen" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 [perspective:500px] [mask-image:linear-gradient(to_top,#000,transparent)]"
        aria-hidden
      >
        <div className="absolute -inset-x-1/2 bottom-0 h-[200%] origin-bottom animate-grid-flow bg-[linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:48px_48px] [transform:rotateX(62deg)]" />
      </div>

      {/* Oversized outlined wordmark */}
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-[0.18em] select-none text-center font-display text-[clamp(5rem,19vw,17rem)] font-extrabold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.14)]"
        aria-hidden
      >
        ShiftEaze
      </div>

      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="white" height={32} />
            <p className="mt-5 max-w-xs text-[14.5px] leading-relaxed text-white/70">
              {site.tagline}. Auto-rostering, attendance prediction and
              workforce analytics, with {site.module} built in.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["EN", "HI", "GU", "iOS", "Android", "Web"].map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/20 bg-white/[0.07] px-2.5 py-1 font-mono text-[10.5px] text-white/75 backdrop-blur transition-colors hover:border-white/50 hover:bg-white/15 hover:text-white"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {footerNav.map((col) => (
            <div key={col.title}>
              <h3 className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-white">
                <span className="h-[3px] w-5 rounded-full bg-accent-400" aria-hidden />
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-2 text-[14.5px] text-white/70 transition-all duration-300 hover:translate-x-1 hover:text-white"
                    >
                      <span
                        className="h-px w-0 bg-accent-400 transition-all duration-300 group-hover:w-4"
                        aria-hidden
                      />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-white/15 pt-6 text-[13px] text-white/60 sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {site.name} · 6,000+ operators · 12+
            terminals
          </span>
          <div className="flex items-center gap-5">
            <span className="font-mono text-[11px] uppercase tracking-widest">
              {site.liveAt}
            </span>
            <BackToTop />
          </div>
        </div>
      </Container>
    </footer>
  );
}
