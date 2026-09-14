"use client";

import { useCopy } from "./CopyContext";
import type { AccentChar } from "@/lib/letters";
import { Check } from "lucide-react";

function Tile({ c, large }: { c: AccentChar; large?: boolean }) {
  const copy = useCopy();
  return (
    <button
      type="button"
      data-char-tile="1"
      onClick={() => copy(c.ch, c.name)}
      title={`${c.name} — click to copy`}
      aria-label={`Copy ${c.ch}, ${c.name}`}
      className={`char-tile group ${large ? "char-tile-lg" : ""}`}
    >
      <span className="tile-glyph">{c.ch}</span>
      {large && <span className="tile-name tile-meta">{c.name}</span>}
      <span className="tile-check" aria-hidden>
        <Check size={large ? 34 : 22} strokeWidth={3} />
      </span>
    </button>
  );
}

/** Compact glyph-only grid (previews & search results). */
export function CharGrid({ chars }: { chars: AccentChar[] }) {
  return (
    <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 sm:gap-2.5 md:grid-cols-8 lg:grid-cols-10">
      {chars.map((c) => (
        <Tile key={c.code + c.ch} c={c} />
      ))}
    </div>
  );
}

/** Large grid with character names (letter pages). */
export function CharGridLarge({ chars }: { chars: AccentChar[] }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-6">
      {chars.map((c) => (
        <Tile key={c.code + c.ch} c={c} large />
      ))}
    </div>
  );
}
