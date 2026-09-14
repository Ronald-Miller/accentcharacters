import Link from "next/link";
import Image from "next/image";
import { BadgeCheck, CalendarDays, ShieldCheck } from "lucide-react";
import { AUTHOR, dates } from "@/lib/site";

/**
 * E-E-A-T byline: real author identity, role, verification and dates.
 */
export function Byline() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border frame-line bg-paper-deep/60 px-4 py-3.5">
      <Link href={`/author/${AUTHOR.slug}`} className="group flex items-center gap-3">
        <Image
          src={AUTHOR.avatar}
          alt={`${AUTHOR.name} — Accent Characters author`}
          width={44}
          height={44}
          className="h-11 w-11 rounded-full border-2 border-[#c007ed]/40 object-cover transition-colors group-hover:border-[#c007ed]"
        />
        <span>
          <span className="flex items-center gap-1.5 text-[14px] font-extrabold">
            {AUTHOR.name}
            <BadgeCheck size={15} className="text-signal" />
          </span>
          <span className="block text-xs font-bold text-ink-soft">
            Unicode Typography Researcher
          </span>
        </span>
      </Link>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-bold text-ink-soft">
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-emerald-600" />
          Fact-checked & hand-tested
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays size={14} className="text-signal" />
          Updated{" "}
          <time dateTime={dates.modified}>{dates.modifiedLabel}</time>
        </span>
      </div>
    </div>
  );
}
