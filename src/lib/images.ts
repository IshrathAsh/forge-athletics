/**
 * Which photographs exist in /public.
 *
 * Per-file rather than one global switch: there are more image slots than
 * photographs, and a single flag would turn them all on and 404 the ones that
 * do not exist. Anything listed renders as a real next/image; anything else
 * falls back to the designed placeholder.
 */
export const AVAILABLE_IMAGES = new Set<string>([
  // Nothing shot yet. See IMAGE-BRIEF.md.
]);

export function hasImage(src: string) {
  return AVAILABLE_IMAGES.has(src);
}
