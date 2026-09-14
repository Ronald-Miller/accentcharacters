import { MAC_SHORTCUTS, WORD_SHORTCUTS } from "@/lib/content";

function Kbd({ children }: { children: string }) {
  return <kbd className="kbd">{children}</kbd>;
}

/**
 * "How to type accents" reference: Windows ALT codes, Word shortcuts
 * and macOS Option keys — all standard, platform-documented input methods.
 */
export function HowToType({ id }: { id?: string }) {
  return (
    <div id={id} className="grid gap-5 scroll-mt-24 lg:grid-cols-3">
      {/* Windows */}
      <div className="rounded-2xl border frame-line bg-white p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-extrabold tracking-tight">
            Windows ALT codes
          </h3>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-amber-700">
            Numeric pad
          </span>
        </div>
        <ol className="mt-5 space-y-3.5 text-[15px] leading-relaxed text-ink-soft">
          {[
            <>Place the cursor where you want the character.</>,
            <>
              Hold <Kbd>Alt</Kbd> and type the four-digit code on the numeric
              keypad — e.g. <Kbd>Alt + 0233</Kbd>.
            </>,
            <>
              Release <Kbd>Alt</Kbd> and the letter appears —{" "}
              <strong className="text-ink">é</strong> in this example.
            </>,
          ].map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="grad-signal mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-black text-white">
                {i + 1}
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
        <p className="mt-5 border-t frame-line pt-4 text-sm text-ink-soft">
          No numeric keypad? In Word, type the Unicode value then press{" "}
          <Kbd>Alt + X</Kbd> — <Kbd>00E9</Kbd> + <Kbd>Alt + X</Kbd> converts
          to é. Every letter page lists both values.
        </p>
      </div>

      {/* Mac */}
      <div className="rounded-2xl border frame-line bg-white p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-extrabold tracking-tight">
            macOS Option keys
          </h3>
          <span className="rounded-full bg-sky-100 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-sky-700">
            Option
          </span>
        </div>
        <table className="mt-5 w-full text-left text-[14px]">
          <tbody className="[&_td]:border-b [&_td]:frame-line [&_td]:py-2 [&_tr:last-child_td]:border-0">
            {MAC_SHORTCUTS.map((r) => (
              <tr key={r.accent}>
                <td className="pr-3">
                  <Kbd>{r.keys}</Kbd>
                </td>
                <td className="pr-3 text-ink-soft">{r.then}</td>
                <td className="text-right font-extrabold">{r.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-sm text-ink-soft">
          Press the Option combination, release, then type the letter. Or
          press and hold any letter key and pick the accent from the pop-up.
        </p>
      </div>

      {/* Word */}
      <div className="rounded-2xl border frame-line bg-white p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-extrabold tracking-tight">
            Microsoft Word
          </h3>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-emerald-700">
            Shortcuts
          </span>
        </div>
        <table className="mt-5 w-full text-left text-[14px]">
          <tbody className="[&_td]:border-b [&_td]:frame-line [&_td]:py-2 [&_tr:last-child_td]:border-0">
            {WORD_SHORTCUTS.slice(0, 7).map((r) => (
              <tr key={r.keys + r.result}>
                <td className="pr-3">
                  <Kbd>{r.keys}</Kbd>
                </td>
                <td className="text-right font-extrabold">{r.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-sm text-ink-soft">
          Press the control combination, release all keys, then strike the
          letter to receive the accent.
        </p>
      </div>
    </div>
  );
}
