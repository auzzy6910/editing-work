"use client";

import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { api } from "../../../convex/_generated/api";

// Defaults — can be overridden from Convex settings.
const DEFAULT_NUMBER = "254714207523";
const DEFAULT_MESSAGE = "Hi Robert, I'd like to discuss a document request.";
const DEFAULT_FACEBOOK =
  "https://www.facebook.com/profile.php?id=61567790639771";

function normaliseNumber(raw: string) {
  return raw.replace(/[^\d]/g, "");
}

function formatForDisplay(digits: string) {
  if (digits.startsWith("254") && digits.length === 12) {
    return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`;
  }
  return `+${digits}`;
}

export function FloatingWhatsApp() {
  const settings = useQuery(api.settings.all);
  const raw = settings?.["contact.whatsapp"] ?? DEFAULT_NUMBER;
  const message = settings?.["contact.whatsappMessage"] ?? DEFAULT_MESSAGE;
  const fbUrl = settings?.["social.facebook"] ?? DEFAULT_FACEBOOK;
  const digits = normaliseNumber(raw);
  const waHref = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
  const display = formatForDisplay(digits);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 md:bottom-8 md:right-8">
      {/* Facebook — stacked above WhatsApp */}
      <motion.a
        href={fbUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Robert Editing on Facebook"
        title="Facebook"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="group relative flex items-center gap-2 rounded-full bg-[#1877F2] px-4 py-3 text-white shadow-[0_10px_30px_-10px_rgba(24,119,242,0.8)] ring-1 ring-black/5 transition-transform hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-10px_rgba(24,119,242,0.9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="relative z-10 h-6 w-6 fill-current"
          aria-hidden
        >
          <path d="M32 16C32 7.164 24.836 0 16 0S0 7.164 0 16c0 7.986 5.851 14.605 13.5 15.805V20.625h-4.063V16H13.5v-3.525c0-4.01 2.389-6.225 6.043-6.225 1.75 0 3.582.313 3.582.313v3.938h-2.017c-1.987 0-2.608 1.233-2.608 2.498V16h4.438l-.71 4.625H18.5v11.18C26.149 30.605 32 23.986 32 16z" />
        </svg>
        <span className="relative z-10 hidden pr-1 text-sm font-semibold sm:inline">
          Facebook
        </span>
      </motion.a>

      {/* WhatsApp */}
      <motion.a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with Robert on WhatsApp (${display})`}
        title={`WhatsApp ${display}`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="group relative flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,0.8)] ring-1 ring-black/5 transition-transform hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-10px_rgba(37,211,102,0.9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <span
          aria-hidden
          className="absolute inset-0 -z-0 rounded-full bg-[#25D366] opacity-60 motion-safe:animate-waPing"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="relative z-10 h-6 w-6 fill-current"
          aria-hidden
        >
          <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.434-.9-2.605-.17-.17-.403-.17-.57-.17-.27 0-.57 0-.84.012-.295.015-.725.157-.985.47-.39.47-1.165 1.143-1.165 2.695s1.195 3.055 1.365 3.24c.195.215 2.28 3.66 5.66 5.053 2.835 1.166 3.42 1.026 4.045.97.625-.057 2.005-.81 2.29-1.61.285-.8.285-1.49.2-1.61-.086-.13-.31-.2-.637-.325z" />
          <path d="M16.002 0C7.166 0 0 7.164 0 16c0 2.824.745 5.575 2.156 7.993L.023 31.555a.999.999 0 0 0 1.223 1.223l7.562-2.132A15.99 15.99 0 0 0 16.002 32C24.838 32 32 24.836 32 16S24.838 0 16.002 0zm0 29.335c-2.51 0-4.958-.705-7.084-2.042a.999.999 0 0 0-.815-.12l-5.62 1.584 1.585-5.62a.999.999 0 0 0-.12-.814A13.19 13.19 0 0 1 2.67 16c0-7.35 5.982-13.33 13.332-13.33S29.33 8.65 29.33 16 23.35 29.335 16.002 29.335z" />
        </svg>
        <span className="relative z-10 hidden pr-1 text-sm font-semibold sm:inline">
          Chat on WhatsApp
        </span>
      </motion.a>
    </div>
  );
}
