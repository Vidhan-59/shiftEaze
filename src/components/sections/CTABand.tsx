import type { ComponentType } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FillButton } from "@/components/ui/FillButton";
import { Photo } from "@/components/ui/Photo";
import { OrbitChips } from "@/components/visuals/OrbitChips";

type OrbitItem = { Icon: ComponentType<{ width?: number; height?: number }>; label: string };

// Deterministic star field (no Math.random, so server and client agree).
const STARS = Array.from({ length: 46 }, (_, i) => ({
  x: (i * 53.7 + 11) % 100,
  y: (i * 37.3 + 7) % 100,
  s: 1 + ((i * 7) % 3),
  d: ((i * 13) % 50) / 10,
}));

/**
 * End-of-page call to action for the inner pages: a space-like card (photo,
 * stars, glow) with one blue button. Optionally the page's sections orbit it
 * as small numbered chips on tilted elliptical orbits. Carries only the page's
 * button label (and optional caption) — no invented copy.
 */
export function CTABand({
  label,
  href,
  caption,
  orbit,
  plain,
}: {
  label: string;
  href: string;
  caption?: string;
  orbit?: OrbitItem[];
  /** Just the button, big and centred: no card, photo or orbit around it. */
  plain?: boolean;
}) {
  if (plain) {
    return (
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <Container className="max-w-[1480px] lg:!px-6 xl:!px-10">
          <Reveal>
            <div className="flex min-h-[200px] flex-col items-center justify-center gap-6 py-6">
              <div className="origin-center sm:scale-[1.35] md:scale-[1.7]">
                <FillButton href={href} tone="brand" className="shadow-[0_18px_44px_-14px_rgba(48,46,134,0.9)] ring-4 ring-[#302e86]/20">
                  {label}
                </FillButton>
              </div>
              {caption && <span className="text-[14px] font-medium text-fg-muted">{caption}</span>}
            </div>
          </Reveal>
        </Container>
      </section>
    );
  }
  return (
    <section className="bg-white py-12 sm:py-14 lg:py-16">
      <Container className="max-w-[1480px] lg:!px-6 xl:!px-10">
        <Reveal>
          <div className="relative isolate flex min-h-[260px] flex-col items-center justify-center gap-4 overflow-hidden rounded-[32px] bg-[#070718] px-6 py-14 text-center shadow-float sm:min-h-[380px]">
            {/* Background photo, darkened into night */}
            <div aria-hidden className="absolute inset-0 -z-20">
              <Photo name="terminal-aerial" alt="" ratio="fill" sizes="100vw" className="h-full" imgClassName="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#070718]/55 via-[#12104a]/35 to-[#070718]/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070718]/55 via-transparent to-[#070718]/30" />
            </div>
            <span className="pointer-events-none absolute -left-16 -top-20 -z-10 h-72 w-72 animate-aurora rounded-full bg-[#2f6bff]/35 blur-3xl" />
            <span className="pointer-events-none absolute -bottom-24 -right-10 -z-10 h-72 w-72 animate-aurora rounded-full bg-[#d51f2c]/25 blur-3xl [animation-delay:-8s]" />

            {/* Stars */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              {STARS.map((s, i) => (
                <span
                  key={i}
                  className="absolute animate-pulse rounded-full bg-white"
                  style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s`, animationDuration: `${2.5 + (i % 4)}s`, opacity: 0.8 }}
                />
              ))}
            </div>

            {/* Glow behind the button, like a planet's atmosphere */}
            <span className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[220px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2f6bff]/35 blur-[70px]" aria-hidden />

            {orbit && <OrbitChips items={orbit.map(({ Icon, label: l }) => ({ icon: <Icon width={20} height={20} />, label: l }))} />}

            <div className="relative z-30 flex flex-col items-center gap-4">
              <div className="origin-center scale-[1.3] sm:scale-[1.5]">
                <FillButton href={href} tone="blue" className="shadow-[0_14px_40px_-10px_rgba(48,46,134,0.95)] ring-2 ring-white/70">
                  {label}
                </FillButton>
              </div>
              {caption && <span className="text-[14px] font-medium text-white/75">{caption}</span>}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
