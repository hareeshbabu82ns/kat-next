import EventForm from "@/components/events/EventForm"
import PageHeader from "@/components/layout/PageHeader"
import { getUserAuth } from "@/lib/auth/utils"
import { EventInputSchema } from "@/lib/validations/event"
import React from "react"
import { startOfMonth, endOfMonth } from "date-fns"
import { z } from "zod"
import Link from "next/link"
import { Icons } from "@/components/shared/icons"
import { cn } from "@/lib/utils"

const defaultPoojaEventData: z.infer<typeof EventInputSchema> = {
  title: "",
  description: "",
  price: 101,
  duration: 10,
  numOfSeats: 0,
  thumbnail: "/kat-logo.png",
  dateFrom: startOfMonth(new Date()),
  dateTo: endOfMonth(new Date()),
}

const PoojaNewPage = async () => {
  const { session } = await getUserAuth()
  if (!session?.user.isAdmin) {
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
