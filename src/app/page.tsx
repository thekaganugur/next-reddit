import { Shell } from "@/components/shell"
import { Button } from "@/components/ui/button"
import "@/lib/env"
import { Github } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <Shell as="div">
      <section className="mx-auto flex max-w-[64rem] flex-col items-center justify-center gap-10 py-6 text-center md:py-12 lg:py-32">
        <Button variant="link" size="lg" asChild>
          <Link
            href="https://github.com/thekaganugur/next-reddit"
            className="flex gap-1"
            target="_blank"
            rel="noreferrer"
          >
            View in <Github className="h-4 w-4" /> Github
          </Link>
        </Button>
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
          A Reddit App built with everything new in Next.js 13
        </h1>

        <Button asChild>
          <Link href="/pokemons">Some button links here</Link>
        </Button>
      </section>
    </Shell>
  )
}
