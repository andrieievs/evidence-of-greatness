"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import { AuthCard } from "@/features/auth/components/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/config/site";

export type LoginOAuthProviders = {
  google: boolean;
  github: boolean;
};

type LoginFormProps = {
  oauth: LoginOAuthProviders;
  /** Demo email/password sign-in (AUTH_DEMO_EMAIL + AUTH_DEMO_PASSWORD). */
  credentialsEnabled: boolean;
};

function safeInternalPath(raw: string | null, fallback: string) {
  const v = (raw ?? fallback).trim();
  if (!v.startsWith("/") || v.startsWith("//")) {
    return fallback;
  }
  return v;
}

export function LoginForm({ oauth, credentialsEnabled }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = safeInternalPath(searchParams.get("callbackUrl"), siteConfig.routes.dashboard);
  const { status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const hasOAuth = oauth.google || oauth.github;

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(callbackUrl);
      router.refresh();
    }
  }, [status, callbackUrl, router]);

  async function handleCredentialsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl,
        redirect: false,
      });
      if (res?.error) {
        setError("Invalid email or password.");
        setPending(false);
        return;
      }
      if (res?.ok) {
        router.replace(callbackUrl);
        router.refresh();
        return;
      }
      setError("Could not sign in. Try again.");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setPending(false);
    }
  }

  const description = (() => {
    if (credentialsEnabled && hasOAuth) {
      return "Use your email and password, or continue with a provider below.";
    }
    if (credentialsEnabled) {
      return "Sign in with the demo credentials from your environment (.env).";
    }
    if (hasOAuth) {
      return "Continue with one of the providers below. Add AUTH_DEMO_EMAIL and AUTH_DEMO_PASSWORD to enable email sign-in.";
    }
    return "Configure AUTH_DEMO_* for email sign-in or AUTH_GOOGLE_* / AUTH_GITHUB_* for OAuth.";
  })();

  return (
    <AuthCard title="Log in" description={description}>
      <div className="space-y-6">
        <form onSubmit={handleCredentialsSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!credentialsEnabled || pending}
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!credentialsEnabled || pending}
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={!credentialsEnabled || pending}>
            {pending ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        {hasOAuth ? (
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden>
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs font-medium uppercase tracking-wide">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>
        ) : null}

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
