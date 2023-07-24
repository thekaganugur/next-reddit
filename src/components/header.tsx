import { cn } from "@/lib/utils"

type Props = React.HTMLAttributes<HTMLDivElement> & {
  title: string
  description?: string | null
  size?: "default" | "sm"
}

export function Header({
  title,
  description,
  size = "default",
  className,
  ...props
}: Props) {
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      <h1
        className={cn(
          "line-clamp-1 text-3xl font-bold tracking-tight",
          size === "default" && "md:text-4xl",
        )}
      >
        {title}
      </h1>
      {description ? (
        <p
          className={cn(
            "line-clamp-2 text-muted-foreground",
            size === "default" && "text-lg",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
