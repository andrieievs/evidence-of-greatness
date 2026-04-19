import Link from "next/link";

import { siteConfig } from "@/config/site";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 shrink-0 border-r bg-muted/30 p-4">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Dashboard</p>
        <nav className="flex flex-col gap-2 text-sm font-medium">
          <Link className="rounded-md px-2 py-1.5 hover:bg-muted" href={siteConfig.routes.dashboard}>
            Overview
          </Link>
          <Link className="rounded-md px-2 py-1.5 hover:bg-muted" href={siteConfig.routes.collect}>
            Proud moments
          </Link>
          <Link className="rounded-md px-2 py-1.5 hover:bg-muted" href={siteConfig.routes.home}>
            Marketing home
          </Link>
        </nav>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}
