import { Shell } from "@/components/shell"
import { buttonVariants } from "@/components/ui/button"
import { getAuthSession } from "@/lib/auth"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Check your email",
  description: "A sign in link has been sent to your email address.",
} satisfies Metadata

export default async function VerifyRequestPage() {
  const session = await getAuthSession()
  if (session) redirect("/")

  return (
    <Shell>
      <div className="flex items-end justify-center">
        <Image
          src="/receiving-a-email.gif"
          alt="Receiving a email"
          height={200}
          width={200}
          className="mx-auto h-full object-cover"
          priority
        />
        <span className="absolute text-xs text-muted-foreground">
          by{" "}
          <a href="https://icons8.com/illustrations/author/627444">Julia G</a>{" "}
          from <a href="https://icons8.com/illustrations">Ouch!</a>
        </span>
      </div>
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold tracking-tight md:text-4xl">
          Check your email
        </h1>
        <p className="text-muted-foreground">
          A sign in link has been sent to your email address.
        </p>
      </div>
      <Link href="/" className={buttonVariants()}>
        Go homepage
      </Link>
    </Shell>
  )
}
