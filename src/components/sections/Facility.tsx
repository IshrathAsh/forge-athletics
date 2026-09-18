"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Container, Section, SectionHead } from "@/components/ui/Layout";
import { Frame } from "@/components/ui/Frame";
import { facility } from "@/data/content";

/**
 * Facility gallery. Section 09 asks for a horizontal scroll with parallax.
 *
 * This is a native scroll container, not a scroll hijack. A pinned section
 * that converts vertical wheel input into horizontal movement traps the
 * page, breaks the scrollbar, and is hostile on a trackpad. A real
 * overflow-x strip supports wheel, trackpad, touch, drag and the keyboard
 * for free, and the parallax comes from each frame drifting inside its own
 * fixed window as the section passes.
 */
export function Facility() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <Section id="facility" ref={ref} spacing="base" className="overflow-hidden">
      <Container>
        <SectionHead
          index="03 / Facility"
          title="Eleven thousand square feet of it."
          intro="Jubilee Hills. Built out in 2018 and re-equipped in 2024. No mirrors on the strength floor."
        />
      </Container>

      {/* Full bleed from the left gutter so the strip runs off the edge,
          which is what signals that it scrolls. */}
      <div className="mt-12 overflow-x-auto no-scrollbar">
        <ul className="flex w-max gap-4 px-5 md:gap-6 md:px-10 lg:px-14 xl:px-20">
          {facility.map((item) => (
            <li key={item.name} className="w-[78vw] shrink-0 sm:w-[46vw] lg:w-[32vw] xl:w-[26vw]">
              <div className="overflow-hidden">
                <motion.div style={reduced ? undefined : { y: drift }} className="scale-110">
                  <Frame
                    src={item.image}
                    alt={`${item.name} at Forge Athletics`}
                    label=""
                    aspect="aspect-[4/5]"
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 30vw"
                  />
                </motion.div>
              </div>

              <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-ink-600 pt-3">
                <h3 className="text-lg leading-none">{item.name}</h3>
              </div>
              <p className="mt-1.5 text-sm text-bone-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>

    </Section>
  );
}
