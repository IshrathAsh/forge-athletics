"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Container, Section, SectionHead } from "@/components/ui/Layout";
import { Frame } from "@/components/ui/Frame";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { facility } from "@/data/content";
import { hasImage } from "@/lib/images";

/**
 * Facility.
 *
 * This was a five-card horizontal strip. Two of the five areas were
 * photographed, and a strip where three cards are placeholders reads as
 * broken rather than as pending. So the photographed areas carry the section
 * as a large pair, and all five are listed beneath as a spec table.
 *
 * If the remaining three are shot later, `photographed` picks them up
 * automatically and the pair becomes a strip again with no code change.
 *
 * Parallax is 6% inside a fixed window. Section 10 asks for subtle.
 */
export function Facility() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const photographed = facility.filter((item) => hasImage(item.image));

  return (
    <Section id="facility" ref={ref} spacing="base" className="overflow-hidden">
      <Container>
        <SectionHead
          index="03 / Facility"
          title="Eleven thousand square feet of it."
          intro="Jubilee Hills. Built out in 2018 and re-equipped in 2024. No mirrors on the strength floor."
        />
      </Container>

      {/* Atmosphere only. The table below carries the names and the detail,
          so captioning these would print the same strings twice. */}
      {photographed.length > 0 ? (
        <div className="mt-8 overflow-x-auto no-scrollbar">
          <ul className="flex w-max gap-4 px-5 md:gap-6 md:px-10 lg:px-14 xl:px-20">
            {photographed.map((item) => (
              <li
                key={item.name}
                className="w-[82vw] shrink-0 sm:w-[60vw] lg:w-[44vw] xl:w-[38vw]"
                aria-hidden
              >
                <div className="overflow-hidden">
                  <motion.div style={reduced ? undefined : { y: drift }} className="scale-110">
                    <Frame
                      src={item.image}
                      alt={`${item.name} at Forge`}
                      label=""
                      aspect="aspect-[16/9]"
                      sizes="(max-width: 640px) 82vw, (max-width: 1024px) 60vw, 42vw"
                    />
                  </motion.div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <Container>
        {/* All five areas, photographed or not. A spec table rather than more
            cards, so the section does not repeat its own layout. */}
        <RevealGroup className="mt-10 flex flex-col border-t border-ink-600" gap={0.05} as="ul">
          {facility.map((item) => (
            <RevealItem
              key={item.name}
              as="li"
              className="grid grid-cols-1 gap-x-8 gap-y-1 border-b border-ink-600 py-3.5 md:grid-cols-[16rem_1fr]"
            >
              <h3 className="text-lg leading-none">{item.name}</h3>
              <p className="text-sm text-bone-muted">{item.detail}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
