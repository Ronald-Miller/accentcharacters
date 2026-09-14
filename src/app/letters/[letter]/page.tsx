import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MousePointerClick, ClipboardCopy } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CharGridLarge } from "@/components/CharGrid";
import { AzIndex } from "@/components/AzIndex";
import { FaqList } from "@/components/Faq";
import { Byline } from "@/components/Byline";
import { TocChips } from "@/components/TocChips";
import { TypeGuide } from "@/components/TypeGuide";
import { TechInfoGrid } from "@/components/TechInfo";
import {
  ALL_LETTERS,
  getLetter,
  lowercaseOf,
  nextLetter,
  prevLetter,
  uppercaseOf,
  type LetterGroup,
} from "@/lib/letters";
import { LETTER_NOTES, MAC_SHORTCUTS, WORD_SHORTCUTS, type Faq } from "@/lib/content";
import { AUTHOR, letterUrl, site } from "@/lib/site";
import { webPage } from "@/lib/schema";

interface Props {
  params: Promise<{ letter: string }>;
}

export function generateStaticParams() {
  return ALL_LETTERS.map((letter) => ({ letter }));
}

export const dynamicParams = false;

function firstLower(g: LetterGroup) {
  return lowercaseOf(g)[0];
}
function firstUpper(g: LetterGroup) {
  return uppercaseOf(g)[0];
}

function titleFor(g: LetterGroup): string {
  const l = lowercaseOf(g).slice(0, 3).map((c) => c.ch).join(" ");
  const u = uppercaseOf(g).slice(0, 3).map((c) => c.ch).join(" ");
  const samples = [l, u].filter(Boolean).join(" · ");
  return `${g.letter.toUpperCase()} with Accent (${samples}) — Copy & Paste + ALT Codes`;
}

function descriptionFor(g: LetterGroup): string {
  const lower = lowercaseOf(g).slice(0, 6).map((c) => c.ch).join(", ");
  const upper = uppercaseOf(g).slice(0, 6).map((c) => c.ch).join(", ");
  const lo = firstLower(g);
  const up = firstUpper(g);
  const loBit = lo ? ` That includes ${lo.ch} with ${lo.alt}` : "";
  const upBit = up ? ` and ${up.ch} with ${up.alt}` : "";
  return `Copy every accented ${g.letter} — ${lower}${upper ? ` and capital ${upper}` : ""}. ${g.chars.length} characters with click-to-copy, Unicode values, HTML entities and ALT codes.${loBit}${upBit}.`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { letter } = await params;
  const g = getLetter(letter);
  if (!g) return {};
  const path = letterUrl(g.letter);
  return {
    title: { absolute: `${titleFor(g)} | ${site.name}` },
    description: descriptionFor(g),
    authors: [{ name: AUTHOR.name, url: `${site.url}/author/${AUTHOR.slug}` }],
    keywords: [
      `${g.letter} with accent`,
      `accented ${g.letter}`,
      `${g.letter} accent copy and paste`,
      `accented capital ${g.letter.toUpperCase()}`,
      `alt code for ${g.letter} with accent`,
      `${g.letter} with acute`,
      `${g.letter} with grave`,
      "accent letters",
      "unicode letters",
    ],
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: `${site.url}${path}`,
      title: titleFor(g),
      description: descriptionFor(g),
      siteName: site.name,
    },
    twitter: { card: "summary", title: titleFor(g), description: descriptionFor(g) },
  };
}

function faqsFor(g: LetterGroup): Faq[] {
  const lo = firstLower(g);
  const up = firstUpper(g);
  const out: Faq[] = [];
  if (lo) {
    out.push({
      q: `What is the ALT code for ${lo.ch}?`,
      a: `The Windows ALT code for ${lo.ch} (${lo.name}) is Alt + ${lo.dec}. Hold Alt, type ${String(lo.dec).split("").join(", ")} on the numeric keypad and release Alt. Inside Word you can type ${lo.code.replace("U+", "")} followed by Alt + X instead — or simply click the character on this page to copy it.`,
    });
  }
  if (up) {
    out.push({
      q: `How do I type a capital accented ${g.letter.toUpperCase()} like ${up.ch}?`,
      a: `On Windows use Alt + ${up.dec} with the numeric keypad; in Microsoft Word type ${up.code.replace("U+", "")} then press Alt + X. On a Mac, press the matching Option-key accent, release, then type Shift + ${g.letter.toUpperCase()}. Copy-and-paste from the grid above works in every program.`,
    });
  }
  out.push({
    q: `How do I type an accented ${g.letter} on a Mac?`,
    a: `Hold the Option key together with the accent key, release, then press ${g.letter}. Option + E applies an acute accent, Option + \` a grave, Option + I a circumflex, Option + N a tilde and Option + U an umlaut. Alternatively press and hold the ${g.letter} key and a pop-up menu lists every variation.`,
  });
  out.push({
    q: `Why do accented ${g.letter} characters sometimes fail in old programs?`,
    a: `Characters beyond the first 256 code points need full Unicode support. When a long ALT code shows a placeholder symbol, redo the steps inside Word — it resolves the complete range — or copy the letter directly from this page, which works in every modern application.`,
  });
  return out;
}

function h2(text: string, id: string) {
  return (
    <h2 id={id} className="h-accent scroll-mt-24 text-[26px] font-extrabold tracking-tight sm:text-3xl">
      {text}
    </h2>
  );
}

export default async function LetterPage({ params }: Props) {
  const { letter } = await params;
  const g = getLetter(letter);
  if (!g) notFound();

  const lower = lowercaseOf(g);
  const upper = uppercaseOf(g);
  const faqs = faqsFor(g);
  const prev = prevLetter(g.letter);
  const next = nextLetter(g.letter);
  const note = LETTER_NOTES[g.letter];
  const sample = firstLower(g) ?? g.chars[0];
  const pageUrl = `${site.url}${letterUrl(g.letter)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      webPage({
        url: pageUrl,
        name: titleFor(g),
        description: descriptionFor(g),
      }),
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ---------- HEADER ---------- */}
      <section className="bg-gradient-to-b from-violet-tint/70 via-white to-white">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-9 sm:px-6">
          <Breadcrumbs
            items={[
              { label: "Accent Letters", href: "/" },
              { label: `${g.letter.toUpperCase()} with Accent` },
            ]}
          />
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-end">
            <div>
              <Byline />
              <h1 className="mt-5 text-[clamp(2.3rem,5.5vw,3.9rem)] font-black leading-[1.04] tracking-tight">
                {g.letter.toUpperCase()} with accent{" "}
                <span className="grad-text">
                  {lower.slice(0, 4).map((c) => c.ch).join(" ")}
                </span>{" "}
                — copy &amp; ALT codes
              </h1>
              <div className="prose-block mt-5 max-w-2xl">
                <p>
                  {note} This page collects{" "}
                  <strong>
                    every accented {g.letter} recognized by the Unicode
                    Standard — {g.chars.length} characters
                  </strong>{" "}
                  in total ({lower.length} lowercase, {upper.length} capital
                  and digraph forms)
                </p>
                <p>
                  Each character can be copied with a single click, typed with
                  its <Link href={`/alt-codes#${g.letter}`}>ALT code</Link>, or
                  produced with the keyboard shortcuts proven below — no
                  memorisation required if you bookmark this page.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border frame-line bg-white p-5 shadow-[0_18px_44px_-24px_rgba(124,58,237,0.35)]">
              <p className="kicker mb-4">On this page</p>
              <TocChips />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- COPY & PASTE ---------- */}
      <section id="copy" className="scroll-mt-24 border-t frame-line">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          {h2(`Accented ${g.letter.toUpperCase()} copy and paste`, "copy")}
          <p className="mt-4 flex max-w-2xl items-center gap-2 text-[15px] leading-relaxed text-ink-soft">
            <MousePointerClick size={17} className="shrink-0 text-signal" />
            Click any tile below — the character goes straight to your
            clipboard, ready to paste with Ctrl + V or Cmd + V.
          </p>

          {lower.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-extrabold">
                Small letter {g.letter} with accent
                <span className="ml-2 rounded-full bg-violet-tint px-2.5 py-1 text-xs font-extrabold text-signal">
                  {lower.length}
                </span>
              </h3>
              <CharGridLarge chars={lower} />
            </div>
          )}

          {upper.length > 0 && (
            <div className="mt-10">
              <h3 className="mb-4 text-lg font-extrabold">
                Capital letter {g.letter.toUpperCase()} with accent
                <span className="ml-2 rounded-full bg-violet-tint px-2.5 py-1 text-xs font-extrabold text-signal">
                  {upper.length}
                </span>
              </h3>
              <CharGridLarge chars={upper} />
            </div>
          )}

          <div className="callout mt-8">
            Press Ctrl + D right now to save this page — the next time your
            essay, résumé or email needs an accented {g.letter.toUpperCase()},
            the whole alphabet of options will be one click away.
          </div>
        </div>
      </section>

      {/* ---------- ALT CODES ---------- */}
      <section id="alt-codes" className="scroll-mt-24 border-t frame-line bg-paper-deep/50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          {h2(
            `Accented ${g.letter.toUpperCase()} with ALT code — full table`,
            "alt-codes",
          )}
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
            Hold the <span className="kbd">Alt</span> key and type the number
            shown on your numeric keypad to produce that letter on Windows.
            The Unicode column is used for Word’s Alt + X method and by
            developers.
          </p>
          <div className="mt-7 overflow-x-auto rounded-2xl border frame-line bg-white shadow-sm">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="border-b-2 border-[#e9d6f5] bg-violet-tint/60 text-[11px] font-extrabold uppercase tracking-[0.14em] text-signal-deep">
                  <th className="px-5 py-3.5">ALT Code</th>
                  <th className="px-5 py-3.5">Symbol</th>
                  <th className="px-5 py-3.5">Description</th>
                  <th className="px-5 py-3.5">Unicode</th>
                </tr>
              </thead>
              <tbody className="[&_td]:border-b [&_td]:frame-line [&_td]:px-5 [&_td]:py-2.5 [&_tr:last-child_td]:border-0">
                {g.chars.map((c) => (
                  <tr key={c.code + c.ch} className="transition-colors hover:bg-violet-tint/40">
                    <td>
                      <kbd className="kbd">{c.alt}</kbd>
                    </td>
                    <td className="text-2xl font-extrabold">{c.ch}</td>
                    <td className="font-bold text-ink-soft">
                      {c.name
                        .replace("Latin Small Letter", "Small letter")
                        .replace("Latin Capital Letter", "Capital letter")}
                    </td>
                    <td className="font-mono text-xs font-medium text-ink-soft">{c.code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---------- HOW TO TYPE ---------- */}
      <section id="how-to" className="scroll-mt-24 border-t frame-line">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          {h2(`How to type accented ${g.letter} on the keyboard`, "how-to")}
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
            Two dependable methods, demonstrated with {sample.ch} (
            {sample.name.replace("Latin Small Letter ", "").toLowerCase()}) —
            both tested on Windows 11 and Microsoft 365.
          </p>
          <div className="mt-7">
            <TypeGuide letter={g.letter} sample={sample} />
          </div>

          {/* Word + Mac tables */}
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border frame-line bg-white p-6">
              <h3 className="text-xl font-extrabold tracking-tight">
                Microsoft Word accent shortcuts
              </h3>
              <p className="mt-1.5 text-sm text-ink-soft">
                Press the combination, release, then type the letter.
              </p>
              <table className="mt-4 w-full text-left text-[13.5px]">
                <tbody className="[&_td]:border-b [&_td]:frame-line [&_td]:py-2 [&_tr:last-child_td]:border-0">
                  {WORD_SHORTCUTS.map((r) => (
                    <tr key={r.keys + r.result}>
                      <td className="pr-3">
                        <kbd className="kbd">{r.keys}</kbd>
                      </td>
                      <td className="pr-3 text-ink-soft">{r.then}</td>
                      <td className="text-right font-extrabold">{r.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-2xl border frame-line bg-white p-6">
              <h3 className="text-xl font-extrabold tracking-tight">
                macOS Option-key accents
              </h3>
              <p className="mt-1.5 text-sm text-ink-soft">
                Press Option + key, release, then type the letter — or press
                and hold the letter key.
              </p>
              <table className="mt-4 w-full text-left text-[13.5px]">
                <tbody className="[&_td]:border-b [&_td]:frame-line [&_td]:py-2 [&_tr:last-child_td]:border-0">
                  {MAC_SHORTCUTS.map((r) => (
                    <tr key={r.accent}>
                      <td className="pr-3 font-bold">{r.accent}</td>
                      <td className="pr-3">
                        <kbd className="kbd">{r.keys}</kbd>
                      </td>
                      <td className="text-right font-extrabold">{r.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- TECHNICAL INFO ---------- */}
      <section id="technical" className="scroll-mt-24 border-t frame-line bg-paper-deep/50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          {h2(`Technical information for accented ${g.letter.toUpperCase()}`, "technical")}
          <p className="mt-4 flex max-w-2xl items-center gap-2 text-[15px] leading-relaxed text-ink-soft">
            <ClipboardCopy size={16} className="shrink-0 text-signal" />
            Unicode code points, HTML entities, CSS and JavaScript escapes and
            UTF-8 byte sequences for every character on this page.
          </p>
          <div className="mt-7">
            <TechInfoGrid chars={g.chars} />
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="scroll-mt-24 border-t frame-line">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          {h2(`Accented ${g.letter.toUpperCase()} — questions people ask`, "faq")}
          <div className="mt-7">
            <FaqList faqs={faqs} />
          </div>
        </div>
      </section>

      {/* ---------- RELATED ---------- */}
      <section id="related" className="scroll-mt-24 border-t frame-line">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="h-accent text-[26px] font-extrabold tracking-tight sm:text-3xl">
            Read more accent letters
          </h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {prev && (
              <Link
                href={letterUrl(prev)}
                className="group flex items-center justify-between rounded-2xl border frame-line bg-white px-6 py-5 transition-all hover:border-transparent hover:bg-gradient-to-br hover:from-[#c007ed] hover:to-[#7c3aed] hover:text-white hover:shadow-[0_16px_36px_-16px_rgba(124,58,237,0.6)]"
              >
                <span className="flex items-center gap-3">
                  <ArrowLeft size={17} className="text-signal transition-colors group-hover:text-white" />
                  <span className="text-xs font-extrabold uppercase tracking-[0.14em] opacity-60">
                    Previous letter
                  </span>
                </span>
                <span className="text-2xl font-black uppercase">{prev} with accent</span>
              </Link>
            )}
            {next && (
              <Link
                href={letterUrl(next)}
                className="group flex items-center justify-between rounded-2xl border frame-line bg-white px-6 py-5 transition-all hover:border-transparent hover:bg-gradient-to-br hover:from-[#c007ed] hover:to-[#7c3aed] hover:text-white hover:shadow-[0_16px_36px_-16px_rgba(124,58,237,0.6)]"
              >
                <span className="text-2xl font-black uppercase">{next} with accent</span>
                <span className="flex items-center gap-3">
                  <span className="text-xs font-extrabold uppercase tracking-[0.14em] opacity-60">
                    Next letter
                  </span>
                  <ArrowRight size={17} className="text-signal transition-colors group-hover:text-white" />
                </span>
              </Link>
            )}
          </div>
          <div className="mt-8">
            <AzIndex current={g.letter} />
          </div>
        </div>
      </section>
    </>
  );
}
