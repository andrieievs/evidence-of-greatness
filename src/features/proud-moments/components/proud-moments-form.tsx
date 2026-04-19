"use client";

import { useEffect, useState } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { ImagePlus, Plus, Trash2 } from "lucide-react";

import { type ProudMomentsFormValues, emptyCard } from "@/features/proud-moments/types/schema";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePickerField } from "./date-picker-field";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function MomentImageBlock({
  index,
  restoredUrl,
  onImageRemoved,
}: {
  index: number;
  restoredUrl: string | null | undefined;
  onImageRemoved?: () => void;
}) {
  const { control } = useFormContext<ProudMomentsFormValues>();
  const file = useWatch<ProudMomentsFormValues, `cards.${number}.image`>({
    control,
    name: `cards.${index}.image`,
  });
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file instanceof File) {
      const url = URL.createObjectURL(file);
      setBlobUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setBlobUrl(null);
  }, [file]);

  const previewSrc = blobUrl ?? restoredUrl ?? null;

  return (
    <FormField
      control={control}
      name={`cards.${index}.image`}
      render={({ field: { onChange, onBlur, name, ref } }) => (
        <FormItem>
          <FormLabel>Image (optional)</FormLabel>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <div className="flex flex-wrap items-center gap-2">
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  className="max-w-xs cursor-pointer"
                  name={name}
                  ref={ref}
                  onBlur={onBlur}
                  onChange={(e) => {
                    const next = e.target.files?.[0];
                    onChange(next);
                  }}
                />
              </FormControl>
              {(file instanceof File || restoredUrl) && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onChange(undefined);
                    onImageRemoved?.();
                  }}
                >
                  Remove image
                </Button>
              )}
            </div>
            {previewSrc ? (
              <div
                className={cn(
                  "relative h-24 w-24 shrink-0 overflow-hidden rounded-md border bg-muted shadow-sm",
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewSrc} alt="" className="h-full w-full object-cover" />
              </div>
            ) : (
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-md border border-dashed bg-muted/40 text-muted-foreground">
                <ImagePlus className="h-8 w-8" aria-hidden />
              </div>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type ProudMomentsFormProps = {
  restoredImageUrls?: (string | null)[] | null;
  onImageRemoved?: (index: number) => void;
};

export function ProudMomentsForm({ restoredImageUrls, onImageRemoved }: ProudMomentsFormProps) {
  const form = useFormContext<ProudMomentsFormValues>();
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "cards" });

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Proud moments</h1>
        <p className="text-muted-foreground">
          Add one or more memory cards. Title and date are required; describe the moment and add a photo if you like.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {fields.map((field, index) => (
          <Card key={field.id} className="border shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-lg">Moment {index + 1}</CardTitle>
                  <CardDescription>What happened, and when?</CardDescription>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                  disabled={fields.length <= 1}
                  onClick={() => remove(index)}
                  aria-label="Remove this card"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name={`cards.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Shipped the redesign" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DatePickerField control={form.control} name={`cards.${index}.date`} />

              <FormField
                control={form.control}
                name={`cards.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optional)</FormLabel>
                    <FormControl>
                      <Textarea rows={4} placeholder="What made this moment meaningful?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <MomentImageBlock
                index={index}
                restoredUrl={restoredImageUrls?.[index]}
                onImageRemoved={onImageRemoved ? () => onImageRemoved(index) : undefined}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="button" variant="secondary" onClick={() => append(emptyCard())}>
          <Plus className="h-4 w-4" />
          Add another card
        </Button>
        <Button type="submit" size="lg" className="sm:min-w-[220px]">
          View presentation
        </Button>
      </div>
    </div>
  );
}
