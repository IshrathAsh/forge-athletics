import { Container, Section } from "@/components/ui/Layout";
import { SplitText } from "@/components/motion/SplitText";
import { Reveal } from "@/components/motion/Reveal";
import { manifesto } from "@/data/content";

/**
 * The philosophy block, and the one place the page inverts to Bone White.
 *
 * Section 4.11 of good practice says a page holds one theme and does not
 * flip between sections. This is the documented exception: a single
 * deliberate colour block, used once, as a composition device. It lands here
 * because the manifesto is the one moment the brand speaks rather than
 * demonstrates, and the inversion makes the reader stop.
 *
 * Every other section on the page is black.
 */
export function Manifesto() {
  return (
    <Section id="philosophy" spacing="base" className="bg-bone text-forge-black">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          <div>
            <Reveal>
              <span className="label text-forge-black/45">{manifesto.kicker}</span>
            </Reveal>

            <SplitText
              lines={manifesto.lines}
              gap={0.08}
              className="mt-4 text-[clamp(2.5rem,6.5vw,5rem)] leading-[0.94] tracking-[-0.02em]"
            />
          </div>

          <div className="flex flex-col justify-end gap-6">
            {manifesto.body.map((para, i) => (
              <Reveal key={i} delay={0.06 * i}>
                <p className="max-w-[46ch] text-lg leading-relaxed text-forge-black/70">{para}</p>
              </Reveal>
            ))}

            <Reveal delay={0.16}>
              {/* The one green mark on this screen. */}
              <p className="mt-2 border-l-2 border-forge-green pl-4 font-[family-name:var(--font-display)] text-xl uppercase leading-tight tracking-[-0.01em]">
                {manifesto.note}
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
