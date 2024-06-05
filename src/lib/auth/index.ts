import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { NextAuthConfig, User } from "next-auth"
import { Adapter } from "next-auth/adapters"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import ResendProvider from "next-auth/providers/resend"
import { siteConfig } from "@/config/site"
import { authOptionsPartial } from "@/lib/auth/utils"
import { db } from "@/lib/db"
import { env } from "@/lib/env.mjs"

export const authOptions: NextAuthConfig = {
  ...authOptionsPartial,
  adapter: PrismaAdapter(db) as Adapter,

  providers: [
    ...authOptionsPartial.providers,
    // CredentialsProvider need to be added later
    ResendProvider({
      name: "Email (WebOnly)",
      from: env.SMTP_FROM,
    }),
    GoogleProvider,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        const dbUser = await db.user.findFirst({
          where: { email: credentials.email || "" },
        })
        if (dbUser && dbUser.password === credentials.password) {
          // console.log("auth success", dbUser)
          return {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            image: dbUser.image,
          }
        }
        return null
      },
    }),
  ],
  callbacks: {
    // Update session with user data
    session: async ({ session, user, token }) => {
      // console.log("session callback", session, user, token)
      if (user) {
        session.user.id = user.id
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        session.user.isAdmin = (user as any)?.isAdmin || false
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        session.user.image = (user as any)?.image || siteConfig.defaultUserImg
      } else if (token) {
        const dbUser = await db.user.findUnique({ where: { id: token.sub } })
        if (!dbUser) throw new Error("User not found")
        session.user.id = dbUser.id
        session.user.name = dbUser.name
        session.user.email = dbUser.email || token.email || ""
        session.user.isAdmin = dbUser.isAdmin
        session.user.image = dbUser.image || siteConfig.defaultUserImg
      }
      return session
    },
    jwt: async ({ token, user, account }) => {
      // console.log("jwt callback", token, user, account, session, rest)
      if (account?.provider === "credentials") {
        if (user) {
          token.id = user.id
          token.name = user.name
          token.email = user.email
          token.image = user.image
          token.isAdmin = false
        }
      }
      return token
    },
  },
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)

export const getUserAuth = async () => {
  const session = await auth()
  return { session }
}

export const checkAuth = async () => {
  const { session } = await getUserAuth()
  // if (!session) redirect("/sign-in")
  if (!session) throw new Error("Unauthorized")
}
