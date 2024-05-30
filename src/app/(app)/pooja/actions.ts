"use server"

import { z } from "zod"
import { db } from "@/lib/db"
import { EventInputSchema } from "@/lib/validations/event"

export async function getEvent(id: string) {
  const event = await db.events.findUnique({ where: { id } })
  return event
}

export async function getEvents() {
  const events = await db.events.findMany()
  return events
}

export async function deleteEvent(id: string) {
  const event = await db.events.delete({ where: { id } })
  return event
}

export async function updateEvent(
  id: string,
  data: Partial<z.infer<typeof EventInputSchema>>
) {
  const event = await db.events.update({ where: { id }, data })
  return event
}

export async function createEvent(data: z.infer<typeof EventInputSchema>) {
  const event = await db.events.create({ data })
  return event
}
