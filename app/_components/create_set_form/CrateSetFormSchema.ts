import { z } from "zod";

export const formSchema = z.object({
  date: z.date().refine((date) => date <= new Date(), {
    message: "日付は現在より前でなければなりません。"
  }),
  location: z.string().min(1).max(100),
  selectedUsers: z
    .array(
      z.object({
        userId: z.number(),
        name: z.string(),
        image: z.string().nullable(),
      })
    )
    .min(3)
    .max(4),
});