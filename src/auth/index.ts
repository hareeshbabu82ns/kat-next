import { redirect } from "next/navigation"
import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth/utils"

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)

export const getUserAuth = async () => {
  const session = await auth()
  return { session }
}

export const checkAuth = async () => {
  const { session } = await getUserAuth()
  if (!session) redirect("/sign-in")
}
