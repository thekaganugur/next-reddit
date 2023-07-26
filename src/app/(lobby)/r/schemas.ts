import { z } from "zod"

export const createSubredditSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(21)
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Can only contain letters, numbers, or underscores",
    }),
})
