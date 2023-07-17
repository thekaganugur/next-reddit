import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import "./globals.css"
import { Providers } from "./providers"

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
    <html className="h-full" lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "flex h-full flex-col bg-background font-sans antialiased",
          inter.className,
        )}
      >
        <Providers>
          <header className="border-b">
            <div className="container flex h-16 items-center">
              <Link href="/" className="select-none font-bold">
                Next-Reddit
              </Link>
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="border-t">
            <div className="container pb-8 pt-6 md:py-8">
              <div className="flex items-center">
                <div className="text-left text-sm leading-loose text-muted-foreground">
                  Built by{" "}
                  <Link
                    href="https://www.linkedin.com/in/thekaganugur"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold transition-colors hover:text-foreground"
                  >
                    Kagan Ugur
                  </Link>
                  . Source code is available on{" "}
                  <Link
                    href="https://github.com/thekaganugur/next-reddit"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold transition-colors hover:text-foreground"
                  >
                    GitHub
                  </Link>
                  .
                </div>

                <div className="flex-1" />

                <ThemeToggle />
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
