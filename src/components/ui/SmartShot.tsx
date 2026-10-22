"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { DashboardMock } from "@/components/visuals/DashboardMock";

type Kind = "manpower" | "shift" | "attendance" | "leave" | "roster";

/**
 * Renders a real dashboard screenshot from /public/assets/reference.
 * If the file is missing (e.g. before you drop in the PNGs), it falls back to a
 * tasteful animated mock so the layout is never broken. Swap in the real image
 * and it takes over automatically — no code change needed.
 */
export function SmartShot({
  src,
  alt,
  kind = "manpower",
  priority = false,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  kind?: Kind;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative aspect-[1200/620] w-full bg-ink-900", className)}>
      {failed ? (
        <DashboardMock kind={kind} />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 1100px"
          className={cn("object-cover object-top", imgClassName)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
