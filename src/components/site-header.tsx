"use client";

import { User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { Button } from "@/components/ui/button";
import { appShellClass, siteConfig } from "@/config/site";
import { cn } from "@/utils/cn";

function initialsFromUser(user: { name?: string | null; email?: string | null }) {
  const name = user.name?.trim();
  if (name) {
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
  const email = user.email?.trim();
  if (email) {
    const local = email.split("@")[0] ?? "";
    const tokens = local.split(/[._-]+/).filter(Boolean);
    if (tokens.length >= 2) {
      return `${tokens[0][0]}${tokens[1][0]}`.toUpperCase();
    }
    return local.slice(0, 2).toUpperCase();
  }
  return "?";
}

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
      <div className={cn(appShellClass, "flex h-14 items-center justify-between gap-4")}>
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
                <Link href={siteConfig.routes.collectPresentation}>Presentation</Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Link href={siteConfig.routes.dashboard}>Dashboard</Link>
              </Button>
              <div className="flex items-center gap-2 pl-1">
                <User className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/80",
                    "bg-muted/80 text-[11px] font-semibold tracking-tight text-foreground",
                  )}
                  title={user.email ?? user.name ?? "Account"}
                  aria-label={user.email ? `Signed in as ${user.email}` : user.name ? `Signed in as ${user.name}` : "Signed in"}
                >
                  {initialsFromUser(user)}
                </span>
                <SignOutButton />
              </div>
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
