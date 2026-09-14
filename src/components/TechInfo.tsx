import type { AccentChar } from "@/lib/letters";

function hex4(dec: number) {
  return dec.toString(16).toUpperCase().padStart(4, "0");
}

function utf8Hex(ch: string) {
  return Array.from(new TextEncoder().encode(ch))
    .map((b) => b.toString(16).padStart(2, "0").toUpperCase())
    .join(" ");
}

/** Developer reference card for a single character. */
export function TechCard({ c }: { c: AccentChar }) {
  const hx = hex4(c.dec);
  const rows: [string, string][] = [
    ["Unicode", `U+${hx}`],
    ["HTML (decimal)", `&#${c.dec};`],
    ["HTML (hex)", `&#x${hx};`],
    ["CSS content", `\\${hx}`],
    ["JS / Java / C", `\\u${hx}`],
    ["UTF-8 (hex bytes)", utf8Hex(c.ch)],
  ];
  return (
    <article className="overflow-hidden rounded-2xl border frame-line bg-white">
      <header className="flex items-center gap-4 border-b frame-line bg-paper-deep/70 px-4 py-3">
        <span className="grad-signal flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl font-black text-white">
          {c.ch}
        </span>
        <h4 className="text-[13px] font-extrabold leading-tight">{c.name}</h4>
      </header>
      <table className="w-full text-left text-[13px]">
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k} className="border-b frame-line last:border-0">
              <th className="w-[42%] px-4 py-2 font-bold text-ink-soft">
                {k}
              </th>
              <td className="px-4 py-2">
                <code className="font-mono text-[12px] text-signal-deep">{v}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

export function TechInfoGrid({ chars }: { chars: AccentChar[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {chars.map((c) => (
        <TechCard key={c.code + c.ch} c={c} />
      ))}
    </div>
  );
}
