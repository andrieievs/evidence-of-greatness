"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { appShellClass, siteConfig } from "@/config/site";
import { cn } from "@/utils/cn";

export function SiteHeader() {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/80 print:hidden",
        "bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/75",
      )}
    >
      <div className={cn(appShellClass, "flex h-14 items-center justify-between gap-4")}>
        <Link href="/" className="text-sm font-semibold tracking-tight text-foreground hover:opacity-90">
          {siteConfig.name}
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Link href={siteConfig.routes.collect}>Collect</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Link href={siteConfig.routes.collectPresentation}>Presentation</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Link href={siteConfig.routes.dashboard}>Dashboard</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
