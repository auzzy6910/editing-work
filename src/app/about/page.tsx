import Link from "next/link";
import { CASES } from "@/lib/cases";
import { countryFlag } from "@/lib/utils";

export const metadata = {
  title: "About — Robert Editing",
};

const LANGUAGES = ["English", "Spanish", "Portuguese", "French", "German", "Italian", "Swahili (reading)"];

export default function AboutPage() {
  const uniqueCountries = Array.from(new Set(CASES.map((c) => c.country)));
  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert">About</p>
      <h1 className="mt-2 font-display text-5xl md:text-7xl leading-[1.05]">
        I edit for people who have something true to say.
      </h1>
      <div className="mt-10 space-y-6 text-lg text-ink-soft">
        <p>
          I&apos;m Robert — a document editor with 14 years of practice across academia, law, tech,
          and fiction. I&apos;ve edited a dissertation in a Berlin café, a minister&apos;s speech
          over a sleepless weekend in Bogotá, and a debut novel one chapter at a time for a year.
        </p>
        <p>
          My job is to make your writing sound more like you, not more like me. I cut hedges. I
          keep voice. I find the one sentence you should have opened with and put it there.
        </p>
        <p>
          I hold an MA in Literature (Edinburgh) and a Certificate in Editing (UC Berkeley). I am
          a member of the Chartered Institute of Editing and Proofreading.
        </p>
      </div>

      <section className="mt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert">Languages</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {LANGUAGES.map((l) => (
            <span
              key={l}
              className="rounded-full border border-robert-soft bg-canvas px-3 py-1 text-sm"
            >
              {l}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert">
          Cities I&apos;ve edited for
        </p>
        <div className="mt-3 grid grid-cols-6 gap-3 text-3xl sm:grid-cols-12">
          {uniqueCountries.map((iso) => (
            <span key={iso} title={iso} aria-hidden>
              {countryFlag(iso)}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm text-ink-muted">
          Plus dozens more not pictured. If your city isn&apos;t here, I&apos;d be glad to add it.
        </p>
      </section>

      <div className="mt-16 rounded-xl2 border border-robert-soft/60 bg-snow p-8">
        <p className="font-display text-2xl italic text-ink">
          &ldquo;Good writing is a conversation at scale. My job is to make sure nobody leaves the room.&rdquo;
        </p>
        <p className="mt-3 text-sm text-ink-muted">— Robert</p>
      </div>

      <div className="mt-12 flex gap-3">
        <Link
          href="/contact"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-robert"
        >
          Start a project
        </Link>
        <Link
          href="/work"
          className="rounded-full border border-robert-soft bg-canvas px-5 py-2.5 text-sm transition hover:border-robert"
        >
          See the work
        </Link>
      </div>
    </div>
  );
}
