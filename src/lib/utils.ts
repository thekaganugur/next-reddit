import { toast } from "@/components/ui/use-toast"
import { clsx, type ClassValue } from "clsx"
import React from "react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function sleep(time = 3000) {
  await new Promise((resolve) => {
    return setTimeout(resolve, time)
  })
}

export function useLoading() {
  const [loading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<undefined | unknown>(undefined)
  const loadingHandler = React.useCallback(async function <T extends unknown>(
    promise: Promise<T>,
    config?: { keepGoing: boolean },
  ) {
    setIsLoading(true)
    try {
      const result = await promise
      if (!config?.keepGoing) setIsLoading(false)
      return result
    } catch (e: unknown) {
      setIsLoading(false)
      setError(e)
      return promise
    }
  }, [])
  return { loadingHandler, loading, error }
}

export function createQueryString(
  params: Record<string, string | number | null>,
  searchParams?: string,
) {
  const newSearchParams = new URLSearchParams(searchParams?.toString())

  for (const [key, value] of Object.entries(params)) {
    if (value === null) {
      newSearchParams.delete(key)
    } else {
      newSearchParams.set(key, String(value))
    }
  }

  return newSearchParams.toString()
}

export function toastServerError(error: unknown) {
  error instanceof Error
    ? toast({ description: error.message, variant: "destructive" })
    : toast({
        description: "Something went wrong, please try again.",
        variant: "destructive",
      })
}
