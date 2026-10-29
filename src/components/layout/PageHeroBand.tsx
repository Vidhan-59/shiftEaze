import { Breadcrumbs } from "./Breadcrumbs";
import { LogoFull } from "./Logo";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Photo } from "@/components/ui/Photo";
import { HeroWorker } from "@/components/visuals/HeroWorker";
import { HeroScene3D } from "@/components/visuals/HeroScene3D";

/**
 * The dark navy hero band at the top of every inner page (everything except
 * Home and Pricing — see ADR in the redesign plan). Carries the page's
 * breadcrumb, a category tag, the single H1, and an optional sub-line, beside
 * a draggable 3D scene (desktop only).
 */
export function PageHeroBand({
  pageKey,
  tag,
  h1,
  subline,
  showLogo,
}: {
  pageKey: string;
  tag: string;
  h1: string;
  subline?: string;
  /** Brand lockup + animated gradient headline (used on the Platform page). */
  showLogo?: boolean;
}) {
  const words = h1.split(" ");
  const last = words.pop();
  return (
    <section className="relative overflow-hidden bg-teal-400 pb-14 pt-28 sm:pb-16 sm:pt-32">
      {showLogo && (
        /* Same container-port photo and overlays as the Home hero */
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Photo
            name="terminal-aerial"
            alt=""
            ratio="fill"
            priority
            sizes="100vw"
            className="h-full bg-teal-400"
            imgClassName="object-center"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
        </div>
      )}
      {/* Bottom sheen */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
        aria-hidden
      />

      {showLogo && (
        <HeroWorker height={340} className="absolute -bottom-2 left-[44%] z-[1] hidden lg:block xl:left-[43%] min-[1500px]:hidden" />
      )}

      <div className="relative">
        <Breadcrumbs pageKey={pageKey} tone="dark" />
        <Container className="mt-6">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
            <div className="relative max-w-3xl">
              {showLogo && (
                <HeroWorker height={520} className="absolute -left-[215px] top-[0.5rem] hidden min-[1500px]:block" />
              )}
              {showLogo && (
                <div className="relative mb-7 inline-block animate-fade-up rounded-2xl bg-white px-4 py-2.5 shadow-[0_16px_40px_-14px_rgba(0,0,0,0.65)] ring-1 ring-white/60 sm:px-5 sm:py-3">
                  {/* Official logo artwork in its own colours (red "Shift", navy "Eaze"), on a white plate so it reads on the photo */}
                  <LogoFull className="h-[52px] sm:h-[72px]" />
                </div>
              )}
              <div className="animate-fade-up">
                <Tag tone="dark">{tag}</Tag>
              </div>
              <h1
                className="mt-4 animate-fade-up text-balance font-display text-[clamp(2.75rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-tight text-white [text-shadow:0_6px_30px_rgba(0,0,30,0.35)]"
                style={{ animationDelay: "0.1s" }}
              >
                {showLogo ? (
                  <>
                    {words.join(" ")}{" "}
                    <span className="relative inline-block animate-shimmer bg-gradient-to-r from-[#ff5468] via-[#4db8ff] to-[#ff5468] bg-[length:200%_auto] bg-clip-text text-transparent [filter:drop-shadow(0_4px_22px_rgba(60,140,255,0.45))] [text-shadow:none]">
                      {last}
                    </span>
                  </>
                ) : (
                  h1
                )}
              </h1>
              <span
                className="relative mt-7 block h-[5px] w-40 animate-fade-up overflow-hidden rounded-full bg-gradient-to-r from-white via-[#ff3b4e] to-transparent"
                style={{ animationDelay: "0.2s" }}
                aria-hidden
              >
                {showLogo && (
                  <span className="absolute inset-y-0 w-10 animate-scan-x bg-white/80 blur-[2px]" />
                )}
              </span>
              {showLogo && (
                <ul
                  className="mt-6 flex max-w-[21rem] animate-fade-up flex-wrap gap-2.5 xl:max-w-lg"
                  style={{ animationDelay: "0.35s" }}
                >
                  {["AI Rostering", "Absence Prediction", "Geofenced Attendance", "Live Dashboards"].map(
                    (c) => (
                      <li
                        key={c}
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[13px] font-medium text-white backdrop-blur-sm"
                      >
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#ff3b4e]" />
                          <span className="relative h-2 w-2 rounded-full bg-[#ff3b4e]" />
                        </span>
                        {c}
                      </li>
                    ),
                  )}
                </ul>
              )}
              {subline && (
                <p
                  className="mt-5 max-w-xl animate-fade-up text-[17px] leading-relaxed text-teal-100"
                  style={{ animationDelay: "0.3s" }}
                >
                  {subline}
                </p>
              )}
            </div>
            <HeroScene3D className="hidden lg:block xl:my-10 xl:scale-[1.2]" />
          </div>
        </Container>
      </div>
    </section>
  );
}
