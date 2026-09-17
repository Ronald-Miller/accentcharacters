import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, KeyboardIcon } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SearchAll } from "@/components/SearchAll";
import { Byline } from "@/components/Byline";
import { LETTERS, TOTAL_CHARS, allChars } from "@/lib/letters";
import { AUTHOR, letterUrl, site } from "@/lib/site";
import { webPage } from "@/lib/schema";

const PAGE_TITLE = "ALT Codes for Accent Letters — Complete Windows Alt Code Reference";
const PAGE_DESC = `Full ALT code list for all ${TOTAL_CHARS} accented letters, A to Z. Hold Alt and type the decimal code — every lowercase and capital accented letter with its Windows code, Unicode value and HTML entity.`;

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESC,
  authors: [{ name: AUTHOR.name, url: `${site.url}/author/${AUTHOR.slug}` }],
  keywords: [
    "alt codes",
    "alt codes for accent letters",
    "alt code list",
    "windows alt codes",
    "how to type accents alt code",
    "alt code for ñ",
    "alt code é",
    "unicode alt codes",
  ],
  alternates: { canonical: "/alt-codes" },
  openGraph: {
    type: "article",
    url: `${site.url}/alt-codes`,
    title: PAGE_TITLE,
    description: PAGE_DESC,
    siteName: site.name,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    webPage({ url: `${site.url}/alt-codes`, name: PAGE_TITLE, description: PAGE_DESC }),
  ],
};

export default function AltCodesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-gradient-to-b from-violet-tint/70 via-white to-white">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-9 sm:px-6">
          <Breadcrumbs
            items={[{ label: "Accent Letters", href: "/" }, { label: "ALT Codes" }]}
          />
          <Byline />
          <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
            <div>
              <h1 className="text-[clamp(2.3rem,5.5vw,3.9rem)] font-black leading-[1.04] tracking-tight">
                ALT codes for every{" "}
                <span className="grad-text">accent letter</span>
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
                Hold <span className="kbd">Alt</span>, type the decimal number
                on your numeric keypad, release — the character appears. This
                reference covers all {TOTAL_CHARS} hand-verified accented
                letters, small and capital, with Unicode and HTML values for
                developers.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ecc4fb] bg-white px-4 py-2 text-[13px] font-extrabold text-signal-deep">
              <KeyboardIcon size={14} />
              {TOTAL_CHARS} verified codes
            </span>
          </div>
          <div className="mt-8 max-w-2xl">
            <SearchAll items={allChars()} />
          </div>
        </div>
      </section>

      {/* quick jump */}
      <div className="sticky top-[68px] z-[40] border-b frame-line bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2.5 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {LETTERS.map((g) => (
            <a
              key={g.letter}
              href={`#${g.letter}`}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-extrabold uppercase transition-all hover:bg-gradient-to-br hover:from-[#c007ed] hover:to-[#7c3aed] hover:text-white"
            >
              {g.letter}
            </a>
          ))}
        </div>
      </div>

      <section aria-label="ALT codes by letter">
        {LETTERS.map((g, idx) => (
          <article
            key={g.letter}
            id={g.letter}
            className={`scroll-mt-32 border-b frame-line ${idx % 2 === 1 ? "bg-paper-deep/50" : "bg-white"}`}
          >
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h2 className="flex items-center gap-3 text-[22px] font-extrabold tracking-tight">
                  <span className="grad-signal flex h-9 w-9 items-center justify-center rounded-lg text-lg font-black text-white">
                    {g.letter.toUpperCase()}
                  </span>
                  <span className="capitalize">{g.letter}</span> with accent ALT codes
                </h2>
                <Link
                  href={letterUrl(g.letter)}
                  className="group inline-flex items-center gap-1.5 text-[13px] font-extrabold text-signal-deep transition-colors hover:text-ink"
                >
                  Copy-paste grid for {g.letter.toUpperCase()}
                  <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
              <div className="overflow-x-auto rounded-2xl border frame-line bg-white shadow-sm">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="border-b-2 border-[#e9d6f5] bg-violet-tint/60 text-[11px] font-extrabold uppercase tracking-[0.14em] text-signal-deep">
                      <th className="px-5 py-3">ALT Code</th>
                      <th className="px-5 py-3">Symbol</th>
                      <th className="px-5 py-3">Description</th>
                      <th className="px-5 py-3">Unicode</th>
                      <th className="px-5 py-3">HTML entity</th>
                    </tr>
                  </thead>
                  <tbody className="[&_td]:border-b [&_td]:frame-line [&_td]:px-5 [&_td]:py-2 [&_tr:last-child_td]:border-0">
                    {g.chars.map((c) => (
                      <tr key={c.code + c.ch} className="transition-colors hover:bg-violet-tint/40">
                        <td>
                          <kbd className="kbd">{c.alt}</kbd>
                        </td>
                        <td className="text-xl font-extrabold">{c.ch}</td>
                        <td className="font-bold text-ink-soft">
                          {c.name
                            .replace("Latin Small Letter", "Small letter")
                            .replace("Latin Capital Letter", "Capital letter")}
                        </td>
                        <td className="font-mono text-xs font-medium text-ink-soft">{c.code}</td>
                        <td className="font-mono text-xs font-medium text-ink-soft">{c.html}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="border-b frame-line">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <h2 className="h-accent text-2xl font-extrabold tracking-tight">
              Using ALT codes well
            </h2>
            <div className="prose-block">
              <p>
                ALT codes require the dedicated numeric keypad of a full-size
                keyboard, with Num Lock switched on. On compact laptops, look
                for the embedded keypad on the J–K–L keys or use the on-screen
                keyboard. Codes under 256 work in virtually every Windows
                application; longer codes behave reliably in Microsoft Word
                and other Unicode-aware editors.
              </p>
              <p>
                Prefer a foolproof method? Type the four-character Unicode
                value listed beside each letter — for instance 00F1 for ñ —
                then press Alt + X in Word to convert it in place. Or skip
                codes entirely on the{" "}
                <Link href="/#letter-a">copy-and-paste grids</Link>: one click
                puts any character on your clipboard, no keypad required.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
