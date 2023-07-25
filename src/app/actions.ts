"use server"

import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

// TODO: Use scheme validation instead
export async function myAction(userName: string) {
  const session = await getAuthSession()
  await prisma.subreddit.create({
    data: { name: userName, creatorId: session?.user.id },
  })
  revalidatePath("/r")
}
