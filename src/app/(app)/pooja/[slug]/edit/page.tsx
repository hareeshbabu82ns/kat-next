import { notFound } from "next/navigation"
import React from "react"
import { z } from "zod"
import EventForm from "@/components/events/EventForm"
import PageHeader from "@/components/layout/PageHeader"
import { siteConfig } from "@/config/site"
import { getUserAuth } from "@/auth"
import { EventInputSchema } from "@/lib/validations/event"
import { getEvent } from "../../actions"

interface PoojaEditPageProps {
  params: {
    slug: string
  }
}

const PoojaEditPage = async ({ params }: PoojaEditPageProps) => {
  const { session } = await getUserAuth()
  if (!session?.user.isAdmin) {
    throw new Error("Unauthorized")
  }
  const event = await getEvent(params.slug)
  if (!event) {
    notFound()
  }
  const eventData: z.infer<typeof EventInputSchema> = {
    title: event.title,
    description: event.description || "",
    price: event.price,
    duration: event.duration,
    numOfSeats: event.numOfSeats,
    thumbnail: event.thumbnail || siteConfig.defaultEventImg,
    dateFrom: event.dateFrom,
    dateTo: event.dateTo,
  }

  return (
    <div className="flex flex-col gap-2">
      <PageHeader title={`Edit: ${event.title}`} />
      <EventForm eventId={event.id} data={eventData} />
    </div>
  )
}

export default PoojaEditPage
