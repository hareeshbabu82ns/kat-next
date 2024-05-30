/* eslint-disable @next/next/no-img-element */
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { createUser, deleteUser, updateUser } from "@/app/(app)/users/actions"
import { UserInputSchema } from "@/lib/validations/user"
import FormInputText from "../inputs/FormInputText"
import { DeleteConfirmDlgTrigger } from "../shared/DeleteConfirmDlgTrigger"
import { Icons } from "../shared/icons"
import { Button } from "../ui/button"
import { Form } from "../ui/form"
import { useToast } from "../ui/use-toast"

interface UserFormProps {
  sessionUserId?: string
  userId?: string
  data: z.infer<typeof UserInputSchema>
  updating?: boolean
  onSubmit?: (data: Partial<z.infer<typeof UserInputSchema>>) => void
  onDelete?: (userId: string) => void
}

const UserForm = ({
  sessionUserId,
  userId,
  data,
  // onSubmit: onFormSubmit,
  updating,
}: UserFormProps) => {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof UserInputSchema>>({
    resolver: zodResolver(UserInputSchema),
    defaultValues: { ...data },
  })

  const {
    getValues,
    reset,
    formState: { isDirty, dirtyFields },
  } = form

  const [imageValue] = getValues(["image"])

  async function onDelete() {
    if (!userId) return
    const res = await deleteUser(userId)
    if (res) {
      toast({ title: "User deleted successfully" })
      router.replace("/users")
      router.refresh()
    }
  }

  async function onSubmit(data: z.infer<typeof UserInputSchema>) {
    const changeData: Partial<z.infer<typeof UserInputSchema>> = {}

    if (dirtyFields.image) changeData.image = data.image
    if (dirtyFields.name) changeData.name = data.name
    if (dirtyFields.email) changeData.email = data.email
    if (dirtyFields.telephone) changeData.telephone = data.telephone
    if (dirtyFields.isAdmin) changeData.isAdmin = data.isAdmin

    // onFormSubmit && onFormSubmit(changeData)
    if (!userId) {
      const res = await createUser(data)
      if (res?.id) {
        toast({ title: "User created successfully" })
        router.replace(`/users/${res.id}`)
      }
    } else {
      const res = await updateUser(userId, changeData)
      if (res) {
        toast({ title: "User updated successfully" })
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
      {userId && (
        <DeleteConfirmDlgTrigger
          onConfirm={onDelete}
          title={`Delete User: ${data.name}`}
          description="Are you sure you want to delete this user?"
        >
          <Button variant="destructive" disabled={sessionUserId === userId}>
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
          <div className="col-span-2 flex flex-col gap-2 @xl/main:col-span-1">
            {imageValue && (
              <div className="flex h-96 justify-center">
                <img
                  src={imageValue}
                  alt="image"
                  className="h-full object-cover"
                />
              </div>
            )}
            <FormInputText
              control={form.control}
              name="image"
              label="Avatar"
              className="flex-1"
              type="search"
            />
          </div>
          <div className="col-span-2 flex flex-col gap-2 @xl/main:col-span-1">
            <FormInputText control={form.control} name="name" label="Name" />
            <FormInputText
              control={form.control}
              name="email"
              label="Email"
              type="email"
              disabled={sessionUserId === userId}
            />
            <FormInputText
              control={form.control}
              name="telephone"
              label="Telephone"
              type="number"
            />
          </div>
          <div className="col-span-2">{actionButtons}</div>
        </div>
      </form>
    </Form>
  )
}

export default UserForm
