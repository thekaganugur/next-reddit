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

type Props = {
  params: {
    subredditName: string
  }
}

export default async function SubRedditPage({ params }: Props) {
  const subreddit = await prisma.subreddit.findUnique({
    where: { name: params.subredditName },
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

  if (!subreddit) return null

  return (
    <Shell>
      <Header
        title={`r/${subreddit.name}`}
        description={subreddit.description}
      />

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
