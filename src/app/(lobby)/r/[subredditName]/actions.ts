"use server"

import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { createPostActionSchema } from "./schemas"

export async function createPost(
  input: z.infer<typeof createPostActionSchema>,
) {
  const session = await getAuthSession()
  if (!session?.user.id) throw new Error("Unauthorized")

  const zodScheme = createPostActionSchema.safeParse(input)
  if (!zodScheme.success) throw new Error("Invalid Inputs")
  const {
    data: { title, content, subredditId },
  } = zodScheme

  const subscription = await prisma.subscription.findFirst({
    where: { subredditId, userId: session.user.id },
    include: { subreddit: true },
  })
  if (!subscription?.subredditId) throw new Error("Community is not subscribed")

  await prisma.post.create({
    data: { title, content, authorId: session.user.id, subredditId },
  })

  revalidatePath(`/r/${subscription.subreddit.name}`)
}
