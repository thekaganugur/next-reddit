import { Header } from "@/components/header"
import { Shell } from "@/components/shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignInPage() {
  return (
    <Shell>
      <Header title="Sign in" />
      <Input />
      <Button>Sign In</Button>
    </Shell>
  )
}
