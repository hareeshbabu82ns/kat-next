"use client"
import { AccountCard, AccountCardFooter, AccountCardBody } from "./AccountCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMutation } from "@tanstack/react-query"
import { updateUser } from "./actions"
import { toast } from "sonner"
import { useState } from "react"

export default function UpdateNameCard({ name }: { name: string }) {
  const [userName, setUserName] = useState(name ?? "")

  const { mutate: updateUserFn, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("Successfully updated name!")
    },
    onError: () => {
      toast.error("Error updating name.")
    },
  })

  return (
    <AccountCard
      params={{
        header: "Your Name",
        description:
          "Please enter your full name, or a display name you are comfortable with.",
      }}
    >
      <AccountCardBody>
        <Input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          name="name"
        />
      </AccountCardBody>
      <AccountCardFooter description="64 characters maximum">
        <Button
          onClick={() => {
            updateUserFn({ name: userName })
          }}
          disabled={userName === "" || isPending}
        >
          Update Name
        </Button>
      </AccountCardFooter>
    </AccountCard>
  )
}
