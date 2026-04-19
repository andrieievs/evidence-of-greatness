import type { Metadata } from "next";

import { DashboardOverview } from "@/features/dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview and stats for your workspace.",
};

export default function DashboardPage() {
  return (
    <main className="p-6 lg:p-10">
      <DashboardOverview />
    </main>
  );
}
