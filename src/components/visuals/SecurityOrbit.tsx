import { Bolt, Check, Database, Layers, Shield, Target } from "@/components/ui/icons";

const CHIPS = [
  { Icon: Database, color: "bg-[#2f6bff]" },
  { Icon: Check, color: "bg-[#34d399] !text-[#0d0c2b]" },
  { Icon: Layers, color: "bg-[#5b59c9]" },
  { Icon: Target, color: "bg-[#d51f2c]" },
  { Icon: Bolt, color: "bg-[#4db8ff] !text-[#0d0c2b]" },
];

/** Shield core with pulse rings and chips orbiting on two dashed rings. Pure CSS. */
export function SecurityOrbit() {
  return (
    <div className="relative mx-auto grid h-[380px] w-[380px] shrink-0 place-items-center" aria-hidden>
      <span className="absolute inset-[8%] rounded-full bg-[#2f6bff]/10 blur-2xl" />

      {/* Outer ring: 3 chips */}
      <div className="absolute inset-0 rounded-full border border-dashed border-teal-400/30" style={{ animation: "orbit-spin 36s linear infinite" }}>
        {CHIPS.slice(0, 3).map(({ Icon, color }, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 -ml-[22px] -mt-[22px]"
            style={{ transform: `rotate(${i * 120}deg) translateY(-190px)` }}
          >
            <span className="block" style={{ transform: `rotate(${-i * 120}deg)` }}>
              <span className="block" style={{ animation: "orbit-counter 36s linear infinite" }}>
                <span className={`grid h-11 w-11 place-items-center rounded-2xl text-white shadow-float ${color}`}>
                  <Icon width={19} height={19} />
                </span>
              </span>
            </span>
          </span>
        ))}
      </div>

      {/* Inner ring: 2 chips, reverse direction */}
      <div className="absolute inset-[20%] rounded-full border border-dashed border-accent-500/30" style={{ animation: "orbit-spin 26s linear infinite reverse" }}>
        {CHIPS.slice(3).map(({ Icon, color }, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 -ml-[18px] -mt-[18px]"
            style={{ transform: `rotate(${i * 180 + 40}deg) translateY(-114px)` }}
          >
            <span className="block" style={{ transform: `rotate(${-(i * 180 + 40)}deg)` }}>
              <span className="block" style={{ animation: "orbit-spin 26s linear infinite" }}>
                <span className={`grid h-9 w-9 place-items-center rounded-xl text-white shadow-float ${color}`}>
                  <Icon width={16} height={16} />
                </span>
              </span>
            </span>
          </span>
        ))}
      </div>

      {/* Core */}
      <span className="relative grid h-24 w-24 place-items-center">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-500/40" />
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-teal-400/30" style={{ animationDelay: "0.8s" }} />
        <span className="relative grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-white shadow-float ring-4 ring-white">
          <Shield width={40} height={40} />
        </span>
      </span>
    </div>
  );
}
