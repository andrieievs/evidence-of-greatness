"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { useProudMomentsSession } from "@/features/proud-moments/providers/proud-moments-session-provider";

import { PresentationView } from "./presentation-view";

export function CollectPresentationPanel() {
  const router = useRouter();
  const { presentation, requestRestoreToForm } = useProudMomentsSession();

  if (!presentation?.length) {
    return (
      <div className="mx-auto max-w-lg space-y-6 rounded-lg border bg-card p-8 text-center">
        <h1 className="text-xl font-semibold tracking-tight">No presentation yet</h1>
        <p className="text-sm text-muted-foreground">
          Add moments on the collect page and choose &quot;View presentation&quot; to see them here. This preview is kept
          in memory until you refresh the page.
        </p>
        <Button asChild>
          <Link href={siteConfig.routes.collect}>Go to collect</Link>
        </Button>
      </div>
    );
  }

  return (
    <PresentationView
      cards={presentation}
      onBack={() => {
        requestRestoreToForm();
        router.push(siteConfig.routes.collect);
      }}
    />
  );
}
