import { z } from "zod"

export const envScheme = z.object({
  DATABASE_URL: z.string().nonempty(),

  NEXTAUTH_URL: z.string().nonempty(),
  NEXTAUTH_SECRET: z.string().nonempty(),

  GOOGLE_ID: z.string().nonempty(),
  GOOGLE_SECRET: z.string().nonempty(),

  GITHUB_ID: z.string().nonempty(),
  GITHUB_SECRET: z.string().nonempty(),

  EMAIL_SERVER_USER: z.string().nonempty(),
  EMAIL_SERVER_PASSWORD: z.string().nonempty(),
  EMAIL_SERVER_HOST: z.string().nonempty(),
  EMAIL_SERVER_PORT: z.string().nonempty(),
  EMAIL_FROM: z.string().nonempty(),
})

const parsedEnv = envScheme.safeParse(process.env)

if (!parsedEnv.success) {
  console.error(parsedEnv.error.issues)
  throw new Error("There is an error with the server environment variables")
}

export const env = parsedEnv.data
