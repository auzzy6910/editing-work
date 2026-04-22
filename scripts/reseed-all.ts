/**
 * Admin-only: wipe existing testimonials / services / processSteps rows
 * and re-seed them with current fallbacks from scripts/seed-content.ts.
 * Also overwrites every known settings key so copy reflects the current pivot.
 * Also upserts cases.
 *
 * Usage:
 *   ADMIN_TOKEN=... pnpm dlx tsx scripts/reseed-all.ts
 */
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import { CASES } from "../src/lib/cases";

const url =
  process.env.NEXT_PUBLIC_CONVEX_URL ?? "https://precise-reindeer-603.convex.cloud";
const token = process.env.ADMIN_TOKEN;

if (!token) {
  console.error("ADMIN_TOKEN env var is required");
  process.exit(1);
}

const TESTIMONIALS = [
  {
    quote:
      "My KCSE certificate had my surname spelt wrong since 2009. Robert edited the scan so cleanly you can't tell anything was ever touched.",
    who: "Brian O. · Kisumu",
    order: 10,
    active: true,
  },
  {
    quote:
      "Single wrong digit on my passport bio-page date of birth. I sent the scan in the morning, got a pixel-perfect edit back the same afternoon.",
    who: "Dr. Njeri · Nairobi",
    order: 20,
    active: true,
  },
  {
    quote:
      "A clerk misspelt my surname on my birth certificate in 2003. Robert retouched the scan in two days — matches the original typewriter exactly.",
    who: "Wanjiru family · Nairobi",
    order: 30,
    active: true,
  },
];

const COMMON_ITEMS = [
  "Correcting misspelled names",
  "Changing date of birth / date of issue",
  "Changing place (location, sub-county, ward)",
  "Updating parents' or spouse's details",
  "Name others",
];

const SERVICES = [
  {
    slug: "birth-certificate",
    icon: "🧾",
    name: "Birth Certificate",
    price: "",
    body: "Editing and retouching of birth-certificate details — we clean up mistakes on your existing certificate so it reads exactly how it should.",
    items: COMMON_ITEMS,
    order: 10,
    active: true,
  },
  {
    slug: "marriage-certificate",
    icon: "💍",
    name: "Marriage Certificate",
    price: "",
    body: "Editing and retouching of marriage-certificate details — names, dates, places and witness lines corrected on your existing certificate.",
    items: COMMON_ITEMS,
    order: 20,
    active: true,
  },
  {
    slug: "kcpe-kcse",
    icon: "🎓",
    name: "KCPE & KCSE Certificates",
    price: "",
    body: "Editing and retouching of KCPE / KCSE certificate details — corrections to name spellings, index numbers and other particulars.",
    items: COMMON_ITEMS,
    order: 30,
    active: true,
  },
  {
    slug: "travel-document",
    icon: "🛂",
    name: "Travel Documents",
    price: "",
    body: "Editing and retouching of passport and travel-document details — name, date-of-birth and place-of-issue fixes on your existing document.",
    items: COMMON_ITEMS,
    order: 40,
    active: true,
  },
  {
    slug: "degree-diploma-craft",
    icon: "📜",
    name: "Degree, Diploma & Craft Certificates",
    price: "",
    body: "Editing and retouching of degree, diploma and craft certificate details — names, dates and particulars cleaned up on your existing certificate.",
    items: COMMON_ITEMS,
    order: 50,
    active: true,
  },
];

const PROCESS = [
  {
    number: "01",
    title: "Brief",
    body: "Tell me which certificate it is and exactly which details need editing — name spelling, date, place, parents / spouse, and others. Same-day quote.",
    order: 10,
    active: true,
  },
  {
    number: "02",
    title: "Clear scan",
    body: "Send a clear scan or phone photo of the document. I confirm the edits and the final copy you'll get back before any work starts.",
    order: 20,
    active: true,
  },
  {
    number: "03",
    title: "Edit & retouch",
    body: "I edit the details digitally — preserving the original typeface, stamps, seals and paper texture so the final reads exactly like the original printing.",
    order: 30,
    active: true,
  },
  {
    number: "04",
    title: "Your edited copy",
    body: "You get the edited high-resolution file back for review, with one free round of touch-ups if you spot anything else that needs fixing.",
    order: 40,
    active: true,
  },
];

const SETTINGS = [
  {
    key: "hero.badge",
    value: "Taking new edits this month — Nairobi & Kenya-wide",
  },
  { key: "hero.slotsOpen", value: "true" },
  {
    key: "hero.intro",
    value:
      "I'm Robert. I edit and retouch the details on your existing Kenyan documents — birth, marriage, KCPE / KCSE, passports, and degree / diploma / craft certificates. Pull the slider to see a real edit.",
  },
  { key: "stats.totalCountries", value: "47" },
  { key: "stats.totalLanguages", value: "2" },
  { key: "stats.multiplierDocs", value: "37" },
  { key: "stats.multiplierWords", value: "12" },
  { key: "cta.kicker", value: "Your edit · back this week" },
  { key: "cta.title", value: "Tell me what to edit." },
  {
    key: "cta.body",
    value:
      "Share a clear scan of the certificate and which details need editing. I'll reply the same day with a quote for the edit and a realistic turnaround.",
  },
  { key: "cta.button", value: "Book editing →" },
  { key: "contact.email", value: "hello@robertediting.co.ke" },
  {
    key: "footer.tagline",
    value:
      "Robert edits and retouches the details on your existing Kenyan certificates — birth & marriage, KCPE / KCSE, passports & travel docs, degree, diploma and craft. Kenya-wide.",
  },
  {
    key: "footer.newsletterCopy",
    value:
      "Editing notes — occasional tips on keeping your certificate scans clean and edit-ready.",
  },
  {
    key: "social.facebook",
    value: "https://www.facebook.com/profile.php?id=61567790639771",
  },
];

async function main() {
  const c = new ConvexHttpClient(url);

  // Wipe and re-seed testimonials
  const tRows = await c.query(api.testimonials.listAllAdmin, { token: token! });
  for (const r of tRows) await c.mutation(api.testimonials.remove, { token: token!, id: r.id });
  for (const t of TESTIMONIALS) await c.mutation(api.testimonials.create, { token: token!, ...t });
  console.log(`testimonials: wiped ${tRows.length}, inserted ${TESTIMONIALS.length}`);

  // Wipe and re-seed services
  const sRows = await c.query(api.services.listAllAdmin, { token: token! });
  for (const r of sRows) await c.mutation(api.services.remove, { token: token!, id: r.id });
  for (const s of SERVICES) await c.mutation(api.services.create, { token: token!, ...s });
  console.log(`services: wiped ${sRows.length}, inserted ${SERVICES.length}`);

  // Wipe and re-seed process steps
  const pRows = await c.query(api.processSteps.listAllAdmin, { token: token! });
  for (const r of pRows) await c.mutation(api.processSteps.remove, { token: token!, id: r.id });
  for (const p of PROCESS) await c.mutation(api.processSteps.create, { token: token!, ...p });
  console.log(`process: wiped ${pRows.length}, inserted ${PROCESS.length}`);

  // Upsert settings (setMany is idempotent)
  await c.mutation(api.settings.setMany, { token: token!, values: SETTINGS });
  console.log(`settings: upserted ${SETTINGS.length} keys`);

  // Upsert cases (seedPublic is idempotent upsert-by-slug)
  const caseCount = await c.mutation(api.cases.seedPublic, { items: CASES });
  console.log(`cases: upserted ${caseCount}`);

  // Delete any cases whose slug is not in the new 8 — old literary cases.
  const allCases = await c.query(api.cases.listForAdmin, { token: token! });
  const keep = new Set(CASES.map((c) => c.slug));
  const stale = allCases.filter((r) => !keep.has(r.slug));
  for (const r of stale) await c.mutation(api.cases.remove, { token: token!, id: r.id });
  console.log(`cases: removed ${stale.length} stale cases, kept ${CASES.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
