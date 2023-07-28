import { Header } from "@/components/header"
import { Shell } from "@/components/shell"
import { CreateSubredditForm } from "./forms"

export default async function CreateSubRedditPage() {
  return (
    <Shell>
      <Header title="Create a new community" />
      <CreateSubredditForm />
    </Shell>
  )
}
