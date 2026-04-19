"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/utils/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const onAuthPage = pathname?.startsWith("/auth") ?? false;
  const user = session?.user;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/80",
        "bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/75",
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm font-semibold tracking-tight text-foreground hover:opacity-90">
          {siteConfig.name}
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          {status === "loading" ? (
            <span className="h-8 w-20 animate-pulse rounded-md bg-muted" aria-hidden />
          ) : user ? (
            <>
              <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Link href={siteConfig.routes.collect}>Collect</Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Link href={siteConfig.routes.dashboard}>Dashboard</Link>
              </Button>
              <SignOutButton />
            </>
          ) : onAuthPage ? (
            <Button asChild variant="ghost" size="sm">
              <Link href="/">Home</Link>
            </Button>
          ) : (
            <Button asChild size="sm">
              <Link href={siteConfig.routes.login}>Sign in</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
