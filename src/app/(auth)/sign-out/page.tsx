import { Header } from "@/components/header"
import { Shell } from "@/components/shell"
import { Metadata } from "next"
import SignOutButtons from "./sign-out-buttons"

export const metadata = {
  title: "Sign Out",
  description: "Are you sure you want to sign out?",
} satisfies Metadata

export default async function SignOutPage() {
  return (
    <Shell>
      <Header
        title="Sign out"
        description="Are you sure you want to sign out?"
        size="sm"
        className="text-center"
      />
      <SignOutButtons />
    </Shell>
  )
}
