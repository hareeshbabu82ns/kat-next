"use server"

import { Booking, UserRole } from "@prisma/client"
import NewBookingEmail from "@/components/emails/NewBookingEmail"
import ReminderBookingEmail from "@/components/emails/ReminderBookingEmail"
import UpdateBookingEmail from "@/components/emails/UpdateBookingEmail"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { sendMail } from "@/lib/email/actions"

// Booking actions
export async function getBooking(id: string) {
  const session = await auth()
  if (!session) throw new Error("No session found")

  const where: Record<string, unknown> = {}

  where["id"] = id
  if (session?.user.role !== UserRole.ADMIN) {
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
  const session = await auth()
  if (!session) throw new Error("No session found")

  if (session?.user.role !== UserRole.ADMIN) {
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
  try {
    await sendMail({
      to: [booking.userEmail],
      subject: `Booking for ${booking.eventTitle}`,
      react: NewBookingEmail({
        bookingId: booking.id,
        bookingTime: booking.date,
        eventTitle: booking.eventTitle,
        userName: booking.userName || booking.userEmail,
      }),
    })
  } catch (error) {
    console.error("new booking sendMail error", {
      to: booking.userEmail,
      title: booking.eventTitle,
      error,
    })
  }
  return booking
}

export async function bookingNotifyMail(id: string, includeAdmins?: boolean) {
  const booking = await db.booking.findUnique({ where: { id } })
  if (!booking) throw new Error("Booking not found")
  try {
    await sendMail({
      to: [booking.userEmail],
      subject: `Reminder: Booking for ${booking.eventTitle}`,
      react: ReminderBookingEmail({
        bookingId: booking.id,
        bookingTime: booking.date,
        eventTitle: booking.eventTitle,
        userName: booking.userName || booking.userEmail,
        bookingConfirmed: booking.confirmed,
        bookingPaid: booking.paid,
        paidAmount: booking.paidAmount,
      }),
      includeAdmins,
    })
  } catch (error) {
    console.error("reminder booking sendMail error", {
      to: booking.userEmail,
      title: booking.eventTitle,
      bookingId: booking.id,
      error,
    })
  }
}

export async function bookingStatusMail(
  booking: Omit<Booking, "createdAt" | "updatedAt">,
  includeAdmins?: boolean
) {
  try {
    await sendMail({
      to: [booking.userEmail],
      subject: `Booking for ${booking.eventTitle} Updated`,
      react: UpdateBookingEmail({
        bookingId: booking.id,
        bookingTime: booking.date,
        eventTitle: booking.eventTitle,
        userName: booking.userName || booking.userEmail,
        bookingConfirmed: booking.confirmed,
        bookingPaid: booking.paid,
        paidAmount: booking.paidAmount,
      }),
      includeAdmins,
    })
  } catch (error) {
    console.error("update booking sendMail error", {
      to: booking.userEmail,
      title: booking.eventTitle,
      bookingId: booking.id,
      error,
    })
  }
}
