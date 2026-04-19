"use client";

import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  emptyCard,
  proudMomentsFormSchema,
  type ProudMomentsFormValues,
  type SubmittedMomentCard,
} from "@/features/proud-moments/types/schema";
import { Form } from "@/components/ui/form";
import { PresentationView } from "./presentation-view";
import { ProudMomentsForm } from "./proud-moments-form";

type View = "form" | "present";

export function ProudMomentsApp() {
  const [view, setView] = useState<View>("form");
  const [submitted, setSubmitted] = useState<SubmittedMomentCard[] | null>(null);
  const [restoredImageUrls, setRestoredImageUrls] = useState<(string | null)[] | null>(null);
  const presentationUrlsRef = useRef<string[]>([]);

  const form = useForm<ProudMomentsFormValues>({
    resolver: zodResolver(proudMomentsFormSchema),
    defaultValues: {
      cards: [emptyCard()],
    },
  });

  const revokePresentationUrls = () => {
    presentationUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    presentationUrlsRef.current = [];
  };

  useEffect(() => {
    return () => {
      revokePresentationUrls();
    };
  }, []);

  const handleSubmit = (values: ProudMomentsFormValues) => {
    revokePresentationUrls();

    const nextSubmitted: SubmittedMomentCard[] = values.cards.map((card) => {
      const imageUrl = card.image instanceof File ? URL.createObjectURL(card.image) : null;
      if (imageUrl) {
        presentationUrlsRef.current.push(imageUrl);
      }

      return {
        title: card.title,
        date: card.date,
        description: card.description?.trim() ?? "",
        imageUrl,
      };
    });

    setSubmitted(nextSubmitted);
    setRestoredImageUrls(null);
    setView("present");
  };

  const handleBack = () => {
    if (!submitted) {
      setView("form");
      return;
    }

    setRestoredImageUrls(submitted.map((card) => card.imageUrl));
    form.reset({
      cards: submitted.map((card) => ({
        title: card.title,
        date: card.date,
        description: card.description,
        image: undefined,
      })),
    });
    setView("form");
  };

  const handleImageRemoved = (index: number) => {
    setRestoredImageUrls((prev) => {
      if (!prev) return prev;
      const url = prev[index];
      if (url) {
        URL.revokeObjectURL(url);
        presentationUrlsRef.current = presentationUrlsRef.current.filter((u) => u !== url);
      }
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  return (
    <Form {...form}>
      {view === "form" ? (
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <ProudMomentsForm restoredImageUrls={restoredImageUrls} onImageRemoved={handleImageRemoved} />
        </form>
      ) : submitted ? (
        <PresentationView cards={submitted} onBack={handleBack} />
      ) : null}
    </Form>
  );
}
