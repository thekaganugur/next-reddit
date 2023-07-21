"use client"

import { ThemeProvider } from "next-themes"
import React from "react"
import { Toaster } from "sonner"

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
