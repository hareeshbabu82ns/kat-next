"use client"
import { Session } from "next-auth"
import UpdateEmailCard from "./UpdateEmailCard"
import UpdateNameCard from "./UpdateNameCard"

export default function UserSettings({ session }: { session?: Session }) {
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
