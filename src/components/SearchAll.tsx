"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { CharGrid } from "./CharGrid";
import type { AccentChar } from "@/lib/letters";

type Item = { letter: string; c: AccentChar };

function tokens(q: string): string[] {
  return q
    .toLowerCase()
    .replace(/[.,]/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

/** Full-text search across every character: matches glyph, name, code, alt code. */
export function SearchAll({
  items,
  autoFocus = false,
}: {
  items: Item[];
  autoFocus?: boolean;
}) {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const t = tokens(q);
    if (!t.length) return [];
    const glyph = q.trim();
    return items
      .filter(({ letter, c }) => {
        if (glyph.length <= 2 && c.ch === glyph.trim()) return true;
        const hay =
          `${c.ch} ${c.name} ${letter} ${c.code} u+${c.dec.toString(16)} ${c.dec} alt ${c.dec} alt+${c.dec}`.toLowerCase();
        return t.every((tok) => hay.includes(tok));
      })
      .slice(0, 60);
  }, [items, q]);

  return (
    <div>
      <label className="group flex items-center gap-3 rounded-full border frame-line bg-white/60 px-5 py-3.5 transition-colors focus-within:border-ink sm:px-6">
        <Search size={18} className="shrink-0 text-ink-soft" />
        <input
          value={q}
          autoFocus={autoFocus}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search any character — try “a with acute”, “alt 0233” or “U+00F1”…"
          className="w-full bg-transparent text-[15px] outline-none placeholder:text-ink-soft/60"
          aria-label="Search accented letters"
          type="search"
        />
        {q && (
          <button
            type="button"
            onClick={() => setQ("")}
            aria-label="Clear search"
            className="shrink-0 text-ink-soft hover:text-ink"
          >
            <X size={16} />
          </button>
        )}
      </label>

      {q && (
        <div className="mt-5">
          <p className="kicker mb-3">
            {results.length
              ? `${results.length}${results.length === 60 ? "+" : ""} result${results.length === 1 ? "" : "s"} — click to copy`
              : "No matches — try a letter, a name or an ALT code"}
          </p>
          {results.length > 0 && <CharGrid chars={results.map((r) => r.c)} />}
        </div>
      )}
    </div>
  );
}
