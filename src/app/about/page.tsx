import Link from "next/link";
import { LiveCountries } from "@/components/about/LiveCountries";

export const metadata = {
  title: "About — Robert Editing",
};

const LANGUAGES = ["English", "Kiswahili"];

const CERT_FAMILIES = [
  "Birth Certificates",
  "Marriage Certificates",
  "KCPE & KCSE Certificates",
  "Travel Documents (Passports & ETCs)",
  "Degree, Diploma & Craft Certificates",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert">About</p>
      <h1 className="mt-2 font-display text-5xl md:text-7xl leading-[1.05]">
        Your paperwork. Edited clean.
      </h1>
      <div className="mt-10 space-y-6 text-lg text-ink-soft">
        <p>
          I&apos;m Robert — a Kenya-based document editor and retoucher. My work is
          narrow and precise: I clean up the <em>information</em> printed on your
          existing certificates so it reads exactly how it should.
        </p>
        <p>
          I work on five certificate families: <strong>birth certificates</strong>,{" "}
          <strong>marriage certificates</strong>, <strong>KCPE &amp; KCSE certificates</strong>,{" "}
          <strong>travel documents</strong> (passports &amp; ETCs), and{" "}
          <strong>degree, diploma &amp; craft certificates</strong>. On each, I edit
          details like a misspelled name, a wrong date, the wrong place of issue, or
          parents&apos; / spouse&apos;s particulars — matching the original typeface,
          stamps and paper texture so the result looks like the original printing.
        </p>
        <p>
          I do not submit applications for you. I do not collect or deliver originals
          from government offices. I do not issue replacements. Every job I take is
          purely editing and retouching on the scan you send me. Clean in, clean out.
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
          Certificate families we edit
        </p>
        <ul className="mt-4 grid gap-2 md:grid-cols-2">
          {CERT_FAMILIES.map((a) => (
            <li
              key={a}
              className="rounded-md border border-robert-soft/60 bg-canvas px-3 py-2 text-sm text-ink-soft"
            >
              {a}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert">
          Counties we&apos;ve served
        </p>
        <LiveCountries />
      </section>

      <div className="mt-16 rounded-xl2 border border-robert-soft/60 bg-snow p-8">
        <p className="font-display text-2xl italic text-ink">
          &ldquo;If the detail is printed on the scan, I can edit it so it reads
          exactly how it should.&rdquo;
        </p>
        <p className="mt-3 text-sm text-ink-muted">— Robert</p>
      </div>

      <div className="mt-12 flex gap-3">
        <Link
          href="/contact"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-robert"
        >
          Book editing
        </Link>
        <Link
          href="/work"
          className="rounded-full border border-robert-soft bg-canvas px-5 py-2.5 text-sm transition hover:border-robert"
        >
          See recent edits
        </Link>
      </div>
    </div>
  );
}
