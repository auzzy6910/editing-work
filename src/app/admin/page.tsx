import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata = {
  title: "Admin — Robert Editing",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
