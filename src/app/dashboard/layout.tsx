import Link from "next/link";

import { appShellClass, siteConfig } from "@/config/site";
import { cn } from "@/utils/cn";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={cn(appShellClass, "py-10")}>
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
