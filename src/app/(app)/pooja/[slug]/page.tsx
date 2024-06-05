import Link from "next/link"
import { notFound } from "next/navigation"
import React from "react"
import EventDetails from "@/components/events/EventDetails"
import PageHeader from "@/components/layout/PageHeader"
import { Icons } from "@/components/shared/icons"
import { buttonVariants } from "@/components/ui/button"
import { getUserAuth } from "@/auth"
import { cn } from "@/lib/utils"
import { getEvent } from "../actions"

interface PoojaDetailsPageProps {
  params: {
    slug: string
  }
}
const PoojaDetailsPage = async ({ params }: PoojaDetailsPageProps) => {
  const { session } = await getUserAuth()
  const event = await getEvent(params.slug)
  if (!event) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-2">
      <PageHeader title={`Event: ${event.title}`}>
        <div>
          {session?.user.isAdmin && (
            <Link
              href={`/pooja/${event.id}/edit`}
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
            >
              <Icons.edit className="size-5" />
            </Link>
          )}
        </div>
      </PageHeader>
      <EventDetails data={event} />
    </div>
  )
}

export default PoojaDetailsPage
