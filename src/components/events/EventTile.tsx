/* eslint-disable @next/next/no-img-element */
import { differenceInDays, format } from "date-fns"
import React from "react"
import { siteConfig } from "@/config/site"
import { formatDuration } from "@/lib/utils"
import { Icons } from "../shared/icons"

interface EventTileProps {
  title: string
  thumbnail?: string
  dateFrom: Date
  dateTo: Date
  price: number
  duration?: number
}

const EventTile = ({
  title,
  dateFrom,
  dateTo,
  thumbnail = siteConfig.defaultEventImg,
  price,
  duration,
}: EventTileProps) => {
  const dateFromStr = format(dateFrom, "PP")
  const dateToStr = format(dateTo, "PP")
  const dateTimeFromToStr =
    format(dateFrom, "PP HH:mm") + " - " + format(dateTo, "HH:mm")
  const dateDiff = Math.abs(differenceInDays(dateTo, dateFrom))

  const bookingAmount = (
    <div className="text-md flex items-center gap-2 font-bold text-success">
      <Icons.paid className="size-4" />
      <div className="line-clamp-1 ">{price?.toFixed(2)}</div>
    </div>
  )
  const eventDate =
    dateDiff <= 20 ? (
      <div className="flex items-center gap-2 text-sm font-normal text-muted-foreground">
        <Icons.calendar className="size-4" />
        <div className="line-clamp-1 ">
          {dateFromStr === dateToStr
            ? dateTimeFromToStr
            : `${dateFromStr} - ${dateToStr}`}
        </div>
      </div>
    ) : null

  const eventDuration = (
    <div className="flex items-center gap-1 font-mono text-sm font-semibold text-warning">
      <Icons.clock className="size-4" />
      {formatDuration(duration)}
    </div>
  )

  return (
    <div className="group flex h-full flex-col gap-2 rounded-lg border bg-card/10 p-2 hover:cursor-pointer hover:bg-primary/5 hover:shadow-sm focus:outline-none focus:ring-4">
      <img
        src={thumbnail}
        alt=""
        decoding="async"
        loading="lazy"
        className="inset-0 h-48 object-contain transition-all duration-300 ease-in-out group-hover:scale-105"
      />
      <div>
        <div className="line-clamp-2 text-lg font-bold group-hover:text-primary">
          {title}
        </div>
        <div className="flex flex-row items-center justify-between">
          {bookingAmount}
          {/* <div className="text-md font-bold text-success">
            $ {price?.toFixed(2)}
          </div> */}
          {eventDuration}
          {/* <div className="font-mono text-sm font-semibold text-warning">
            {formatDuration(duration)}
          </div> */}
        </div>
        {eventDate}
      </div>
    </div>
  )
}

export default EventTile
