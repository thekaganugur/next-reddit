import { z } from "zod"

export const SubredditParamsScheme = z.object({
  subredditName: z.string(),
})

export const createPostActionSchema = z.object({
  title: z.string().min(3).max(60),
  content: z.string().min(3).max(320),
  subredditName: z.string(),
})

export const createPostFormSchema = z.object({
  title: z.string().min(3).max(60),
  content: z.string().min(3).max(320),
})
