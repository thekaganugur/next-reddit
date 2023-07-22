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
import { useLoading } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const schema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
})

type Inputs = z.infer<typeof schema>

export default function SignInForm() {
  const { loadingHandler, loading } = useLoading()
  const form = useForm<Inputs>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(values: Inputs) {
    try {
      loadingHandler(signIn("email", { email: values.email }), {
        keepGoing: true,
      })
    } catch {
      toast.error("Something went wrong, please try again later.")
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
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <Button disabled={loading}>Sign In</Button>
      </form>
    </Form>
  )
}
