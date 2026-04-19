import type { Metadata } from "next";
import Link from "next/link";

import { AuthCard } from "@/features/auth/components/auth-card";
import { Button } from "@/components/ui/button";
import { appShellClass, siteConfig } from "@/config/site";
import { cn } from "@/utils/cn";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create a new account.",
};

export default function SignupPage() {
  return (
    <div className={cn(appShellClass, "flex min-h-[60vh] flex-col justify-center py-16")}>
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <AuthCard
          title="Sign up"
          description="This project uses Auth.js. Self-serve registration is not wired yet—use the demo credentials from .env.example or add a database + adapter."
        >
          <p className="text-sm text-muted-foreground">
            For now, sign in with the demo account (see <code className="rounded bg-muted px-1 py-0.5 text-xs">AUTH_DEMO_EMAIL</code> /{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">AUTH_DEMO_PASSWORD</code>) or configure GitHub OAuth.
          </p>
        </AuthCard>
        <div className="flex flex-col gap-3">
          <Button asChild variant="default">
            <Link href={siteConfig.routes.login}>Go to log in</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href={siteConfig.routes.home}>Back to home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
