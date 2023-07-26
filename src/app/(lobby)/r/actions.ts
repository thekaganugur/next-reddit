"use server"

import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { createSubredditSchema } from "./schemas"

export async function createSubreddit(
  input: z.infer<typeof createSubredditSchema>,
) {
  try {
    const { name, title, description } = createSubredditSchema.parse(input)
    const session = await getAuthSession()
    await prisma.subreddit.create({
      data: { name, title, description, creatorId: session?.user.id },
    })
    revalidatePath("/r")
  } catch {
    throw new Error("Could not create subreddit")
  }
}
