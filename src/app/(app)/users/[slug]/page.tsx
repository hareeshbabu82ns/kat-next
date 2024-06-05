import { notFound } from "next/navigation"
import React from "react"
import { z } from "zod"
import SignOutBtn from "@/components/auth/SignOutBtn"
import UserForm from "@/components/auth/UserForm"
import PageHeader from "@/components/layout/PageHeader"
import { Icons } from "@/components/shared/icons"
import { getUserAuth } from "@/lib/auth"
import { UserInputSchema } from "@/lib/validations/user"
import { getUser } from "../actions"

interface UserDetailsPageProps {
  params: {
    slug: string
  }
}
const UserDetailsPage = async ({ params }: UserDetailsPageProps) => {
  const { session } = await getUserAuth()
  const user = await getUser(params.slug)
  if (!user) {
    notFound()
  }

  const userData: z.infer<typeof UserInputSchema> = {
    name: user.name || "",
    image: user.image || "",
    email: user.email || "",
    telephone: user.telephone || "",
    isAdmin: user.isAdmin,
  }

  return (
    <div className="flex flex-col gap-2">
      <PageHeader title={`User: ${user.name}`}>
        {session?.user.id === params.slug && (
          <SignOutBtn variant="ghost" size="icon">
            <Icons.logout className="size-4" />
          </SignOutBtn>
        )}
      </PageHeader>
      <UserForm
        isAdmin={session?.user.isAdmin}
        sessionUserId={session?.user.id}
        userId={user.id}
        data={userData}
      />
    </div>
  )
}

export default UserDetailsPage
