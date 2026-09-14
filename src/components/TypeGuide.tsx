import { Lightbulb } from "lucide-react";
import type { AccentChar } from "@/lib/letters";

function StepList({ steps }: { steps: React.ReactNode[] }) {
  return (
    <ol className="mt-4 space-y-3">
      {steps.map((s, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="grad-signal mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-black text-white">
            {i + 1}
          </span>
          <span className="text-[15px] leading-relaxed text-ink-soft">{s}</span>
        </li>
      ))}
    </ol>
  );
}

function Kbd({ children }: { children: string }) {
  return <kbd className="kbd">{children}</kbd>;
}

/**
 * Two keyboard methods for typing a sample accented letter, shown with
 * the actual codes of that letter. All prose is original to Accent Characters.
 */
export function TypeGuide({
  letter,
  sample,
}: {
  letter: string;
  sample: AccentChar;
}) {
  const digits = String(sample.dec).split("");
  const hex = sample.code.replace("U+", "");
  const hexDigits = hex.split("");
  const L = letter;

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {/* Method 1 */}
      <div className="rounded-2xl border frame-line bg-white p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-extrabold tracking-tight">
            Method 1 — Numeric keypad ALT code
          </h3>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-amber-700">
            Windows
          </span>
        </div>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          Type {sample.ch} into any Windows program using its ALT code,{" "}
          <strong className="text-ink">Alt + {sample.dec}</strong>. You need a
          working numeric keypad with Num Lock on.
        </p>
        <StepList
          steps={[
            <>
              Click exactly where you want the accented {L} letter to appear —
              in Word, an email, a browser field, anywhere.
            </>,
            <>
              Make sure <Kbd>Num Lock</Kbd> is on. On laptops without a
              separate keypad, enable the embedded keypad first with{" "}
              <Kbd>Fn</Kbd> + <Kbd>Num Lock</Kbd>.
            </>,
            <>
              Press and hold the <Kbd>Alt</Kbd> key.
            </>,
            <>
              While keeping <Kbd>Alt</Kbd> held, type{" "}
              <span className="inline-flex items-center gap-1">
                {digits.map((d, i) => (
                  <kbd key={i} className="kbd">{d}</kbd>
                ))}
              </span>{" "}
              on the numeric keypad.
            </>,
            <>
              Release <Kbd>Alt</Kbd> — {sample.ch} appears where your cursor
              is parked.
            </>,
          ]}
        />
        <div className="callout mt-5 flex gap-2.5">
          <Lightbulb size={17} className="mt-0.5 shrink-0 text-signal" />
          <span>
            <strong className="text-ink">If a code produces the wrong symbol:</strong>{" "}
            very long ALT codes (four digits and beyond) can render as a
            placeholder glyph in older apps. Repeat the same steps inside a
            Microsoft Word document — Word resolves the full Unicode range
            correctly, and you can copy the result anywhere else.
          </span>
        </div>
      </div>

      {/* Method 2 */}
      <div className="rounded-2xl border frame-line bg-white p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-extrabold tracking-tight">
            Method 2 — Unicode value + Alt X
          </h3>
          <span className="rounded-full bg-sky-100 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-sky-700">
            Word &amp; Office
          </span>
        </div>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          Every character owns a hexadecimal ID — for {sample.ch} it is{" "}
          <strong className="text-ink">{sample.code}</strong>. Microsoft Word
          converts that ID into the character itself.
        </p>
        <StepList
          steps={[
            <>Open a Word document (or any Office app that supports Unicode).</>,
            <>
              Type the four-character code{" "}
              <span className="inline-flex items-center gap-1">
                {hexDigits.map((d, i) => (
                  <kbd key={i} className="kbd">{d}</kbd>
                ))}
              </span>{" "}
              using your regular keyboard.
            </>,
            <>
              Without pressing space, hit <Kbd>Alt</Kbd> + <Kbd>X</Kbd>{" "}
              together.
            </>,
            <>
              Word swaps the code for the letter — {hex} becomes {sample.ch}
              instantly.
            </>,
          ]}
        />
        <div className="callout mt-5 flex gap-2.5">
          <Lightbulb size={17} className="mt-0.5 shrink-0 text-signal" />
          <span>
            This trick works both ways: place your cursor after any accented
            character and press <Kbd>Alt</Kbd> + <Kbd>X</Kbd> to reveal its
            Unicode value. It is the fastest way to identify a mystery
            character you have received in a document.
          </span>
        </div>
      </div>
    </div>
  );
}
