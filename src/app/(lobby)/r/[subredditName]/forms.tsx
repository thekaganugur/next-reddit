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
import { catchError } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { createPost } from "./actions"
import { createPostFormSchema } from "./schemas"

type Inputs = z.infer<typeof createPostFormSchema>

type Props = {
  onSuccesful?: () => void
  subredditId: string
}

export function CreatePostForm({ onSuccesful, subredditId }: Props) {
  const form = useForm<Inputs>({
    resolver: zodResolver(createPostFormSchema),
  })
  const [isPending, startTransition] = useTransition()

  function onSubmit(values: Inputs) {
    startTransition(async () => {
      try {
        await createPost({ ...values, subredditId })
        onSuccesful?.()
        toast({
          description: "Your post has been published.",
        })
      } catch (error) {
        catchError(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Title</FormLabel>
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
          name="content"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <Button disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Publish!
        </Button>
      </form>
    </Form>
  )
}
