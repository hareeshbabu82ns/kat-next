import { getUserAuth } from "@/lib/auth/utils"
import React from "react"
import { getEvent } from "../../actions"
import { notFound } from "next/navigation"
import PageHeader from "@/components/layout/PageHeader"
import EventForm from "@/components/events/EventForm"
import { EventInputSchema } from "@/lib/validations/event"
import { z } from "zod"
import Link from "next/link"
import { Icons } from "@/components/shared/icons"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

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
    thumbnail: event.thumbnail || "/kat-logo.png",
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
