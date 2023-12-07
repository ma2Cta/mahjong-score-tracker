import { z } from "zod";

export const createGameFormSchema = z.object({
  date: z.date().refine((date) => date <= new Date(), {
    message: "日付は現在と同じかそれより前でなければなりません。",
  }),
  hour: z.number().min(0).max(23),
  minute: z.number().min(0).max(59),
  second: z.number().min(0).max(59),
  roundLength: z.number().min(1).max(4),
});
