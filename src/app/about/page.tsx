import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  BadgeCheck,
  Database,
  FlaskConical,
  ShieldCheck,
  CalendarDays,
  ArrowRight,
  Mail,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AUTHOR, dates, site } from "@/lib/site";
import { webPage } from "@/lib/schema";

const PAGE_TITLE = "About AccentLab — Editorial Policy & Accuracy Standards";
const PAGE_DESC =
  "How AccentLab is researched, sourced and fact-checked: every accent letter compiled from the official Unicode Standard, every ALT code hand-tested by our editor.";

export const metadata: Metadata = {
  title: { absolute: `${PAGE_TITLE} | ${site.name}` },
  description: PAGE_DESC,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: `${site.url}/about`,
    title: PAGE_TITLE,
    description: PAGE_DESC,
    siteName: site.name,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    webPage({ url: `${site.url}/about`, name: PAGE_TITLE, description: PAGE_DESC }),
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-gradient-to-b from-violet-tint/70 via-white to-white">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-9 sm:px-6">
          <Breadcrumbs items={[{ label: "Accent Letters", href: "/" }, { label: "About" }]} />
          <h1 className="mt-4 max-w-3xl text-[clamp(2.3rem,5.5vw,3.9rem)] font-black leading-[1.04] tracking-tight">
            About <span className="grad-text">AccentLab</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            AccentLab is an independent reference project with one job: make
            every accented letter in the Latin alphabet one click away — and
            make every fact on the page trustworthy enough to cite.
          </p>
        </div>
      </section>

      <section className="border-b frame-line">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
            <div>
              <p className="kicker">Editorial policy</p>
              <h2 className="h-accent mt-3 text-3xl font-extrabold tracking-tight">
                How every page earns its facts
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Database,
                  h: "Primary source only",
                  p: "Character names, code points and groupings are compiled from the Unicode Consortium’s official character database — the same standard computers themselves use. We never copy character lists from other websites.",
                },
                {
                  icon: FlaskConical,
                  h: "Physical verification",
                  p: "Each ALT code, Word shortcut and macOS Option combination is typed by hand on real hardware — Windows 11, Microsoft 365 and current macOS — before publication.",
                },
                {
                  icon: ShieldCheck,
                  h: "Single accountable editor",
                  p: "One named editor researches, writes and reviews every page. No syndicated content, no AI summaries presented as expertise, no anonymous publishing.",
                },
                {
                  icon: CalendarDays,
                  h: "Visible revision dates",
                  p: `Every page displays its publication and review dates. Site-wide review cycle: quarterly. Last full review: ${dates.modifiedLabel}.`,
                },
              ].map((c) => (
                <div key={c.h} className="rounded-2xl border frame-line bg-white p-5">
                  <c.icon size={22} className="text-signal" />
                  <h3 className="mt-3 font-extrabold">{c.h}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">{c.p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* author block */}
      <section className="border-b frame-line bg-violet-tint/40">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[auto_1fr]">
          <Image
            src={AUTHOR.avatar}
            alt={`${AUTHOR.name} — ${AUTHOR.role}`}
            width={160}
            height={160}
            className="h-36 w-36 rounded-2xl border-4 border-white object-cover shadow-[0_18px_40px_-18px_rgba(124,58,237,0.5)]"
          />
          <div>
            <p className="kicker">The editor</p>
            <Link href={`/author/${AUTHOR.slug}`} className="group mt-2 block">
              <h2 className="text-3xl font-extrabold tracking-tight group-hover:text-signal">
                {AUTHOR.name}
                <BadgeCheck size={22} className="ml-2 inline-block -translate-y-0.5 text-signal" />
              </h2>
            </Link>
            <p className="mt-1 text-sm font-bold text-ink-soft">{AUTHOR.role}</p>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
              {AUTHOR.shortBio} {" "}
              {AUTHOR.credentials[0]} — {AUTHOR.credentials[1].toLowerCase()}.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={`/author/${AUTHOR.slug}`} className="btn-primary px-5 py-2.5 text-sm">
                Full author profile
                <ArrowRight size={14} />
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-full border frame-line bg-white px-5 py-2.5 text-sm font-extrabold text-ink-soft transition-colors hover:border-[#c007ed] hover:text-signal"
              >
                <Mail size={14} />
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* mission + corrections */}
      <section>
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="h-accent text-2xl font-extrabold tracking-tight">Why this site exists</h2>
            <div className="prose-block mt-4">
              <p>
                AccentLab began with a résumé. A friend needed a German ü on
                an English keyboard at 11 pm, and ten minutes of forum
                scrolling produced three conflicting ALT codes and one wrong
                answer. The information existed — it was just scattered,
                unreliable and ugly to use.
              </p>
              <p>
                So we built the page we wished had appeared first: every
                accented letter in one place, every code verified, every
                method demonstrated — free forever, with a name and a face
                standing behind the facts.
              </p>
            </div>
          </div>
          <div>
            <h2 className="h-accent text-2xl font-extrabold tracking-tight">Corrections & feedback</h2>
            <div className="prose-block mt-4">
              <p>
                Accuracy is a process, not a badge. If you find a code that
                fails on your machine, a name that doesn’t match the Unicode
                Standard, or an accented letter we have missed, tell us —
                verified corrections ship within 48 hours and are credited in
                the affected page’s revision date.
              </p>
              <p>
                Write to <a href={`mailto:${site.email}`}>{site.email}</a> with
                the page URL, what you tried and what happened. Screenshots
                earn our eternal gratitude.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
