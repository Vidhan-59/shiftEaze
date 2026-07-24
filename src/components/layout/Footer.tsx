import { Logo } from "./Logo";
import { Container } from "@/components/ui/Container";
import { footerNav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-800/50">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-fg-muted">
              {site.tagline}. Auto-rostering, attendance prediction and
              workforce analytics — with the {site.module} calling module built
              in.
            </p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {["EN", "HI", "GU", "iOS", "Android", "Web"].map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-line px-2 py-1 font-mono text-[10.5px] text-fg-faint"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {footerNav.map((col) => (
            <div key={col.title}>
              <h3 className="text-[12px] font-semibold uppercase tracking-wider text-fg-faint">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[14px] text-fg-muted transition-colors hover:text-teal-300"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-[13px] text-fg-faint sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {site.name} · 6,000+ operators · 12+
            terminals
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest">
            {site.liveAt}
          </span>
        </div>
      </Container>
    </footer>
  );
}
