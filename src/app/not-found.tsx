import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
      <p className="grad-text text-[clamp(6rem,20vw,12rem)] font-black leading-none">
        ø
      </p>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
        This page took an accent too far.
      </h1>
      <p className="mx-auto mt-4 max-w-md leading-relaxed text-ink-soft">
        The address you followed doesn’t exist — but 600+ accented letters
        are one click away on the homepage.
      </p>
      <Link href="/" className="btn-primary mt-8 px-6 py-3 text-sm">
        <ArrowLeft size={15} />
        Back to AccentLab
      </Link>
    </div>
  );
}
