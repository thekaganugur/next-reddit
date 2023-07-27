"use server"

import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { createSubredditSchema } from "./schemas"

export async function createSubreddit(
  input: z.infer<typeof createSubredditSchema>,
) {
  const session = await getAuthSession()
  if (!session?.user.id) throw new Error("Unauthorized")

  const zodScheme = createSubredditSchema.safeParse(input)
  if (!zodScheme.success) throw new Error("Invalid Inputs")
  const {
    data: { name, title, description },
  } = zodScheme

  const subreddit = await prisma.subreddit.create({
    data: { name, title, description, creatorId: session?.user.id },
  })

  // creator also has to be subscribed
  await prisma.subscription.create({
    data: {
      userId: session.user.id,
      subredditId: subreddit.id,
    },
  })

  revalidatePath("/r")
}
