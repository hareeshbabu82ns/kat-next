import React from "react"

const Timings = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h4 className="text-center text-xl font-semibold text-secondary">
        -: Temple Timings :-
      </h4>
      <table>
        <tbody>
          <tr className="border-b hover:bg-primary/5">
            <td className="px-4 py-2">Monday</td>
            <td className="flex flex-col px-4 py-2">
              <div>09:00 AM - 01:00 PM</div>
              <div>06:00 PM - 08:30 PM</div>
            </td>
          </tr>
          <tr className="border-b hover:bg-primary/5">
            <td className="px-4 py-2">Tuesday</td>
            <td className="flex flex-col px-4 py-2">
              <div>09:00 AM - 01:00 PM</div>
              <div>06:00 PM - 08:30 PM</div>
            </td>
          </tr>
          <tr className="border-b hover:bg-primary/5">
            <td className="px-4 py-2">Wednesday</td>
            <td className="flex flex-col px-4 py-2">
              <div>09:00 AM - 01:00 PM</div>
              <div>06:00 PM - 08:30 PM</div>
            </td>
          </tr>
          <tr className="border-b hover:bg-primary/5">
            <td className="px-4 py-2">Thursday</td>
            <td className="flex flex-col px-4 py-2">
              <div>09:00 AM - 01:00 PM</div>
              <div>06:00 PM - 08:30 PM</div>
            </td>
          </tr>
          <tr className="border-b hover:bg-primary/5">
            <td className="px-4 py-2">Friday</td>
            <td className="flex flex-col px-4 py-2">
              <div>09:00 AM - 01:00 PM</div>
              <div>06:00 PM - 08:30 PM</div>
            </td>
          </tr>
          <tr className="border-b hover:bg-primary/5">
            <td className="px-4 py-2">Saturday</td>
            <td className="flex flex-col px-4 py-2">
              <div>09:00 AM - 01:30 PM</div>
              <div>06:30 PM - 08:30 PM</div>
            </td>
          </tr>
          <tr className="hover:bg-primary/5">
            <td className="px-4 py-2">Sunday</td>
            <td className="flex flex-col px-4 py-2">
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
