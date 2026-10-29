"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "framer-motion";
import { Check, Shield } from "@/components/ui/icons";
import { useLoopStep } from "@/hooks/useLoopStep";
import { cn } from "@/lib/utils";

/** Dark glass dashboard that fills an industry's navy tile. */
function Glass({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl bg-[#14134a]/85 p-4 text-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/25 backdrop-blur-xl sm:p-5"
      aria-hidden
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4db8ff] to-transparent" />
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">{title}</span>
        <span className="flex items-center gap-1.5 font-mono text-[10.5px] font-bold text-[#34d399]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#34d399]" /> LIVE
        </span>
      </div>
      {children}
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <div className="mt-4 mb-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-white/45">{children}</div>;
}

function useClock(n: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [step] = useLoopStep(n, ms, inView, n - 1);
  return { ref, step };
}

const CYCLE = ["D", "D", "N", "N", "O", "O"] as const;
const SHIFT = {
  D: "bg-[#2f6bff] text-white",
  N: "bg-[#5b59c9] text-white",
  O: "bg-white/10 text-white/45",
} as const;

/** Smooth sparkline path through values 0..100 inside a w×h box. */
function spark(vals: number[], w: number, h: number) {
  const px = (i: number) => (i / (vals.length - 1)) * w;
  const py = (v: number) => h - (v / 100) * (h - 6) - 3;
  return vals.reduce((d, v, i) => {
    if (i === 0) return `M ${px(0)} ${py(v)}`;
    const mx = (px(i - 1) + px(i)) / 2;
    return `${d} C ${mx} ${py(vals[i - 1])}, ${mx} ${py(v)}, ${px(i)} ${py(v)}`;
  }, "");
}

/* ------------------------------------------------------------------ Port */
const TERMINALS = [
  { n: "T1", p: 118 },
  { n: "T2", p: 96 },
  { n: "T3", p: 142 },
  { n: "T4", p: 87 },
  { n: "T5", p: 109 },
  { n: "T6", p: 74 },
];
const PUNCHES = [
  { t: "06:02", n: "Ramesh P.", m: "QR scan", ok: true },
  { t: "06:04", n: "Imran S.", m: "Gate-pass QR", ok: true },
  { t: "06:11", n: "Amit", m: "Outside geofence", ok: false },
  { t: "06:13", n: "Dinesh R.", m: "Gate-pass QR", ok: true },
];
const MPH = [24, 28, 26, 31, 29, 34, 32, 36, 33, 38];

/** Port: gate-pass QR punch, six terminals rostered live, crane productivity and a punch feed. */
export function PortCard() {
  const { ref, step } = useClock(8, 1100);
  const scanned = step >= 3;
  const accepted = step >= 4;
  const hot = step % TERMINALS.length;
  const feed = PUNCHES.slice(0, Math.min(PUNCHES.length, 1 + Math.floor(step / 2)));
  return (
    <div ref={ref}>
      <Glass title="Gate-pass punch · Terminal T2">
        <div className="mt-3 flex items-center gap-3 rounded-xl bg-white/[0.08] p-3">
          <span className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-lg bg-white">
            <span className="grid grid-cols-3 gap-[3px]">
              {[1, 1, 0, 1, 0, 1, 0, 1, 1].map((v, i) => (
                <i key={i} className={cn("block h-[11px] w-[11px] rounded-[2px]", v ? "bg-[#0d0c2b]" : "bg-[#0d0c2b]/15")} />
              ))}
            </span>
            {!scanned && <span className="absolute inset-x-0 h-[2px] bg-[#2f6bff] shadow-[0_0_10px_2px_rgba(47,107,255,0.9)]" style={{ top: `${(step % 3) * 20 + 8}px`, transition: "top 0.6s" }} />}
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="text-[13px] font-bold">Ramesh P. · QR scan</div>
            <div className={cn("mt-1 flex items-center gap-1.5 text-[12px] font-semibold transition-colors duration-500", accepted ? "text-[#34d399]" : "text-white/55")}>
              {accepted ? (
                <>
                  <Check width={13} height={13} /> Inside terminal geofence · accepted
                </>
              ) : scanned ? (
                "Checking geofence…"
              ) : (
                "Scanning gate pass…"
              )}
            </div>
          </div>
        </div>

        <Label>Six terminals rostered live</Label>
        <div className="grid grid-cols-3 gap-2">
          {TERMINALS.map((t, i) => (
            <div key={t.n} className={cn("rounded-xl border px-3 py-2 transition-all duration-500", i === hot ? "border-[#4db8ff] bg-[#2f6bff]/25" : "border-white/10 bg-white/[0.06]")}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-white/70">{t.n}</span>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#34d399]" />
                  <span className="relative h-2 w-2 rounded-full bg-[#34d399]" />
                </span>
              </div>
              <div className="font-display text-[18px] font-extrabold tabular-nums leading-tight">{t.p + (i === hot ? step : 0)}</div>
              <div className="text-[10px] font-semibold text-white/50">on shift</div>
            </div>
          ))}
        </div>

        <Label>Crane productivity</Label>
        <div className="grid grid-cols-[1fr_1.1fr] gap-3">
          <div className="grid grid-cols-1 gap-2">
            {[
              { k: "Crane moves", v: (1240 + step * 7).toLocaleString("en-US") },
              { k: "Moves / hr", v: String(30 + (step % 3)) },
              { k: "GCR", v: (27.6 + (step % 4) * 0.3).toFixed(1) },
            ].map((s) => (
              <div key={s.k} className="flex items-center justify-between rounded-lg bg-white/[0.07] px-3 py-1.5">
                <span className="text-[11px] font-semibold text-white/55">{s.k}</span>
                <span className="font-display text-[15px] font-extrabold tabular-nums">{s.v}</span>
              </div>
            ))}
          </div>
          <div className="relative overflow-hidden rounded-lg bg-white/[0.07] p-2">
            <svg viewBox="0 0 160 70" className="h-full w-full">
              <defs>
                <linearGradient id="port-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4db8ff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#4db8ff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={`${spark(MPH, 160, 70)} L 160 70 L 0 70 Z`} fill="url(#port-area)" />
              <path d={spark(MPH, 160, 70)} fill="none" stroke="#4db8ff" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="160" cy={70 - (MPH[MPH.length - 1] / 100) * 64 - 3} r="4" fill="#fff" />
            </svg>
          </div>
        </div>

        <Label>Recent punches</Label>
        <ul className="space-y-1.5">
          {feed.map((f) => (
            <li key={f.t} className={cn("flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-[12px]", f.ok ? "bg-white/[0.07]" : "bg-[#ff5468]/15")} style={{ animation: "fade-up 0.5s ease both" }}>
              <span className="font-mono text-[10.5px] font-bold text-white/50">{f.t}</span>
              <span className="flex-1 truncate font-bold">{f.n}</span>
              <span className={cn("truncate text-[11px] font-semibold", f.ok ? "text-white/55" : "text-[#ff8a98]")}>{f.m}</span>
              <span className={cn("grid h-4 w-4 shrink-0 place-items-center rounded-full", f.ok ? "bg-[#34d399] text-[#0d0c2b]" : "bg-[#ff5468] text-white")}>
                {f.ok ? <Check width={9} height={9} /> : <span className="text-[11px] font-bold leading-none">×</span>}
              </span>
            </li>
          ))}
        </ul>
      </Glass>
    </div>
  );
}

/* --------------------------------------------------------- Manufacturing */
const DESIGNATIONS = [
  { n: "Machine operator", have: 22, need: 24 },
  { n: "Welder", have: 12, need: 12 },
  { n: "Line inspector", have: 8, need: 10 },
  { n: "Maintenance fitter", have: 6, need: 8 },
  { n: "Supervisor", have: 5, need: 5 },
];
const MFG_TREND = [88, 90, 86, 92, 89, 84, 91, 94, 90, 93];

/** Manufacturing: headcount vs requirement, the DDNNOO rotation, today's cover and the absence-call status. */
export function ManufacturingCard() {
  const { ref, step } = useClock(8, 1100);
  const calling = step >= 4 && step < 7;
  const done = step >= 7;
  return (
    <div ref={ref}>
      <Glass title="Plant floor · Headcount vs requirement">
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          {[
            { k: "Day", v: "52", c: "bg-[#2f6bff]" },
            { k: "Night", v: "48", c: "bg-[#5b59c9]" },
            { k: "Off", v: "41", c: "bg-white/20" },
          ].map((s) => (
            <div key={s.k} className="rounded-xl bg-white/[0.07] py-2">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-white/55">
                <i className={cn("h-2 w-2 rounded-full", s.c)} /> {s.k}
              </div>
              <div className="font-display text-[19px] font-extrabold tabular-nums">{s.v}</div>
            </div>
          ))}
        </div>

        <Label>Designation by designation</Label>
        <ul className="space-y-2.5">
          {DESIGNATIONS.map((d, i) => {
            const grown = step > i;
            const have = grown ? d.have : Math.round(d.have * 0.4);
            const gap = d.need - d.have;
            return (
              <li key={d.n}>
                <div className="flex items-center justify-between text-[12px] font-semibold">
                  <span>{d.n}</span>
                  <span className={cn("tabular-nums", grown && gap > 0 ? "text-[#fbbf24]" : "text-white/70")}>
                    {have} / {d.need}
                    {grown && gap > 0 && <span className="ml-1.5 text-[10.5px]">−{gap}</span>}
                  </span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/15">
                  <span
                    className={cn("block h-full rounded-full transition-all duration-1000", grown && gap > 0 ? "bg-gradient-to-r from-[#fbbf24] to-[#f59e0b]" : "bg-gradient-to-r from-[#2f6bff] to-[#4db8ff]")}
                    style={{ width: `${(have / d.need) * 100}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>

        <Label>Rotation · D D N N O O</Label>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 12 }, (_, i) => {
            const c = CYCLE[i % 6];
            return (
              <span key={i} className={cn("grid h-6 flex-1 place-items-center rounded-md font-mono text-[10px] font-bold transition-all duration-300", SHIFT[c], i === step + 2 && "scale-110 ring-2 ring-white")}>
                {c}
              </span>
            );
          })}
        </div>

        <div className="mt-4 grid grid-cols-[1.1fr_1fr] gap-3">
          <div className="rounded-lg bg-white/[0.07] p-2">
            <div className="px-1 text-[10.5px] font-semibold text-white/50">Attendance trend</div>
            <svg viewBox="0 0 160 46" className="mt-1 h-10 w-full">
              <path d={spark(MFG_TREND, 160, 46)} fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className={cn("flex items-center gap-2 rounded-lg px-3 text-[11.5px] font-bold transition-colors duration-500", done ? "bg-[#34d399]/20 text-[#34d399]" : calling ? "bg-[#2f6bff]/30 text-white" : "bg-white/[0.07] text-white/55")}>
            <span className={cn("grid h-5 w-5 shrink-0 place-items-center rounded-full", done ? "bg-[#34d399] text-[#0d0c2b]" : calling ? "animate-pulse bg-[#4db8ff] text-[#0d0c2b]" : "bg-white/15")}>
              <Check width={10} height={10} />
            </span>
            {done ? "Cover confirmed" : calling ? "Absence call placed…" : "Watching absence risk"}
          </div>
        </div>
      </Glass>
    </div>
  );
}

/* ------------------------------------------------------------- Logistics */
const AT_RISK = [
  { n: "Tejas Aravind K.", p: 78 },
  { n: "Solanki Tamanna R.", p: 64 },
  { n: "Jaykumar", p: 52 },
];
const SITES = [
  { n: "Warehouse A", v: 94 },
  { n: "Warehouse B", v: 88 },
  { n: "Cross-dock", v: 91 },
];

/** Logistics & warehousing: assigned vs present, flagged risk, on-site per location and the priority call. */
export function LogisticsCard() {
  const { ref, step } = useClock(8, 1100);
  const assigned = 420;
  const present = Math.min(396, 340 + step * 8);
  const R = 34;
  const C = 2 * Math.PI * R;
  const calling = step >= 4 && step < 6;
  const done = step >= 6;
  return (
    <div ref={ref}>
      <Glass title="Shift dashboard · Assigned vs present">
        <div className="mt-3 flex items-center gap-4">
          <span className="relative grid h-[92px] w-[92px] shrink-0 place-items-center">
            <svg viewBox="0 0 84 84" className="absolute inset-0 -rotate-90">
              <circle cx="42" cy="42" r={R} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="8" />
              <circle cx="42" cy="42" r={R} fill="none" stroke="url(#lg-ring)" strokeWidth="8" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - present / assigned)} style={{ transition: "stroke-dashoffset 0.9s ease" }} />
              <defs>
                <linearGradient id="lg-ring" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#4db8ff" />
                  <stop offset="100%" stopColor="#2f6bff" />
                </linearGradient>
              </defs>
            </svg>
            <span className="font-display text-[19px] font-extrabold tabular-nums">{Math.round((present / assigned) * 100)}%</span>
          </span>
          <div className="min-w-0 flex-1 space-y-1.5 text-[12px] font-semibold">
            <div className="flex justify-between"><span className="text-white/60">Assigned</span><span className="tabular-nums">{assigned}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Present</span><span className="tabular-nums text-[#34d399]">{present}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Late</span><span className="tabular-nums text-[#fbbf24]">9</span></div>
            <div className="flex justify-between"><span className="text-white/60">Risk flagged</span><span className="tabular-nums text-[#ff8a98]">{done ? 0 : 3}</span></div>
          </div>
        </div>

        <Label>Absence risk · days ahead</Label>
        <ul className="space-y-1.5">
          {AT_RISK.map((r, i) => {
            const cleared = done && i === 0;
            return (
              <li key={r.n} className="flex items-center gap-3 rounded-lg bg-white/[0.07] px-3 py-1.5">
                <span className="flex-1 truncate text-[12.5px] font-bold">{r.n}</span>
                <span className="h-1.5 w-16 overflow-hidden rounded-full bg-white/15">
                  <span className={cn("block h-full rounded-full transition-all duration-700", cleared ? "bg-[#34d399]" : r.p >= 70 ? "bg-[#ff5468]" : "bg-[#fbbf24]")} style={{ width: `${cleared ? 12 : r.p}%` }} />
                </span>
                <span className={cn("w-9 text-right font-mono text-[11px] font-bold tabular-nums", cleared ? "text-[#34d399]" : "text-white/70")}>{cleared ? 12 : r.p}%</span>
              </li>
            );
          })}
        </ul>

        <Label>On site now</Label>
        <div className="grid grid-cols-3 gap-2">
          {SITES.map((s, i) => (
            <div key={s.n} className="rounded-lg bg-white/[0.07] px-2.5 py-2">
              <div className="truncate text-[10.5px] font-semibold text-white/55">{s.n}</div>
              <div className="font-display text-[16px] font-extrabold tabular-nums">{Math.min(s.v, s.v - 6 + step)}%</div>
              <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/15">
                <span className="block h-full rounded-full bg-gradient-to-r from-[#2f6bff] to-[#4db8ff] transition-all duration-700" style={{ width: `${Math.min(s.v, s.v - 6 + step)}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className={cn("mt-4 flex items-center gap-2.5 rounded-xl px-3 py-2 text-[12px] font-bold transition-colors duration-500", done ? "bg-[#34d399]/20 text-[#34d399]" : calling ? "bg-[#2f6bff]/30 text-white" : "bg-white/[0.07] text-white/55")}>
          <span className={cn("grid h-5 w-5 place-items-center rounded-full", done ? "bg-[#34d399] text-[#0d0c2b]" : calling ? "animate-pulse bg-[#4db8ff] text-[#0d0c2b]" : "bg-white/15")}>
            <Check width={11} height={11} />
          </span>
          {done ? "Backfill arranged" : calling ? "Absence Prediction Priority Call…" : "Watching risk scores"}
        </div>
      </Glass>
    </div>
  );
}

/* --------------------------------------------------------------- Staffing */
const STATUSES = [
  { k: "Active", v: 5412, c: "text-[#34d399]" },
  { k: "Absconded", v: 18, c: "text-[#ff8a98]" },
  { k: "Not Reported", v: 64, c: "text-[#fbbf24]" },
  { k: "Terminated", v: 27, c: "text-white/70" },
  { k: "On Notice Period", v: 41, c: "text-[#9cc2ff]" },
  { k: "Medical Leave", v: 33, c: "text-[#c4b5fd]" },
];
const CLIENT_SITES = [
  { n: "Client site A", v: 96 },
  { n: "Client site B", v: 91 },
  { n: "Client site C", v: 88 },
];

/** Staffing & manpower: the worker's portable record, workforce by status, client sites and the move to a new employer. */
export function StaffingCard() {
  const { ref, step } = useClock(8, 1100);
  const metrics = [
    { k: "Attendance", v: 96 },
    { k: "Punctuality", v: 91 },
    { k: "Performance", v: 88 },
  ];
  const moved = step >= 5;
  return (
    <div ref={ref}>
      <Glass title="Performance passbook">
        <div className="mt-3 flex items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#2f6bff] to-[#5b59c9] font-display text-[16px] font-extrabold">RP</span>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="text-[13.5px] font-bold">Ramesh P.</div>
            <div className="mt-0.5 flex items-center gap-1.5 font-mono text-[11px] font-semibold text-white/60">
              <Shield width={12} height={12} /> RGID · one portable ID
            </div>
          </div>
          <span className="rounded-full bg-[#34d399]/20 px-2.5 py-0.5 text-[11px] font-bold text-[#34d399]">Active</span>
        </div>
        <ul className="mt-3 space-y-2">
          {metrics.map((m, i) => (
            <li key={m.k}>
              <div className="flex items-center justify-between text-[12px] font-semibold">
                <span className="text-white/70">{m.k}</span>
                <span className="tabular-nums">{step > i ? m.v : 0}%</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/15">
                <span className="block h-full rounded-full bg-gradient-to-r from-[#2f6bff] to-[#4db8ff] transition-all duration-1000" style={{ width: step > i ? `${m.v}%` : "0%" }} />
              </div>
            </li>
          ))}
        </ul>

        <Label>Record travels between employers</Label>
        <div className="relative flex items-center justify-between rounded-xl bg-white/[0.07] px-4 py-3">
          <span className="text-[12px] font-bold">Current employer</span>
          <span className="absolute left-[34%] right-[34%] top-1/2 h-px bg-white/25" />
          <span
            className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#4db8ff] shadow-[0_0_14px_4px_rgba(77,184,255,0.7)] transition-all duration-1000"
            style={{ left: moved ? "62%" : "34%" }}
          />
          <span className={cn("text-[12px] font-bold transition-colors duration-700", moved ? "text-[#34d399]" : "text-white/50")}>Next employer</span>
        </div>

        <Label>Workforce by status</Label>
        <div className="grid grid-cols-3 gap-2">
          {STATUSES.map((s) => (
            <div key={s.k} className="rounded-lg bg-white/[0.07] px-2.5 py-2">
              <div className={cn("font-display text-[16px] font-extrabold tabular-nums", s.c)}>{s.v.toLocaleString("en-US")}</div>
              <div className="truncate text-[10px] font-semibold text-white/55">{s.k}</div>
            </div>
          ))}
        </div>

        <Label>Attendance by client site</Label>
        <ul className="space-y-1.5">
          {CLIENT_SITES.map((s, i) => (
            <li key={s.n} className="flex items-center gap-3 text-[12px] font-semibold">
              <span className="w-24 truncate text-white/65">{s.n}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-white/15">
                <span className="block h-full rounded-full bg-gradient-to-r from-[#2f6bff] to-[#4db8ff] transition-all duration-1000" style={{ width: step > i + 1 ? `${s.v}%` : "0%" }} />
              </span>
              <span className="w-9 text-right tabular-nums">{step > i + 1 ? s.v : 0}%</span>
            </li>
          ))}
        </ul>
      </Glass>
    </div>
  );
}
