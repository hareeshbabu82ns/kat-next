"use server"

import { Booking } from "@prisma/client"
import { getUserAuth } from "@/lib/auth"
import { db } from "@/lib/db"

// Booking actions
export async function getBooking(id: string) {
  const { session } = await getUserAuth()
  if (!session) throw new Error("No session found")

  const where: Record<string, unknown> = {}

  where["id"] = id
  if (!session?.user.isAdmin) {
    where["userEmail"] = session.user.email || ""
  }

  const booking = await db.booking.findUnique({
    where: where as never,
    include: { event: true, user: true },
  })
  return booking
    ? {
        ...booking,
        eventTitle: booking.event?.title || "",
        userName: booking.user?.name || "",
      }
    : null
}

export async function getBookings() {
  const { session } = await getUserAuth()
  if (!session) throw new Error("No session found")

  if (!session?.user.isAdmin) {
    const bookings = await db.booking.findMany({
      where: {
        userEmail: session.user.email || "",
      },
      include: { event: true },
      orderBy: { date: "desc" },
    })
    return bookings.map((booking) => ({
      ...booking,
      user: {
        name: session.user.name,
        email: session.user.email,
        telephone: "",
      },
    }))
  } else {
    const bookings = await db.booking.findMany({
      include: { event: true, user: true },
      orderBy: { date: "desc" },
    })
    return bookings
  }
}

export async function deleteBooking(id: string) {
  const booking = await db.booking.delete({ where: { id } })
  return booking
}

export async function updateBooking(id: string, data: Partial<Booking>) {
  const booking = await db.booking.update({ where: { id }, data })
  return booking
}

export async function createBooking(data: Omit<Booking, "id">) {
  const booking = await db.booking.create({ data })
  return booking
}
