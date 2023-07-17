import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"

const shellVariants = cva("grid items-center gap-8 pb-8 pt-6 md:py-8", {
  variants: {
    variant: {
      default: "container",
      centered: "mx-auto mb-16 mt-20 max-w-md justify-center",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shellVariants> {
  as?: React.ElementType
}

function Shell({ className, as: Comp = "section", variant, ...props }: Props) {
  return (
    <Comp className={cn(shellVariants({ variant }), className)} {...props} />
  )
}

export { Shell, shellVariants }
