import { DefaultSession } from "next-auth"

// https://next-auth.js.org/getting-started/typescript#submodules
declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    username?: string
  }
}

// https://next-auth.js.org/getting-started/typescript#extend-default-interface-properties
declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      username?: string
    } & DefaultSession["user"]
  }
}
