import type { ReactNode, Ref } from "react";
import { cn } from "@/lib/utils";

/** Container and Section own every page-level spacing decision. */
export function Container({
  children,
  className,
  size = "page",
}: {
  children: ReactNode;
  className?: string;
  size?: "page" | "prose" | "full";
}) {
  return (
    <div
      className={cn(
        size !== "full" && "mx-auto w-full px-5 md:px-10 lg:px-14 xl:px-20",
        size === "page" && "max-w-[96rem]",
        size === "prose" && "max-w-[44rem]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  spacing = "base",
  ref,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  spacing?: "tight" | "base" | "loose" | "none";
  ref?: Ref<HTMLElement>;
}) {
  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        // Tightened to bring sections toward a single screen. A hard
        // max-height is not used: it would clip the schedule and the facility
        // table rather than compress them.
        spacing === "tight" && "py-10 md:py-12",
        spacing === "base" && "py-14 md:py-20",
        spacing === "loose" && "py-20 md:py-28",
        className,
      )}
    >
      {children}
    </section>
  );
}

/**
 * Section header in the brief's own idiom: a numbered technical label, then
 * a heavy condensed heading. The number is the label, which is why there is
 * no separate decorative eyebrow.
 */
export function SectionHead({
  index,
  title,
  intro,
  className,
  align = "left",
}: {
  index: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("flex flex-col gap-4", align === "center" && "items-center text-center", className)}>
      <span className="label">{index}</span>
      <h2 className="max-w-[18ch] text-[clamp(2.25rem,5vw,4rem)]">{title}</h2>
      {intro ? (
        <p className="max-w-[54ch] text-lg leading-relaxed text-bone-muted">{intro}</p>
      ) : null}
    </div>
  );
}
