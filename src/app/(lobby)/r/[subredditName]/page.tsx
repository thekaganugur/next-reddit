import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { prisma } from "@/lib/db"

type Props = {
  params: {
    subredditName: string
  }
}

export default async function SubRedditPage({ params }: Props) {
  const subreddit = await prisma.subreddit.findUnique({
    where: { name: params.subredditName },
  })

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>r/{subreddit?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{subreddit?.description}</CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}
