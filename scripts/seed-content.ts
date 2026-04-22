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

const COMMON_ITEMS = [
  "Correcting misspelled names",
  "Changing date of birth / date of issue",
  "Changing place (location, sub-county, ward)",
  "Updating parents' or spouse's details",
  "Replacing lost, damaged or stolen certificates",
  "Certified true copies & reprints",
];

const SERVICES = [
  {
    slug: "birth-certificate",
    icon: "🧾",
    name: "Birth Certificate",
    price: "",
    body: "New applications, late registrations, and corrections at the Civil Registration (Sheria House) and county registrars.",
    items: COMMON_ITEMS,
    order: 10,
    active: true,
  },
  {
    slug: "marriage-certificate",
    icon: "💍",
    name: "Marriage Certificate",
    price: "",
    body: "Civil, Christian, Islamic and Customary marriage registrations, corrections and replacements.",
    items: COMMON_ITEMS,
    order: 20,
    active: true,
  },
  {
    slug: "kcpe-kcse",
    icon: "🎓",
    name: "KCPE & KCSE Certificates",
    price: "",
    body: "Lost-certificate replacements and corrections of names or particulars processed through KNEC, with school liaison where required.",
    items: COMMON_ITEMS,
    order: 30,
    active: true,
  },
  {
    slug: "travel-document",
    icon: "🛂",
    name: "Travel Documents",
    price: "",
    body: "New passports, renewals, Emergency Travel Certificates and minors' travel documents via eCitizen and Immigration.",
    items: COMMON_ITEMS,
    order: 40,
    active: true,
  },
  {
    slug: "degree-diploma-craft",
    icon: "📜",
    name: "Degree, Diploma & Craft Certificates",
    price: "",
    body: "Replacement and verification of university, TVET and KNEC craft/diploma certificates, plus CUE verification and MOFA authentication.",
    items: COMMON_ITEMS,
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
  { key: "cta.button", value: "Book editing →" },
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
  {
    key: "social.facebook",
    value: "https://www.facebook.com/profile.php?id=61567790639771",
  },
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
