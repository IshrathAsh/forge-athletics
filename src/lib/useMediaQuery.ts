"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribes to a media query.
 *
 * useSyncExternalStore so the server snapshot is explicit rather than guessed.
 * SSR returns false, so components fall back to their small-screen layout and
 * correct on mount. That direction is deliberate: a stacked layout shown
 * briefly on desktop is harmless, a pinned desktop layout on a phone is not.
 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
