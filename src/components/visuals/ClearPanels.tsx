import { cn } from "@/lib/utils";

/**
 * Large, high-contrast product panels for the Platform page. They replace the
 * full-dashboard screenshots, whose text was too small to read at column width.
 * Everything here is sample data, drawn as live HTML so it stays crisp on any screen.
 */

const shell =
  "relative overflow-hidden rounded-3xl border border-line-strong bg-white shadow-float ring-1 ring-black/5";

function Chip({ children, tone }: { children: React.ReactNode; tone: "red" | "amber" | "green" | "navy" }) {
  const tones = {
    red: "bg-[#fde8ea] text-[#b3182a]",
    amber: "bg-[#fff1d6] text-[#9a5b00]",
    green: "bg-[#dcf5e8] text-[#0f7a45]",
    navy: "bg-teal-400/10 text-teal-400",
  };
  return (
    <span className={cn("inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-[13px] font-semibold", tones[tone])}>
      {children}
    </span>
  );
}

const RISK_ROWS = [
  { id: "Operator 1042", role: "Gate Operator", pct: 82, level: "High", action: "Backfill ready" },
  { id: "Operator 2217", role: "RMG Operator", pct: 64, level: "High", action: "Backfill ready" },
  { id: "Operator 0873", role: "Rider Planner", pct: 41, level: "Medium", action: "Watching" },
  { id: "Operator 1560", role: "QC Operator", pct: 18, level: "Low", action: "On track" },
  { id: "Operator 3091", role: "Supervisor", pct: 9, level: "Low", action: "On track" },
] as const;

const levelStyle = {
  High: { bar: "bg-[#e0263a]", chip: "red" as const },
  Medium: { bar: "bg-[#f0a020]", chip: "amber" as const },
  Low: { bar: "bg-[#22a06b]", chip: "green" as const },
};

/** Absence prediction: every operator scored per shift, with the backfill action next to it. */
export function AbsenceRiskPanel({ className }: { className?: string }) {
  return (
    <div className={cn(shell, className)} role="img" aria-label="Sample absence risk scores per operator with backfill actions">
      <div className="flex items-center justify-between gap-3 border-b border-line bg-teal-400 px-6 py-4 text-white">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/70">Tomorrow, night shift</p>
          <p className="mt-0.5 text-[20px] font-bold leading-tight">Absence risk by operator</p>
        </div>
        <span className="rounded-full bg-white/15 px-3 py-1 text-[13px] font-semibold">AI scored</span>
      </div>

      <div className="grid grid-cols-3 gap-3 px-6 pt-5">
        {[
          ["631", "Scheduled"],
          ["57", "At risk"],
          ["0.8668", "AUC-ROC"],
        ].map(([v, l], i) => (
          <div key={l} className={cn("rounded-2xl border px-4 py-3", i === 1 ? "border-[#f5c2c8] bg-[#fff5f6]" : "border-line bg-ink-850")}>
            <p className={cn("text-[28px] font-extrabold leading-none tracking-tight sm:text-[32px]", i === 1 ? "text-[#c81e32]" : "text-fg")}>{v}</p>
            <p className="mt-1.5 text-[14px] font-medium text-fg-muted">{l}</p>
          </div>
        ))}
      </div>

      <ul className="space-y-3 px-6 pb-6 pt-5">
        {RISK_ROWS.map((r) => {
          const s = levelStyle[r.level];
          return (
            <li key={r.id} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 rounded-2xl border border-line px-4 py-3 sm:grid-cols-[1.1fr_1fr_8.5rem]">
              <div>
                <p className="text-[16px] font-bold leading-tight text-fg">{r.id}</p>
                <p className="text-[14px] text-fg-muted">{r.role}</p>
              </div>
              <div className="order-3 col-span-2 flex items-center gap-3 sm:order-none sm:col-span-1">
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-black/[0.07]">
                  <div className={cn("h-full rounded-full", s.bar)} style={{ width: `${r.pct}%` }} />
                </div>
                <span className="w-11 text-right text-[16px] font-bold tabular-nums text-fg">{r.pct}%</span>
              </div>
              <span className="justify-self-end"><Chip tone={r.level === "Low" ? "green" : s.chip}>{r.action}</Chip></span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const DESIGNATIONS = [
  { name: "Gate Operator", active: 285, ideal: 320 },
  { name: "RMG Operator", active: 232, ideal: 220 },
  { name: "QC Operator", active: 198, ideal: 210 },
  { name: "Rider Planner", active: 150, ideal: 180 },
  { name: "Supervisor", active: 62, ideal: 60 },
];

/** Analytics: the headline manpower numbers and strength against requirement, large enough to read at a glance. */
export function AnalyticsPanel({ className }: { className?: string }) {
  const max = Math.max(...DESIGNATIONS.map((d) => Math.max(d.active, d.ideal)));
  return (
    <div className={cn(shell, className)} role="img" aria-label="Sample manpower summary with active strength against requirement by designation">
      <div className="flex items-center justify-between gap-3 border-b border-line bg-teal-400 px-6 py-4 text-white">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/70">Live dashboard</p>
          <p className="mt-0.5 text-[20px] font-bold leading-tight">Manpower summary</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[13px] font-semibold">
          <span className="h-2 w-2 rounded-full bg-emerald-300" />
          Live
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 px-6 pt-5 sm:grid-cols-4">
        {[
          ["1,127", "Active", "text-fg"],
          ["631", "Planned today", "text-fg"],
          ["160", "Present", "text-[#0f7a45]"],
          ["9", "On leave", "text-[#9a5b00]"],
        ].map(([v, l, c]) => (
          <div key={l} className="rounded-2xl border border-line bg-ink-850 px-4 py-3">
            <p className={cn("text-[28px] font-extrabold leading-none tracking-tight sm:text-[30px]", c)}>{v}</p>
            <p className="mt-1.5 text-[14px] font-medium text-fg-muted">{l}</p>
          </div>
        ))}
      </div>

      <div className="px-6 pb-6 pt-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-[16px] font-bold text-fg">Active strength vs requirement</p>
          <div className="flex items-center gap-4 text-[13px] font-medium text-fg-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-teal-400" /> Active
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-black/15" /> Required
            </span>
          </div>
        </div>
        <ul className="space-y-3.5">
          {DESIGNATIONS.map((d) => {
            const short = d.active < d.ideal;
            return (
              <li key={d.name}>
                <div className="mb-1.5 flex items-baseline justify-between text-[15px]">
                  <span className="font-semibold text-fg">{d.name}</span>
                  <span className="tabular-nums text-fg-muted">
                    <b className={cn("font-bold", short ? "text-[#c81e32]" : "text-[#0f7a45]")}>{d.active}</b> / {d.ideal}
                  </span>
                </div>
                <div className="relative h-3 overflow-hidden rounded-full bg-black/[0.08]">
                  <div className="absolute inset-y-0 left-0 rounded-full bg-teal-400" style={{ width: `${(d.active / max) * 100}%` }} />
                  <div className="absolute inset-y-0 w-[3px] bg-[#e0263a]" style={{ left: `calc(${(d.ideal / max) * 100}% - 1.5px)` }} />
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-[13px] text-fg-faint">Red marker = required strength. Sample data.</p>
      </div>
    </div>
  );
}
