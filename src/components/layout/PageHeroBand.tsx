import { Breadcrumbs } from "./Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Aurora } from "@/components/visuals/Aurora";
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
}: {
  pageKey: string;
  tag: string;
  h1: string;
  subline?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-teal-400 pb-14 pt-28 sm:pb-16 sm:pt-32">
      {/* Depth: brand-red + light glows, a fading grid and a bottom sheen */}
      <Aurora variant="accent" className="opacity-60 mix-blend-screen" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_0%,rgba(255,255,255,0.14),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(80%_100%_at_70%_40%,#000,transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
        aria-hidden
      />

      <div className="relative">
        <Breadcrumbs pageKey={pageKey} tone="dark" />
        <Container className="mt-6">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
            <div className="max-w-3xl">
              <div className="animate-fade-up">
                <Tag tone="dark">{tag}</Tag>
              </div>
              <h1
                className="mt-4 animate-fade-up text-balance font-display text-[clamp(2.75rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-tight text-white [text-shadow:0_6px_30px_rgba(0,0,30,0.35)]"
                style={{ animationDelay: "0.1s" }}
              >
                {h1}
              </h1>
              <span
                className="mt-7 block h-[5px] w-28 animate-fade-up rounded-full bg-gradient-to-r from-white to-accent-400"
                style={{ animationDelay: "0.2s" }}
                aria-hidden
              />
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
