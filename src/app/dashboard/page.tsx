import type { Metadata } from "next";

import { auth } from "@/auth";
import { DashboardOverview } from "@/features/dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview and stats for your workspace.",
};

export default async function DashboardPage() {
  const session = await auth();

  return <DashboardOverview user={session?.user ?? null} />;
}
