"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

export default function OauthButtons() {
  return (
    <div>
      <Button
        onClick={() => {
          signIn("google")
        }}
      >
        Google
      </Button>
      <Button
        onClick={() => {
          signIn("github")
        }}
      >
        Github
      </Button>
    </div>
  )
}
