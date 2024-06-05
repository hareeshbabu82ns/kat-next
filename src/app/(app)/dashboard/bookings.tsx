import Link from "next/link"
import React from "react"
import BookingTile from "@/components/booking/BookingTile"
import { getUserAuth } from "@/lib/auth"
import { getBookings } from "../booking/actions"

const Bookings = async () => {
  const { session } = await getUserAuth()
  const bookings = await getBookings()

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
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
            <Link href={`/booking/${booking.id}/edit`} key={booking.id}>
              <BookingTile
                event={eventData}
                user={userData}
                date={booking.date}
                confirmed={booking.confirmed}
                paid={booking.paid}
                paidAmount={booking.paidAmount || 0}
                isAdmin={session?.user.isAdmin}
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Bookings
