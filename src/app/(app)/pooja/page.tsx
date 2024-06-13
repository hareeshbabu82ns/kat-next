import { UserRole } from "@prisma/client"
import Link from "next/link"
import EventTile from "@/components/events/EventTile"
import PageHeader from "@/components/layout/PageHeader"
import { Icons } from "@/components/shared/icons"
import { buttonVariants } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import SeedUploadButton from "@/lib/db/seed-upload-btn"
import { cn } from "@/lib/utils"
import { getEvents } from "./actions"

export default async function Pooja() {
  const session = await auth()

  const events = await getEvents()

  return (
    <main className="flex flex-col">
      <PageHeader title="Pooja" showBackButton={false}>
        <div>
          {session?.user.role === UserRole.ADMIN && (
            <>
              <Link
                href="/pooja/new"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" })
                )}
              >
                <Icons.add className="size-5" />
              </Link>
              <SeedUploadButton />
            </>
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
