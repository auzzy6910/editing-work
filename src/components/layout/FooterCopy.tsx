"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function FooterTagline() {
  const s = useQuery(api.settings.all);
  const text =
    s?.["footer.tagline"] ??
    "Robert handles Kenyan documents end-to-end: birth & marriage certificates, KCPE/KCSE replacements, passports & travel docs, degree, diploma and craft certificates. Nationwide.";
  return <p className="mt-4 max-w-md text-sm text-ink-soft">{text}</p>;
}

export function FooterNewsletterCopy() {
  const s = useQuery(api.settings.all);
  const text =
    s?.["footer.newsletterCopy"] ??
    "Paperwork notes — occasional updates on fees, timelines & agency changes.";
  return <p className="mt-2 text-xs text-ink-muted">{text}</p>;
}

export function FooterContactLink() {
  const s = useQuery(api.settings.all);
  const email = s?.["contact.email"] ?? "hello@robertediting.co.ke";
  const linkedin = s?.["social.linkedin"] ?? "#";
  const twitter = s?.["social.twitter"] ?? "#";
  return (
    <ul className="space-y-2 text-sm">
      <li>
        <a className="text-ink-soft hover:text-robert" href={linkedin}>
          LinkedIn
        </a>
      </li>
      <li>
        <a className="text-ink-soft hover:text-robert" href={twitter}>
          X / Twitter
        </a>
      </li>
      <li>
        <a className="text-ink-soft hover:text-robert" href={`mailto:${email}`}>
          {email}
        </a>
      </li>
    </ul>
  );
}
