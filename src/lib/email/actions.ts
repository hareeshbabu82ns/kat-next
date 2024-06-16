"use server"

import { UserRole } from "@prisma/client"
import { db } from "../db"
import { env } from "../env.mjs"
import { resend } from "."

export async function sendMail({
  to,
  subject,
  react,
  includeAdmins = true,
}: {
  to: string[]
  subject: string
  react: JSX.Element
  includeAdmins?: boolean
}) {
  const adminEmails = env.ADMIN_EMAILS.split(",")
  const adminUsers = await db.user.findMany({ where: { role: UserRole.ADMIN } })
  if (env.NODE_ENV !== "development") {
    adminUsers.forEach((user) => {
      if (user.email && !adminEmails.includes(user.email)) {
        adminEmails.push(user.email)
      }
    })
  }
  const finalCC = includeAdmins ? adminEmails.splice(0, 3) : [] // send to first 3 admins
  // console.log({ finalCC, env: env.NODE_ENV })

  const data = await resend.emails.send({
    from: `Calgary Srithevi Karumariamman Temple <${env.SMTP_FROM}>`,
    to: [...to],
    cc: finalCC,
    subject: subject,
    react,
  })

  return data
}
