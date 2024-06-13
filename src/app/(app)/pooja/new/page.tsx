import { UserRole } from "@prisma/client"
import { endOfMonth, startOfMonth } from "date-fns"
import React from "react"
import { z } from "zod"
import EventForm from "@/components/events/EventForm"
import PageHeader from "@/components/layout/PageHeader"
import { siteConfig } from "@/config/site"
import { auth } from "@/lib/auth"
import { EventInputSchema } from "@/lib/validations/event"

const defaultPoojaEventData: z.infer<typeof EventInputSchema> = {
  title: "",
  description: "",
  price: 101,
  duration: 10,
  numOfSeats: 0,
  thumbnail: siteConfig.defaultEventImg,
  dateFrom: startOfMonth(new Date()),
  dateTo: endOfMonth(new Date()),
}

const PoojaNewPage = async () => {
  const session = await auth()
  if (session?.user.role !== UserRole.ADMIN) {
    throw new Error("Unauthorized")
  }

  return (
    <div className="flex flex-col gap-2">
      <PageHeader title="Create Event" />
      <EventForm data={defaultPoojaEventData} />
    </div>
  )
}

export default PoojaNewPage
