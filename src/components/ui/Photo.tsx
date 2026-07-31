import Image from "next/image";
import { photoBlur } from "@/content/photo-blur";
import { cn } from "@/lib/utils";

/**
 * Site photography. Sources live in /public/assets/photos as 1920px WebP;
 * next/image re-encodes them to AVIF/WebP at the width actually needed, so a
 * phone never downloads the desktop file.
 *
 * `sizes` is required in practice — without it next/image assumes 100vw and
 * hands a phone a far larger image than the slot it's going into.
 */
export function Photo({
  name,
  alt,
  className,
  imgClassName,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  ratio = "16/9",
}: {
  /** Basename in /public/assets/photos, without extension. */
  name: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  ratio?: string;
}) {
  const blur = photoBlur[name];
  return (
    <div
      className={cn("relative overflow-hidden bg-ink-800", className)}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={`/assets/photos/${name}.webp`}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        placeholder={blur ? "blur" : undefined}
        blurDataURL={blur}
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}
