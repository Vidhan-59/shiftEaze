import type { ReactNode } from "react";

/**
 * Tiny illustrated UI scenes shown on the Platform carousel cards. Built from
 * plain divs/SVG so they stay crisp and need no image files. Designed to sit on
 * a saturated gradient: white glass shapes plus a few signal colours.
 */

const glass = "rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm";
const pill = "rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[12px] font-semibold text-white";

const SHIFT: Record<string, string> = {
  D: "bg-emerald-300 text-emerald-950",
  N: "bg-indigo-950/80 text-white",
  O: "bg-white/80 text-slate-700",
  G: "bg-amber-300 text-amber-950",
};

function Chip({ k, className = "" }: { k: keyof typeof SHIFT; className?: string }) {
  return (
    <span className={`grid h-9 w-9 place-items-center rounded-lg text-[13px] font-extrabold shadow-md ${SHIFT[k]} ${className}`}>
      {k}
    </span>
  );
}

function Tick({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m3 8.5 3.2 3.2L13 4.5" />
    </svg>
  );
}

function Row({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`flex items-center gap-2 ${className}`}>{children}</div>;
}

function Bar({ w, className = "" }: { w: string; className?: string }) {
  return <span className={`block h-2.5 rounded-full ${className}`} style={{ width: w }} />;
}

function Phone({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-6 w-6 ${className}`} fill="currentColor" aria-hidden>
      <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z" />
    </svg>
  );
}

function Pin({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-7 w-7 ${className}`} fill="currentColor" aria-hidden>
      <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

export function MiniVisual({ id, label }: { id: string; label?: string }) {
  switch (id) {
    /* ───────────── Rostering ───────────── */
    case "pattern":
      return (
        <div className="flex flex-col items-center gap-3">
          <Row className={`${glass} gap-1.5 p-2`}>
            {(["D", "D", "N", "N", "O", "O"] as const).map((k, i) => (
              <Chip key={i} k={k} className={`!h-8 !w-8 ${i === 5 ? "animate-float-y" : ""}`} />
            ))}
          </Row>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 14 }, (_, i) => (
              <span
                key={i}
                className={`h-4 w-4 rounded-[5px] ${["bg-emerald-300", "bg-emerald-300", "bg-indigo-950/80", "bg-indigo-950/80", "bg-white/70", "bg-white/70"][i % 6]}`}
              />
            ))}
          </div>
        </div>
      );

    case "runmodes":
      return (
        <div className="flex w-full max-w-[220px] flex-col gap-2.5">
          <Row className={`${glass} px-3 py-2.5`}>
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-indigo-700"><Tick /></span>
            <span className="text-[13px] font-semibold text-white">Generate once</span>
            <span className="ml-auto text-[11px] text-white/80">30+ days</span>
          </Row>
          <Row className={`${glass} px-3 py-2.5`}>
            <svg viewBox="0 0 24 24" className="h-6 w-6 animate-spin-slow text-white" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
              <path d="M20 12a8 8 0 1 1-2.6-5.9" />
              <path d="M20 4v4h-4" />
            </svg>
            <span className="text-[13px] font-semibold text-white">Auto-repeat</span>
            <span className="ml-auto text-[11px] text-white/80">until stopped</span>
          </Row>
        </div>
      );

    case "shiftmaster":
      return (
        <div className="grid grid-cols-2 gap-2.5">
          {[
            ["D", "Day"],
            ["N", "Night"],
            ["G", "General"],
            ["O", "Week off"],
          ].map(([k, n]) => (
            <Row key={k} className={`${glass} px-2.5 py-2`}>
              <Chip k={k as keyof typeof SHIFT} className="!h-7 !w-7 !text-[11px]" />
              <span className="text-[12px] font-semibold text-white">{n}</span>
            </Row>
          ))}
        </div>
      );

    case "extender":
      return (
        <div className="flex w-full max-w-[230px] flex-col items-center gap-4">
          <span className={`${pill} animate-float-y`}>+2 h overtime</span>
          <div className="relative h-3 w-full rounded-full bg-white/25">
            <span className="absolute inset-y-0 left-[22%] right-[18%] rounded-full bg-white" />
            <span className="absolute -top-1.5 left-[22%] h-6 w-6 -translate-x-1/2 rounded-full border-4 border-white bg-[#ff5468] shadow-lg" />
            <span className="absolute -top-1.5 right-[18%] h-6 w-6 translate-x-1/2 rounded-full border-4 border-white bg-[#ff5468] shadow-lg" />
          </div>
          <Row className="w-full justify-between text-[11px] font-semibold text-white/85">
            <span>Start</span>
            <span>End</span>
          </Row>
        </div>
      );

    /* ───────────── Absence ───────────── */
    case "gauge":
      return (
        <div className="relative grid h-[130px] w-[130px] place-items-center">
          <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90" aria-hidden>
            <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="10" />
            <circle cx="60" cy="60" r="50" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" pathLength="100" strokeDasharray="100" className="animate-ring-draw" style={{ strokeDashoffset: 13 }} />
          </svg>
          <div className="text-center text-white">
            <div className="font-display text-[28px] font-extrabold leading-none">0.87</div>
            <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/85">AUC-ROC</div>
          </div>
        </div>
      );

    case "approved":
      return (
        <div className="flex flex-col items-center gap-3">
          <span className={`${glass} px-3 py-1.5 text-[12px] font-semibold text-white/70 line-through decoration-2`}>Absence risk: High</span>
          <span className="text-white/80" aria-hidden>↓</span>
          <Row className="rounded-xl bg-white px-4 py-2.5 shadow-lg">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500 text-white"><Tick /></span>
            <span className="text-[13px] font-bold text-slate-800">Leave approved</span>
          </Row>
        </div>
      );

    case "rejected":
      return (
        <div className="flex w-full max-w-[230px] flex-col gap-4">
          <div>
            <div className="mb-1.5 flex justify-between text-[11px] font-semibold text-white/90"><span>Usual</span><span>5.3%</span></div>
            <Bar w="21%" className="bg-white/70" />
          </div>
          <div>
            <div className="mb-1.5 flex justify-between text-[11px] font-semibold text-white/90"><span>After rejected leave</span><span>24.8%</span></div>
            <Bar w="100%" className="bg-[#ff5468] shadow-[0_0_14px_rgba(255,84,104,0.8)]" />
          </div>
        </div>
      );

    case "arrange":
      return (
        <div className="flex w-full max-w-[230px] flex-col gap-2">
          {["Available", "Available", "OT ready"].map((t, i) => (
            <Row key={i} className={`${glass} px-2.5 py-2 ${i === 0 ? "!border-white/70 !bg-white/35" : ""}`}>
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white/80 text-[10px] font-bold text-slate-700">{i + 1}</span>
              <Bar w={i === 0 ? "46%" : "36%"} className="bg-white/70" />
              <span className="ml-auto text-[10.5px] font-semibold text-white/90">{t}</span>
            </Row>
          ))}
          <span className="mt-1 self-end rounded-lg bg-white px-3 py-1 text-[12px] font-bold text-[#c8202f] shadow-lg">Arrange</span>
        </div>
      );

    /* ───────────── Attendance ───────────── */
    case "qr":
      return (
        <Row className="gap-4">
          <div className="grid grid-cols-5 gap-1 rounded-xl bg-white p-2.5 shadow-lg">
            {Array.from({ length: 25 }, (_, i) => (
              <span key={i} className={`h-3.5 w-3.5 rounded-[3px] ${[0, 1, 3, 4, 5, 9, 10, 12, 14, 15, 19, 20, 21, 23, 24, 7, 17].includes(i) ? "bg-slate-800" : "bg-slate-200"}`} />
            ))}
          </div>
          <div className="relative grid h-16 w-16 place-items-center text-white">
            <span className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-white/80" />
            <Pin />
          </div>
        </Row>
      );

    case "sixways":
      return (
        <div className="grid grid-cols-3 gap-2">
          {["Mobile", "QR scan", "Kiosk", "Back-office", "Approval", "Auto"].map((t) => (
            <span key={t} className={`${glass} px-2.5 py-2.5 text-center text-[11.5px] font-semibold text-white`}>{t}</span>
          ))}
        </div>
      );

    case "live":
      return (
        <div className="flex w-full max-w-[230px] flex-col gap-2.5">
          {[
            ["Present", "bg-emerald-300", "78%"],
            ["Late", "bg-amber-300", "32%"],
            ["Absent", "bg-[#ff5468]", "18%"],
          ].map(([t, c, w]) => (
            <Row key={t} className={`${glass} px-3 py-2`}>
              <span className="relative flex h-2.5 w-2.5">
                <span className={`absolute inset-0 animate-pulse-ring rounded-full ${c}`} />
                <span className={`relative h-2.5 w-2.5 rounded-full ${c}`} />
              </span>
              <span className="w-[54px] text-[12px] font-semibold text-white">{t}</span>
              <Bar w={w} className="bg-white/70" />
            </Row>
          ))}
        </div>
      );

    case "legacy":
      return (
        <Row className="gap-2.5">
          <span className={`${glass} px-3 py-2 text-[12.5px] font-bold text-white`}>Kronos</span>
          <div className="relative h-1 w-14 overflow-hidden rounded-full bg-white/30">
            <span className="absolute inset-y-0 w-6 animate-scan-x rounded-full bg-white" />
          </div>
          <span className="rounded-xl bg-white px-3 py-2 text-[12.5px] font-extrabold text-[#2d2b8f] shadow-lg">ShiftEaze</span>
        </Row>
      );

    /* ───────────── Dashboards ───────────── */
    case "kpi":
      return (
        <div className="grid grid-cols-2 gap-2.5">
          {[
            ["Active", "82%"],
            ["Present", "64%"],
            ["On leave", "24%"],
            ["Overtime", "40%"],
          ].map(([t, w]) => (
            <div key={t} className={`${glass} px-3 py-2.5`}>
              <div className="text-[11px] font-semibold text-white/90">{t}</div>
              <div className="mt-2 h-2 rounded-full bg-white/25"><Bar w={w} className="!h-2 bg-white" /></div>
            </div>
          ))}
        </div>
      );

    case "bars":
      return (
        <div className="flex h-[110px] items-end gap-3">
          {[
            ["60%", "85%"],
            ["80%", "70%"],
            ["45%", "60%"],
            ["70%", "90%"],
          ].map(([a, b], i) => (
            <div key={i} className="flex h-full items-end gap-1">
              <span className="w-4 rounded-t-md bg-white" style={{ height: a }} />
              <span className="w-4 rounded-t-md bg-white/35" style={{ height: b }} />
            </div>
          ))}
        </div>
      );

    case "filters":
      return (
        <div className="flex max-w-[240px] flex-wrap justify-center gap-2">
          {["Terminal", "Department", "Batch", "Designation", "Timeframe"].map((t, i) => (
            <span key={t} className={`${pill} ${i === 0 ? "!bg-white !text-[#0f55c9]" : ""}`}>{t} ▾</span>
          ))}
        </div>
      );

    case "export":
      return (
        <div className="flex flex-col items-center gap-3">
          <div className="grid h-[86px] w-[68px] place-items-center rounded-lg bg-white shadow-lg">
            <div className="flex flex-col gap-1.5">
              <Bar w="38px" className="bg-slate-300" />
              <Bar w="30px" className="bg-slate-300" />
              <Bar w="34px" className="bg-slate-300" />
            </div>
          </div>
          <span className="animate-float-y rounded-full bg-[#ff5468] px-3.5 py-1 text-[12px] font-bold text-white shadow-lg">↓ Export</span>
        </div>
      );

    /* ───────────── Voice ───────────── */
    case "call":
      return (
        <div className="flex flex-col items-center gap-3">
          <div className="relative grid h-[68px] w-[68px] place-items-center rounded-full bg-white text-[#2d2b8f] shadow-lg">
            <span className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-white" />
            <Phone />
          </div>
          <span className={`${glass} px-3 py-1.5 text-[12.5px] font-semibold text-white`}>{label}</span>
          <Row className="gap-1.5">
            {["EN", "HI", "GU"].map((l) => (
              <span key={l} className="rounded-md bg-white/25 px-2 py-0.5 text-[10.5px] font-bold text-white">{l}</span>
            ))}
          </Row>
        </div>
      );

    /* ───────────── Passbook ───────────── */
    case "moves":
      return (
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-[84px] items-end gap-2">
            {["35%", "52%", "44%", "70%", "62%", "92%"].map((h, i) => (
              <span key={i} className={`w-5 origin-bottom animate-[bar-grow_0.9s_ease-out_both] rounded-t-md ${i === 5 ? "bg-white" : "bg-white/45"}`} style={{ height: h, animationDelay: `${i * 80}ms` }} />
            ))}
          </div>
          <span className={pill}>Moves per hour</span>
        </div>
      );

    case "status":
      return (
        <div className="flex w-full max-w-[200px] flex-col gap-2">
          {[
            ["Active", "bg-emerald-300"],
            ["On Notice Period", "bg-amber-300"],
            ["Medical Leave", "bg-sky-300"],
          ].map(([t, c]) => (
            <Row key={t} className={`${glass} px-3 py-2`}>
              <span className={`h-2.5 w-2.5 rounded-full ${c}`} />
              <span className="text-[12.5px] font-semibold text-white">{t}</span>
            </Row>
          ))}
        </div>
      );

    case "record":
      return (
        <div className="flex flex-col items-center gap-3">
          <span className="rounded-lg bg-white px-3 py-1.5 font-mono text-[12px] font-bold text-[#5a2aa6] shadow-lg">RGID · portable ID</span>
          <Row className="gap-0">
            {["Terminal A", "Terminal B", "Terminal C"].map((t, i) => (
              <div key={t} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-white bg-white/40" />
                  <span className="text-[10.5px] font-semibold text-white/90">{t}</span>
                </div>
                {i < 2 && <span className="mx-1.5 mb-4 h-0.5 w-6 bg-white/50" />}
              </div>
            ))}
          </Row>
        </div>
      );

    /* ───────────── Leave ───────────── */
    case "balances":
      return (
        <div className="grid grid-cols-2 gap-2.5">
          {[
            ["Paid", "70%"],
            ["Sick", "45%"],
            ["Casual", "60%"],
            ["Unpaid", "20%"],
          ].map(([t, w]) => (
            <div key={t} className={`${glass} px-3 py-2.5`}>
              <div className="text-[11.5px] font-semibold text-white">{t}</div>
              <div className="mt-2 h-2 rounded-full bg-white/25"><Bar w={w} className="!h-2 bg-white" /></div>
            </div>
          ))}
        </div>
      );

    case "approvals":
      return (
        <div className="flex flex-col items-center gap-3">
          <Row className={`${glass} px-3 py-2`}>
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/80 text-[10px] font-bold text-slate-700">OP</span>
            <span className="text-[12px] font-semibold text-white">Casual leave · 2 days</span>
          </Row>
          <Row className="gap-2.5">
            <span className="rounded-lg bg-emerald-400 px-4 py-1.5 text-[12.5px] font-bold text-emerald-950 shadow-lg">Approve</span>
            <span className="rounded-lg bg-white px-4 py-1.5 text-[12.5px] font-bold text-[#c8202f] shadow-lg">Reject</span>
          </Row>
        </div>
      );

    case "followup":
      return (
        <div className="flex flex-col items-center gap-2 text-[12px] font-semibold text-white">
          <span className={`${glass} px-3 py-1.5`}>Leave rejected</span>
          <span aria-hidden>↓</span>
          <Row>
            <span className="rounded-lg bg-emerald-300 px-2.5 py-1 text-emerald-950">Came to work</span>
            <span className="text-white/70">or</span>
            <span className="rounded-lg bg-[#ff5468] px-2.5 py-1">Absent</span>
          </Row>
          <span aria-hidden>↓</span>
          <span className="rounded-lg bg-white px-3 py-1.5 text-[#2d2b8f] shadow-lg">AI learns</span>
        </div>
      );

    case "breakdown":
      return (
        <div className="relative grid h-[120px] w-[120px] place-items-center">
          <svg viewBox="0 0 42 42" className="absolute inset-0 -rotate-90" aria-hidden>
            <circle cx="21" cy="21" r="15.9" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="6" pathLength="100" strokeDasharray="45 55" />
            <circle cx="21" cy="21" r="15.9" fill="none" stroke="#ffd166" strokeWidth="6" pathLength="100" strokeDasharray="30 70" strokeDashoffset="-45" />
            <circle cx="21" cy="21" r="15.9" fill="none" stroke="#ff5468" strokeWidth="6" pathLength="100" strokeDasharray="20 80" strokeDashoffset="-75" />
          </svg>
          <span className="font-display text-[13px] font-bold text-white">Leave</span>
        </div>
      );

    /* ───────────── Security ───────────── */
    case "geofence":
      return (
        <div className="relative grid h-[130px] w-[130px] place-items-center text-white">
          <span className="absolute inset-0 rounded-full border-2 border-dashed border-white/70" />
          <span className="absolute inset-4 animate-pulse-ring rounded-full border border-white/60" />
          <Pin className="!h-9 !w-9" />
          <span className="absolute -bottom-1 rounded-full bg-emerald-300 px-2.5 py-0.5 text-[11px] font-bold text-emerald-950">Inside ✓</span>
        </div>
      );

    case "webhook":
      return (
        <div className="flex flex-col items-center gap-3">
          <div className="grid h-[64px] w-[64px] place-items-center rounded-2xl bg-white shadow-lg">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#0f55c9]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
          </div>
          <span className={`${pill} font-mono`}>HMAC · signed</span>
        </div>
      );

    case "audit":
      return (
        <div className="flex w-full max-w-[220px] flex-col gap-2">
          {["Punch", "Approval", "Reason"].map((t) => (
            <Row key={t} className={`${glass} px-3 py-2`}>
              <span className="text-emerald-300"><Tick /></span>
              <span className="text-[12px] font-semibold text-white">{t} logged</span>
              <Bar w="28%" className="ml-auto bg-white/50" />
            </Row>
          ))}
        </div>
      );

    case "roles":
      return (
        <div className="grid grid-cols-2 gap-2.5">
          {["Operator", "Planner", "Manager", "Admin"].map((t) => (
            <Row key={t} className={`${glass} px-2.5 py-2`}>
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[10px] font-extrabold text-[#5a2aa6]">{t[0]}</span>
              <span className="text-[12px] font-semibold text-white">{t}</span>
            </Row>
          ))}
        </div>
      );

    default:
      return null;
  }
}
