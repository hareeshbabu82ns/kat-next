"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { signOut } from "@/auth/actions"
import { Button } from "../ui/button"

export default function AuthButton() {
  const session = useSession()

  return session?.data?.user ? (
    <Button onClick={async () => await signOut()}>
      {session.data.user.name} Sign out
    </Button>
  ) : (
    // <Button onClick={async () => await signIn()}>Sign in</Button>
    <Button asChild variant="link">
      <Link href="/sign-in">Sign In</Link>
    </Button>
  )
}
