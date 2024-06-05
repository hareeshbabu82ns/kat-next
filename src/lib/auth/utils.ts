import { PrismaAdapter } from "@auth/prisma-adapter"
// import GithubProvider from "next-auth/providers/github"
import { DefaultSession, NextAuthConfig, User } from "next-auth"
import { Adapter } from "next-auth/adapters"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import ResendProvider from "next-auth/providers/resend"
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

export const BASE_PATH = "/api/auth"

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
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
    ResendProvider({
      name: "Email (WebOnly)",
      from: env.SMTP_FROM,
    }),
    GoogleProvider,
  ],
  basePath: BASE_PATH,
  debug: process.env.NODE_ENV === "development",
  secret: env.AUTH_SECRET,
  session: {
    strategy: "jwt", // needed for credentials provider (wont use DB for sessions)
  },
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
