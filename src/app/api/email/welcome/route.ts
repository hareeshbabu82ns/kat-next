import { NextResponse } from "next/server"
import { WelcomeEmail } from "@/components/emails/WelcomeEmail"
import { siteConfig } from "@/config/site"
import { sendMail } from "@/lib/email/actions"
import { emailWelcomeSchema } from "@/lib/email/utils"

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email } = emailWelcomeSchema.parse(body)
  try {
    const data = await sendMail({
      to: [email],
      subject: `Welcome to ${siteConfig.name}`,
      react: WelcomeEmail({ name }),
    })

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error })
  }
}
