import { Header } from "@/components/header"
import { Shell } from "@/components/shell"
import { Separator } from "@/components/ui/separator"
import { getAuthSession } from "@/lib/auth"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import SignInForm from "./forms"
import OauthButtons from "./oauth-buttons"

export const metadata = {
  title: "Sign In",
  description: "Sign in to your account",
} satisfies Metadata

export default async function SignInPage() {
  const session = await getAuthSession()
  if (session) redirect("/")

  return (
    <Shell>
      <Header
        title="Sign in"
        description="Sign in to your account"
        size="sm"
        className="text-center"
      />
      <OauthButtons />
      <Separator className="flex items-center justify-center">
        <div className="absolute bg-background px-2 text-xs uppercase text-muted-foreground">
          Or continue with
        </div>
      </Separator>
      <SignInForm />
    </Shell>
  )
}
