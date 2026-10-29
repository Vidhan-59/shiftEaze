import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FillButton } from "@/components/ui/FillButton";
import { finalCta } from "@/content/home";
import { Brain, Calendar, Check, Phone } from "@/components/ui/icons";
import { cta } from "@/content/site";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** Home only (brief §13) — not shown on any other page. */
export function FinalCTA() {
  const words = finalCta.heading.split(" ");
  const tail = words.splice(-3).join(" ");
  return (
    <section className="bg-white py-10 sm:py-14 lg:py-16">
      <Container className="max-w-[1480px] lg:!px-6 xl:!px-10">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[32px] bg-[#0d0c2b] text-white shadow-float">
            {/* Morphing silk: large blurred brand-colour blobs drifting slowly over a deep navy base */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -left-[12%] -top-[40%] h-[120%] w-[55%] animate-[blob-a_18s_ease-in-out_infinite] rounded-full bg-[#302e86] opacity-90 blur-[90px]" />
              <div className="absolute left-[28%] top-[8%] h-[100%] w-[42%] animate-[blob-b_22s_ease-in-out_infinite] rounded-full bg-[#2f6bff] opacity-55 blur-[100px]" />
              <div className="absolute -right-[8%] -bottom-[45%] h-[120%] w-[48%] animate-[blob-c_26s_ease-in-out_infinite] rounded-full bg-[#d51f2c] opacity-45 blur-[110px]" />
              <div className="absolute right-[18%] -top-[30%] h-[80%] w-[34%] animate-[blob-a_30s_ease-in-out_infinite_reverse] rounded-full bg-[#4db8ff] opacity-30 blur-[90px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c2b]/55 via-transparent to-transparent" />
              <div
                className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
                style={{ backgroundImage: GRAIN, backgroundSize: "220px 220px" }}
              />
            </div>

            {/* Floating product cards over slow orbit rings, filling the empty right side */}
            <div aria-hidden className="pointer-events-none absolute right-10 top-7 hidden h-[210px] w-[430px] lg:block xl:right-14">
              <div
                className="absolute left-1/2 top-1/2 h-[290px] w-[290px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/20"
                style={{ animation: "orbit-spin 44s linear infinite" }}
              />
              <div
                className="absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#4db8ff]/30"
                style={{ animation: "orbit-spin 30s linear infinite reverse" }}
              />

              {/* Roster card */}
              <div className="absolute left-0 top-3" style={{ animation: "frame-float 7s ease-in-out infinite" }}>
                <div className="w-[206px] rounded-2xl border border-white/25 bg-white/12 p-3 shadow-[0_20px_40px_-18px_rgba(0,0,0,0.6)] backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white/80">
                      <Calendar width={11} height={11} /> Roster · Wk 12
                    </span>
                    <span className="rounded-full bg-[#34d399]/20 px-2 py-0.5 text-[9.5px] font-bold text-[#34d399]">100%</span>
                  </div>
                  <div className="mt-2.5 grid grid-cols-7 gap-1">
                    {Array.from({ length: 21 }, (_, i) => (
                      <span
                        key={i}
                        className="h-3.5 rounded-[4px]"
                        style={{
                          background: i === 9 ? "#34d399" : i % 5 === 0 ? "#5b59c9" : i % 7 === 3 ? "rgba(255,255,255,0.12)" : "#2f6bff",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* AI action card */}
              <div className="absolute right-0 top-0" style={{ animation: "frame-float 8s ease-in-out -3s infinite" }}>
                <div className="flex w-[196px] items-center gap-2.5 rounded-2xl border border-white/25 bg-white/12 p-2.5 shadow-[0_20px_40px_-18px_rgba(0,0,0,0.6)] backdrop-blur-md">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#ff5468] to-[#d51f2c] text-white">
                    <Brain width={17} height={17} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[11.5px] font-bold text-white">Gap filled by AI</div>
                    <div className="truncate text-[10px] text-white/65">Wed · Night → M. Khan</div>
                  </div>
                </div>
              </div>

              {/* Live call card */}
              <div className="absolute bottom-0 right-8" style={{ animation: "frame-float 9s ease-in-out -5s infinite" }}>
                <div className="flex w-[206px] items-center gap-2.5 rounded-2xl border border-white/25 bg-white/12 p-2.5 shadow-[0_20px_40px_-18px_rgba(0,0,0,0.6)] backdrop-blur-md">
                  <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#2f6bff] text-white">
                    <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#2f6bff]" />
                    <Phone width={15} height={15} className="relative" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11.5px] font-bold text-white">AI calling Ravi</div>
                    <div className="mt-1 flex h-3 items-center gap-[3px]">
                      {[0.4, 0.9, 0.55, 1, 0.65, 0.85, 0.45].map((h, i) => (
                        <i
                          key={i}
                          className="block w-[3px] origin-center animate-pulse rounded-full bg-[#4db8ff]"
                          style={{ height: `${h * 12}px`, animationDelay: `${i * 0.12}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Check-in chip */}
              <div className="absolute bottom-3 left-2" style={{ animation: "frame-float 6s ease-in-out -1s infinite" }}>
                <div className="flex items-center gap-2 rounded-full border border-white/25 bg-white/12 py-1.5 pl-1.5 pr-3.5 text-[11px] font-bold text-white shadow-[0_14px_30px_-14px_rgba(0,0,0,0.6)] backdrop-blur-md">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-[#34d399] text-[#0d0c2b]">
                    <Check width={11} height={11} />
                  </span>
                  Checked in · 06:58
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8 p-8 sm:p-10 lg:gap-10 lg:px-14 lg:py-12">
              <span className="block h-[6px] w-28 rounded-full bg-gradient-to-r from-white via-[#ff3b4e] to-transparent" aria-hidden />

              <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
                <div>
                  <h2 className="text-balance font-display text-[clamp(2rem,4.4vw,3.6rem)] font-extrabold leading-[1.06] tracking-tight text-white">
                    {words.join(" ")}{" "}
                    <span className="inline-block animate-shimmer bg-gradient-to-r from-[#ff5468] via-[#4db8ff] to-[#ff5468] bg-[length:200%_auto] bg-clip-text text-transparent">
                      {tail}
                    </span>
                  </h2>
                  <div className="mt-9 flex flex-wrap items-center gap-4">
                    <FillButton href={cta.primary.href} tone="blue" className="shadow-[0_14px_34px_-12px_rgba(48,46,134,0.8)] ring-2 ring-white/70">
                      {cta.primary.label}
                    </FillButton>
                    <FillButton href="/company?topic=sales-and-demos#contact" tone="outline">
                      Contact Sales
                    </FillButton>
                  </div>
                </div>
                <p className="max-w-md text-[16px] leading-relaxed text-white/80 lg:justify-self-end lg:text-right lg:text-[17px]">
                  {finalCta.text}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
