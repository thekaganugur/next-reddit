"use client"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Plus } from "lucide-react"
import { useSession } from "next-auth/react"
import React from "react"
import { CreatePostForm } from "./forms"

export function CreatePostPopover() {
  const session = useSession()
  const [open, setOpen] = React.useState(false)

  if (!session.data) return null

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="sm" variant="secondary">
          <Plus className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <CreatePostForm
          onSuccesful={() => {
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
