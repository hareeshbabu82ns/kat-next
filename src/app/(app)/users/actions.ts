"use server"

import { z } from "zod"
import { getUserAuth } from "@/lib/auth"
import { db } from "@/lib/db"
import { UserInputSchema } from "@/lib/validations/user"

export async function getUser(id: string) {
  const { session } = await getUserAuth()
  if (session?.user.id !== id && !session?.user.isAdmin)
    throw new Error("User is not authorized to view this user")

  const user = await db.user.findUnique({ where: { id } })
  return user
}

export async function getUsers() {
  const { session } = await getUserAuth()
  if (!session?.user.isAdmin) throw new Error("User must be an Admin")

  const users = await db.user.findMany()
  return users
}

export async function deleteUser(id: string) {
  const { session } = await getUserAuth()
  if (!session?.user.isAdmin) throw new Error("User must be an Admin")

  const user = await db.user.delete({ where: { id } })
  return user
}

export async function updateUser(
  id: string,
  data: Partial<z.infer<typeof UserInputSchema>>
) {
  const { session } = await getUserAuth()
  if (session?.user.id !== id && !session?.user.isAdmin)
    throw new Error("User is not authorized to update this user")

  const user = await db.user.update({ where: { id }, data })
  return user
}

export async function createUser(data: z.infer<typeof UserInputSchema>) {
  const { session } = await getUserAuth()
  if (!session?.user.isAdmin) throw new Error("User must be an Admin")

  const user = await db.user.create({ data })
  return user
}
