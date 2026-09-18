"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { brand } from "@/data/content";

const LINKS = [
  { href: "#training", label: "Training" },
  { href: "#coaches", label: "Coaches" },
  { href: "#facility", label: "Facility" },
  { href: "#schedule", label: "Schedule" },
] as const;

export function Nav() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  // Tracked on a MotionValue so it does not re-render on every frame.
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 40));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-200",
          solid ? "border-b border-ink-600 bg-ink-900/85 backdrop-blur-md" : "border-b border-transparent",
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-6 md:h-20">
            <Link href="/" className="flex items-baseline" aria-label={`${brand.full}, home`}>
              <span className="font-[family-name:var(--font-display)] text-2xl uppercase leading-none tracking-[-0.01em]">
                {brand.name}
              </span>
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative text-xs font-medium uppercase tracking-[0.16em] text-bone-muted transition-colors duration-150 hover:text-bone"
                >
                  {link.label}
                  <span
                    aria-hidden
                    className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-forge-green transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <ButtonLink href="#contact" variant="outline" size="md" className="hidden sm:inline-flex">
                Start training
              </ButtonLink>

              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                className="inline-flex size-11 items-center justify-center text-bone lg:hidden"
              >
                <span aria-hidden className="flex flex-col gap-1.5">
                  <span className="block h-px w-6 bg-current" />
                  <span className="block h-px w-6 bg-current" />
                </span>
              </button>
            </div>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[100] bg-ink-900 lg:hidden"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <Container className="flex h-full flex-col">
              <div className="flex h-16 items-center justify-between md:h-20">
                <span className="font-[family-name:var(--font-display)] text-2xl uppercase leading-none">
                  {brand.name}
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex size-11 items-center justify-center text-bone"
                >
                  <span aria-hidden className="relative block size-5">
                    <span className="absolute top-1/2 block h-px w-5 rotate-45 bg-current" />
                    <span className="absolute top-1/2 block h-px w-5 -rotate-45 bg-current" />
                  </span>
                </button>
              </div>

              <nav aria-label="Mobile" className="mt-10 flex flex-col">
                {LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-ink-600 py-5 font-[family-name:var(--font-display)] text-4xl uppercase leading-none"
                    initial={reduced ? false : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.3, ease: EASE_OUT }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto pb-10">
                <ButtonLink
                  href="#contact"
                  variant="green"
                  size="lg"
                  magnetic={false}
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Start training
                </ButtonLink>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
