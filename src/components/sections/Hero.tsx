"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { Container } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { SplitText } from "@/components/motion/SplitText";
import { EASE_OUT } from "@/lib/motion";
import { hero } from "@/data/content";

const VIDEO = "/hero-loop.mp4";
const POSTER = "/hero-poster.webp";

/** Masked left and bottom so the footage dissolves into the page ground. */
const MASK =
  "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.25) 26%, rgba(0,0,0,0.85) 58%, #000 78%), " +
  "linear-gradient(to top, transparent 0%, #000 26%)";

/**
 * Hero.
 *
 * Section 09 asks for a cinematic image or video. It is footage now, muted and
 * looping, which does the one thing a still cannot: show the chalk moving.
 *
 * Under reduced motion the video is not mounted at all and the poster frame
 * stands in. Autoplaying video is the clearest case there is for honouring
 * that preference, and merely pausing one still leaves it decoded and holding
 * memory, so it is better not to render it.
 *
 * Capped at 750px rather than filling the viewport. A hero that always eats
 * the whole screen pushes the real content below the fold on every monitor.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative isolate h-[min(750px,100svh)] overflow-hidden">
      <motion.div
        style={{
          ...(reduced ? {} : { y: mediaY }),
          maskImage: MASK,
          maskComposite: "intersect",
          WebkitMaskImage: MASK,
          WebkitMaskComposite: "source-in",
        }}
        className="absolute inset-0 -z-20 scale-105"
      >
        {reduced ? (
          <Image src={POSTER} alt="" fill priority sizes="100vw" className="object-cover" />
        ) : (
          <video
            className="size-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={POSTER}
            aria-hidden
          >
            <source src={VIDEO} type="video/mp4" />
          </video>
        )}
        {/* Grain, matching every photograph on the page. */}
        <span aria-hidden className="pointer-events-none absolute inset-0 grain-layer" />
      </motion.div>

      {/* Contrast insurance over the right of the frame. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-900 via-ink-900/45 to-ink-900/60"
      />

      <Container className="relative flex h-full flex-col justify-end pb-14 pt-28 md:pb-16">
        <motion.div style={reduced ? undefined : { y: copyY, opacity: fade }}>
          <motion.span
            className="label block text-bone/70"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {hero.eyebrow}
          </motion.span>

          <SplitText
            as="h1"
            lines={hero.headline}
            animateOnLoad
            delay={0.18}
            gap={0.08}
            className="mt-4 text-[clamp(2.75rem,9vw,6.5rem)] leading-[0.94] tracking-[-0.02em]"
          />

          <motion.p
            className="mt-5 max-w-[40ch] text-base text-bone/75 md:text-lg"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.55 }}
          >
            {hero.sub}
          </motion.p>

          <motion.div
            className="mt-7 flex flex-wrap items-center gap-3"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.68 }}
          >
            <ButtonLink href={hero.primary.href} variant="green" size="lg">
              {hero.primary.label}
              <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-1">
                &rarr;
              </span>
            </ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="outline" size="lg">
              {hero.secondary.label}
            </ButtonLink>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
