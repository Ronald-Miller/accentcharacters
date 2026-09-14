/**
 * Generates src/data/letters.ts
 * Scans Latin Unicode blocks, derives accented-letter groups per base letter
 * (a–z), builds human-readable names from NFD decompositions, and attaches
 * code point, decimal ALT code and HTML entity metadata.
 */

const RANGES = [
  [0x00c0, 0x00ff], // Latin-1 Supplement
  [0x0100, 0x017f], // Latin Extended-A
  [0x0180, 0x024f], // Latin Extended-B (+ IPA ext.)
  [0x1d00, 0x1d7f], // Phonetic Extensions
  [0x1e00, 0x1eff], // Latin Extended Additional
  [0x2c60, 0x2c7f], // Latin Extended-C
  [0xa720, 0xa7ff], // Latin Extended-D
];

const DENYLIST = new Set([0x00d7, 0x00f7]); // × ÷ (symbols, not letters)

// Combining mark code → accent display name
const MARKS = {
  0x0300: "Grave",
  0x0301: "Acute",
  0x0302: "Circumflex",
  0x0303: "Tilde",
  0x0304: "Macron",
  0x0305: "Overline",
  0x0306: "Breve",
  0x0307: "Dot Above",
  0x0308: "Diaeresis",
  0x0309: "Hook Above",
  0x030a: "Ring Above",
  0x030b: "Double Acute",
  0x030c: "Caron",
  0x030f: "Double Grave",
  0x0311: "Inverted Breve",
  0x0313: "Comma Above",
  0x0314: "Reversed Comma Above",
  0x0323: "Dot Below",
  0x0324: "Diaeresis Below",
  0x0325: "Ring Below",
  0x0326: "Comma Below",
  0x0327: "Cedilla",
  0x0328: "Ogonek",
  0x0329: "Vertical Line Below",
  0x032b: "Inverted Double Arch Below",
  0x032d: "Circumflex Below",
  0x032e: "Breve Below",
  0x0330: "Tilde Below",
  0x0331: "Macron Below",
  0x0332: "Low Line",
  0x0335: "Stroke",
  0x0336: "Stroke",
  0x0337: "Short Stroke Overlay",
  0x0338: "Stroke",
  0x0361: "Double Inverted Breve",
};

// Standalone letters with no canonical decomposition: cp → [baseLetter, displayName]
const SPECIALS = {
  0x00c6: ["a", "AE"],
  0x00e6: ["a", "AE"],
  0x00d0: ["d", "Eth"],
  0x00f0: ["d", "Eth"],
  0x00de: ["t", "Thorn"],
  0x00fe: ["t", "Thorn"],
  0x00df: ["s", "Sharp S"],
  0x1e9e: ["s", "Sharp S"],
  0x0130: ["i", "I with Dot Above"],
  0x0131: ["i", "Dotless I"],
  0x014a: ["n", "Eng"],
  0x014b: ["n", "Eng"],
  0x0152: ["o", "OE"],
  0x0153: ["o", "OE"],
  0x023a: ["a", "A with Stroke"],
  0x023c: ["c", "C with Stroke"],
  0x023f: ["s", "S with Swash Tail"],
  0x0240: ["z", "Z with Swash Tail"],
  0x01c4: ["d", "DZ with Caron"],
  0x01c5: ["d", "Dz with Caron"],
  0x01c6: ["d", "Dz with Caron"],
  0x01f1: ["d", "DZ"],
  0x01f2: ["d", "Dz"],
  0x01f3: ["d", "Dz"],
  0x01c7: ["l", "LJ"],
  0x01c8: ["l", "Lj"],
  0x01c9: ["l", "Lj"],
  0x01ca: ["n", "NJ"],
  0x01cb: ["n", "Nj"],
  0x01cc: ["n", "Nj"],
  0x0132: ["i", "IJ"],
  0x0133: ["i", "IJ"],
  0x0180: ["b", "B with Stroke"],
  0x0182: ["b", "B with Topbar"],
  0x0183: ["b", "B with Topbar"],
  0x0186: ["c", "Open O-like C"],
  0x0187: ["c", "C with Hook"],
  0x0188: ["c", "C with Hook"],
  0x018d: ["d", "Turned Delta"],
  0x018e: ["e", "Reversed E"],
  0x018f: ["e", "Schwa"],
  0x0190: ["e", "Open E"],
  0x0192: ["f", "F with Hook"],
  0x0195: ["h", "HV"],
  0x0196: ["i", "Iota"],
  0x0199: ["k", "K with Hook"],
  0x019a: ["l", "L with Bar"],
  0x019e: ["n", "N with Long Right Leg"],
  0x01a2: ["g", "Gha"],
  0x01a3: ["g", "Gha"],
  0x01a4: ["p", "P with Hook"],
  0x01a5: ["p", "P with Hook"],
  0x01ab: ["t", "T with Palatal Hook"],
  0x01ad: ["t", "T with Hook"],
  0x01ae: ["t", "T with Retroflex Hook"],
  0x01b2: ["v", "Script V"],
  0x0251: ["a", "Alpha"],
  0x0252: ["a", "Turned Alpha"],
  0x0253: ["b", "B with Hook"],
  0x0255: ["c", "C with Curl"],
  0x0257: ["d", "D with Hook"],
  0x0259: ["e", "Schwa"],
  0x025b: ["e", "Open E"],
  0x0260: ["g", "G with Hook"],
  0x0261: ["g", "Script G"],
  0x0263: ["g", "Gamma"],
  0x0266: ["h", "H with Hook"],
  0x0268: ["i", "I with Stroke"],
  0x026a: ["i", "Small Capital I"],
  0x026f: ["m", "Turned M"],
  0x0272: ["n", "N with Left Hook"],
  0x0275: ["o", "Barred O"],
  0x0278: ["p", "Phi"],
  0x0280: ["r", "Small Capital R"],
  0x0282: ["s", "S with Hook"],
  0x0283: ["s", "Esh"],
  0x0289: ["u", "U Bar"],
  0x028b: ["v", "V with Hook"],
  0x028c: ["v", "Turned V"],
  0x0292: ["z", "Ezh"],
  0x0299: ["b", "Small Capital B"],
  0x029f: ["l", "Small Capital L"],
  0x02a3: ["d", "DZ Digraph"],
  0x02a5: ["d", "DZ Digraph with Curl"],
  0x02a9: ["h", "Feng Digraph"],
  0x1d7d: ["p", "P with Stroke"],
  0x0194: ["g", "Gamma"],
  0x0184: ["h", "H with Stroke"],
  0x0185: ["h", "H with Stroke"],
  0x01b6: ["z", "Z with Stroke"],
  0x024e: ["y", "Y with Stroke"],
  0x024f: ["y", "Y with Stroke"],
  0x2c7e: ["s", "S with Swash Tail"],
  0x2c7f: ["z", "Z with Swash Tail"],
  // Non-decomposable stroke / bar letters
  0x00d8: ["o", "O with Stroke"],
  0x00f8: ["o", "O with Stroke"],
  0x0110: ["d", "D with Stroke"],
  0x0111: ["d", "D with Stroke"],
  0x0126: ["h", "H with Stroke"],
  0x0127: ["h", "H with Stroke"],
  0x0141: ["l", "L with Stroke"],
  0x0142: ["l", "L with Stroke"],
  0x0166: ["t", "T with Stroke"],
  0x0167: ["t", "T with Stroke"],
  0x2c65: ["a", "A with Stroke"],
  0x2c66: ["t", "T with Stroke"],
  0x023e: ["t", "T with Diagonal Stroke"],
  0x024c: ["r", "R with Stroke"],
  0x024d: ["r", "R with Stroke"],
  0x2c60: ["l", "L with Double Bar"],
  0x2c61: ["l", "L with Double Bar"],
  0x2c62: ["l", "L with Middle Tilde"],
  0x2c63: ["p", "P with Stroke"],
  0x2c64: ["r", "R with Tail"],
  0x023b: ["c", "C with Stroke"],
  0x023d: ["l", "L with Bar"],
  0x0246: ["e", "E with Stroke"],
  0x0247: ["e", "E with Stroke"],
  0x0248: ["j", "J with Stroke"],
  0x0249: ["j", "J with Stroke"],
  // Q group
  0x024a: ["q", "Q with Hook Tail"],
  0x024b: ["q", "Q with Hook Tail"],
  0x02a0: ["q", "Q with Hook"],
  0xa757: ["q", "Q with Stroke"],
  0xa758: ["q", "Q with Diagonal Stroke"],
  // Additional cased letters without canonical decomposition
  0x013f: ["l", "L with Middle Dot"],
  0x0140: ["l", "L with Middle Dot"],
  0x0149: ["n", "N Preceded by Apostrophe"],
  0x017f: ["s", "Long S"],
  0x0181: ["b", "B with Hook"],
  0x0189: ["d", "African D"],
  0x018a: ["d", "D with Hook"],
  0x018b: ["d", "D with Topbar"],
  0x018c: ["d", "D with Topbar"],
  0x0191: ["f", "F with Hook"],
  0x0193: ["g", "G with Hook"],
  0x0196: ["i", "I with Stroke"],
  0x0198: ["k", "K with Hook"],
  0x019b: ["l", "Lambda with Stroke"],
  0x019c: ["m", "Turned M"],
  0x019d: ["n", "N with Left Hook"],
  0x019f: ["o", "O with Middle Tilde"],
  0x01a6: ["r", "Letter YR"],
  0x01a9: ["s", "Esh"],
  0x01ac: ["t", "T with Hook"],
  0x01b1: ["u", "Upsilon"],
  0x01b3: ["y", "Y with Hook"],
  0x01b4: ["y", "Y with Hook"],
  0x01b5: ["z", "Z with Stroke"],
  0x01b7: ["z", "Ezh"],
  0x01bf: ["w", "Wynn"],
  0x01dd: ["e", "Turned E"],
  0x01e4: ["g", "G with Stroke"],
  0x01e5: ["g", "G with Stroke"],
  0x01ee: ["z", "Ezh with Caron"],
  0x01ef: ["z", "Ezh with Caron"],
  0x01f7: ["w", "Wynn"],
  0x01fe: ["o", "O with Stroke and Acute"],
  0x01ff: ["o", "O with Stroke and Acute"],
  0x021c: ["y", "Yogh"],
  0x021d: ["y", "Yogh"],
  0x0220: ["n", "N with Long Right Leg"],
  0x0224: ["z", "Z with Hook"],
  0x0225: ["z", "Z with Hook"],
  0x0243: ["b", "B with Stroke"],
  0x0244: ["u", "U Bar"],
  0x0245: ["v", "Turned V"],
  0x01a7: ["s", "Tone Two"],
  0x01a8: ["s", "Tone Two"],
};

// Non-decomposing characters we deliberately skip (quality > quantity)
const SKIP = new Set([0x0222, 0x0223, 0x2c7a, 0x2c7b]);

function caseOf(ch) {
  if (ch.toUpperCase() === ch && ch.toLowerCase() !== ch) return "upper";
  if (ch.toLowerCase() === ch && ch.toUpperCase() !== ch) return "lower";
  return "caseless";
}

function caseLabel(c) {
  return c === "upper" ? "Capital" : "Small";
}

function analyze(cp) {
  if (DENYLIST.has(cp) || SKIP.has(cp)) return null;
  const ch = String.fromCodePoint(cp);
  const kase = caseOf(ch);
  // must behave like a letter OR be whitelisted in SPECIALS
  const sp = SPECIALS[cp];
  if (ch.toUpperCase() === ch.toLowerCase() && !sp) return null;

  if (sp) {
    return {
      ch,
      letter: sp[0],
      name: `Latin ${caseLabel(kase)} Letter ${sp[1]}`,
      case: kase,
    };
  }

  const nfd = ch.normalize("NFD");
  if (nfd.length === 1) return null;

  const base = nfd[0];
  const baseCp = base.codePointAt(0);
  let letter = null;
  let baseName = null;
  if (baseCp >= 0x61 && baseCp <= 0x7a) {
    letter = String.fromCharCode(baseCp);
    baseName = letter.toUpperCase();
  } else if (baseCp >= 0x41 && baseCp <= 0x5a) {
    letter = String.fromCharCode(baseCp + 32);
    baseName = String.fromCharCode(baseCp);
  } else if (base === "æ") {
    letter = "a";
    baseName = "AE";
  } else if (base === "Æ") {
    letter = "a";
    baseName = "AE";
  } else if (base === "œ") {
    letter = "o";
    baseName = "OE";
  } else if (base === "Œ") {
    letter = "o";
    baseName = "OE";
  } else if (base === "Ð" || base === "ð") {
    letter = "d";
    baseName = "Eth";
  } else if (base === "Þ" || base === "þ") {
    letter = "t";
    baseName = "Thorn";
  } else {
    return null;
  }

  const marks = [];
  for (const c of nfd.slice(1)) {
    const m = MARKS[c.codePointAt(0)];
    if (!m) return null;
    marks.push(m);
  }
  const dedup = [...new Set(marks)];
  const accent = dedup.join(" and ");
  return {
    ch,
    letter,
    name: `Latin ${caseLabel(kase)} Letter ${baseName} with ${accent}`,
    case: kase,
  };
}

const groups = new Map(); // letter -> entries []
for (const [start, end] of RANGES) {
  for (let cp = start; cp <= end; cp++) {
    const a = analyze(cp);
    if (!a) continue;
    const dec = a.ch.codePointAt(0);
    const entry = {
      ch: a.ch,
      name: a.name,
      code: `U+${dec.toString(16).toUpperCase().padStart(4, "0")}`,
      dec,
      html: `&#${dec};`,
      alt: `Alt + ${dec}`,
      kase: a.case,
    };
    if (!groups.has(a.letter)) groups.set(a.letter, []);
    groups.get(a.letter).push(entry);
  }
}

// Deduplicate per letter (e.g. Ⱥ vs auto) & sort
for (const [l, arr] of groups) {
  const seen = new Set();
  const out = [];
  for (const e of arr.sort((x, y) => x.dec - y.dec)) {
    if (seen.has(e.ch)) continue;
    seen.add(e.ch);
    out.push(e);
  }
  groups.set(l, out);
}

const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");
const data = LETTERS.filter((l) => groups.has(l)).map((letter) => ({
  letter,
  chars: groups.get(letter),
}));

const banner = `/**
 * AUTO-GENERATED by scripts/generate-letters.mjs — do not edit by hand.
 * Every accented-letter group (A–Z) with Unicode metadata,
 * decimal ALT codes and HTML entities.
 */

export type AccentCase = "lower" | "upper" | "caseless";

export interface AccentChar {
  /** The character itself, e.g. "á" */
  ch: string;
  /** Human readable Unicode-style name */
  name: string;
  /** Code point, e.g. "U+00E1" */
  code: string;
  /** Decimal code point */
  dec: number;
  /** HTML entity, e.g. "&#225;" */
  html: string;
  /** Windows ALT code, e.g. "Alt + 225" */
  alt: string;
  kase: AccentCase;
}

export interface LetterGroup {
  letter: string;
  chars: AccentChar[];
}

`;

const out =
  banner +
  "export const LETTERS: LetterGroup[] = " +
  JSON.stringify(data, null, 2) +
  ";\n";

import { writeFileSync } from "node:fs";
writeFileSync(new URL("../src/data/letters.ts", import.meta.url), out, "utf8");

const total = data.reduce((n, g) => n + g.chars.length, 0);
console.log(`Generated ${data.length} letter groups, ${total} characters.`);
console.log(
  "Sample:",
  JSON.stringify(
    [
      data.find((g) => g.letter === "a").chars.slice(0, 6),
      data.find((g) => g.letter === "c").chars.find((e) => e.ch === "ç"),
      data.find((g) => g.letter === "d").chars.find((e) => e.ch === "ð"),
      data.find((g) => g.letter === "e").chars.find((e) => e.ch === "ē"),
    ],
    null,
    1,
  ),
);
