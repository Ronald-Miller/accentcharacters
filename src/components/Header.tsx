"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Keyboard, Menu, X } from "lucide-react";
import { letterUrl } from "@/lib/site";

const ALPHA = "abcdefghijklmnopqrstuvwxyz".split("");

export function Header() {
  const [azOpen, setAzOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const azRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (azRef.current && !azRef.current.contains(e.target as Node)) {
        setAzOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setAzOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="sticky top-0 z-[60] border-b frame-line bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grad-signal flex h-10 w-10 items-center justify-center rounded-xl text-[26px] font-black leading-none text-white shadow-[0_8px_20px_-6px_rgba(192,7,237,0.55)]">
            ä
          </span>
          <span className="text-[22px] font-black tracking-tight">
            Accent<span className="text-signal">Characters</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          <div className="relative" ref={azRef}>
            <button
              type="button"
              onClick={() => setAzOpen((v) => !v)}
              aria-expanded={azOpen}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold transition-colors ${
                azOpen ? "bg-violet-tint text-signal" : "text-ink-soft hover:bg-paper-deep hover:text-ink"
              }`}
            >
              Accent Letters A–Z
              <ChevronDown
                size={14}
                strokeWidth={3}
                className={`transition-transform ${azOpen ? "rotate-180" : ""}`}
              />
            </button>
            {azOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-2 w-[360px] -translate-x-1/2 rounded-2xl border frame-line bg-white p-4 shadow-[0_24px_60px_-16px_rgba(22,26,46,0.25)]">
                <p className="kicker mb-3">Browse by letter</p>
                <div className="grid grid-cols-7 gap-1.5">
                  {ALPHA.map((l) => (
                    <Link
                      key={l}
                      href={letterUrl(l)}
                      onClick={() => setAzOpen(false)}
                      className="flex h-10 items-center justify-center rounded-lg border frame-line text-lg font-extrabold uppercase transition-all hover:border-transparent hover:bg-gradient-to-br hover:from-[#c007ed] hover:to-[#7c3aed] hover:text-white"
                    >
                      {l}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {[
            ["/alt-codes", "ALT Codes"],
            ["/#types", "Accent Types"],
            ["/#how-to-type", "How to Type"],
            ["/#faq", "FAQ"],
            ["/about", "About"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="rounded-full px-4 py-2.5 text-sm font-bold text-ink-soft transition-colors hover:bg-paper-deep hover:text-ink"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/alt-codes"
            className="btn-primary hidden px-5 py-2.5 text-sm md:inline-flex"
          >
            <Keyboard size={15} />
            ALT Codes
          </Link>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-xl border frame-line md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t frame-line bg-white px-4 pb-6 pt-3 md:hidden">
          <div className="flex flex-col gap-1 text-[15px] font-bold">
            {[
              ["/alt-codes", "ALT Codes Reference"],
              ["/#types", "Accent Types"],
              ["/#how-to-type", "How to Type Accents"],
              ["/#faq", "FAQ"],
              ["/about", "About & Editorial Policy"],
              ["/author/adrian-voss", "About the Author"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-2.5 text-ink-soft hover:bg-paper-deep hover:text-ink"
              >
                {label}
              </Link>
            ))}
          </div>
          <p className="kicker mb-2 mt-5">Letters A–Z</p>
          <div className="grid grid-cols-7 gap-1.5">
            {ALPHA.map((l) => (
              <Link
                key={l}
                href={letterUrl(l)}
                onClick={() => setMobileOpen(false)}
                className="flex h-9 items-center justify-center rounded-lg border frame-line font-extrabold uppercase hover:border-transparent hover:bg-gradient-to-br hover:from-[#c007ed] hover:to-[#7c3aed] hover:text-white"
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
