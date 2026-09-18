"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { ComponentProps, ReactNode } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { cn } from "@/lib/utils";

type Variant = "green" | "outline" | "bone";
type Size = "md" | "lg";

/**
 * Green is the primary action and nothing else. The brief's note on the
 * accent, "a spark, not a flood", is enforced here by only ever putting one
 * green button on a screen; everything secondary is an outline.
 */
const VARIANTS: Record<Variant, string> = {
  green: "bg-forge-green text-forge-black hover:bg-bone",
  outline: "border border-ink-500 text-bone hover:border-bone hover:bg-bone/5",
  bone: "bg-bone text-forge-black hover:bg-forge-green",
};

const SIZES: Record<Size, string> = {
  md: "min-h-12 px-6 text-xs",
  lg: "min-h-14 px-8 text-sm",
};

const BASE =
  "group relative inline-flex items-center justify-center gap-3 " +
  "font-medium uppercase tracking-[0.16em] " +
  "transition-[background-color,border-color,color] duration-150 " +
  "cursor-pointer select-none whitespace-nowrap rounded-none " +
  "disabled:opacity-40 disabled:pointer-events-none";

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Off for full-width buttons, where the pull fights the layout. */
  magnetic?: boolean;
};

type Drop<T> = Omit<
  T,
  "onAnimationStart" | "onAnimationEnd" | "onDragStart" | "onDragEnd" | "onDrag" | "style"
>;

function usePress() {
  const reduced = useReducedMotion();
  return reduced ? {} : { whileTap: { scale: 0.97 }, transition: { duration: 0.1 } };
}

export function Button({
  variant = "green",
  size = "md",
  className,
  children,
  magnetic = true,
  ...props
}: Common & Drop<ComponentProps<"button">>) {
  const press = usePress();
  const el = (
    <motion.button className={cn(BASE, VARIANTS[variant], SIZES[size], className)} {...press} {...props}>
      {children}
    </motion.button>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}

export function ButtonLink({
  variant = "green",
  size = "md",
  className,
  children,
  magnetic = true,
  href,
  ...props
}: Common & Drop<ComponentProps<typeof Link>>) {
  const press = usePress();
  const el = (
    <motion.span {...press} className="inline-block">
      <Link href={href} className={cn(BASE, VARIANTS[variant], SIZES[size], className)} {...props}>
        {children}
      </Link>
    </motion.span>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
