import { z } from "zod";

export const createRoundFormSchema = z.object({
  wind: z.number().min(0).max(3),
  roundInWind: z.number().min(1),
  scores: z
    .array(
      z.object({
        userId: z.number(),
        point: z.number(),
      }),
    )
    .min(3)
    .max(4),
});
