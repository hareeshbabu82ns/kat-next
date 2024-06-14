import { UserRole } from "@prisma/client"
import Link from "next/link"
import React from "react"
import { getBookings } from "@/app/(app)/bookings/actions"
import { auth } from "@/lib/auth"
import BookingListItem from "./BookingListItem"

const Bookings = async () => {
  const session = await auth()
  const bookings = await getBookings()

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @4xl/main:grid-cols-3">
        {bookings.map((booking) => {
          const eventData = {
            ...booking.event,
            thumbnail: booking.event.thumbnail || "",
          }

          const userData = {
            name: booking.user.name || "",
            email: booking.user.email || "",
            telephone: booking.user.telephone || "",
          }

          return (
            <Link href={`/bookings/${booking.id}/edit`} key={booking.id}>
              <BookingListItem
                event={eventData}
                user={userData}
                date={booking.date}
                confirmed={booking.confirmed}
                paid={booking.paid}
                paidAmount={booking.paidAmount || 0}
                isAdmin={session?.user.role === UserRole.ADMIN}
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Bookings
