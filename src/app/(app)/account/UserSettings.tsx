"use client"
import { AuthSession } from "@/lib/auth/utils"
import UpdateEmailCard from "./UpdateEmailCard"
import UpdateNameCard from "./UpdateNameCard"

export default function UserSettings({
  session,
}: {
  session: AuthSession["session"] | any
}) {
  return (
    <>
      <UpdateNameCard name={session?.user.name ?? ""} />
      <UpdateEmailCard
        name={session?.user.name ?? ""}
        email={session?.user.email ?? ""}
      />
    </>
  )
}
