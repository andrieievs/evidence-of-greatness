"use client";

import type { FormEvent } from "react";
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
  const urlError = searchParams.get("error");
  const { status } = useSession();

  const hasOAuth = oauth.google || oauth.github;

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(callbackUrl);
      router.refresh();
    }
  }, [status, callbackUrl, router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(urlError === "CredentialsSignin" ? "Invalid email or password." : null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });
      if (res?.error) {
        setError("Invalid email or password.");
        return;
      }
      if (res?.ok) {
        router.push(callbackUrl);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      title="Log in"
      description="Use your account email and password, or continue with Google or GitHub if configured."
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
        {hasOAuth ? (
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or email</span>
            </div>
          </div>
        ) : null}
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </AuthCard>
  );
}
