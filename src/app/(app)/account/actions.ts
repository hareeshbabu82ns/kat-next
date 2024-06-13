"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

export async function updateUser(body: { name?: string; email?: string }) {
  const session = await auth()
  if (!session) throw new Error("User not logged in")
  await db.user.update({ where: { id: session.user.id }, data: { ...body } })
  revalidatePath("/account")
}
