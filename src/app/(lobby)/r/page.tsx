import { Header } from "@/components/header"
import PaginationButton from "@/components/pagination-button"
import { Shell } from "@/components/shell"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { formatTimeToNow } from "@/lib/utils"
import { Plus } from "lucide-react"
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
  const session = await getAuthSession()
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
        {session?.user ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button size="sm" variant="secondary">
                <Plus className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end">
              <CreateSubredditForm />
            </PopoverContent>
          </Popover>
        ) : null}
      </div>
      {subreddits.map(({ name, title, description, id, posts, createdAt }) => (
        <Card key={id}>
          <CardHeader>
            <Link href={`/r/${name}`}>
              <CardTitle>
                r/{name}: {title}
              </CardTitle>
            </Link>
          </CardHeader>
          <CardContent>
            <p className={"text-sm"}>{description}</p>
          </CardContent>
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
