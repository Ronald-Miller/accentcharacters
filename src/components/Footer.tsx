import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Mail } from "lucide-react";
import { ALL_LETTERS, LETTERS_BY_ID } from "@/lib/letters";
import { AUTHOR, letterUrl, site } from "@/lib/site";

const HALF = Math.ceil(ALL_LETTERS.length / 2);

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* author trust strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-7 sm:px-6">
          <Image
            src={AUTHOR.avatar}
            alt={`${AUTHOR.name} — ${AUTHOR.role}`}
            width={56}
            height={56}
            className="h-14 w-14 rounded-full border-2 border-[#c007ed] object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-extrabold">
              Written &amp; fact-checked by{" "}
              <Link
                href={`/author/${AUTHOR.slug}`}
                className="text-[#e08ffc] underline underline-offset-4 hover:text-white"
              >
                {AUTHOR.name}
              </Link>
            </p>
            <p className="mt-0.5 text-sm text-white/55">{AUTHOR.role}</p>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-bold text-white/80 transition-colors hover:border-[#e08ffc] hover:text-white"
          >
            <ShieldCheck size={14} className="text-[#e08ffc]" />
            Editorial standards
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.15fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2.5 text-2xl font-black tracking-tight">
              <span className="grad-signal flex h-9 w-9 items-center justify-center rounded-lg text-xl">
                ä
              </span>
              Accent<span className="text-[#e08ffc]">Lab</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
              A complete, hand-verified reference for accented letters and
              diacritical marks — every character from á to ü with its ALT
              code, Unicode value and typing method, compiled from the
              official Unicode Standard and tested on real keyboards.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white/70 transition-colors hover:text-[#e08ffc]"
            >
              <Mail size={15} />
              {site.email}
            </a>
          </div>

          <nav aria-label="Accent letters A to M">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/40">
              Letters A–M
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              {ALL_LETTERS.slice(0, HALF).map((l) => (
                <li key={l}>
                  <Link
                    href={letterUrl(l)}
                    className="text-sm text-white/70 transition-colors hover:text-[#e08ffc]"
                  >
                    {l.toUpperCase()} with accent{" "}
                    <span className="text-white/35">
                      ({LETTERS_BY_ID[l].chars.length})
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Accent letters N to Z">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/40">
              Letters N–Z
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              {ALL_LETTERS.slice(HALF).map((l) => (
                <li key={l}>
                  <Link
                    href={letterUrl(l)}
                    className="text-sm text-white/70 transition-colors hover:text-[#e08ffc]"
                  >
                    {l.toUpperCase()} with accent{" "}
                    <span className="text-white/35">
                      ({LETTERS_BY_ID[l].chars.length})
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.name}. Free to use — every
            character is standard Unicode.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-bold">
            <Link href="/alt-codes" className="hover:text-[#e08ffc]">
              ALT Codes
            </Link>
            <Link href="/#how-to-type" className="hover:text-[#e08ffc]">
              Keyboard Shortcuts
            </Link>
            <Link href="/about" className="hover:text-[#e08ffc]">
              About
            </Link>
            <Link href={`/author/${AUTHOR.slug}`} className="hover:text-[#e08ffc]">
              Author
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
