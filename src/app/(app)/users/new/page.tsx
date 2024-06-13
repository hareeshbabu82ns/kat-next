import { UserRole } from "@prisma/client"
import React from "react"
import { z } from "zod"
import UserForm from "@/components/auth/UserForm"
import PageHeader from "@/components/layout/PageHeader"
import { siteConfig } from "@/config/site"
import { auth } from "@/lib/auth"
import { UserInputSchema } from "@/lib/validations/user"

const defaultUserData: z.infer<typeof UserInputSchema> = {
  name: "",
  email: "",
  telephone: "",
  image: siteConfig.defaultUserImg,
  isAdmin: false,
}

const UserDetailsPage = async () => {
  const session = await auth()

  return (
    <div className="flex flex-col gap-2">
      <PageHeader title={`User: New`} />
      <UserForm
        isAdmin={session?.user.role === UserRole.ADMIN}
        sessionUserId={session?.user.id}
        data={defaultUserData}
      />
    </div>
  )
}

export default UserDetailsPage
