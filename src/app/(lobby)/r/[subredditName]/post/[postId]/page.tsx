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
    postId: string
  }
}

export default async function SubRedditPage({ params }: Props) {
  const post = await prisma.post.findUnique({
    where: { id: params.postId },
    include: { subreddit: true, votes: true, author: true, comments: true },
  })

  if (!post) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <Link href={`/r/${post.subreddit.name}`}>
          <CardTitle>r/{post.subreddit.name}</CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <CardDescription>{post.content}</CardDescription>
      </CardContent>
      <CardFooter>
        <div>votes: {post.votes.length}</div>
        <div>author {post.author.email}</div>
        <div>comments {post.comments.length}</div>
      </CardFooter>
    </Card>
  )
}
