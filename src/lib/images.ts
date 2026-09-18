/**
 * Which photographs exist in /public.
 *
 * Per-file rather than one global switch: there are more image slots than
 * photographs, and a single flag would turn them all on and 404 the missing
 * ones. Listed here renders a real next/image; anything else falls back to
 * the designed dark placeholder.
 *
 * Sources are archived in /source-images, outside the deploy.
 */
export const AVAILABLE_IMAGES = new Set<string>([
  "/hero.webp",

  "/program-strength.webp",
  "/program-conditioning.webp",
  "/program-performance.webp",

  "/coach-arjun.webp",
  "/coach-nikhita.webp",
  "/coach-imran.webp",
  "/coach-meera.webp",

  "/facility-strength.webp",
  "/facility-platforms.webp",
]);

export function hasImage(src: string) {
  return AVAILABLE_IMAGES.has(src);
}
