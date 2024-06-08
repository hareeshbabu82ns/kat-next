"use server"

import { env } from "../env.mjs"
import { resend } from "."

export async function sendMail({
  to,
  subject,
  react,
}: {
  to: string[]
  subject: string
  react: JSX.Element
}) {
  const data = await resend.emails.send({
    from: `SriKarumariAmmanCalgary Temple <${env.SMTP_FROM}>`,
    to: [...to],
    cc: [...env.ADMIN_EMAILS.split(",")],
    subject: subject,
    react,
  })

  return data
}
