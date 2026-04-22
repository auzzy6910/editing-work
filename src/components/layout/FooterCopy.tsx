"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function FooterTagline() {
  const s = useQuery(api.settings.all);
  const text =
    s?.["footer.tagline"] ??
    "Robert edits and retouches the details on your existing Kenyan certificates — birth & marriage, KCPE / KCSE, passports & travel docs, degree, diploma and craft. Kenya-wide.";
  return <p className="mt-4 max-w-md text-sm text-ink-soft">{text}</p>;
}

export function FooterNewsletterCopy() {
  const s = useQuery(api.settings.all);
  const text =
    s?.["footer.newsletterCopy"] ??
    "Editing notes — occasional tips on keeping your certificate scans clean and edit-ready.";
  return <p className="mt-2 text-xs text-ink-muted">{text}</p>;
}

export function FooterContactLink() {
  const s = useQuery(api.settings.all);
  const email = s?.["contact.email"] ?? "hello@robertediting.co.ke";
  const facebook =
    s?.["social.facebook"] ??
    "https://www.facebook.com/profile.php?id=61567790639771";
  return (
    <ul className="space-y-2 text-sm">
      <li>
        <a
          className="inline-flex items-center gap-2 text-ink-soft hover:text-robert"
          href={facebook}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="h-4 w-4 fill-[#1877F2]"
            aria-hidden
          >
            <path d="M32 16C32 7.164 24.836 0 16 0S0 7.164 0 16c0 7.986 5.851 14.605 13.5 15.805V20.625h-4.063V16H13.5v-3.525c0-4.01 2.389-6.225 6.043-6.225 1.75 0 3.582.313 3.582.313v3.938h-2.017c-1.987 0-2.608 1.233-2.608 2.498V16h4.438l-.71 4.625H18.5v11.18C26.149 30.605 32 23.986 32 16z" />
          </svg>
          Facebook
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
