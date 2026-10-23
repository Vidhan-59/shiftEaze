import Link from "next/link";
import { Logo } from "./Logo";
import { BackToTop } from "./BackToTop";
import { Container } from "@/components/ui/Container";
import { Aurora } from "@/components/visuals/Aurora";
import { footerNav, site } from "@/content/site";

/**
 * "Glass" type: the glyphs are filled with a translucent white gradient (so the
 * glow behind shows through), edged with a hairline highlight and lifted by a
 * soft coloured halo. No boxes, just the text itself.
 */
const GLASS_HEADING =
  "bg-gradient-to-b from-white via-white/85 to-white/45 bg-clip-text text-transparent [filter:drop-shadow(0_1px_0_rgba(255,255,255,0.35))_drop-shadow(0_6px_16px_rgba(150,160,255,0.45))]";
const GLASS_BODY =
  "bg-gradient-to-b from-white/90 to-white/55 bg-clip-text text-transparent [filter:drop-shadow(0_0_10px_rgba(170,180,255,0.18))]";
/** A link whose glass fill sweeps across and glows on hover; slow, eased transitions keep it silky. */
const GLASS_LINK =
  "bg-gradient-to-r from-white/65 via-white to-white/65 bg-[length:220%_100%] bg-[position:100%_0] bg-clip-text text-transparent [filter:drop-shadow(0_0_0_rgba(190,200,255,0))] transition-[background-position,filter,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[position:0%_0] group-hover:[filter:drop-shadow(0_0_12px_rgba(190,200,255,0.65))]";

/** Dark navy site footer with an animated top rule, drifting glows and a scrolling perspective grid. */
export function Footer() {
  return (
    <footer className="motion-always relative overflow-hidden bg-gradient-to-b from-teal-700 to-teal-900 text-white">
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
            <Logo variant="white" height={32} className="[filter:drop-shadow(0_4px_14px_rgba(150,160,255,0.45))]" />
            <p className={`mt-5 max-w-xs text-[14.5px] leading-relaxed ${GLASS_BODY}`}>
              {site.tagline}. Auto-rostering, attendance prediction and
              workforce analytics, with {site.module} built in.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["EN", "HI", "GU", "iOS", "Android", "Web"].map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/20 bg-white/[0.07] px-2.5 py-1 font-mono text-[10.5px] text-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/15 hover:text-white"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {footerNav.map((col) => (
            <div key={col.title}>
              <h3 className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em]">
                <span className="h-[3px] w-5 rounded-full bg-accent-400 shadow-[0_0_10px_rgba(230,76,90,0.7)]" aria-hidden />
                <span className={GLASS_HEADING}>{col.title}</span>
              </h3>
              <ul className="mt-5 space-y-3.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center text-[14.5px]"
                    >
                      <span
                        className="mr-0 h-px w-0 bg-accent-400 shadow-[0_0_8px_rgba(230,76,90,0.8)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:mr-2 group-hover:w-4"
                        aria-hidden
                      />
                      <span className={GLASS_LINK}>{l.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-white/15 pt-6 text-[13px] sm:flex-row sm:items-center">
          <span className={GLASS_BODY}>
            © {new Date().getFullYear()} {site.name} · 6,000+ operators · 12+
            terminals
          </span>
          <div className="flex items-center gap-5">
            <span className={`font-mono text-[11px] uppercase tracking-widest ${GLASS_BODY}`}>
              {site.liveAt}
            </span>
            <BackToTop />
          </div>
        </div>
      </Container>
    </footer>
  );
}
