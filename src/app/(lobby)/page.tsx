import { Shell } from "@/components/shell"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/db"
import "@/lib/env"
import { Github } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

async function HighligtedSubReddits() {
  const subreddits = await prisma.subreddit.findMany({
    take: 8,
    orderBy: { createdAt: "desc" },
  })

  return subreddits.map((subreddit) => (
    <div key={subreddit.id}>
      <span>{JSON.stringify(subreddit)}</span>
    </div>
  ))
}

export default function Home() {
  return (
    <Shell as="div">
      <section className="mx-auto flex max-w-[64rem] flex-col items-center justify-center gap-10 py-6 text-center md:py-12 lg:py-32">
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

        <Button asChild>
          <Link href="/r">Subreddits</Link>
        </Button>
      </section>

      <section className="space-y-6 py-6 md:pt-10 lg:pt-32">
        <div className="flex items-center justify-between">
          <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0 sm:text-3xl">
            Highligted Comminities
          </h2>
          <Button asChild>
            <Link href="/pokemons">View all</Link>
          </Button>
        </div>
        <Suspense fallback={"Loading...."}>
          <HighligtedSubReddits />
        </Suspense>
      </section>
    </Shell>
  )
}
