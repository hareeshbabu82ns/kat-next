"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { signOut } from "@/lib/auth/actions"
import { Icons } from "../shared/icons"
import { DropdownMenuItem } from "../ui/dropdown-menu"

export default function AuthDropdownMenuItem() {
  const session = useSession()

  return session?.data?.user ? (
    <DropdownMenuItem onClick={async () => await signOut()}>
      <Icons.logout className="mr-2 size-4" />
      <span>Logout</span>
    </DropdownMenuItem>
  ) : (
    <DropdownMenuItem asChild>
      <Link href="/sign-in" className="flex">
        <Icons.user className="mr-2 size-4" />
        <span>Sign In</span>
      </Link>
    </DropdownMenuItem>
  )
}
