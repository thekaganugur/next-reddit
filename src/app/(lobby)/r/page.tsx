import { prisma } from "@/lib/db"

export default async function SubRedditsPage() {
  const subreddits = await prisma.subreddit.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
  })

  return subreddits.map((subreddit) => (
    <div key={subreddit.id}>
      <span>{JSON.stringify(subreddit)}</span>
    </div>
  ))
}
