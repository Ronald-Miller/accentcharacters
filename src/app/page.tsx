import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowRight,
  MousePointerClick,
  KeyboardIcon,
  Braces,
  Zap,
  BadgeCheck,
  ShieldCheck,
  FlaskConical,
  Database,
} from "lucide-react";
import { SearchAll } from "@/components/SearchAll";
import { CharGrid } from "@/components/CharGrid";
import { HowToType } from "@/components/HowToType";
import { FaqList } from "@/components/Faq";
import { Byline } from "@/components/Byline";
import {
  ALL_LETTERS,
  LETTERS,
  LETTERS_BY_ID,
  TOTAL_CHARS,
  allChars,
  featuredOf,
} from "@/lib/letters";
import { ACCENT_TYPES, HOME_FAQS } from "@/lib/content";
import { AUTHOR, dates, letterUrl, site } from "@/lib/site";
import { webPage } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: site.title },
  description: site.description,
  alternates: { canonical: "/" },
};

const TICKER = "à á â ã ä å æ ç è é ê ë ì í î ï ð ñ ò ó ô õ ö ø œ ß ù ú û ü ý ÿ þ".split(" ");

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    webPage({ url: site.url, name: site.title, description: site.description }),
    {
      "@type": "FAQPage",
      mainEntity: HOME_FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const TYPE_TINTS = [
  { band: "from-[#c007ed] to-[#7c3aed]", chip: "bg-violet-tint text-signal-deep" },
  { band: "from-sky-500 to-indigo-500", chip: "bg-sky-100 text-sky-700" },
  { band: "from-amber-500 to-orange-500", chip: "bg-amber-100 text-amber-700" },
  { band: "from-emerald-500 to-teal-500", chip: "bg-emerald-100 text-emerald-700" },
  { band: "from-rose-500 to-pink-500", chip: "bg-rose-100 text-rose-700" },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ------------------------------ HERO ------------------------------ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-violet-tint/80 via-white to-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#f5d0ff] to-[#e3d4ff] opacity-60 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-12 sm:px-6 sm:pt-16">
          <div className="rise inline-flex items-center gap-2 rounded-full border border-[#ecc4fb] bg-white px-4 py-1.5 text-xs font-extrabold text-signal-deep shadow-sm">
            <Zap size={13} className="text-signal" />
            No key combinations. No memorising. One click.
          </div>
          <h1 className="rise rise-1 mt-6 max-w-4xl text-[clamp(2.5rem,6.5vw,4.6rem)] font-black leading-[1.02] tracking-tight">
            Accent letters,
            <br />
            <span className="grad-text">copy &amp; paste</span> — instantly.
          </h1>
          <p className="rise rise-2 mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            An accent letter is a standard character refined by a diacritical
            mark — above it (<strong className="text-ink">á</strong>), below it (
            <strong className="text-ink">ç</strong>) or through it (
            <strong className="text-ink">ø</strong>). AccentLab lets you copy
            any of <strong className="text-ink">{TOTAL_CHARS} accented letters</strong>,
            small and capital, with a single click. No shortcuts to learn, no
            ALT codes to remember.
          </p>
          <div className="rise rise-2 mt-8 max-w-2xl">
            <SearchAll items={allChars()} />
          </div>
          <div className="rise rise-3 mt-8 flex flex-wrap items-center gap-3">
            {[
              { Icon: MousePointerClick, label: `${TOTAL_CHARS} characters to copy` },
              { Icon: KeyboardIcon, label: "26 letter references" },
              { Icon: Braces, label: "Unicode · HTML · ALT codes" },
            ].map(({ Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border frame-line bg-white px-4 py-2 text-[13px] font-extrabold text-ink-soft"
              >
                <Icon size={14} className="text-signal" />
                {label}
              </span>
            ))}
          </div>
          <div className="rise rise-3 mt-6 max-w-xl">
            <Byline />
          </div>
        </div>

        {/* glyph marquee */}
        <div className="border-y frame-line bg-white/80 py-4" aria-hidden>
          <div className="marquee-track gap-0">
            {[0, 1].map((n) => (
              <span
                key={n}
                className="flex shrink-0 items-center gap-10 px-5 text-[26px] font-extrabold text-ink/30"
              >
                {TICKER.map((g, i) => (
                  <span key={`${n}-${i}`} className="inline-flex items-center gap-10">
                    {g}
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c007ed]/50" />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------ LETTER RAIL (A-Z) ------------------------ */}
      <div className="sticky top-[68px] z-[40] border-b frame-line bg-white/95 backdrop-blur-md">
        <div className="letter-rail mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2.5 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {ALL_LETTERS.map((l) => (
            <a
              key={l}
              href={`#letter-${l}`}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-extrabold uppercase transition-all hover:bg-gradient-to-br hover:from-[#c007ed] hover:to-[#7c3aed] hover:text-white"
            >
              {l}
            </a>
          ))}
        </div>
      </div>

      {/* ------------------------------ INTRO ----------------------------- */}
      <section aria-labelledby="about" className="border-b frame-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <p className="kicker">The fundamentals</p>
            <h2 id="about" className="h-accent mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              What exactly is an accent letter?
            </h2>
          </div>
          <div className="prose-block">
            <p>
              An accent letter — sometimes called a diacritic, diacritical
              sign or diacritical point — is a familiar A–Z character refined
              by a small mark. The mark can sit above the letter, as the acute
              does in á; underneath it, as the cedilla does in ç; or directly
              through it, as the stroke does in ø. Each placement changes how
              the letter is pronounced, stressed or interpreted.
            </p>
            <p>
              Over half the world’s writing systems rely on these marks every
              day. French cannot spell élève without them, Polish names like
              Wałęsa collapse without ł and ę, and Vietnamese stacks two
              accents on a single vowel. Accented characters are not
              decoration — they are load-bearing letters. This site treats
              them that way: every character is standard Unicode, copyable in
              one click, and{" "}
              <Link href="/alt-codes">every ALT code is documented</Link> so
              you can also type it straight from your keyboard.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------- A–Z SECTIONS -------------------------- */}
      <section aria-label="Accent letters from A to Z">
        {LETTERS.map((g, idx) => {
          const preview = featuredOf(g, 20);
          const rest = g.chars.length - preview.length;
          return (
            <article
              key={g.letter}
              id={`letter-${g.letter}`}
              className={`relative scroll-mt-32 overflow-hidden border-b frame-line ${
                idx % 2 === 1 ? "bg-paper-deep/60" : "bg-white"
              }`}
            >
              <span className="ghost-glyph" aria-hidden>
                {g.letter}
              </span>
              <div className="relative mx-auto max-w-6xl px-4 py-11 sm:px-6">
                <header className="mb-7 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="flex items-center gap-3 text-[26px] font-extrabold tracking-tight sm:text-3xl">
                    <span className="grad-signal flex h-11 w-11 items-center justify-center rounded-xl text-xl font-black text-white shadow-[0_8px_20px_-6px_rgba(192,7,237,0.5)]">
                      {g.letter.toUpperCase()}
                    </span>
                    <span>
                      <span className="capitalize">{g.letter}</span> with accent
                      <span className="ml-3 align-middle text-sm font-bold text-ink-soft">
                        {preview.slice(0, 6).map((c) => c.ch).join(" ")} …
                      </span>
                    </span>
                  </h2>
                  <Link
                    href={letterUrl(g.letter)}
                    className="group inline-flex items-center gap-2 rounded-full border frame-line bg-white px-4 py-2 text-[13px] font-extrabold text-signal-deep transition-all hover:border-transparent hover:bg-gradient-to-br hover:from-[#c007ed] hover:to-[#7c3aed] hover:text-white"
                  >
                    All {g.chars.length} + ALT codes
                    {rest > 0 ? ` · +${rest} more` : ""}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </header>
                <CharGrid chars={preview} />
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-ink-soft/60">
                  Click any letter to copy it to your clipboard
                </p>
              </div>
            </article>
          );
        })}
      </section>

      {/* ------------------------- ACCENT TYPES --------------------------- */}
      <section id="types" className="scroll-mt-24 border-b frame-line bg-paper-deep/60" aria-labelledby="types-h">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker">Field guide</p>
              <h2 id="types-h" className="h-accent mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Ten accent marks worth knowing
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-ink-soft">
              Each mark has a history, a sound and a job. Recognising them
              makes finding the right character far easier.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {ACCENT_TYPES.map((t, i) => {
              const tint = TYPE_TINTS[i % TYPE_TINTS.length];
              return (
                <article
                  key={t.id}
                  className="group overflow-hidden rounded-2xl border frame-line bg-white transition-all hover:-translate-y-1 hover:shadow-[0_20px_44px_-20px_rgba(124,58,237,0.35)]"
                >
                  <div className={`flex items-center justify-between bg-gradient-to-r ${tint.band} px-6 py-4`}>
                    <h3 className="text-xl font-extrabold tracking-tight text-white">{t.name}</h3>
                    <span className="text-3xl font-black text-white/90">{t.mark}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider ${tint.chip}`}>
                        {t.short}
                      </span>
                      <span className="text-lg font-extrabold text-ink/70">{t.examples}</span>
                    </div>
                    <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{t.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------------- HOW TO TYPE --------------------------- */}
      <section aria-labelledby="howto-h" className="border-b frame-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-10">
            <p className="kicker">Keyboard mastery</p>
            <h2 id="howto-h" className="h-accent mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              How to type accent letters
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
              Copy-and-paste is fastest for a one-off, but your keyboard can
              produce every accent directly. Three methods cover every
              platform — and the{" "}
              <Link href="/alt-codes" className="font-bold text-signal-deep underline underline-offset-4">
                complete ALT code table
              </Link>{" "}
              lists a code for all {TOTAL_CHARS} characters.
            </p>
          </div>
          <div id="how-to-type" className="scroll-mt-24">
            <HowToType />
          </div>
        </div>
      </section>

      {/* ------------------------- E-E-A-T AUTHOR ------------------------- */}
      <section aria-labelledby="editor-h" className="border-b frame-line bg-violet-tint/50">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div className="flex items-start gap-5">
            <Image
              src={AUTHOR.avatar}
              alt={`${AUTHOR.name} — ${AUTHOR.role}`}
              width={128}
              height={128}
              className="h-28 w-28 shrink-0 rounded-2xl border-4 border-white object-cover shadow-[0_18px_40px_-18px_rgba(124,58,237,0.55)] sm:h-32 sm:w-32"
            />
            <div>
              <p className="kicker">Meet your editor</p>
              <Link href={`/author/${AUTHOR.slug}`} className="group mt-2 block">
                <h2 id="editor-h" className="text-3xl font-extrabold tracking-tight group-hover:text-signal">
                  {AUTHOR.name}
                  <BadgeCheck size={22} className="ml-2 inline-block -translate-y-0.5 text-signal" />
                </h2>
              </Link>
              <p className="mt-1 text-sm font-bold text-ink-soft">{AUTHOR.role}</p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">
                {AUTHOR.shortBio}
              </p>
              <Link
                href={`/author/${AUTHOR.slug}`}
                className="btn-primary mt-4 px-5 py-2.5 text-sm"
              >
                Read Adrian’s full profile
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Database,
                title: "Sourced from the standard",
                body: "Every character, name and code point is compiled directly from the Unicode Consortium’s official character database — no second-hand lists.",
              },
              {
                icon: FlaskConical,
                title: "Hand-tested codes",
                body: "Each ALT code and shortcut is physically typed on Windows 11, macOS and Microsoft 365 before it is published.",
              },
              {
                icon: ShieldCheck,
                title: "Reviewed & dated",
                body: `Every page carries its author, verification date and revision history. This site was last reviewed on ${dates.modifiedLabel}.`,
              },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-[#ecc4fb] bg-white p-5">
                <c.icon size={22} className="text-signal" />
                <h3 className="mt-3 text-[15px] font-extrabold">{c.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------- FAQ ------------------------------ */}
      <section id="faq" className="scroll-mt-24" aria-labelledby="faq-h">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="kicker">Answers</p>
              <h2 id="faq-h" className="h-accent mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Frequently asked questions
              </h2>
            </div>
            <p className="self-end text-sm leading-relaxed text-ink-soft">
              What people ask most about accented characters — copying,
              typing on Windows and Mac, mobile input and why Unicode letters
              work everywhere.
            </p>
          </div>
          <FaqList faqs={HOME_FAQS} />
        </div>
      </section>
    </>
  );
}
