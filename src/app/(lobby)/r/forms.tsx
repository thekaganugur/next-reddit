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
import { toast } from "@/components/ui/use-toast"
import { useLoading } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { myAction } from "./actions"

const schema = z.object({
  name: z.string(),
  // .nonempty({
  //   message: "",
  // }),
})

type Inputs = z.infer<typeof schema>

export function CreateSubredditForm() {
  const { loadingHandler, loading } = useLoading()
  const form = useForm<Inputs>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(values: Inputs) {
    try {
      loadingHandler(myAction(values.name))
      toast({
        description: "Subreddit created!",
      })
    } catch {
      toast({
        description: "Something went wrong, please try again later.",
        variant: "destructive",
      })
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
        <Button disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create!
        </Button>
      </form>
    </Form>
  )
}
