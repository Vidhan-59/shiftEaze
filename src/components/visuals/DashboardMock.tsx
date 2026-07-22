import { cn } from "@/lib/utils";

type Kind = "manpower" | "shift" | "attendance" | "leave" | "roster";

const COPY: Record<Kind, { title: string; kpis: [string, string][] }> = {
  manpower: {
    title: "Manpower Summary",
    kpis: [
      ["Active", "1,127"],
      ["Present", "160"],
      ["Absent", "961"],
    ],
  },
  shift: {
    title: "Shift Attendance",
    kpis: [
      ["Planned", "631"],
      ["Present", "160"],
      ["Absent", "464"],
    ],
  },
  attendance: {
    title: "Attendance Summary",
    kpis: [
      ["Avg", "25.4%"],
      ["Absent", "471"],
      ["On-time", "100%"],
    ],
  },
  leave: {
    title: "Leave Summary",
    kpis: [
      ["Applied", "27"],
      ["Approved", "11"],
      ["Pending", "12"],
    ],
  },
  roster: {
    title: "Scheduler",
    kpis: [
      ["Confirmed", "146"],
      ["At-risk", "57"],
      ["Planned", "631"],
    ],
  },
};

const BARS = [64, 82, 48, 90, 56, 74, 40, 88, 60, 52];

/**
 * Design-forward placeholder dashboard. Shown only when a real screenshot is
 * absent. Purely CSS-driven so it works in server components and honors
 * prefers-reduced-motion automatically.
 */
export function DashboardMock({
  kind = "manpower",
  className,
}: {
  kind?: Kind;
  className?: string;
}) {
  const { title, kpis } = COPY[kind];
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col gap-3 bg-ink-900 p-4 sm:p-5",
        className
      )}
      aria-hidden
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-teal-400/80" />
          <span className="text-[13px] font-medium text-fg">{title}</span>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-teal-300">
          <span className="h-1.5 w-1.5 animate-drift rounded-full bg-teal-300" />
          replace with screenshot
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {kpis.map(([k, v]) => (
          <div
            key={k}
            className="rounded-lg border border-line bg-ink-800/60 p-3"
          >
            <div className="font-mono text-[9.5px] uppercase tracking-wider text-fg-faint">
              {k}
            </div>
            <div className="mt-1 text-xl font-semibold tracking-tight text-fg">
              {v}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-1 gap-3">
        <div className="flex flex-[1.6] flex-col rounded-lg border border-line bg-ink-800/40 p-3">
          <div className="font-mono text-[9.5px] uppercase tracking-wider text-fg-faint">
            Strength vs. requirement
          </div>
          <div className="mt-auto flex h-24 items-end gap-1.5">
            {BARS.map((h, i) => (
              <div
                key={i}
                className="flex-1 origin-bottom rounded-t bg-gradient-to-t from-teal-600/40 to-teal-400/90 animate-drift"
                style={{
                  height: `${h}%`,
                  animationDelay: `${i * 0.18}s`,
                  animationDuration: `${3 + (i % 4) * 0.4}s`,
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-line bg-ink-800/40 p-3">
          <div
            className="relative grid h-20 w-20 place-items-center rounded-full"
            style={{
              background:
                "conic-gradient(#302e86 0 62%, #d97706 62% 74%, #dc2626 74% 100%)",
            }}
          >
            <div className="grid h-14 w-14 place-items-center rounded-full bg-ink-900">
              <span className="text-sm font-semibold text-fg">1,199</span>
            </div>
          </div>
          <div className="mt-2 font-mono text-[9px] uppercase tracking-wider text-fg-faint">
            Status split
          </div>
        </div>
      </div>
    </div>
  );
}
