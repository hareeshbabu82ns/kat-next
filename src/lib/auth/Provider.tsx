import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { auth } from "@/auth"
import { BASE_PATH } from "./utils"

export default async function NextAuthProvider({
  children,
}: {
  children: ReactNode
}) {
  const session = await auth()
  if (session && session.user) {
    session.user = {
      id: session.user.id,
      name: session.user.email,
      email: session.user.email,
      image: session.user.image,
    }
  }
  return (
    <SessionProvider basePath={BASE_PATH} session={session}>
      {children}
    </SessionProvider>
  )
}
