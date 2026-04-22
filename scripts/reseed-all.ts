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
      "I had given up on getting my KCSE replacement. Robert had it in my hands in three weeks with a fresh KNEC stamp.",
    who: "Brian O. · Kisumu",
    order: 10,
    active: true,
  },
  {
    quote:
      "My passport was renewed in five working days before a medical conference. The fast-track queue actually works when you know the procedure.",
    who: "Dr. Njeri · Nairobi",
    order: 20,
    active: true,
  },
  {
    quote:
      "A clerk had misspelt my surname on my birth certificate in 2003. Robert got the correction through Sheria House without a single back-and-forth from me.",
    who: "Wanjiru family · Nairobi",
    order: 30,
    active: true,
  },
];

const SERVICES = [
  {
    slug: "birth-certificate",
    icon: "🧾",
    name: "Birth Certificate",
    price: "from KES 3,500",
    body: "New applications, late registrations, name/date corrections and replacements at the Civil Registration (Sheria House) and county registrars.",
    items: [
      "New late-registration applications",
      "Name / date-of-birth corrections",
      "Lost or damaged replacements",
      "Certified true copies",
    ],
    order: 10,
    active: true,
  },
  {
    slug: "marriage-certificate",
    icon: "💍",
    name: "Marriage Certificate",
    price: "from KES 4,500",
    body: "Civil, Christian, Islamic and Customary marriage registrations, plus replacements and certified true copies of existing certificates.",
    items: [
      "New civil / customary registrations",
      "Certified true copies",
      "Replacement of lost certificates",
      "Name-alignment affidavits",
    ],
    order: 20,
    active: true,
  },
  {
    slug: "kcpe-kcse",
    icon: "🎓",
    name: "KCPE & KCSE Certificates",
    price: "from KES 5,500",
    body: "Replacements of lost certificates and corrections of names or particulars processed through KNEC, with school liaison where required.",
    items: [
      "Lost certificate replacements",
      "Name / particulars corrections",
      "Grade-slip reissue",
      "KNEC verification letters",
    ],
    order: 30,
    active: true,
  },
  {
    slug: "travel-document",
    icon: "🛂",
    name: "Travel Documents",
    price: "from KES 6,500",
    body: "Passport applications and renewals, Emergency Travel Certificates (ETC), East African passports and minors' travel documents via eCitizen and Immigration.",
    items: [
      "New biometric passports (A, B, C)",
      "Passport renewals & fast-track",
      "Emergency Travel Certificates",
      "Minors' passports & parental consents",
    ],
    order: 40,
    active: true,
  },
  {
    slug: "degree-diploma-craft",
    icon: "📜",
    name: "Degree, Diploma & Craft Certificates",
    price: "from KES 7,500",
    body: "Replacement and verification of university, TVET and KNEC craft/diploma certificates, plus CUE verification and MOFA authentication for use abroad.",
    items: [
      "University replacements (UoN, KU, Egerton, others)",
      "KNEC / TVET craft & diploma replacements",
      "CUE verification letters",
      "MOFA / embassy authentication",
    ],
    order: 50,
    active: true,
  },
];

const PROCESS = [
  {
    number: "01",
    title: "Consultation",
    body: "Tell me the certificate, the issue and your deadline. I reply the same day with the exact documents you'll need and the government fee.",
    order: 10,
    active: true,
  },
  {
    number: "02",
    title: "Paperwork prep",
    body: "We compile affidavits, ID copies, passport photos and supporting letters together — nothing you didn't already have at home.",
    order: 20,
    active: true,
  },
  {
    number: "03",
    title: "Submission & follow-up",
    body: "I lodge the application at the relevant office (Sheria House, KNEC, Nyayo House, CUE) and follow up in person every few days until it is ready.",
    order: 30,
    active: true,
  },
  {
    number: "04",
    title: "Collection & delivery",
    body: "I collect the certificate, check the details are correct, and deliver to you in Nairobi or courier nationwide. Sealed, stamped, ready to use.",
    order: 40,
    active: true,
  },
];

const SETTINGS = [
  {
    key: "hero.badge",
    value: "Taking new cases this month — Nairobi & nationwide",
  },
  { key: "hero.slotsOpen", value: "true" },
  {
    key: "hero.intro",
    value:
      "I'm Robert. I help Kenyans register, correct, replace, and verify official documents — birth, marriage, KCPE/KCSE, passports, degrees & craft certs. Pull the slider to see a real correction.",
  },
  { key: "stats.totalCountries", value: "47" },
  { key: "stats.totalLanguages", value: "2" },
  { key: "stats.multiplierDocs", value: "37" },
  { key: "stats.multiplierWords", value: "12" },
  { key: "cta.kicker", value: "Your file · next week" },
  { key: "cta.title", value: "Tell me what you need." },
  {
    key: "cta.body",
    value:
      "Share a short note with the certificate, the issue, and your deadline. I'll quote a clear fee and a realistic timeline the same day.",
  },
  { key: "cta.button", value: "Start an application →" },
  { key: "contact.email", value: "hello@robertediting.co.ke" },
  {
    key: "footer.tagline",
    value:
      "Robert handles Kenyan documents end-to-end: birth & marriage certificates, KCPE/KCSE replacements, passports & travel docs, degree, diploma and craft certificates. Nationwide.",
  },
  {
    key: "footer.newsletterCopy",
    value: "Paperwork notes — occasional updates on fees, timelines & agency changes.",
  },
  { key: "social.linkedin", value: "https://www.linkedin.com/" },
  { key: "social.twitter", value: "https://x.com/" },
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
