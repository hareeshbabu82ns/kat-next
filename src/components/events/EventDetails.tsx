import { Events } from "@prisma/client"
import { format } from "date-fns"
import React from "react"

interface EventDetailsProps {
  data: Events
}
const EventDetails = ({ data }: EventDetailsProps) => {
  return (
    <div className="grid w-full grid-cols-2 gap-6">
      <div className="col-span-2 md:col-span-1">
        <div className="flex h-96 justify-center">
          <img src={data.thumbnail || "/kat-logo.png"} alt={data.title} />
        </div>
      </div>
      <div className="col-span-2 flex w-full grid-cols-subgrid justify-center space-y-2 md:col-span-1  md:justify-normal">
        <table>
          <tbody>
            <tr>
              <td className="min-w-[120px] text-sm text-muted-foreground">
                Amount (CAD)$:
              </td>
              <td className="font-bold">{data.price}</td>
            </tr>
            <tr>
              <td className="min-w-[150px] text-sm text-muted-foreground">
                Duration (minutes):
              </td>
              <td className="font-bold">{data.duration}</td>
            </tr>
            <tr>
              <td className="min-w-[100px] text-sm text-muted-foreground">
                From:
              </td>
              <td className="font-semibold">{format(data.dateFrom, "PPP")}</td>
            </tr>
            <tr>
              <td className="min-w-[100px] text-sm text-muted-foreground">
                To:
              </td>
              <td className="font-semibold">{format(data.dateTo, "PPP")}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container col-span-2">
        <pre>{data.description}</pre>
      </div>
    </div>
  )
}

export default EventDetails
