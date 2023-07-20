import Image from "next/image"
import Link from "next/link"

import Logo from "@/components/logo"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-full">
      <div className="relative flex w-36 justify-center lg:w-60">
        <Image
          src="/images/auth-layout.webp"
          alt="Nice looking patter"
          fill
          className="h-full object-cover"
          priority
        />

        <Link href="/" className="absolute top-6 ">
          <Logo />
        </Link>
      </div>

      <main className="self-center">{children}</main>
    </div>
  )
}
