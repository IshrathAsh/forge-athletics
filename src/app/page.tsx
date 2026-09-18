import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Programs } from "@/components/sections/Programs";
import { Stats } from "@/components/sections/Stats";
import { Coaches } from "@/components/sections/Coaches";
import { Facility } from "@/components/sections/Facility";
import { Schedule } from "@/components/sections/Schedule";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";

/**
 * The landing page, in the order section 08 lists for Home: hero, philosophy,
 * training programs, statistics, coaches, facility, testimonials, final CTA.
 * Schedule is pulled in ahead of testimonials because it is the last piece of
 * practical information a visitor needs before being asked to commit.
 *
 * No two adjacent sections share a layout family: full-bleed hero, inverted
 * two-column manifesto, hover-linked list, stat row, portrait grid,
 * horizontal strip, tabbed table, quote grid, closing statement.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Programs />
      <Stats />
      <Coaches />
      <Facility />
      <Schedule />
      <Testimonials />
      <FinalCta />
    </>
  );
}
