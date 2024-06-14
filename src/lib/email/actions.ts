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
  adminUsers.forEach((user) => {
    if (user.email && !adminEmails.includes(user.email)) {
      adminEmails.push(user.email)
    }
  })
  const finalCC = includeAdmins ? adminEmails.splice(0, 2) : [] // send to first 2 admins

  const data = await resend.emails.send({
    from: `SriKarumariAmmanCalgary Temple <${env.SMTP_FROM}>`,
    to: [...to],
    cc: finalCC,
    subject: subject,
    react,
  })

  return data
}
