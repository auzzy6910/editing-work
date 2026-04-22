import Link from "next/link";

export const metadata = { title: "Services — Robert Editing" };

const SERVICES = [
  {
    icon: "🎓",
    name: "Academic editing",
    price: "from $0.035 / word",
    body: "Theses, dissertations, peer-reviewed papers. I match your style guide (APA, MLA, Chicago, Vancouver) and preserve every citation.",
    items: ["Structural notes", "Sentence-level edits", "Reference checks"],
  },
  {
    icon: "📜",
    name: "Legal review",
    price: "from $120 / hour",
    body: "Contracts, policies, terms. Plain-language rewrites that keep every enforceable clause intact.",
    items: ["Clause-level rewrites", "Defined-term hygiene", "Cross-reference audit"],
  },
  {
    icon: "💡",
    name: "Grant writing",
    price: "from $1,500 / proposal",
    body: "From narrative to budget justification. I&apos;ve helped raise $18M+ in grants across 9 countries.",
    items: ["Theory of change", "Logic models", "Funder-specific tailoring"],
  },
  {
    icon: "📱",
    name: "UX copy & microcopy",
    price: "from $0.25 / string",
    body: "Product strings, error messages, onboarding. Voice, tone, and length controls baked in.",
    items: ["Voice & tone guide", "Localization prep", "A/B variant drafts"],
  },
  {
    icon: "📕",
    name: "Fiction (dev edits)",
    price: "from $0.02 / word",
    body: "Novels and short collections. Structural editing, POV coherence, scene-level pacing, a kind ear.",
    items: ["Editorial letter", "Chapter-by-chapter notes", "Line-edit second pass"],
  },
  {
    icon: "🌐",
    name: "Translations QA",
    price: "from $0.04 / word",
    body: "Second-pair-of-eyes on EN/ES/PT/FR outputs. I catch the mistranslations that machines ship.",
    items: ["Accuracy check", "Cultural adaptation", "Style reconciliation"],
  },
  {
    icon: "🎤",
    name: "Speeches & scripts",
    price: "from $800 / speech",
    body: "Keynotes, commencement, boardroom. Written to be heard, not read.",
    items: ["Opening lines", "Rhythm & pauses", "Q&A rehearsal"],
  },
  {
    icon: "🗞",
    name: "Press releases",
    price: "from $400 / release",
    body: "Lede-first, newsroom-ready. If it doesn&apos;t pass the 30-second scan, it doesn&apos;t ship.",
    items: ["Lede rewrite", "Boilerplate polish", "AP-style pass"],
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert">Services</p>
      <h1 className="mt-2 max-w-3xl font-display text-5xl md:text-7xl leading-[1.05]">
        Eight ways I can make your writing sharper.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-ink-soft">
        Every engagement starts with a free 100-word sample edit so you can feel the difference
        before you commit.
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <div
            key={s.name}
            className="flex flex-col rounded-xl2 border border-robert-soft/60 bg-canvas p-6 shadow-card"
          >
            <div className="text-3xl" aria-hidden>
              {s.icon}
            </div>
            <h2 className="mt-4 font-display text-2xl">{s.name}</h2>
            <p className="mt-1 font-mono text-xs text-robert">{s.price}</p>
            <p className="mt-3 text-sm text-ink-soft">{s.body}</p>
            <ul className="mt-4 space-y-1 text-sm text-ink-soft">
              {s.items.map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-robert" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-xl2 bg-ink p-10 text-white md:p-14">
        <h3 className="font-display text-3xl md:text-4xl">Not sure which service you need?</h3>
        <p className="mt-3 max-w-2xl text-white/70">
          Send me 100 words. I&apos;ll tell you — honestly — whether you need me at all.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-robert-soft"
        >
          Send the sample →
        </Link>
      </div>
    </div>
  );
}
