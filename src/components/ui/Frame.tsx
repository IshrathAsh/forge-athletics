import Image from "next/image";
import { hasImage } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Every image on the site goes through here.
 *
 * Nothing is shot yet (see IMAGE-BRIEF.md), so a path with no file behind it
 * renders a designed placeholder rather than a broken box. The placeholder is
 * built to the brief's photography direction: near-black, a hard raking light
 * from one side, heavy grain. It reads as an unlit frame in a dark gym rather
 * than as a missing asset.
 *
 * The aspect box is identical in both states, so listing a file in
 * lib/images.ts swaps that slot to a real photograph without shifting layout.
 */
export function Frame({
  src,
  alt,
  className,
  aspect = "aspect-[4/5]",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  label,
  focal,
  imgClassName,
  grain = true,
}: {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  /** Shown on the placeholder only. */
  label?: string;
  /** Tailwind object-position, for cropping a shared photograph. */
  focal?: string;
  /** Extra classes on the image itself, for filters such as grayscale. */
  imgClassName?: string;
  /** Turn the grain off. On everywhere by default. */
  grain?: boolean;
}) {
  if (hasImage(src)) {
    return (
      <div className={cn("relative overflow-hidden bg-ink-850", aspect, className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", focal, imgClassName)}
        />
        {grain ? <span aria-hidden className="pointer-events-none absolute inset-0 z-10 grain-layer" /> : null}
      </div>
    );
  }

  return (
    <div
      className={cn("relative overflow-hidden bg-ink-850", aspect, className)}
      role="img"
      aria-label={alt}
    >
      {/* Raking light from the upper left, as specified in section 07. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_18%_0%,#242424_0%,#141414_42%,#0a0a0a_100%)]" />

      {/* Film grain. Keeps the empty frame from reading as flat dead space. */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* An explicit empty label suppresses the caption. Used where the frame
          is scaled for parallax, or where the call site draws its own title. */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-end gap-1 p-4",
          label === "" && "hidden",
        )}
      >
        <span className="label text-bone-dim">Photography pending</span>
        {label ? (
          <span className="font-[family-name:var(--font-display)] text-lg uppercase leading-none text-bone/45">
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}
