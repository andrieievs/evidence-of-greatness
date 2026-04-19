import { z } from "zod";

const optionalImage = z
  .custom<File | undefined>((val) => val === undefined || val instanceof File, {
    message: "Invalid image file",
  })
  .optional();

export const cardSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.date({ message: "Date is required" }),
  description: z.string().optional(),
  image: optionalImage,
});

export const proudMomentsFormSchema = z.object({
  cards: z.array(cardSchema).min(1, "Add at least one card"),
});

export type ProudMomentsFormValues = z.infer<typeof proudMomentsFormSchema>;

export type SubmittedMomentCard = {
  title: string;
  date: Date;
  description: string;
  imageUrl: string | null;
};

export function emptyCard(): ProudMomentsFormValues["cards"][number] {
  return {
    title: "",
    date: undefined as unknown as Date,
    description: "",
    image: undefined,
  };
}
