import { Shell } from "@/components/shell"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { prisma } from "@/lib/db"
import "@/lib/env"
import { Github } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

export default function Home() {
  return (
    <Shell as="div">
      <section className="mx-auto flex max-w-[64rem] flex-col items-center justify-center gap-10 py-6 text-center md:py-12 lg:py-40">
        <Button variant="link" size="lg" asChild>
          <Link
            href="https://github.com/thekaganugur/next-reddit"
            className="flex gap-1"
            target="_blank"
            rel="noreferrer"
          >
            View in <Github className="h-4 w-4" /> Github
          </Link>
        </Button>
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
          A Reddit App built with everything new in Next.js 13
        </h1>
      </section>

      <section className="space-y-6 py-6 md:pt-12 lg:pt-32">
        <div className="flex items-center justify-between">
          <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0 sm:text-3xl">
            Highligted Subreddits
          </h2>
          <Link href="/r" className={buttonVariants({ size: "sm" })}>
            View all
          </Link>
        </div>
        <Suspense fallback={"Loading...."}>
          <HighligtedSubReddits />
        </Suspense>
      </section>

      <section className="space-y-6 py-6 md:pt-12 lg:pt-32">
        <div className="flex items-center justify-between">
          <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0 sm:text-3xl">
            Highligted Posts
          </h2>
        </div>
        <Suspense fallback={"Loading...."}>
          <HighligtedPosts />
        </Suspense>
      </section>
    </Shell>
  )
}

async function HighligtedSubReddits() {
  const subreddits = await prisma.subreddit.findMany({
    take: 4,
    orderBy: { posts: { _count: "asc" } },
  })

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {subreddits.map(({ name, description, id }) => (
        <Card key={id}>
          <CardHeader>
            <Link href={`/r/${name}`}>
              <CardTitle>r/{name}</CardTitle>
            </Link>
          </CardHeader>
          <CardContent>
            <CardDescription>{description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

async function HighligtedPosts() {
  const posts = await prisma.post.findMany({
    take: 8,
    include: { subreddit: true, votes: true, author: true, comments: true },
    orderBy: { votes: { _count: "asc" } },
  })

  return (
    <div className="flex flex-col gap-4">
      {posts.map(
        ({ id, title, subreddit, content, votes, author, comments }) => (
          <Card key={id}>
            <CardHeader>
              <Link href={`/r/${subreddit.name}/post/${id}`}>
                <CardTitle>{title}</CardTitle>
              </Link>
              <Link href={`/r/${subreddit.name}`}>
                <CardTitle>r/{subreddit.name}</CardTitle>
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
    </div>
  )
}
