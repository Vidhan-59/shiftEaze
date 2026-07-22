import { cn } from "@/lib/utils";

const NAVY = "#262261";
const RED = "#d51f2c";

/**
 * ShiftEaze mark — a shift calendar (with a re-rostering rotation arrow) paired
 * with the operator crew, next to the "Shift"(red) / "Eaze"(navy) wordmark.
 * Recreated as vector so it stays crisp at any size and inherits the theme.
 */
export function Logo({
  className,
  showWord = true,
}: {
  className?: string;
  showWord?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <ShiftEazeMark className="h-8 w-8 shrink-0" />
      {showWord && (
        <span className="text-[19px] font-extrabold leading-none tracking-tight">
          <span style={{ color: RED }}>Shift</span>
          <span style={{ color: NAVY }}>Eaze</span>
        </span>
      )}
    </span>
  );
}

export function ShiftEazeMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Calendar body */}
      <rect x="6" y="12" width="25" height="26" rx="5" fill={NAVY} />
      {/* Red header strip */}
      <rect x="6" y="18" width="25" height="2.6" fill={RED} />
      {/* Binder tabs */}
      <rect x="12" y="8" width="3.2" height="7.5" rx="1.6" fill={NAVY} />
      <rect x="22" y="8" width="3.2" height="7.5" rx="1.6" fill={NAVY} />
      {/* Day cells */}
      <g fill="#ffffff">
        <rect x="11" y="24" width="3.3" height="3.3" rx="0.9" />
        <rect x="16" y="24" width="3.3" height="3.3" rx="0.9" />
        <rect x="21" y="24" width="3.3" height="3.3" rx="0.9" />
        <rect x="11" y="29" width="3.3" height="3.3" rx="0.9" />
        <rect x="16" y="29" width="3.3" height="3.3" rx="0.9" />
        <rect x="21" y="29" width="3.3" height="3.3" rx="0.9" />
      </g>
      {/* Re-rostering rotation arrow, wrapping the calendar's lower-left */}
      <path
        d="M6.5 30 a5.5 5.5 0 0 0 5.5 5.5"
        stroke={NAVY}
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M4.4 27.6 L6.5 30 L8.9 28"
        stroke={NAVY}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Operator crew (hard-hat figures), overlapping the calendar's right */}
      <g fill={NAVY} stroke="#f5f7fd" strokeWidth="1.1">
        {/* back worker */}
        <circle cx="33" cy="22" r="4" />
        <path d="M26.5 39 v-4.2 a6.5 6.5 0 0 1 13 0 V39 Z" />
      </g>
      <g fill={NAVY} stroke="#f5f7fd" strokeWidth="1.1">
        {/* front worker */}
        <circle cx="38.5" cy="26" r="4.4" />
        <path d="M31.4 41 v-4.6 a7.1 7.1 0 0 1 14.2 0 V41 Z" />
      </g>
      {/* hard-hat brims */}
      <rect x="27.6" y="19.4" width="10.8" height="1.7" rx="0.85" fill={RED} />
      <rect x="32.6" y="23.2" width="11.8" height="1.9" rx="0.95" fill={RED} />
    </svg>
  );
}
