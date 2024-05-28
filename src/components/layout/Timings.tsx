import React from "react"

const Timings = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h4 className="text-center text-xl text-muted-foreground">
        -: Temple Timings :-
      </h4>
      <table>
        <tbody>
          <tr className="border-b">
            <td className="min-w-[120px]">Monday</td>
            <td className="flex flex-col">
              <div>09:00 AM - 01:00 PM</div>
              <div>06:00 PM - 08:30 PM</div>
            </td>
          </tr>
          <tr className="border-b">
            <td>Tuesday</td>
            <td className="flex flex-col">
              <div>09:00 AM - 01:00 PM</div>
              <div>06:00 PM - 08:30 PM</div>
            </td>
          </tr>
          <tr className="border-b">
            <td>Wednesday</td>
            <td className="flex flex-col">
              <div>09:00 AM - 01:00 PM</div>
              <div>06:00 PM - 08:30 PM</div>
            </td>
          </tr>
          <tr className="border-b">
            <td>Thursday</td>
            <td className="flex flex-col">
              <div>09:00 AM - 01:00 PM</div>
              <div>06:00 PM - 08:30 PM</div>
            </td>
          </tr>
          <tr className="border-b">
            <td>Friday</td>
            <td className="flex flex-col">
              <div>09:00 AM - 01:00 PM</div>
              <div>06:00 PM - 08:30 PM</div>
            </td>
          </tr>
          <tr className="border-b">
            <td>Saturday</td>
            <td className="flex flex-col">
              <div>09:00 AM - 01:30 PM</div>
              <div>06:30 PM - 08:30 PM</div>
            </td>
          </tr>
          <tr>
            <td>Sunday</td>
            <td className="flex flex-col">
              <div>09:00 AM - 01:30 PM</div>
              <div>06:30 PM - 08:30 PM</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Timings
