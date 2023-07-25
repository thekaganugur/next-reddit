import { Header } from "@/components/header"
import PaginationButton from "@/components/pagination-button"
import { Shell } from "@/components/shell"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { prisma } from "@/lib/db"
import { Plus } from "lucide-react"
import Link from "next/link"
import { z } from "zod"
import { CreateSubredditForm } from "./form"

const ParamsScheme = z.object({
  page: z.string().default("1").pipe(z.coerce.number()),
  per_page: z.string().default("8").pipe(z.coerce.number()),
})

type Props = {
  searchParams: z.infer<typeof ParamsScheme>
}

export default async function SubRedditsPage({ searchParams }: Props) {
  const { page, per_page } = ParamsScheme.parse(searchParams)

  const subreddits = await prisma.subreddit.findMany({
    skip: (page - 1) * per_page,
    take: per_page,
    orderBy: { createdAt: "desc" },
  })

  return (
    <Shell>
      <div className="flex justify-between">
        <Header title="Communities" description="Discover the communities!" />

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

      <PaginationButton
        page={page}
        pageCount={Math.ceil(subreddits.length / per_page)}
      />
    </Shell>
  )
}
