import { UserRole } from "@prisma/client"
import { notFound } from "next/navigation"
import React from "react"
import { z } from "zod"
import { getEvent } from "@/app/(app)/pooja/actions"
import BookingForm from "@/components/bookings/BookingForm"
import PageHeader from "@/components/layout/PageHeader"
import { auth } from "@/lib/auth"
import { formatCurrency, formatDuration } from "@/lib/utils"
import { BookingInputSchema } from "@/lib/validations/booking"

interface BookingPageProps {
  params: {
    slug: string
  }
}

const defaultBookingData: z.infer<typeof BookingInputSchema> = {
  eventId: "",
  userEmail: "",
  date: new Date(),
  paid: false,
  paidAmount: 0,
  confirmed: false,
  notes: "",
}

const BookingPage = async ({ params }: BookingPageProps) => {
  const session = await auth()
  const event = await getEvent(params.slug)
  if (!event) {
    notFound()
  }

  const eventTitle = (
    <div>
      <h1 className="text-2xl font-semibold">Book: {event.title}</h1>
      <p className="text-muted-foreground">
        ${formatCurrency(event.price)} - {formatDuration(event.duration)}
      </p>
    </div>
  )

  const data = {
    ...defaultBookingData,
    eventId: event.id,
    userEmail:
      session?.user.role === UserRole.ADMIN ? "" : session?.user.email || "",
    paidAmount: session?.user.role === UserRole.ADMIN ? event.price : 0,
  }
  const userData = {
    name: session?.user.name || "",
    email: session?.user.email || "",
    telephone: "",
  }

  return (
    <div className="flex flex-col gap-2">
      <PageHeader title={eventTitle} />
      <BookingForm
        eventData={event}
        isAdmin={session?.user.role === UserRole.ADMIN}
        data={data}
        userData={userData}
      />
    </div>
  )
}

export default BookingPage
