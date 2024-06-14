"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Booking } from "@prisma/client"
import { startOfDay } from "date-fns"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  bookingNotifyMail,
  bookingStatusMail,
  createBooking,
  deleteBooking,
  updateBooking,
} from "@/app/(app)/booking/actions"
import { BookingInputSchema } from "@/lib/validations/booking"
import FormCheckbox from "../inputs/FormCheckbox"
import FormInputDate from "../inputs/FormInputDate"
import FormInputText from "../inputs/FormInputText"
import FormInputTextArea from "../inputs/FormInputTextArea"
import { DeleteConfirmDlgTrigger } from "../shared/DeleteConfirmDlgTrigger"
import { Icons } from "../shared/icons"
import { Button } from "../ui/button"
import { Form } from "../ui/form"
import { useToast } from "../ui/use-toast"

interface BookingFormProps {
  isAdmin?: boolean
  bookingId?: string
  data: z.infer<typeof BookingInputSchema>
  eventData?: { title?: string; thumbnail?: string | null }
  updating?: boolean
  userData?: { name?: string; email?: string; telephone?: string }
}

const BookingForm = ({
  isAdmin = false,
  bookingId,
  data,
  updating,
  eventData,
  userData,
}: BookingFormProps) => {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof BookingInputSchema>>({
    resolver: zodResolver(BookingInputSchema),
    defaultValues: { ...data },
    disabled: !isAdmin && data.confirmed,
  })

  const {
    reset,
    formState: { isDirty, dirtyFields },
  } = form

  async function onDelete() {
    if (!bookingId) return
    const res = await deleteBooking(bookingId)
    if (res) {
      toast({ title: "Booking deleted successfully" })
      router.replace("/pooja")
      router.refresh()
    }
  }

  async function onReminder() {
    if (!bookingId) return
    await bookingNotifyMail(bookingId, false)
    toast({ title: "Reminder sent successfully" })
  }

  async function onSubmit(data: z.infer<typeof BookingInputSchema>) {
    // onFormSubmit && onFormSubmit(changeData)
    if (!bookingId) {
      const changeData: Omit<Booking, "id"> = {
        ...data,
        createdAt: null,
        updatedAt: null,
        eventTitle: eventData?.title || "",
        userName: userData?.name || "",
        notes: data.notes || "",
      }
      const res = await createBooking(changeData)
      if (res?.id) {
        toast({ title: "Booking created successfully" })
        router.replace(`/booking/${res.id}/edit`)
      }
    } else {
      const changeData: Partial<Booking> = {}

      if (dirtyFields.eventId) changeData.eventId = data.eventId
      if (dirtyFields.userEmail) changeData.userEmail = data.userEmail
      if (dirtyFields.date) changeData.date = data.date
      if (dirtyFields.confirmed) changeData.confirmed = data.confirmed
      if (dirtyFields.paid) changeData.paid = data.paid
      if (dirtyFields.paidAmount) changeData.paidAmount = data.paidAmount
      if (dirtyFields.notes) changeData.notes = data.notes

      const res = await updateBooking(bookingId, changeData)
      if (res) {
        if (isAdmin) await bookingStatusMail(res, false)
        toast({ title: "Booking updated successfully" })
        router.refresh()
      }
    }
  }

  const actionButtons = (
    <div className="grid grid-cols-2 justify-end gap-4 sm:flex sm:flex-row">
      {bookingId && isAdmin && (
        <Button
          variant="secondary"
          type="button"
          disabled={updating}
          onClick={onReminder}
        >
          <Icons.email className="mr-2 size-4" />
          Reminder
        </Button>
      )}
      <Button
        variant="secondary"
        type="button"
        disabled={!isDirty}
        onClick={() => reset()}
      >
        <Icons.reset className="mr-2 size-4" />
        Reset
      </Button>
      <Button type="submit" disabled={!isDirty || updating}>
        <Icons.save className="mr-2 size-4" />
        Save
      </Button>
      {bookingId && isAdmin && (
        <DeleteConfirmDlgTrigger
          onConfirm={onDelete}
          title={`Delete Booking for: ${eventData?.title}`}
          description="Are you sure you want to delete this booking?"
        >
          <Button variant="destructive">
            <Icons.trash className="mr-2 size-4" />
            Delete
          </Button>
        </DeleteConfirmDlgTrigger>
      )}
    </div>
  )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col space-y-4"
      >
        <div className="grid w-full grid-cols-2 gap-6">
          <div className="col-span-2"></div>
          <div className="col-span-2 grid-cols-subgrid space-y-2 md:col-span-1">
            <FormInputText
              control={form.control}
              name="userEmail"
              label={isAdmin ? "User Email" : "Email"}
              disabled={!isAdmin}
            />
            <FormInputDate
              control={form.control}
              name="date"
              label="Booking Date"
              withTime
              dateDisabledMatcher={(date) =>
                startOfDay(date) < startOfDay(new Date())
              }
            />
          </div>
          <div className="col-span-2 grid-cols-subgrid space-y-2 md:col-span-1">
            <FormInputText
              control={form.control}
              name="paidAmount"
              label="Amount Paid $"
              type="number"
              disabled={!isAdmin}
            />
            <div className="flex h-[72px] flex-row items-end gap-2">
              <div className="flex-1">
                <FormCheckbox
                  control={form.control}
                  name="paid"
                  label="Paid"
                  disabled={!isAdmin}
                />
              </div>
              <div className="flex-1">
                <FormCheckbox
                  control={form.control}
                  name="confirmed"
                  label="Confirmed"
                  disabled={!isAdmin}
                />
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <FormInputTextArea
              control={form.control}
              name="notes"
              label="Notes"
              rows={20}
            />
          </div>
          <div className="col-span-2">{actionButtons}</div>
        </div>
      </form>
    </Form>
  )
}

export default BookingForm
