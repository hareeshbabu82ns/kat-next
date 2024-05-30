/* eslint-disable @next/next/no-img-element */
// import { format } from "date-fns"
import React from "react"
import { siteConfig } from "@/config/site"
import { formatDuration } from "@/lib/utils"

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
  // dateFrom,
  // dateTo,
  thumbnail = siteConfig.defaultEventImg,
  price,
  duration,
}: EventTileProps) => {
  // const dateFromStr = format(dateFrom, "PPP")
  // const dateToStr = format(dateTo, "PPP")

  return (
    <div className="group flex flex-col gap-2 rounded-lg border bg-card/10 p-2 hover:cursor-pointer hover:bg-primary/5 hover:shadow-sm focus:outline-none focus:ring-4">
      <img
        src={thumbnail}
        alt=""
        decoding="async"
        loading="lazy"
        className="inset-0 h-48 object-contain transition-all duration-300 ease-in-out group-hover:scale-105"
      />
      <div>
        <div className="line-clamp-1 text-lg font-bold group-hover:text-primary">
          {title}
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="text-md font-bold text-success">
            $ {price?.toFixed(2)}
          </div>
          <div className="font-mono text-sm font-semibold text-warning">
            {formatDuration(duration)}
          </div>
        </div>
        {/* <div className="line-clamp-1 text-sm  font-normal text-muted-foreground">
          {dateFromStr === dateToStr
            ? dateFromStr
            : `${dateFromStr} - ${dateToStr}`}
        </div> */}
      </div>
    </div>
  )
}

export default EventTile
