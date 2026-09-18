import { Anton, DM_Sans } from "next/font/google";

/**
 * Section 06 of the brief: condensed grotesk display, clean modern sans body.
 *
 * Anton is the heaviest true condensed grotesk on Google Fonts and matches
 * the specimen in the brief. It ships one weight, which suits it: the display
 * face is meant to shout in exactly one voice.
 *
 * DM Sans is named in the brief's body list. Inter was the other option and
 * is the more common default, which is reason enough to take the other one.
 */
export const display = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const fontVariables = `${display.variable} ${body.variable}`;
