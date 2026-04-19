"use client";

import { format } from "date-fns";
import { ArrowLeft, CalendarDays, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { SubmittedMomentCard } from "@/features/proud-moments/types/schema";

type PresentationViewProps = {
  cards: SubmittedMomentCard[];
  onBack: () => void;
};

export function PresentationView({ cards, onBack }: PresentationViewProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Presentation mode
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Your proud moments</h1>
          <p className="max-w-2xl text-muted-foreground">
            A calm, readable recap of what you captured. Use back to edit if you want to tweak anything.
          </p>
        </div>
        <Button type="button" variant="outline" onClick={onBack} className="w-full shrink-0 sm:w-auto">
          <ArrowLeft className="h-4 w-4" />
          Back to edit
        </Button>
      </div>

      <ol className="space-y-5">
        {cards.map((card, index) => (
          <li key={`${card.title}-${index}`}>
            <Card className="overflow-hidden border shadow-sm">
              <CardHeader className="space-y-2 pb-2">
                <CardTitle className="text-xl leading-snug sm:text-2xl">{card.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" aria-hidden />
                  <time dateTime={card.date.toISOString()}>{format(card.date, "MMMM d, yyyy")}</time>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                {card.description ? (
                  <p className="text-base leading-relaxed text-muted-foreground">{card.description}</p>
                ) : (
                  <p className="text-sm italic text-muted-foreground">No description for this moment.</p>
                )}
                {card.imageUrl ? (
                  <div className="overflow-hidden rounded-lg border bg-muted/40 shadow-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={card.imageUrl} alt="" className="max-h-[420px] w-full object-cover" />
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </li>
        ))}
      </ol>
    </div>
  );
}
