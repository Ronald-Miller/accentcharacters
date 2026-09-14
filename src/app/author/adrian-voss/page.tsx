import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  BadgeCheck,
  BookOpenCheck,
  GraduationCap,
  ArrowRight,
  Mail,
  Type,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AzIndex } from "@/components/AzIndex";
import { ALL_LETTERS } from "@/lib/letters";
import { AUTHOR, letterUrl, site } from "@/lib/site";
import { authorPerson, webPage } from "@/lib/schema";

const PAGE_TITLE = `${AUTHOR.name} — Author & Editor, Accent Characters`;
const PAGE_DESC = `Meet ${AUTHOR.name}, ${AUTHOR.role}. He compiles and hand-tests every accented letter, ALT code and keyboard shortcut published on Accent Characters.`;

export const metadata: Metadata = {
  title: { absolute: `${PAGE_TITLE} | ${site.name}` },
  description: PAGE_DESC,
  alternates: { canonical: `/author/${AUTHOR.slug}` },
  openGraph: {
    type: "profile",
    url: `${site.url}/author/${AUTHOR.slug}`,
    title: PAGE_TITLE,
    description: PAGE_DESC,
    siteName: site.name,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    authorPerson(),
    webPage({
      url: `${site.url}/author/${AUTHOR.slug}`,
      name: PAGE_TITLE,
      description: PAGE_DESC,
    }),
    {
      "@type": "ProfilePage",
      mainEntity: { "@id": `${site.url}/author/${AUTHOR.slug}#person` },
    },
  ],
};

export default function AuthorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* profile header */}
      <section className="bg-gradient-to-b from-violet-tint/70 via-white to-white">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-9 sm:px-6">
          <Breadcrumbs
            items={[
              { label: "Accent Letters", href: "/" },
              { label: "Author" },
              { label: AUTHOR.name },
            ]}
          />
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[auto_1fr]">
            <Image
              src={AUTHOR.avatar}
              alt={`${AUTHOR.name}, ${AUTHOR.role} at Accent Characters`}
              width={220}
              height={220}
              priority
              className="h-44 w-44 rounded-3xl border-4 border-white object-cover shadow-[0_24px_60px_-24px_rgba(124,58,237,0.6)] sm:h-56 sm:w-56"
            />
            <div>
              <p className="kicker">Author &amp; founder</p>
              <h1 className="mt-2 text-[clamp(2.3rem,5.5vw,3.9rem)] font-black leading-[1.04] tracking-tight">
                {AUTHOR.name}
                <BadgeCheck size={30} className="ml-3 inline-block -translate-y-2 text-signal" />
              </h1>
              <p className="mt-2 text-lg font-bold text-ink-soft">{AUTHOR.role}</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
                {AUTHOR.shortBio}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="btn-primary px-5 py-2.5 text-sm"
                >
                  <Mail size={14} />
                  Contact Adrian
                </a>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border frame-line bg-white px-5 py-2.5 text-sm font-extrabold text-ink-soft transition-colors hover:border-[#c007ed] hover:text-signal"
                >
                  Editorial policy
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* bio + credentials */}
      <section className="border-b frame-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="h-accent text-2xl font-extrabold tracking-tight">
              About Adrian
            </h2>
            <div className="prose-block mt-5">
              {AUTHOR.bio.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <div className="rounded-2xl border frame-line bg-white p-6">
              <h3 className="flex items-center gap-2 font-extrabold">
                <BookOpenCheck size={18} className="text-signal" />
                Areas of expertise
              </h3>
              <ul className="mt-4 space-y-2.5">
                {AUTHOR.expertise.map((e) => (
                  <li key={e} className="flex items-start gap-2.5 text-[14px] leading-snug text-ink-soft">
                    <Type size={14} className="mt-0.5 shrink-0 text-signal" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border frame-line bg-white p-6">
              <h3 className="flex items-center gap-2 font-extrabold">
                <GraduationCap size={18} className="text-signal" />
                Credentials
              </h3>
              <ul className="mt-4 space-y-2.5">
                {AUTHOR.credentials.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-[14px] leading-snug text-ink-soft">
                    <BadgeCheck size={14} className="mt-0.5 shrink-0 text-emerald-600" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* pages by this author */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="h-accent text-2xl font-extrabold tracking-tight">
            Pages written &amp; reviewed by {AUTHOR.name.split(" ")[0]}
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
            All {ALL_LETTERS.length} letter references plus the{" "}
            <Link href="/alt-codes" className="font-bold text-signal-deep underline underline-offset-4">
              master ALT code table
            </Link>{" "}
            are compiled, typed and dated by him:
          </p>
          <div className="mt-7">
            <AzIndex />
          </div>
        </div>
      </section>
    </>
  );
}
