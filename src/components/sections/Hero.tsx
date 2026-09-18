"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Container } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { SplitText } from "@/components/motion/SplitText";
import { EASE_OUT } from "@/lib/motion";
import { brand, hero } from "@/data/content";

/**
 * Hero.
 *
 * Section 09 asks for a cinematic image, bold typography and clear CTAs;
 * section 11 supplies the composition. The photograph is full bleed and the
 * type sits on it, which is the only arrangement that reads cinematic. A
 * split layout with the image in a box next to the copy would look like a
 * product page.
 *
 * Text legibility is not left to chance over an image whose exact contents
 * are unknown: a vertical scrim and a left-weighted horizontal one sit
 * between the photograph and the copy, so the headline holds contrast
 * against any frame that lands here.
 *
 * Parallax is 14% of travel. Section 10 asks for subtle parallax and bans
 * slow transitions, so the image drifts rather than slides.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden">
      <motion.div style={reduced ? undefined : { y: imageY }} className="absolute inset-0 -z-20 scale-110">
        <Frame
          src="/hero.jpg"
          alt="A lifter chalking their hands under a single overhead light on the strength floor"
          label="Hero frame"
          aspect="h-full w-full"
          priority
          sizes="100vw"
          className="h-full"
        />
      </motion.div>

      {/* Scrims. Contrast insurance, not decoration. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-900 via-ink-900/55 to-ink-900/70" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-900/90 via-ink-900/40 to-transparent" />

      <Container className="relative flex min-h-[100svh] flex-col justify-end pb-32 pt-32 md:pb-28">
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
            className="mt-5 text-[clamp(3.5rem,13vw,11rem)] leading-[0.82] tracking-[-0.02em]"
          />

          <motion.p
            className="mt-7 max-w-[42ch] text-lg text-bone/75 md:text-xl"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.55 }}
          >
            {hero.sub}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
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

      {/* Pillars, pinned to the bottom edge as a technical strip. */}
      <motion.div
        className="absolute inset-x-0 bottom-0 border-t border-ink-600/60 backdrop-blur-sm"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.85 }}
      >
        <Container>
          <ul className="flex items-center gap-x-8 overflow-x-auto py-4 no-scrollbar">
            {brand.pillars.map((pillar) => (
              <li key={pillar} className="label shrink-0 text-bone/50">
                {pillar}
              </li>
            ))}
            <li className="label ml-auto hidden text-bone/50 md:block">Est. {brand.established}</li>
          </ul>
        </Container>
      </motion.div>
    </section>
  );
}
