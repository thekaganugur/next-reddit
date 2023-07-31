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
  // const subscribed = Boolean(
  //   subreddit?.subscribers[0]?.userId === session?.user.id,
  // )

  return (
    <Shell>
      <Header
        title={subreddit.title}
        description={`r/${subreddit.name}${
          subreddit.description ? `: ${subreddit.description}` : ""
        }`}
      />
      {/* <div className="flex items-center gap-2"> */}
      {/* {subscribed && <CreatePostPopover subredditId={subreddit.id} />} */}
      {/* <SubscribeLeaveButton subscribed={subscribed} /> */}
      {/* </div> */}

      {subreddit.posts.map(
        ({ id, title, content, votes, author, comments }) => (
          <Card key={id}>
            <CardHeader>
              <Link href={`/r/${subreddit.name}/post/${id}`}>
                <CardTitle>{title}</CardTitle>
              </Link>
            </CardHeader>
            <CardContent>{content}</CardContent>
            <CardFooter>
              <CardDescription>
                <span>votes: {votes.length}</span>
                <span>author {author.email}</span>
                <span>comments {comments.length}</span>
              </CardDescription>
            </CardFooter>
          </Card>
        ),
      )}
    </Shell>
  )
}
