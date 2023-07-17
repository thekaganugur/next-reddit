import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Next Reddit",
  description: "A Reddit App built with everything new in Next.js 13",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="h-full" lang="en">
      <body
        className={cn(
          "flex h-full flex-col bg-background font-sans antialiased",
          inter.className,
        )}
      >
        <header className="border-b">
          <div className="container flex h-16 items-center">
            <Link href="/" className="select-none font-bold">
              Next-Reddit
            </Link>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t">
          <div className="container pb-8 pt-6 md:py-8">footer</div>
        </footer>
      </body>
    </html>
  )
}
