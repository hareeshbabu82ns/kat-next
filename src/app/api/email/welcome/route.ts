import { NextResponse } from "next/server"
import { WelcomeEmail } from "@/components/emails/WelcomeEmail"
import { resend } from "@/lib/email/index"
import { emailWelcomeSchema } from "@/lib/email/utils"

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email } = emailWelcomeSchema.parse(body)
  try {
    const data = await resend.emails.send({
      from: "SriKarumariAmmanCalgary Temple <temple_admin@srikarumariamman.terabits.io>",
      to: [email],
      subject: "Welcome to HomeHub",
      react: WelcomeEmail({ firstName: name }),
      text: "Email powered by Resend.",
    })

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error })
  }
}
