import Link from "next/link"
import EventTile from "@/components/events/EventTile"
import PageHeader from "@/components/layout/PageHeader"
import { Icons } from "@/components/shared/icons"
import { buttonVariants } from "@/components/ui/button"
import { getUserAuth } from "@/auth"
import { cn } from "@/lib/utils"
import { getEvents } from "./actions"

export default async function Pooja() {
  const { session } = await getUserAuth()

  const events = await getEvents()

  return (
    <main className="flex flex-col">
      <PageHeader title="Pooja" showBackButton={false}>
        <div>
          {session?.user.isAdmin && (
            <Link
              href="/pooja/new"
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
            >
              <Icons.add className="size-5" />
            </Link>
          )}
        </div>
      </PageHeader>
      <div className="flex-1">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {events.map((event) => (
            <Link href={`/pooja/${event.id}`} key={event.id}>
              <EventTile
                title={event.title}
                thumbnail={event.thumbnail || ""}
                dateFrom={event.dateFrom}
                dateTo={event.dateTo}
                price={event.price}
                duration={event.duration}
              />
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
