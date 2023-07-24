import { Header } from "@/components/header"
import { Shell } from "@/components/shell"
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
    <Shell>
      <Header title={post.title} />
      <Link href={`/r/${post.subreddit.name}`}>r/{post.subreddit.name}</Link>

      <div>{post.content}</div>
      <div>
        <div>votes: {post.votes.length}</div>
        <div>author {post.author.email}</div>
        <div>comments {post.comments.length}</div>
      </div>
    </Shell>
  )
}
