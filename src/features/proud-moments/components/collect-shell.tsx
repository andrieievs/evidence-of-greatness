import Link from "next/link";
import type { ReactNode } from "react";

import { appShellClass, siteConfig } from "@/config/site";
import { cn } from "@/utils/cn";

import { ProudMomentsApp } from "./proud-moments-app";

type CollectShellProps = {
  children?: ReactNode;
};

export function CollectShell({ children }: CollectShellProps) {
  return (
    <div className={cn(appShellClass, "min-h-screen py-10")}>
      <Link
        href={siteConfig.routes.home}
        className="mb-8 inline-flex text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
      >
        ← Back to home
      </Link>
      {children ?? <ProudMomentsApp />}
    </div>
  );
}
