"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import { AuthCard } from "@/features/auth/components/auth-card";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export type LoginOAuthProviders = {
  google: boolean;
  github: boolean;
};

type LoginFormProps = {
  oauth: LoginOAuthProviders;
};

function safeInternalPath(raw: string | null, fallback: string) {
  const v = (raw ?? fallback).trim();
  if (!v.startsWith("/") || v.startsWith("//")) {
    return fallback;
  }
  return v;
}

export function LoginForm({ oauth }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = safeInternalPath(searchParams.get("callbackUrl"), siteConfig.routes.dashboard);
  const { status } = useSession();

  const hasOAuth = oauth.google || oauth.github;

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(callbackUrl);
      router.refresh();
    }
  }, [status, callbackUrl, router]);

  return (
    <AuthCard
      title="Log in"
      description={
        hasOAuth
          ? "Continue with one of the providers below."
          : "No OAuth providers are configured. Add AUTH_GOOGLE_* or AUTH_GITHUB_* to your environment."
      }
    >
      <div className="space-y-6">
        {hasOAuth ? (
          <div className="flex flex-col gap-3">
            {oauth.google ? (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => signIn("google", { callbackUrl })}
              >
                Continue with Google
              </Button>
            ) : null}
            {oauth.github ? (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => signIn("github", { callbackUrl })}
              >
                Continue with GitHub
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </AuthCard>
  );
}
