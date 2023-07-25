"use client"

import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import React from "react"

type Props = {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return (
    <ThemeProvider attribute="class">
      <SessionProvider>{children}</SessionProvider>
      <Toaster />
    </ThemeProvider>
  )
}
