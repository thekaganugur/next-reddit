import { Header } from "@/components/header"
import PaginationButton from "@/components/pagination-button"
import { Shell } from "@/components/shell"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { prisma } from "@/lib/db"
import Link from "next/link"
import { z } from "zod"
import { CreateSubredditForm } from "./forms"

const ParamsScheme = z.object({
  page: z.string().default("1").pipe(z.coerce.number()),
  per_page: z.string().default("8").pipe(z.coerce.number()),
})

type Props = {
  searchParams: z.infer<typeof ParamsScheme>
}

export default async function SubRedditsPage({ searchParams }: Props) {
  const { page, per_page } = ParamsScheme.parse(searchParams)

  const [subreddits, count] = await prisma.$transaction([
    prisma.subreddit.findMany({
      skip: (page - 1) * per_page,
      take: per_page,
      orderBy: { createdAt: "desc" },
    }),
    prisma.subreddit.count(),
  ])

  return (
    <Shell>
      <div className="flex justify-between">
        <Header title="Communities" description="Discover the communities!" />

        <CreateSubredditForm />
      </div>
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

      <PaginationButton page={page} pageCount={Math.ceil(count / per_page)} />
    </Shell>
  )
}
