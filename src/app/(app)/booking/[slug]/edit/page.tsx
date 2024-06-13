import { UserRole } from "@prisma/client"
import { notFound } from "next/navigation"
import { getBooking } from "@/app/(app)/booking/actions"
import BookingForm from "@/components/booking/BookingForm"
import PageHeader from "@/components/layout/PageHeader"
import { auth } from "@/lib/auth"
import { formatCurrency, formatDuration } from "@/lib/utils"

interface BookingEditPageProps {
  params: {
    slug: string
  }
}

const BookingEditPage = async ({ params }: BookingEditPageProps) => {
  const session = await auth()
  const booking = await getBooking(params.slug)
  if (!booking) {
    notFound()
  }

  const eventTitle = (
    <div>
      <h1 className="text-2xl font-semibold">Book: {booking.event.title}</h1>
      <p className="text-muted-foreground">
        ${formatCurrency(booking.event.price)} -{" "}
        {formatDuration(booking.event.duration)}
      </p>
    </div>
  )

  const data = {
    ...booking,
    paidAmount: booking.paidAmount || 0,
    notes: booking.notes || "",
  }

  const userData = {
    name: booking.user.name || "",
    email: booking.user.email || "",
    telephone: booking.user.telephone || "",
  }

  return (
    <div className="flex flex-col gap-2">
      <PageHeader title={eventTitle} />
      <BookingForm
        bookingId={booking.id}
        eventData={booking.event}
        isAdmin={session?.user.role === UserRole.ADMIN}
        data={data}
        userData={userData}
      />
    </div>
  )
}

export default BookingEditPage
