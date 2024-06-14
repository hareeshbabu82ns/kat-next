/* eslint-disable @next/next/no-img-element */
import { format, formatDistanceToNowStrict } from "date-fns"
import React from "react"
import { cn, formatDuration } from "@/lib/utils"
import { Icons } from "../shared/icons"
// import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

interface BookingListItemProps {
  isAdmin?: boolean
  event: { title: string; thumbnail: string; price: number; duration: number }
  user: { name: string; email: string; telephone: string }
  date: Date
  confirmed: boolean
  paid: boolean
  paidAmount: number
}

const BookingListItem = ({
  isAdmin = false,
  event,
  user,
  date,
  paid,
  paidAmount,
  confirmed,
}: BookingListItemProps) => {
  // const dateFromStr = format(dateFrom, "PPP")
  // const dateToStr = format(dateTo, "PPP")

  const bookingAmount = (
    // <Tooltip>
    //   <TooltipTrigger asChild>
    <div
      className={cn(
        "flex items-center gap-2 text-sm font-normal",
        paid ? " text-muted-foreground" : "text-destructive"
      )}
    >
      <Icons.paid className="size-4" />
      <div className="line-clamp-1 ">
        {paidAmount?.toFixed(2)} ({event.price?.toFixed(2)})
      </div>
    </div>
    //   </TooltipTrigger>
    //   <TooltipContent>
    //     {confirmed ? "Amount Paid" : "Amount not Paid"}
    //   </TooltipContent>
    // </Tooltip>
  )
  const bookingDate = (
    // <Tooltip>
    //   <TooltipTrigger asChild>
    <div
      className={cn(
        "flex items-center gap-2 text-sm font-normal",
        confirmed ? "text-muted-foreground" : "text-destructive"
      )}
    >
      <Icons.confirmed className="size-4" />
      <div className="line-clamp-2">
        {`${format(date, "PP HH:mm")} - ${formatDistanceToNowStrict(date, { addSuffix: true })}`}
      </div>
    </div>
    //   </TooltipTrigger>
    //   <TooltipContent>
    //     {confirmed ? "Booking Confirmed" : "Booking not confirmed"}
    //   </TooltipContent>
    // </Tooltip>
  )

  const eventDuration = (
    <div className="flex items-center gap-1 font-mono text-sm font-semibold text-warning">
      <Icons.clock className="size-4" />
      {formatDuration(event.duration)}
    </div>
  )

  return (
    <div className="group flex flex-col gap-2 rounded-lg border bg-card/10 p-2 hover:cursor-pointer hover:bg-primary/5 hover:shadow-sm focus:outline-none focus:ring-4">
      <div>
        <div className="line-clamp-2 text-lg font-bold group-hover:text-primary">
          {event.title}
        </div>
        {isAdmin && (
          <div className="text-md line-clamp-1 flex items-center gap-1 font-semibold text-primary">
            <Icons.user className="size-4" />
            {user.name}
          </div>
        )}
        <div className="flex flex-row items-center justify-between">
          {bookingAmount}
          {eventDuration}
        </div>
        {bookingDate}
      </div>
    </div>
  )
}

export default BookingListItem
