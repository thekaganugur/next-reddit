"use server"

import { getAuthSession } from "@/lib/auth"
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
    data: { title, content, subredditName },
  } = zodScheme

  // await prisma.subscription.findFirst({
  //   where: { subredditId, userId: session.user.id },
  // })
  // const subreddit = await prisma.post.create({
  //   data: { title, content, authorId: session.user.id, subredditId },
  // })

  // creator also has to be subscribed
  // await prisma.subscription.create({
  //   data: {
  //     userId: session.user.id,
  //     subredditId: subreddit.id,
  //   },
  // })

  revalidatePath("/r")
}
