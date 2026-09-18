"use client";

import { Container, Section } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { SplitText } from "@/components/motion/SplitText";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Closing section. Section 09 asks for a strong closing.
 *
 * The headline runs to the largest type on the page after the hero, and the
 * green button is the only green on this screen. Everything below it is
 * footer, so this is the last thing that asks for anything.
 */
export function FinalCta() {
  return (
    <Section id="contact" spacing="loose" className="border-t border-ink-600">
      <Container>
        <div className="flex flex-col items-start">
          <span className="label">06 / Start</span>

          <SplitText
            lines={["Come in", "and lift", "something."]}
            gap={0.07}
            className="mt-5 text-[clamp(3rem,11vw,9rem)] leading-[0.84] tracking-[-0.02em]"
          />

          <Reveal delay={0.12}>
            <p className="mt-8 max-w-[48ch] text-lg text-bone-muted">
              First session is an assessment. Ninety minutes, no contract, and an honest answer about
              where you are and how long the next part takes.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href="mailto:train@forgeathletics.in" variant="green" size="lg">
                Book an assessment
                <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-1">
                  &rarr;
                </span>
              </ButtonLink>
              <ButtonLink href="tel:+914023548800" variant="outline" size="lg">
                Call the floor
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
