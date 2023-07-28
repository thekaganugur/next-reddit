import { Button } from "@/components/ui/button"

type Props = {
  subscribed: boolean
  // userId: string
  // subredditId: string
}

export async function SubscribeLeaveButton({
  subscribed,
} // userId,
// subredditId,
: Props) {
  const subscribe = !subscribed

  return (
    <Button
      size="sm"
      variant={subscribe ? "secondary" : "destructive"}
      // onClick={async () => {
      //   subscribe
      //     ? await prisma.subscription.create({
      //         data: { userId, subredditId },
      //       })
      //     : await prisma.subscription.delete({
      //         where: {
      //           userId_subredditId: {
      //             userId,
      //             subredditId,
      //           },
      //         },
      //       })
      // }}
    >
      {subscribe ? "Subscribe" : "Leave"}
    </Button>
  )
}
