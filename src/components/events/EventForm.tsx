/* eslint-disable @next/next/no-img-element */
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  createEvent,
  deleteEvent,
  updateEvent,
} from "@/app/(app)/pooja/actions"
import { EventInputSchema } from "@/lib/validations/event"
import FormInputDate from "../inputs/FormInputDate"
import FormInputText from "../inputs/FormInputText"
import FormInputTextArea from "../inputs/FormInputTextArea"
import { DeleteConfirmDlgTrigger } from "../shared/DeleteConfirmDlgTrigger"
import { Icons } from "../shared/icons"
import { Button } from "../ui/button"
import { Form } from "../ui/form"
import { useToast } from "../ui/use-toast"

interface EventFormProps {
  eventId?: string
  data: z.infer<typeof EventInputSchema>
  updating?: boolean
  onSubmit?: (data: Partial<z.infer<typeof EventInputSchema>>) => void
  onDelete?: (eventId: string) => void
}

const EventForm = ({
  eventId,
  data,
  // onSubmit: onFormSubmit,
  updating,
}: EventFormProps) => {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof EventInputSchema>>({
    resolver: zodResolver(EventInputSchema),
    defaultValues: { ...data },
  })

  const {
    getValues,
    reset,
    formState: { errors, isDirty, dirtyFields },
  } = form

  const [thumbnailValue] = getValues(["thumbnail"])

  async function onDelete() {
    if (!eventId) return
    const res = await deleteEvent(eventId)
    if (res) {
      toast({ title: "Event deleted successfully" })
      router.replace("/pooja")
      router.refresh()
    }
  }

  async function onSubmit(data: z.infer<typeof EventInputSchema>) {
    const changeData: Partial<z.infer<typeof EventInputSchema>> = {}

    if (dirtyFields.thumbnail) changeData.thumbnail = data.thumbnail
    if (dirtyFields.title) changeData.title = data.title
    if (dirtyFields.description) changeData.description = data.description
    if (dirtyFields.price) changeData.price = data.price
    if (dirtyFields.duration) changeData.duration = data.duration
    if (dirtyFields.numOfSeats) changeData.numOfSeats = data.numOfSeats
    if (dirtyFields.dateFrom) changeData.dateFrom = data.dateFrom
    if (dirtyFields.dateTo) changeData.dateTo = data.dateTo

    // onFormSubmit && onFormSubmit(changeData)
    if (!eventId) {
      const res = await createEvent(data)
      if (res?.id) {
        toast({ title: "Event created successfully" })
        router.replace(`/pooja/${res.id}/edit`)
      }
    } else {
      const res = await updateEvent(eventId, changeData)
      if (res) {
        toast({ title: "Event updated successfully" })
        router.refresh()
      }
    }
  }

  const actionButtons = (
    <div className="grid grid-cols-2 justify-end gap-4 sm:flex sm:flex-row">
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
      {eventId && (
        <DeleteConfirmDlgTrigger
          onConfirm={onDelete}
          title={`Delete Event: ${data.title}`}
          description="Are you sure you want to delete this event?"
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
          <div className="col-span-2">
            <div className="flex flex-col gap-2">
              {thumbnailValue && (
                <div className="flex h-96 justify-center">
                  <img
                    src={thumbnailValue}
                    alt="thumbnail"
                    className="h-full object-cover"
                  />
                </div>
              )}
              <FormInputText
                control={form.control}
                name="thumbnail"
                label="Thumbnail"
                className="flex-1"
                type="search"
              />
            </div>
          </div>
          <div className="col-span-2 grid-cols-subgrid space-y-2 md:col-span-1">
            <FormInputText control={form.control} name="title" label="Title" />
            <FormInputDate
              control={form.control}
              name="dateFrom"
              label="Date From"
            />
            <FormInputDate
              control={form.control}
              name="dateTo"
              label="Date To"
            />
          </div>
          <div className="col-span-2 space-y-2 md:col-span-1">
            <FormInputText
              control={form.control}
              name="price"
              label="Price (CAD)"
              type="number"
            />
            <FormInputText
              control={form.control}
              name="duration"
              label="Duration (in minutes)"
              type="number"
            />
            <FormInputText
              control={form.control}
              name="numOfSeats"
              label="Max Bookings"
              type="number"
            />
          </div>
          <div className="col-span-2">
            <FormInputTextArea
              control={form.control}
              name="description"
              label="Description"
              rows={20}
            />
          </div>
          <div className="col-span-2">{actionButtons}</div>
        </div>
      </form>
    </Form>
  )
}

export default EventForm
