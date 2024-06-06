import { SessionProvider } from "next-auth/react"
import AuthClientButton from "@/components/auth/AuthButton.client"
import { apiRoutePrefix } from "@/config/routes"
import { auth } from "@/lib/auth"

export default async function AuthButton() {
  const session = await auth()
  // console.log("auth button: ", session)
  // if (session && session.user) {
  //   session.user = {
  //     id: session.user.id,
  //     name: session.user.email,
  //     email: session.user.email,
  //   }
  // }

  return (
    <SessionProvider basePath={apiRoutePrefix} session={session}>
      <AuthClientButton />
    </SessionProvider>
  )
}
