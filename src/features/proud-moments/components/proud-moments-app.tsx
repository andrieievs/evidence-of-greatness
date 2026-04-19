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
  const { setPresentation, presentation, pendingRestoreToForm, clearRestoreRequest, updatePresentationImageAt } =
    useProudMomentsSession();

  const [restoredImageUrls, setRestoredImageUrls] = useState<(string | null)[] | null>(null);

  const form = useForm<ProudMomentsFormValues>({
    resolver: zodResolver(proudMomentsFormSchema),
    defaultValues: {
      cards: [emptyCard()],
    },
  });

  useEffect(() => {
    if (pathname !== siteConfig.routes.collect) {
      return;
    }
    if (!pendingRestoreToForm || !presentation?.length) {
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
    clearRestoreRequest();
  }, [pathname, pendingRestoreToForm, presentation, clearRestoreRequest, form]);

  const handleSubmit = (values: ProudMomentsFormValues) => {
    const nextSubmitted: SubmittedMomentCard[] = values.cards.map((card) => {
      const imageUrl = card.image instanceof File ? URL.createObjectURL(card.image) : null;

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
