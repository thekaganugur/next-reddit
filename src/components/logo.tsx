import { cn } from "@/lib/utils"

type Props = {
  className?: string
}
export default function Logo({ className }: Props) {
  return (
    <div className={cn("select-none font-bold", className)}>Next-Reddit</div>
  )
}
