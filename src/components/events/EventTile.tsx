/* eslint-disable @next/next/no-img-element */
import { format } from "date-fns"
import React from "react"

interface EventTileProps {
  title: string
  thumbnail?: string
  dateFrom: Date
  dateTo: Date
}

const EventTile = ({
  title,
  dateFrom,
  dateTo,
  thumbnail = "/kat-logo.png",
}: EventTileProps) => {
  const dateFromStr = format(dateFrom, "PPP")
  const dateToStr = format(dateTo, "PPP")

  return (
    <div className="group flex flex-col gap-2 rounded-lg border bg-card/10 p-2 hover:cursor-pointer hover:bg-primary/5 hover:shadow-sm focus:outline-none focus:ring-4">
      <img
        src={thumbnail}
        alt=""
        className="h-48 object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
      <div>
        <div className="line-clamp-1 text-lg font-bold group-hover:text-primary">
          {title}
        </div>
        <div className="line-clamp-1 text-sm  font-normal text-muted-foreground">
          {dateFromStr === dateToStr
            ? dateFromStr
            : `${dateFromStr} - ${dateToStr}`}
        </div>
      </div>
    </div>
  )
}

export default EventTile
