import Link from "next/link";

import { siteConfig } from "@/config/site";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href={siteConfig.routes.home}
        className="mb-8 inline-flex text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
      >
        ← Back to home
      </Link>
      {children}
    </div>
  );
}
