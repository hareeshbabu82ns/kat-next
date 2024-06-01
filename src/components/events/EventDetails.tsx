/* eslint-disable @next/next/no-img-element */
import { Events } from "@prisma/client"
import { format } from "date-fns"
import Link from "next/link"
import React from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { siteConfig } from "@/config/site"
import { formatCurrency, formatDuration } from "@/lib/utils"
import { Button } from "../ui/button"

interface EventDetailsProps {
  data: Events
}
const EventDetails = ({ data }: EventDetailsProps) => {
  return (
    <div className="grid w-full grid-cols-2 gap-6">
      <div className="col-span-2 space-y-4 md:col-span-1">
        <div className="flex h-96 justify-center">
          <img
            src={data.thumbnail || siteConfig.defaultEventImg}
            alt={data.title}
          />
        </div>
        <div className="flex justify-center">
          <Button asChild variant={"default"} type="button">
            <Link href={`/pooja/${data.id}/booking`}>Book Event</Link>
          </Button>
        </div>
      </div>
      <div className="col-span-2 flex w-full grid-cols-subgrid justify-center space-y-2 md:col-span-1  md:justify-normal">
        <table>
          <tbody>
            <tr>
              <td className="min-w-[120px] text-sm text-muted-foreground">
                Amount (CAD)$:
              </td>
              <td className="font-bold">{formatCurrency(data.price)}</td>
            </tr>
            <tr>
              <td className="min-w-[150px] text-sm text-muted-foreground">
                Duration:
              </td>
              <td className="font-bold">{formatDuration(data.duration)}</td>
            </tr>
            <tr>
              <td className="min-w-[100px] text-sm text-muted-foreground">
                From:
              </td>
              <td className="font-semibold">
                {format(data.dateFrom, "PPP HH:mm")}
              </td>
            </tr>
            <tr>
              <td className="min-w-[100px] text-sm text-muted-foreground">
                To:
              </td>
              <td className="font-semibold">
                {format(data.dateTo, "PPP HH:mm")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container col-span-2">
        <div className={`flex-1 leading-8 tracking-wider antialiased`}>
          <Markdown remarkPlugins={[remarkGfm]}>{data.description}</Markdown>
        </div>
      </div>
    </div>
  )
}

export default EventDetails
