"use client"

// import Link from "next/link"
import { useSession } from "next-auth/react"
import { signIn, signOut } from "@/lib/auth/actions"
import { Button } from "../ui/button"

export default function AuthButton() {
  const session = useSession()

  return session?.data?.user ? (
    <Button variant="outline" onClick={async () => await signOut()}>
      {session.data.user.name} Sign out
    </Button>
  ) : (
    <Button variant="link" onClick={async () => await signIn()}>
      Sign in
    </Button>
    // <Button asChild variant="link">
    //   <Link href="/sign-in">Sign In</Link>
    // </Button>
  )
}
