import { LETTERS, type AccentChar, type LetterGroup } from "@/data/letters";

export { LETTERS };
export type { AccentChar, LetterGroup };

export const LETTERS_BY_ID: Record<string, LetterGroup> = Object.fromEntries(
  LETTERS.map((g) => [g.letter, g]),
);

export const ALL_LETTERS = LETTERS.map((g) => g.letter);

export const TOTAL_CHARS = LETTERS.reduce((n, g) => n + g.chars.length, 0);

export function getLetter(letter: string): LetterGroup | undefined {
  return LETTERS_BY_ID[letter.toLowerCase()];
}

function byDec(a: AccentChar, b: AccentChar) {
  return a.dec - b.dec;
}

/** Lowercase forms of a group, sorted by code point. */
export function lowercaseOf(g: LetterGroup): AccentChar[] {
  return g.chars.filter((c) => c.kase === "lower").sort(byDec);
}

/** Uppercase forms of a group, sorted by code point. */
export function uppercaseOf(g: LetterGroup): AccentChar[] {
  return g.chars
    .filter((c) => c.kase === "upper" || c.kase === "caseless")
    .sort(byDec);
}

/**
 * A representative preview of a group: everyday lowercase accents first,
 * then capital forms — the characters people actually search for.
 */
export function featuredOf(g: LetterGroup, count = 14): AccentChar[] {
  const lower = lowercaseOf(g);
  const upper = uppercaseOf(g);
  return [...lower, ...upper].slice(0, count);
}

export function prevLetter(letter: string): string | undefined {
  const i = ALL_LETTERS.indexOf(letter);
  return i > 0 ? ALL_LETTERS[i - 1] : undefined;
}

export function nextLetter(letter: string): string | undefined {
  const i = ALL_LETTERS.indexOf(letter);
  return i >= 0 && i < ALL_LETTERS.length - 1 ? ALL_LETTERS[i + 1] : undefined;
}

/** Flat list of every character (for search / alt-code tables). */
export function allChars(): { letter: string; c: AccentChar }[] {
  const out: { letter: string; c: AccentChar }[] = [];
  for (const g of LETTERS) for (const c of g.chars) out.push({ letter: g.letter, c });
  return out;
}

/** The classic "copy headline" sample characters for a letter (used in titles). */
export function sampleGlyphs(g: LetterGroup, count = 4): string {
  const shows = featuredOf(g, count).map((c) => c.ch);
  return shows.join(" ");
}
