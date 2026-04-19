"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import {
  emptyCard,
  proudMomentsFormSchema,
  type ProudMomentsFormValues,
  type SubmittedMomentCard,
} from "@/features/proud-moments/types/schema";
import { useProudMomentsSession } from "@/features/proud-moments/providers/proud-moments-session-provider";
import { Form } from "@/components/ui/form";
import { siteConfig } from "@/config/site";

import { ProudMomentsForm } from "./proud-moments-form";

export function ProudMomentsApp() {
  const router = useRouter();
  const pathname = usePathname();
  const { setPresentation, presentation, updatePresentationImageAt } = useProudMomentsSession();

  const [restoredImageUrls, setRestoredImageUrls] = useState<(string | null)[] | null>(null);

  const form = useForm<ProudMomentsFormValues>({
    resolver: zodResolver(proudMomentsFormSchema),
    defaultValues: {
      cards: [emptyCard()],
    },
  });

  // Keep the form in sync with the in-memory presentation whenever you're on Collect
  // (including via header nav from Presentation). Otherwise a fresh mount would reset
  // to one empty card and the next submit would replace — and drop — previous cards.
  useEffect(() => {
    if (pathname !== siteConfig.routes.collect) {
      return;
    }
    if (!presentation?.length) {
      return;
    }

    setRestoredImageUrls(presentation.map((card) => card.imageUrl));
    form.reset({
      cards: presentation.map((card) => ({
        title: card.title,
        date: card.date,
        description: card.description,
        image: undefined,
      })),
    });
  }, [pathname, presentation, form]);

  const handleSubmit = (values: ProudMomentsFormValues) => {
    const nextSubmitted: SubmittedMomentCard[] = values.cards.map((card, index) => {
      let imageUrl: string | null = null;
      if (card.image instanceof File) {
        imageUrl = URL.createObjectURL(card.image);
      } else {
        imageUrl = restoredImageUrls?.[index] ?? null;
      }

      return {
        title: card.title,
        date: card.date,
        description: card.description?.trim() ?? "",
        imageUrl,
      };
    });

    setPresentation(nextSubmitted);
    setRestoredImageUrls(null);
    router.push(siteConfig.routes.collectPresentation);
  };

  const handleImageRemoved = (index: number) => {
    updatePresentationImageAt(index, null);
    setRestoredImageUrls((prev) => {
      if (!prev) {
        return prev;
      }
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <ProudMomentsForm restoredImageUrls={restoredImageUrls} onImageRemoved={handleImageRemoved} />
      </form>
    </Form>
  );
}
