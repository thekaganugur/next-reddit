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
  const subreddit = await prisma.subreddit.findUnique({
    where: { name: subredditName },
    include: {
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

  return (
    <Shell>
      <div className="flex justify-between">
        <Header
          title={subreddit.title}
          description={`r/${subreddit.name}${
            subreddit.description ? `: ${subreddit.description}` : ""
          }`}
        />
        <CreatePostPopover />
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
