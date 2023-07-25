"use client"

import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "next-themes"
import React from "react"

type Props = {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return (
    <ThemeProvider attribute="class">
      {children}
      <Toaster />
    </ThemeProvider>
  )
}
