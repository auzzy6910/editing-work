"use client";

import { useEffect, useState } from "react";
import { AdminGate, useAdminToken } from "@/components/admin/AdminGate";
import { InboxTab } from "@/components/admin/tabs/InboxTab";
import { TestimonialsTab } from "@/components/admin/tabs/TestimonialsTab";
import { ServicesTab } from "@/components/admin/tabs/ServicesTab";
import { ProcessTab } from "@/components/admin/tabs/ProcessTab";
import { SettingsTab } from "@/components/admin/tabs/SettingsTab";
import { SubscribersTab } from "@/components/admin/tabs/SubscribersTab";
import { CasesTab } from "@/components/admin/tabs/CasesTab";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "inbox", label: "Inbox" },
  { id: "cases", label: "Cases" },
  { id: "testimonials", label: "Testimonials" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "settings", label: "Settings" },
  { id: "subscribers", label: "Subscribers" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function AdminDashboard() {
  return (
    <AdminGate>
      {({ token }) => <Inner token={token} />}
    </AdminGate>
  );
}

function Inner({ token }: { token: string }) {
  const [tab, setTab] = useState<TabId>("inbox");
  const { signOut } = useAdminToken();

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("tab") as TabId | null;
    if (q && TABS.some((t) => t.id === q)) setTab(q);
  }, []);

  function switchTab(id: TabId) {
    setTab(id);
    const u = new URL(window.location.href);
    u.searchParams.set("tab", id);
    window.history.replaceState(null, "", u.toString());
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-robert-soft/60 pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert">
            Admin
          </p>
          <h1 className="mt-1 font-display text-4xl">Robert Editing — console</h1>
          <p className="mt-2 text-sm text-ink-soft">
            Everything on the public site reads from these tables in real time.
          </p>
        </div>
        <button
          onClick={signOut}
          className="rounded-full border border-robert-soft px-4 py-2 text-xs uppercase tracking-widest text-ink-soft transition hover:border-robert hover:text-robert"
        >
          Sign out
        </button>
      </header>

      <nav className="mt-6 flex flex-wrap gap-2 border-b border-robert-soft/40">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => switchTab(t.id)}
            className={cn(
              "rounded-t-lg px-4 py-2 text-sm transition",
              tab === t.id
                ? "bg-robert text-white"
                : "text-ink-soft hover:bg-robert-ghost hover:text-robert",
            )}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <section className="mt-8">
        {tab === "inbox" && <InboxTab token={token} />}
        {tab === "cases" && <CasesTab token={token} />}
        {tab === "testimonials" && <TestimonialsTab token={token} />}
        {tab === "services" && <ServicesTab token={token} />}
        {tab === "process" && <ProcessTab token={token} />}
        {tab === "settings" && <SettingsTab token={token} />}
        {tab === "subscribers" && <SubscribersTab token={token} />}
      </section>
    </div>
  );
}
