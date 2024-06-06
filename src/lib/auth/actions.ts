"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { UserSigninSchema } from "../validations/user"
import { signIn as naSignIn, signOut as naSignOut } from "."

export const signIn = async (provider?: string) => {
  return naSignIn(provider)
}
export const signInCredentials = async (
  values: z.infer<typeof UserSigninSchema>
) => {
  const validatedFields = UserSigninSchema.safeParse(values)
  if (!validatedFields.success) throw new Error("Invalid fields")

  return naSignIn("credentials", {
    ...validatedFields.data,
    callbackUrl: "/dashboard",
  })
}

export const signInEmail = async (email: string) => {
  return naSignIn("resend", { email })
}

export const signOut = async () => {
  await naSignOut()
  // revalidatePath("/")
  // redirect("/")
}
