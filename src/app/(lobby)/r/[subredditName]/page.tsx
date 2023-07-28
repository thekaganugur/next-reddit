import { Header } from "@/components/header"
import { Shell } from "@/components/shell"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/db"
import Link from "next/link"
import { notFound } from "next/navigation"
import { z } from "zod"
import { CreatePostPopover } from "./create-post-popover"
import { SubredditParamsScheme } from "./schemas"

type Props = {
  params: z.infer<typeof SubredditParamsScheme>
}

export default async function SubRedditPage({ params }: Props) {
  const { subredditName } = SubredditParamsScheme.parse(params)
  const session = await getAuthSession()
  const subreddit = await prisma.subreddit.findUnique({
    where: { name: subredditName },
    include: {
      subscribers: { where: { userId: session?.user.id } },
      posts: {
        include: {
          votes: true,
          author: true,
          comments: true,
        },
      },
    },
  })
  if (!subreddit) notFound()
  const subscribed = Boolean(subreddit?.subscribers[0]?.subredditId)

  return (
    <Shell>
      <div className="flex justify-between">
        <Header
          title={subreddit.title}
          description={`r/${subreddit.name}${
            subreddit.description ? `: ${subreddit.description}` : ""
          }`}
        />
        {}
        {subscribed && <CreatePostPopover subredditId={subreddit.id} />}
      </div>

      {subreddit.posts.map(
        ({ id, title, content, votes, author, comments }) => (
          <Card key={id}>
            <CardHeader>
              <Link href={`/r/${subreddit.name}/post/${id}`}>
                <CardTitle>{title}</CardTitle>
              </Link>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <CardDescription>{JSON.stringify(content)}</CardDescription>
            </CardContent>
            <CardFooter>
              <div>votes: {votes.length}</div>
              <div>author {author.email}</div>
              <div>comments {comments.length}</div>
            </CardFooter>
          </Card>
        ),
      )}
    </Shell>
  )
}
