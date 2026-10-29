import Link from "next/link";
import { BackToTop } from "./BackToTop";
import { LogoFull } from "./Logo";
import { Container } from "@/components/ui/Container";
import { footerNav, site } from "@/content/site";

const RIBBON = [
  "AI Rostering",
  "Absence Prediction",
  "Geofenced Attendance",
  "Leave Management",
  "AI Voice Calling",
  "Live Dashboards",
  "Operator Passbook",
];

/** Dark navy site footer with an animated top rule, drifting glows and a scrolling perspective grid. */
export function Footer() {
  return (
    <footer className="motion-always relative overflow-hidden bg-gradient-to-b from-teal-400 via-teal-500 to-teal-600 text-white">
      {/* Animated brand line along the top edge */}
      <div
        className="absolute inset-x-0 top-0 h-[3px] animate-gradient-x bg-gradient-to-r from-teal-300 via-accent-500 to-teal-300 bg-[length:200%_100%]"
        aria-hidden
      />

      {/* Scrolling feature ribbon */}
      <div className="relative overflow-hidden border-b border-white/20 bg-white/10 py-3.5 backdrop-blur-sm [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[...RIBBON, ...RIBBON, ...RIBBON, ...RIBBON].map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 font-mono text-[14px] font-bold uppercase tracking-[0.18em] text-white"
            >
              <span className="h-2 w-2 rotate-45 bg-[#ff5468] shadow-[0_0_10px_rgba(255,84,104,0.9)]" />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Perspective grid floor that scrolls toward the viewer */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 [perspective:500px] [mask-image:linear-gradient(to_top,#000,transparent)]"
        aria-hidden
      >
        <div className="absolute -inset-x-1/2 bottom-0 h-[200%] origin-bottom animate-grid-flow bg-[linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:48px_48px] [transform:rotateX(62deg)]" />
      </div>

      <Container className="relative pb-5 pt-8 sm:pt-9">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-10">
          <div>
            <span className="inline-flex rounded-2xl bg-white px-4 py-2 shadow-[0_12px_28px_-12px_rgba(0,0,0,0.6)]">
              <LogoFull className="h-10" />
            </span>
            <p className="mt-4 max-w-sm text-[16px] font-semibold leading-relaxed text-white">
              {site.tagline}. Auto-rostering, attendance prediction and
              workforce analytics, with {site.module} built in.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {["EN", "HI", "GU", "iOS", "Android", "Web"].map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-white/30 bg-white/15 px-3 py-1.5 font-mono text-[13px] font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#ff5468] hover:bg-[#ff5468]/25"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {footerNav.map((col) => (
            <div key={col.title}>
              <h3 className="flex items-center gap-2.5 text-[15px] font-extrabold uppercase tracking-[0.16em] text-white">
                <span className="h-[3px] w-6 animate-gradient-x rounded-full bg-gradient-to-r from-[#ff5468] via-white to-[#ff5468] bg-[length:200%_100%]" aria-hidden />
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center text-[17px] font-bold text-white transition-all duration-300 hover:translate-x-1 hover:text-white"
                    >
                      <span
                        className="mr-0 h-[2px] w-0 rounded-full bg-[#ff5468] shadow-[0_0_8px_rgba(255,84,104,0.9)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:mr-2.5 group-hover:w-5"
                        aria-hidden
                      />
                      <span>{l.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-5 text-[15px] font-semibold text-white sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {site.name} · 6,000+ operators · 12+
            terminals
          </span>
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-2.5 font-mono text-[13.5px] font-bold uppercase tracking-widest text-white">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-emerald-300" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-300" />
              </span>
              {site.liveAt}
            </span>
            <BackToTop />
          </div>
        </div>

      </Container>
    </footer>
  );
}
