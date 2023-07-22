"use client"

import { Button } from "@/components/ui/button"
import { useLoading } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function SignOutButtons() {
  const router = useRouter()
  const { loading, loadingHandler } = useLoading()

  return (
    <div className="flex w-full items-center space-x-2">
      <Button
        size="sm"
        className="w-full"
        onClick={() =>
          loadingHandler(signOut({ callbackUrl: window.location.origin }), {
            keepGoing: true,
          })
        }
        disabled={loading}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Sign Out
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={router.back}
        disabled={loading}
      >
        Go back
      </Button>
    </div>
  )
}
