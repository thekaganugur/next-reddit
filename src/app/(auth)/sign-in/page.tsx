import { Header } from "@/components/header"
import { Shell } from "@/components/shell"
import { Separator } from "@/components/ui/separator"
import { getAuthSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import SignInForm from "./form"

export default async function SignInPage() {
  const session = await getAuthSession()
  if (session) redirect("/")

  return (
    <Shell>
      <Header title="Sign in" />

      <Separator className="flex items-center justify-center">
        <div className="absolute bg-background px-2 text-xs uppercase text-muted-foreground">
          Or continue with
        </div>
      </Separator>
      <SignInForm />
    </Shell>
  )
}
