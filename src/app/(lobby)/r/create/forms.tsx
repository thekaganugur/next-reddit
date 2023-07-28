"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { toastServerError, useLoading } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { createSubreddit } from "./actions"
import { createSubredditSchema } from "./schemas"

type Inputs = z.infer<typeof createSubredditSchema>

type Props = {
  onSuccesful?: () => void
}

export function CreateSubredditForm({ onSuccesful }: Props) {
  const { loadingHandler, loading } = useLoading()
  const router = useRouter()
  const form = useForm<Inputs>({ resolver: zodResolver(createSubredditSchema) })

  async function onSubmit(values: Inputs) {
    try {
      const { name } = await loadingHandler(createSubreddit(values))
      onSuccesful?.()
      toast({ description: "Subreddit created!" })
      router.replace(`/r/${name}`)
    } catch (error) {
      toastServerError(error)
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Subreddit name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Subreddit title</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Subreddit description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <Button disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create!
        </Button>
      </form>
    </Form>
  )
}