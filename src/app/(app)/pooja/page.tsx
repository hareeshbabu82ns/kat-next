import PageHeader from "@/components/layout/PageHeader"
import { buttonVariants } from "@/components/ui/button"
import { getUserAuth } from "@/lib/auth/utils"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { getEvents } from "./actions"
import EventTile from "@/components/events/EventTile"
import { Icons } from "@/components/shared/icons"

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
              />
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
