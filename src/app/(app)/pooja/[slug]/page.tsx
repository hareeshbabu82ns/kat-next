import { notFound, useParams } from "next/navigation"
import React from "react"
import { getEvent } from "../actions"
import EventDetails from "@/components/events/EventDetails"
import PageHeader from "@/components/layout/PageHeader"
import { getUserAuth } from "@/lib/auth/utils"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { Icons } from "@/components/shared/icons"

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
