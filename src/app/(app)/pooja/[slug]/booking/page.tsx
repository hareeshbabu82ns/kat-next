import { notFound } from "next/navigation"
import React from "react"
import { z } from "zod"
import BookingForm from "@/components/booking/BookingForm"
import PageHeader from "@/components/layout/PageHeader"
import { getUserAuth } from "@/lib/auth"
import { formatCurrency, formatDuration } from "@/lib/utils"
import { BookingInputSchema } from "@/lib/validations/booking"
import { getEvent } from "../../actions"

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
  const auth = await getUserAuth()
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
    userEmail: auth.session?.user.isAdmin ? "" : auth.session?.user.email || "",
    paidAmount: auth.session?.user.isAdmin ? event.price : 0,
  }
  const userData = {
    name: auth.session?.user.name || "",
    email: auth.session?.user.email || "",
    telephone: "",
  }

  return (
    <div className="flex flex-col gap-2">
      <PageHeader title={eventTitle} />
      <BookingForm
        eventData={event}
        isAdmin={auth.session?.user.isAdmin}
        data={data}
        userData={userData}
      />
    </div>
  )
}

export default BookingPage
