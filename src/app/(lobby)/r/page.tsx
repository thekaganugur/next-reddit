import { Header } from "@/components/header"
import PaginationButton from "@/components/pagination-button"
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
import { formatTimeToNow } from "@/lib/utils"
import Link from "next/link"
import { z } from "zod"
import { CreateSubredditPopover } from "./create-subreddit-popover"

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
      include: { creator: true, posts: true },
    }),
    prisma.subreddit.count(),
  ])

  return (
    <Shell>
      <div className="flex justify-between">
        <Header title="Communities" description="Discover the communities!" />
        <CreateSubredditPopover />
      </div>
      {subreddits.map(({ name, title, description, id, createdAt }) => (
        <Card key={id}>
          <CardHeader>
            <Link href={`/r/${name}`}>
              <CardTitle>
                r/{name}: {title}
              </CardTitle>
            </Link>
          </CardHeader>
          {description ? (
            <CardContent>
              <p className={"text-sm"}>{description}</p>
            </CardContent>
          ) : null}
          <CardFooter>
            <CardDescription className="text-xs">
              Created {formatTimeToNow(createdAt)}
            </CardDescription>
          </CardFooter>
        </Card>
      ))}
      <PaginationButton page={page} pageCount={Math.ceil(count / per_page)} />
    </Shell>
  )
}
