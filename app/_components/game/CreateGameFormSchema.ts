import { z } from "zod";

export const createGameFormSchema = z.object({
  roundLength: z.number().min(1).max(4),
});
