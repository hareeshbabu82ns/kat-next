"use server"

import { getUserAuth } from "@/lib/auth/utils"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function updateUser(body: { name?: string; email?: string }) {
  const { session } = await getUserAuth()
  if (!session) throw new Error("User not logged in")
  await db.user.update({ where: { id: session.user.id }, data: { ...body } })
  revalidatePath("/account")
}
