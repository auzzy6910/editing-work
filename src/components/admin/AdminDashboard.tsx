"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { AdminGate, useAdminToken } from "@/components/admin/AdminGate";
import { cn } from "@/lib/utils";
import { SkeletonCard } from "@/components/ui/Skeleton";

// Each tab is a separate chunk — the dashboard only fetches a tab's JS
// when the user opens it, keeping the initial admin payload small.
const tabLoader = () => (
  <div className="space-y-4">
    <SkeletonCard className="h-24" />
    <SkeletonCard className="h-24" />
    <SkeletonCard className="h-24" />
  </div>
);

const InboxTab = dynamic(
  () =>
    import("@/components/admin/tabs/InboxTab").then((m) => ({
      default: m.InboxTab,
    })),
  { ssr: false, loading: tabLoader },
);
const CasesTab = dynamic(
  () =>
    import("@/components/admin/tabs/CasesTab").then((m) => ({
      default: m.CasesTab,
    })),
  { ssr: false, loading: tabLoader },
);
const TestimonialsTab = dynamic(
  () =>
    import("@/components/admin/tabs/TestimonialsTab").then((m) => ({
      default: m.TestimonialsTab,
    })),
  { ssr: false, loading: tabLoader },
);
const ServicesTab = dynamic(
  () =>
    import("@/components/admin/tabs/ServicesTab").then((m) => ({
      default: m.ServicesTab,
    })),
  { ssr: false, loading: tabLoader },
);
const ProcessTab = dynamic(
  () =>
    import("@/components/admin/tabs/ProcessTab").then((m) => ({
      default: m.ProcessTab,
    })),
  { ssr: false, loading: tabLoader },
);
const SettingsTab = dynamic(
  () =>
    import("@/components/admin/tabs/SettingsTab").then((m) => ({
      default: m.SettingsTab,
    })),
  { ssr: false, loading: tabLoader },
);
const SubscribersTab = dynamic(
  () =>
    import("@/components/admin/tabs/SubscribersTab").then((m) => ({
      default: m.SubscribersTab,
    })),
  { ssr: false, loading: tabLoader },
);

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
    const q = new URLSearchParams(window.location.search).get("tab") as
      | TabId
      | null;
    if (q && TABS.some((t) => t.id === q)) setTab(q);
  }, []);

  function switchTab(id: TabId) {
    setTab(id);
    const u = new URL(window.location.href);
    u.searchParams.set("tab", id);
    window.history.replaceState(null, "", u.toString());
  }

  const renderTab = () => {
    switch (tab) {
      case "inbox":
        return <InboxTab token={token} />;
      case "cases":
        return <CasesTab token={token} />;
      case "testimonials":
        return <TestimonialsTab token={token} />;
      case "services":
        return <ServicesTab token={token} />;
      case "process":
        return <ProcessTab token={token} />;
      case "settings":
        return <SettingsTab token={token} />;
      case "subscribers":
        return <SubscribersTab token={token} />;
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap items-end justify-between gap-4 border-b border-robert-soft/60 pb-6"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert">
            Admin
          </p>
          <h1 className="mt-1 font-display text-4xl">
            Robert Editing — console
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            Everything on the public site reads from these tables in real time.
          </p>
        </div>
        <button
          onClick={signOut}
          className="rounded-full border border-robert-soft px-4 py-2 text-xs uppercase tracking-widest text-ink-soft transition duration-200 hover:border-robert hover:text-robert"
        >
          Sign out
        </button>
      </motion.header>

      <nav className="relative mt-6 flex flex-wrap gap-1 border-b border-robert-soft/40">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => switchTab(t.id)}
            className={cn(
              "relative rounded-t-lg px-4 py-2 text-sm transition",
              tab === t.id
                ? "text-white"
                : "text-ink-soft hover:text-robert",
            )}
          >
            {tab === t.id && (
              <motion.span
                layoutId="admin-tab-bg"
                className="absolute inset-0 -z-0 rounded-t-lg bg-robert"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{t.label}</span>
          </button>
        ))}
      </nav>

      <section className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}
