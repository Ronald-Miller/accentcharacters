export const site = {
  name: "AccentLab",
  tagline: "Accent letters, made effortless.",
  url: "https://www.accentlab.app",
  title:
    "Accent Letters — Copy & Paste Accented Letters (à, á, â, ã, ä, å, ç, é, ñ) | AccentLab",
  description:
    "Instantly copy 600+ accented letters — á, é, ç, ñ, ü and every accented variation of A–Z. Free one-click copy & paste tool with ALT codes, Unicode values HTML entities and typing guides.",
  ogDescription:
    "One click. 600+ accented letters. Copy á, é, ç, ñ, ü — every accented letter of the alphabet, with ALT codes and typing shortcuts.",
  email: "hello@accentlab.app",
};

export function letterUrl(letter: string) {
  return `/letters/${letter.toLowerCase()}`;
}

export const accentTypeSlugs = [
  { id: "acute", mark: "´", name: "Acute" },
  { id: "grave", mark: "`", name: "Grave" },
  { id: "circumflex", mark: "^", name: "Circumflex" },
  { id: "tilde", mark: "~", name: "Tilde" },
  { id: "diaeresis", mark: "¨", name: "Diaeresis / Umlaut" },
  { id: "cedilla", mark: "¸", name: "Cedilla" },
  { id: "macron", mark: "¯", name: "Macron" },
  { id: "caron", mark: "ˇ", name: "Caron" },
  { id: "ring", mark: "˚", name: "Ring Above" },
  { id: "ogonek", mark: "˛", name: "Ogonek" },
] as const;

/** Publication dates shown across the site (content lifecycle signals). */
export const dates = {
  published: "2025-09-15",
  publishedLabel: "September 15, 2025",
  modified: "2026-01-20",
  modifiedLabel: "January 20, 2026",
};

export interface Author {
  slug: string;
  name: string;
  role: string;
  avatar: string;
  shortBio: string;
  bio: string[];
  expertise: string[];
  credentials: string[];
}

export const AUTHOR: Author = {
  slug: "adrian-voss",
  name: "Adrian Voss",
  role: "Founder, Editor & Unicode Typography Researcher",
  avatar: "/images/author.jpg",
  shortBio:
    "Typographer and keyboard-input researcher who has spent over a decade cataloguing how the world writes — and how to type it.",
  bio: [
    "Adrian Voss is the founder and editor of AccentLab. He began his career in digital typesetting in 2013, building font workflows for multilingual publishing houses, where he first ran into the daily problem this site solves: accented letters are everywhere in the world’s writing, but nowhere on an English keyboard.",
    "Since then he has catalogued the Latin-script diacritics used by more than 120 languages, audited how Windows, macOS, iOS and Android handle accent input, and tested every ALT code and keyboard shortcut published on AccentLab against the current versions of Microsoft Word, Windows 11 and macOS.",
    "Every reference table on this site is compiled directly from the Unicode Standard’s official character database, then verified by hand-typing each code on physical hardware. Adrian reviews and dates every page himself — if something here fails on your machine, he wants to hear about it.",
  ],
  expertise: [
    "Unicode Standard & Latin Extended character sets",
    "Windows ALT codes & numeric-keypad input",
    "macOS Option-key and dead-key accent entry",
    "Microsoft Word accent shortcuts",
    "Multilingual typography, orthography & transliteration",
    "Slavic, Romance, Baltic, Turkic & Vietnamese writing systems",
  ],
  credentials: [
    "10+ years in digital typography & editorial tooling",
    "Compiled and manually verified 600+ ALT code entries",
    "Maintainer of a private corpus of 120+ Latin-script orthographies",
    "Regular contributor to open-source keyboard-layout projects",
  ],
};
