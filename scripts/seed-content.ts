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
