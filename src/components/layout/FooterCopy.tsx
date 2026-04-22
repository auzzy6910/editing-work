"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function FooterTagline() {
  const s = useQuery(api.settings.all);
  const text =
    s?.["footer.tagline"] ??
    "Robert edits documents in 47 countries. Academic papers, manuscripts, contracts, speeches, screenplays — anything that has to be read and remembered.";
  return <p className="mt-4 max-w-md text-sm text-ink-soft">{text}</p>;
}

export function FooterNewsletterCopy() {
  const s = useQuery(api.settings.all);
  const text = s?.["footer.newsletterCopy"] ?? "The Red Pen Digest — one email a month. No fluff.";
  return <p className="mt-2 text-xs text-ink-muted">{text}</p>;
}

export function FooterContactLink() {
  const s = useQuery(api.settings.all);
  const email = s?.["contact.email"] ?? "hello@robertediting.example";
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
