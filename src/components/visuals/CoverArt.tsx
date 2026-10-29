/**
 * Original flat illustrations for the Resources covers, one per topic. They are
 * light inline SVG (no image files), so the card stack renders smoothly.
 */
const W = "rgba(255,255,255,";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 310 280" className="h-full w-full" fill="none" aria-hidden preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="art-glow" cx="50%" cy="38%" r="60%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="310" height="280" fill="url(#art-glow)" />
      {children}
    </svg>
  );
}

/** 1. Workforce Management: a team connected to one hub. */
function Team() {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
    return [155 + Math.cos(a) * 92, 128 + Math.sin(a) * 78] as const;
  });
  return (
    <Frame>
      {pts.map(([x, y], i) => (
        <g key={i}>
          <line x1="155" y1="128" x2={x} y2={y} stroke={`${W}0.35)`} strokeWidth="1.5" strokeDasharray="4 5" />
          <circle cx={x} cy={y - 7} r="9" fill={`${W}0.92)`} />
          <path d={`M ${x - 15} ${y + 16} a 15 13 0 0 1 30 0 Z`} fill={`${W}0.75)`} />
          <circle cx={x + 11} cy={y - 14} r="4" fill={i % 2 ? "#34d399" : "#4db8ff"} />
        </g>
      ))}
      <circle cx="155" cy="128" r="32" fill={`${W}0.18)`} />
      <rect x="133" y="106" width="44" height="44" rx="12" fill="#fff" />
      <path d="M144 122 l11 -6 l11 6 l-11 6 Z M144 130 l11 6 l11 -6 M144 137 l11 6 l11 -6" stroke="#302e86" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
    </Frame>
  );
}

/** 2. Shift Scheduling & Rostering: a calendar of D / N / O shifts. */
function Roster() {
  const cyc = ["D", "D", "N", "N", "O", "O"];
  return (
    <Frame>
      <rect x="34" y="34" width="242" height="196" rx="18" fill={`${W}0.14)`} stroke={`${W}0.4)`} />
      <rect x="34" y="34" width="242" height="34" rx="18" fill={`${W}0.22)`} />
      {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
        <text key={i} x={58 + i * 31} y="57" fontSize="11" fontWeight="700" fill={`${W}0.85)`} textAnchor="middle">
          {d}
        </text>
      ))}
      {Array.from({ length: 4 }).map((_, r) =>
        Array.from({ length: 7 }).map((__, c) => {
          const k = cyc[(c + r * 2) % 6];
          const fill = k === "D" ? "#2f6bff" : k === "N" ? "#5b59c9" : `${W}0.14)`;
          return (
            <g key={`${r}-${c}`}>
              <rect x={45 + c * 31} y={78 + r * 36} width="26" height="28" rx="7" fill={fill} />
              <text x={58 + c * 31} y={96 + r * 36} fontSize="10.5" fontWeight="700" fill="#fff" textAnchor="middle" opacity={k === "O" ? 0.5 : 1}>
                {k}
              </text>
            </g>
          );
        }),
      )}
      <rect x="107" y="74" width="34" height="152" rx="10" stroke="#fff" strokeWidth="2" strokeDasharray="5 4" />
    </Frame>
  );
}

/** 3. AI Workforce Management: a prediction network with a flagged risk. */
function AiNet() {
  const nodes: [number, number][] = [[60, 70], [60, 150], [60, 220], [155, 50], [155, 130], [155, 210], [250, 90], [250, 170]];
  const edges = [[0, 3], [0, 4], [1, 3], [1, 4], [1, 5], [2, 4], [2, 5], [3, 6], [4, 6], [4, 7], [5, 7]];
  return (
    <Frame>
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={`${W}0.35)`} strokeWidth="1.5" />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 4 ? 17 : 10} fill={i === 4 ? "#fff" : `${W}0.85)`} />
      ))}
      <text x="155" y="135" fontSize="12" fontWeight="800" fill="#302e86" textAnchor="middle">
        AI
      </text>
      <circle cx="250" cy="90" r="18" stroke="#ff5468" strokeWidth="2.5" className="animate-pulse" />
      <rect x="196" y="36" width="62" height="26" rx="13" fill="#ff5468" />
      <text x="227" y="54" fontSize="12" fontWeight="800" fill="#fff" textAnchor="middle">
        78% risk
      </text>
    </Frame>
  );
}

/** 4. Employee Attendance: a phone punch inside a geofence. */
function Punch() {
  const qr = [1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1];
  return (
    <Frame>
      <ellipse cx="155" cy="232" rx="118" ry="24" stroke={`${W}0.4)`} strokeWidth="1.5" strokeDasharray="5 5" />
      <ellipse cx="155" cy="232" rx="74" ry="14" stroke={`${W}0.65)`} strokeWidth="1.5" />
      <rect x="105" y="24" width="100" height="196" rx="20" fill={`${W}0.16)`} stroke="#fff" strokeWidth="2.5" />
      <rect x="116" y="44" width="78" height="150" rx="10" fill={`${W}0.92)`} />
      {qr.map((v, i) =>
        v ? <rect key={i} x={128 + (i % 5) * 11} y={62 + Math.floor(i / 5) * 11} width="9" height="9" rx="2" fill="#0d0c2b" /> : null,
      )}
      <rect x="128" y="124" width="54" height="3" rx="1.5" fill="#2f6bff" />
      <rect x="124" y="158" width="62" height="24" rx="12" fill="#34d399" />
      <text x="155" y="174" fontSize="10.5" fontWeight="800" fill="#0d0c2b" textAnchor="middle">
        Inside site
      </text>
      <circle cx="216" cy="62" r="17" fill="#34d399" />
      <path d="M208 62 l6 6 l11 -12" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

/** 5. Workforce Analytics: bars, a trend line and KPI chips. */
function Charts() {
  const bars = [70, 98, 82, 128, 108, 150];
  return (
    <Frame>
      <rect x="30" y="34" width="250" height="204" rx="18" fill={`${W}0.14)`} stroke={`${W}0.4)`} />
      {[0, 1, 2].map((i) => (
        <line key={i} x1="48" x2="262" y1={90 + i * 44} y2={90 + i * 44} stroke={`${W}0.18)`} />
      ))}
      {bars.map((h, i) => (
        <rect key={i} x={54 + i * 34} y={218 - h} width="22" height={h} rx="6" fill={i === 5 ? "#4db8ff" : `${W}0.8)`} />
      ))}
      <path d="M65 168 L99 140 L133 152 L167 112 L201 126 L235 78" stroke="#fbbf24" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      {[[65, 168], [99, 140], [133, 152], [167, 112], [201, 126], [235, 78]].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="4.5" fill="#fbbf24" stroke="#fff" strokeWidth="1.5" />
      ))}
      <rect x="46" y="46" width="64" height="22" rx="11" fill="#fff" />
      <text x="78" y="61" fontSize="11" fontWeight="800" fill="#302e86" textAnchor="middle">
        On site 631
      </text>
    </Frame>
  );
}

/** 6. Port Workforce Management: a quay crane, containers and a ship. */
function Port() {
  const cols = ["#ff5468", "#4db8ff", "#fbbf24", "#34d399", "#fff"];
  return (
    <Frame>
      <rect x="0" y="206" width="310" height="74" fill={`${W}0.12)`} />
      <path d="M0 208 Q40 200 80 208 T160 208 T240 208 T310 208" stroke={`${W}0.5)`} strokeWidth="2" />
      {/* ship */}
      <path d="M150 206 h140 l-14 24 h-112 Z" fill={`${W}0.85)`} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={158 + i * 31} y="176" width="27" height="30" rx="3" fill={cols[i % cols.length]} />
          <rect x={164 + i * 31} y="146" width="27" height="30" rx="3" fill={cols[(i + 2) % cols.length]} opacity="0.9" />
        </g>
      ))}
      {/* quay crane */}
      <path d="M60 206 L78 60 M104 206 L86 60" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      <path d="M62 120 L100 120 M66 160 L98 160" stroke={`${W}0.7)`} strokeWidth="3" />
      <path d="M30 60 H250" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
      <path d="M82 60 L36 60 M82 60 L190 60" stroke="#fff" strokeWidth="6" />
      <line x1="196" y1="60" x2="196" y2="106" stroke={`${W}0.85)`} strokeWidth="2" />
      <rect x="180" y="106" width="32" height="14" rx="3" fill="#fbbf24" />
      <rect x="184" y="120" width="24" height="18" rx="2" fill="#ff5468" />
      <circle cx="262" cy="52" r="14" fill="#fbbf24" />
    </Frame>
  );
}

const ART = [Team, Roster, AiNet, Punch, Charts, Port];

export function CoverArt({ index }: { index: number }) {
  const Art = ART[index % ART.length];
  return <Art />;
}
