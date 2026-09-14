import Link from "next/link";
import { ALL_LETTERS, LETTERS_BY_ID, sampleGlyphs } from "@/lib/letters";
import { letterUrl } from "@/lib/site";

/** Full A–Z directory — the interlinking module used on subpages. */
export function AzIndex({ current }: { current?: string }) {
  return (
    <nav
      aria-label="All accent letters"
      className="overflow-hidden rounded-2xl border frame-line bg-white"
    >
      <div className="border-b frame-line bg-violet-tint/60 px-5 py-3.5">
        <p className="kicker">All accent letters, A–Z</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[repeat(13,1fr)]">
        {ALL_LETTERS.map((l) => {
          const g = LETTERS_BY_ID[l];
          const active = l === current;
          return (
            <Link
              key={l}
              href={letterUrl(l)}
              aria-current={active ? "page" : undefined}
              title={`${l.toUpperCase()} with accent — ${g.chars.length} characters`}
              className={`group flex flex-col items-center gap-0.5 border frame-line px-2 py-3 transition-all ${
                active
                  ? "bg-gradient-to-br from-[#c007ed] to-[#7c3aed] text-white"
                  : "hover:bg-violet-tint/60"
              }`}
            >
              <span className="text-2xl font-black uppercase leading-none">{l}</span>
              <span className={`text-[13px] font-bold ${active ? "text-white/80" : "text-ink-soft/70"}`}>
                {sampleGlyphs(g, 3)}
              </span>
              <span
                className={`mt-0.5 rounded-full px-2 py-px text-[10px] font-extrabold ${
                  active ? "bg-white/20 text-white" : "bg-paper-deep text-signal-deep"
                }`}
              >
                {g.chars.length}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
