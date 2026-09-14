"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Check } from "lucide-react";

interface Toast {
  ch: string;
  name: string;
  id: number;
}

const CopyCtx = createContext<(ch: string, name?: string) => void>(() => {});

export function useCopy() {
  return useContext(CopyCtx);
}

async function writeClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    } catch {
      return false;
    }
  }
}

export function CopyProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback((ch: string, name = "") => {
    void writeClipboard(ch);
    setToast({ ch, name, id: Date.now() });
    const el = document.activeElement as HTMLElement | null;
    if (el && el.dataset?.charTile) {
      el.classList.add("copied");
      setTimeout(() => el.classList.remove("copied"), 650);
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 1900);
  }, []);

  return (
    <CopyCtx.Provider value={copy}>
      {children}
      <div
        aria-live="polite"
        role="status"
        className="pointer-events-none fixed bottom-5 left-1/2 z-[90] -translate-x-1/2"
      >
        {toast && (
          <div
            key={toast.id}
            className="toast-anim grad-signal flex items-center gap-3 rounded-2xl px-4 py-2.5 text-white shadow-[0_16px_40px_-10px_rgba(192,7,237,0.6)]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/25">
              <Check size={15} strokeWidth={3.5} />
            </span>
            <span className="text-xl font-extrabold leading-none">{toast.ch}</span>
            <span className="max-w-[220px] truncate text-xs font-bold tracking-wide opacity-90">
              Copied to clipboard
            </span>
          </div>
        )}
      </div>
    </CopyCtx.Provider>
  );
}
