/**
 * Seed Convex with static content lifted out of the codebase:
 * testimonials, services, process steps, and default site settings.
 * Safe to run repeatedly — each seedPublic short-circuits if rows exist.
 */
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";

const url =
  process.env.NEXT_PUBLIC_CONVEX_URL ?? "https://precise-reindeer-603.convex.cloud";

const TESTIMONIALS = [
  {
    quote:
      "Robert gave my thesis a spine. My supervisor said it was the cleanest writing in the cohort.",
    who: "PhD candidate · TU Berlin",
    order: 10,
    active: true,
  },
  {
    quote: "Reuters ran our release verbatim. That had never happened before.",
    who: "Gulf Climate Summit · Dubai",
    order: 20,
    active: true,
  },
  {
    quote:
      "The contract went from 58 pages to 29 without losing a single enforceable clause.",
    who: "Meridian Legal · London",
    order: 30,
    active: true,
  },
];

const SERVICES = [
  {
    slug: "academic",
    icon: "🎓",
    name: "Academic editing",
    price: "from $0.035 / word",
    body: "Theses, dissertations, peer-reviewed papers. I match your style guide (APA, MLA, Chicago, Vancouver) and preserve every citation.",
    items: ["Structural notes", "Sentence-level edits", "Reference checks"],
    order: 10,
    active: true,
  },
  {
    slug: "legal",
    icon: "📜",
    name: "Legal review",
    price: "from $120 / hour",
    body: "Contracts, policies, terms. Plain-language rewrites that keep every enforceable clause intact.",
    items: ["Clause-level rewrites", "Defined-term hygiene", "Cross-reference audit"],
    order: 20,
    active: true,
  },
  {
    slug: "grant",
    icon: "💡",
    name: "Grant writing",
    price: "from $1,500 / proposal",
    body: "From narrative to budget justification. I've helped raise $18M+ in grants across 9 countries.",
    items: ["Theory of change", "Logic models", "Funder-specific tailoring"],
    order: 30,
    active: true,
  },
  {
    slug: "ux",
    icon: "📱",
    name: "UX copy & microcopy",
    price: "from $0.25 / string",
    body: "Product strings, error messages, onboarding. Voice, tone, and length controls baked in.",
    items: ["Voice & tone guide", "Localization prep", "A/B variant drafts"],
    order: 40,
    active: true,
  },
  {
    slug: "fiction",
    icon: "📕",
    name: "Fiction (dev edits)",
    price: "from $0.02 / word",
    body: "Novels and short collections. Structural editing, POV coherence, scene-level pacing, a kind ear.",
    items: ["Editorial letter", "Chapter-by-chapter notes", "Line-edit second pass"],
    order: 50,
    active: true,
  },
  {
    slug: "translation",
    icon: "🌐",
    name: "Translations QA",
    price: "from $0.04 / word",
    body: "Second-pair-of-eyes on EN/ES/PT/FR outputs. I catch the mistranslations that machines ship.",
    items: ["Accuracy check", "Cultural adaptation", "Style reconciliation"],
    order: 60,
    active: true,
  },
  {
    slug: "speech",
    icon: "🎤",
    name: "Speeches & scripts",
    price: "from $800 / speech",
    body: "Keynotes, commencement, boardroom. Written to be heard, not read.",
    items: ["Opening lines", "Rhythm & pauses", "Q&A rehearsal"],
    order: 70,
    active: true,
  },
  {
    slug: "press",
    icon: "🗞",
    name: "Press releases",
    price: "from $400 / release",
    body: "Lede-first, newsroom-ready. If it doesn't pass the 30-second scan, it doesn't ship.",
    items: ["Lede rewrite", "Boilerplate polish", "AP-style pass"],
    order: 80,
    active: true,
  },
];

const PROCESS = [
  {
    number: "01",
    title: "Intake",
    body: "You send the draft, audience, deadline. I reply within 24 hours with a scope.",
    order: 10,
    active: true,
  },
  {
    number: "02",
    title: "Audit",
    body: "A page-one read with 3–5 structural notes before I touch a comma.",
    order: 20,
    active: true,
  },
  {
    number: "03",
    title: "Rewrite",
    body: "Line-by-line edits in tracked changes. You see every decision.",
    order: 30,
    active: true,
  },
  {
    number: "04",
    title: "Polish",
    body: "Proofread, spellcheck, a final read aloud. Then back to you, signed.",
    order: 40,
    active: true,
  },
];

const SETTINGS = [
  { key: "hero.badge", value: "Accepting drafts for Q3 — 2 slots" },
  { key: "hero.slotsOpen", value: "true" },
  {
    key: "hero.intro",
    value:
      "I'm Robert. I edit documents — academic, legal, creative, corporate — in 47 countries and 11 languages. Pull the slider to see how.",
  },
  { key: "stats.totalCountries", value: "47" },
  { key: "stats.totalLanguages", value: "11" },
  { key: "stats.multiplierDocs", value: "37" },
  { key: "stats.multiplierWords", value: "12" },
  { key: "cta.title", value: "Send me your worst paragraph." },
  {
    key: "cta.body",
    value:
      "I'll edit it for free so you can feel the difference before you hire me.",
  },
  { key: "cta.kicker", value: "Your draft · next Monday" },
  { key: "cta.button", value: "Start the edit →" },
  { key: "contact.email", value: "hello@robertediting.example" },
  {
    key: "footer.tagline",
    value:
      "Robert edits documents in 47 countries. Academic papers, manuscripts, contracts, speeches, screenplays — anything that has to be read and remembered.",
  },
  { key: "footer.newsletterCopy", value: "The Red Pen Digest — one email a month. No fluff." },
  { key: "social.linkedin", value: "https://www.linkedin.com/" },
  { key: "social.twitter", value: "https://x.com/" },
];

async function main() {
  const c = new ConvexHttpClient(url);

  const t = await c.mutation(api.testimonials.seedPublic, { items: TESTIMONIALS });
  const s = await c.mutation(api.services.seedPublic, { items: SERVICES });
  const p = await c.mutation(api.processSteps.seedPublic, { items: PROCESS });
  const st = await c.mutation(api.settings.seedPublic, { values: SETTINGS });

  console.log(`seeded/existing → testimonials=${t} services=${s} process=${p} settings=${st}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
