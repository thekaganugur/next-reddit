import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getAuthSession } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { LogOutIcon } from "lucide-react"
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getAuthSession()

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

              <div className="flex-1" />

              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={session.user?.image ?? ""}
                          alt={session.user?.name ?? ""}
                        />
                        <AvatarFallback>{`${session.user?.name
                          ?.split(" ")
                          .map((word) => word[0])
                          .join("")}`}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {session.user?.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session.user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/api/auth/signout">
                        <LogOutIcon
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Log out
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button size="sm" asChild>
                  <Link href="/api/auth/signin">
                    Sign In
                    <span className="sr-only">Sign In</span>
                  </Link>
                </Button>
              )}
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="border-t">
            <div className="container pb-8 pt-6 md:py-8">
              <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
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
