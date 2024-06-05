import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth"
import AuthClientButton from "@/components/auth/AuthButton.client"
import { BASE_PATH } from "@/lib/auth/utils"

export default async function AuthButton() {
  const session = await auth()
  console.log("auth button: ", session)
  if (session && session.user) {
    session.user = {
      id: session.user.id,
      name: session.user.email,
      email: session.user.email,
    }
  }

  return (
    <SessionProvider basePath={BASE_PATH} session={session}>
      <AuthClientButton />
    </SessionProvider>
  )
}
