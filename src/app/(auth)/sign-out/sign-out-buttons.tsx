"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

export default function SignOutButtons() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  return (
    <div className="flex w-full items-center space-x-2">
      <Button
        size="sm"
        className="w-full"
        onClick={() =>
          startTransition(() =>
            signOut({ callbackUrl: window.location.origin }),
          )
        }
        disabled={isPending}
      >
        Sign Out
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={router.back}
        disabled={isPending}
      >
        Go back
      </Button>
    </div>
  )
}
