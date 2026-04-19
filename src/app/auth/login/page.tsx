import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { LoginForm } from "@/features/auth/components/login-form";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Log in",
  description: "Sign in to your account.",
};

function LoginFallback() {
  return (
    <div className="mx-auto max-w-md rounded-lg border bg-card p-8 text-center text-sm text-muted-foreground">
      Loading sign-in…
    </div>
  );
}

export default function LoginPage() {
  const oauth = {
    google: Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET),
    github: Boolean(process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET),
  };

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center gap-6 px-4 py-16">
      <Suspense fallback={<LoginFallback />}>
        <LoginForm oauth={oauth} />
      </Suspense>
      <div className="flex flex-col gap-3">
        <Button asChild variant="ghost">
          <Link href={siteConfig.routes.signup}>Create an account</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href={siteConfig.routes.home}>Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
