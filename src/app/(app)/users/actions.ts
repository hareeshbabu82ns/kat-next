"use server"

import { UserRole } from "@prisma/client"
import { z } from "zod"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { UserInputSchema } from "@/lib/validations/user"

export async function getUserByEmail(email: string) {
  const session = await auth()
  if (session?.user.email !== email && session?.user.role !== UserRole.ADMIN)
    throw new Error("User is not authorized to view this user")

  const user = await db.user.findUnique({ where: { email } })
  return user
}
export async function getUser(id: string) {
  const session = await auth()
  if (session?.user.id !== id && session?.user.role !== UserRole.ADMIN)
    throw new Error("User is not authorized to view this user")

  const user = await db.user.findUnique({ where: { id } })
  return user
}

export async function getUsers() {
  const session = await auth()
  if (!session?.user.role) throw new Error("User must be an Admin")

  const users = await db.user.findMany()
  return users
}

export async function deleteUser(id: string) {
  const session = await auth()
  if (session?.user.role !== UserRole.ADMIN)
    throw new Error("User must be an Admin")

  const user = await db.user.delete({ where: { id } })
  return user
}

export async function updateUser(
  id: string,
  data: Partial<z.infer<typeof UserInputSchema>>
) {
  const session = await auth()
  if (session?.user.id !== id && session?.user.role !== UserRole.ADMIN)
    throw new Error("User is not authorized to update this user")

  const { isAdmin, ...rest } = data
  const dbData = { ...rest, role: isAdmin ? UserRole.ADMIN : UserRole.USER }

  const user = await db.user.update({
    where: { id },
    data: dbData,
  })
  return user
}

export async function createUser(data: z.infer<typeof UserInputSchema>) {
  const session = await auth()
  if (session?.user.role !== UserRole.ADMIN)
    throw new Error("User must be an Admin")

  const { isAdmin, ...rest } = data
  const dbData = { ...rest, role: isAdmin ? UserRole.ADMIN : UserRole.USER }

  const user = await db.user.create({
    data: dbData,
  })
  return user
}
