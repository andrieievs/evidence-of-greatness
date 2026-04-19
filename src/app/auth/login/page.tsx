import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Log in",
  description: "Sign in to your account.",
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center gap-6 px-4 py-16">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
        <p className="text-sm text-muted-foreground">Auth UI goes here (forms, OAuth, etc.).</p>
      </div>
      <div className="flex flex-col gap-3">
        <Button asChild variant="outline">
          <Link href={siteConfig.routes.signup}>Create an account</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href={siteConfig.routes.home}>Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
