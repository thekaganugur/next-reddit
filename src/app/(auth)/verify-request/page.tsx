import { Header } from "@/components/header"
import { Shell } from "@/components/shell"
import { buttonVariants } from "@/components/ui/button"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Check your email",
  description: "A sign in link has been sent to your email address.",
} satisfies Metadata

export default async function VerifyRequestPage() {
  return (
    <Shell>
      <div className="flex items-end justify-center">
        <Image
          src="/receiving-a-email.gif"
          alt="Receiving a email"
          height={200}
          width={200}
          className="mx-auto h-full object-cover"
        />
        <span className="absolute text-xs text-muted-foreground">
          by{" "}
          <a href="https://icons8.com/illustrations/author/627444">Julia G</a>{" "}
          from <a href="https://icons8.com/illustrations">Ouch!</a>
        </span>
      </div>
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
