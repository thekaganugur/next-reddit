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
  const loadingHandler = React.useCallback(
    async (promise: Promise<unknown>, config?: { keepGoing: boolean }) => {
      setIsLoading(true)
      try {
        const result = await promise
        if (!config?.keepGoing) setIsLoading(false)
        return result
      } catch (e: unknown) {
        setError(e)
      }
    },
    [],
  )
  return { loadingHandler, loading, error }
}
