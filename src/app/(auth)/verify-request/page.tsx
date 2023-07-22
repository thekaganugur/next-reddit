import { Header } from "@/components/header"
import { Shell } from "@/components/shell"
import { buttonVariants } from "@/components/ui/button"
import { Metadata } from "next"
import Link from "next/link"

export const metadata = {
  title: "Check your email",
  description: "A sign in link has been sent to your email address.",
} satisfies Metadata

export default async function SignInPage() {
  return (
    <Shell>
      <Header
        title="Check your email"
        description="A sign in link has been sent to your email address."
        size="sm"
        className="text-center"
      />
      <Link href="/" className={buttonVariants()}>
        Go homepage
      </Link>
    </Shell>
  )
}
