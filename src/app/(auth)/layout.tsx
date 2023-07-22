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
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />

        <Link href="/" className="absolute top-6 ">
          <Logo className="text-black" />
        </Link>
      </div>

      <main className="max-w-lg flex-1 self-center">{children}</main>
    </div>
  )
}
