"use client"

import { signOut } from "next-auth/react"
import { Button, ButtonProps } from "../ui/button"

export default function SignOutBtn({
  children,
  ...props
}: ButtonProps & React.RefAttributes<HTMLButtonElement>) {
  return (
    <Button {...props} onClick={() => signOut({ callbackUrl: "/" })}>
      {children ? children : "Sign out"}
    </Button>
  )
}
