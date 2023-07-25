"use client"

import { Button } from "@/components/ui/button"
import { createQueryString } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import React from "react"

type Props = {
  page: number
  pageCount: number
}

function derivePaginationRange({
  page,
  pageCount,
}: {
  page: number
  pageCount: number
}) {
  const delta = 3

  const range = []
  for (
    let i = Math.max(2, Number(page) - delta);
    i <= Math.min(pageCount - 1, Number(page) + delta);
    i++
  ) {
    range.push(i)
  }

  if (Number(page) - delta > 2) {
    range.unshift("...")
  }
  if (Number(page) + delta < pageCount - 1) {
    range.push("...")
  }

  range.unshift(1)
  if (pageCount !== 1) {
    range.push(pageCount)
  }

  return range
}

export default function PaginationButton({ page, pageCount }: Props) {
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()
  const pathName = usePathname()

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        size="icon"
        variant="outline"
        onClick={() => {
          startTransition(() => {
            router.push(
              `${pathName}?${createQueryString({
                page: page - 1,
              })}`
            )
          })
        }}
        disabled={page === 1 || isPending}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      {derivePaginationRange({ pageCount, page }).map((pageNumber, i) =>
        pageNumber === "..." ? (
          <Button key={i} variant="outline" size="icon" disabled>
            ...
          </Button>
        ) : (
          <Button
            key={i}
            variant={pageNumber === page ? "default" : "outline"}
            size="icon"
            onClick={() => {
              startTransition(() => {
                router.push(
                  `${pathName}?${createQueryString({
                    page: pageNumber,
                  })}`
                )
              })
            }}
            disabled={isPending}
          >
            {pageNumber}
          </Button>
        )
      )}

      <Button
        size="icon"
        variant="outline"
        onClick={() => {
          startTransition(() => {
            router.push(
              `${pathName}?${createQueryString({
                page: page + 1,
              })}`
            )
          })
        }}
        disabled={pageCount === page || isPending}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  )
}
