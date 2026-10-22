import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CallFlow } from "@/components/visuals/CallFlow";
import { Aurora } from "@/components/visuals/Aurora";
import { Photo } from "@/components/ui/Photo";
import { Phone } from "@/components/ui/icons";
import { site } from "@/content/site";

export function ShiftEaze() {
  return (
    <section
      id="voice"
      className="relative scroll-mt-20 overflow-hidden py-24 sm:py-28"
    >
      {/* distinct add-on tint — the ShiftEaze red */}
      <Aurora variant="accent" className="opacity-70" />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent-500/[0.05] via-transparent to-transparent"
        aria-hidden
      />
      <Container className="relative">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-3 py-1 font-mono text-[10.5px] uppercase tracking-widest text-accent-600">
                <Phone width={13} height={13} />
                Add-on module · {site.module}
              </span>
              <h2 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tighter text-fg">
                Every call that used to be a
                <br className="hidden sm:block" /> phone tree —{" "}
                <span className="text-gradient">now automatic.</span>
              </h2>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-fg-muted">
                {site.module} places voice calls to operators on its own,
                triggered directly by platform events instead of a dispatcher
                dialling around. Four call types, in three languages, all fired
                by what&apos;s happening on the roster.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass hidden rounded-xl px-5 py-4 lg:block">
              <div className="font-mono text-[10px] uppercase tracking-widest text-fg-faint">
                Trigger source
              </div>
              <div className="mt-1 text-[15px] font-medium text-fg">
                Platform events
              </div>
              <div className="text-[12px] text-fg-faint">
                not a human dispatcher
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-12">
          <CallFlow />
        </Reveal>

        {/* Both ends of an automated call: the control room that fires it and
            the operator who picks it up. */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Reveal delay={0.2}>
            <figure>
              <Photo
                name="control-room"
                alt="Terminal control room with a live call-confirmation queue and colour-coded shift-status board on screen"
                sizes="(min-width: 768px) 50vw, 100vw"
                className="rounded-2xl border border-line shadow-card"
              />
              <figcaption className="mt-3 px-1 text-[13px] leading-relaxed text-fg-faint">
                The call queue runs itself — planners watch outcomes instead of
                dialling.
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.25}>
            <figure>
              <Photo
                name="yard-operator-call"
                alt="Terminal operator in high-visibility gear taking a shift-confirmation call on the container yard gantry walkway"
                sizes="(min-width: 768px) 50vw, 100vw"
                className="rounded-2xl border border-line shadow-card"
              />
              <figcaption className="mt-3 px-1 text-[13px] leading-relaxed text-fg-faint">
                Operators confirm in their own language, wherever they are on
                the terminal.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
