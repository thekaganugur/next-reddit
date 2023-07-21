import Logo from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getAuthSession } from "@/lib/auth"
import { LogOutIcon, User } from "lucide-react"
import Link from "next/link"

async function SiteHeader() {
  const session = await getAuthSession()

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center">
        <Link href="/">
          <Logo />
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
                  <AvatarFallback>
                    {session.user?.name ? (
                      `${session.user?.name
                        ?.split(" ")
                        .map((word) => word[0])
                        .join("")}`
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  {session.user?.name ? (
                    <p className="text-sm font-medium leading-none">
                      {session.user?.name}
                    </p>
                  ) : null}
                  {session.user?.email ? (
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user?.email}
                    </p>
                  ) : null}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/api/auth/signout">
                  <LogOutIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                  Log out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/sign-in" className={buttonVariants({ size: "sm" })}>
            Sign In
          </Link>
        )}
      </div>
    </header>
  )
}

function SiteFooter() {
  return (
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
  )
}

export default function LobbyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full flex-col">
      <SiteHeader />

      <main className="flex-1">{children}</main>

      <SiteFooter />
    </div>
  )
}
