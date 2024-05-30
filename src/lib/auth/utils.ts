import { PrismaAdapter } from "@auth/prisma-adapter"
import { redirect } from "next/navigation"
import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth"
// import GithubProvider from "next-auth/providers/github"
import { Adapter } from "next-auth/adapters"
import GoogleProvider from "next-auth/providers/google"
import { siteConfig } from "@/config/site"
import { db } from "@/lib/db/index"
import { env } from "@/lib/env.mjs"

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string
      isAdmin?: boolean
      image?: string
    }
  }
}

export type AuthSession = {
  session: {
    user: {
      id: string
      name?: string
      email?: string
      isAdmin?: boolean
      image?: string
    }
  } | null
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  callbacks: {
    session: ({ session, user }) => {
      session.user.id = user.id
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user.isAdmin = (user as any)?.isAdmin || false
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user.image = (user as any)?.image || siteConfig.defaultUserImg
      return session
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    // GithubProvider({
    //   clientId: env.GITHUB_CLIENT_ID,
    //   clientSecret: env.GITHUB_CLIENT_SECRET,
    // }),
  ],
}

export const getUserAuth = async () => {
  const session = await getServerSession(authOptions)
  return { session }
}

export const checkAuth = async () => {
  const { session } = await getUserAuth()
  if (!session) redirect("/api/auth/signin")
}
