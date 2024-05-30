import React from "react"
import { z } from "zod"
import UserForm from "@/components/auth/UserForm"
import PageHeader from "@/components/layout/PageHeader"
import { siteConfig } from "@/config/site"
import { getUserAuth } from "@/lib/auth/utils"
import { UserInputSchema } from "@/lib/validations/user"

const defaultUserData: z.infer<typeof UserInputSchema> = {
  name: "",
  email: "",
  telephone: "",
  image: siteConfig.defaultUserImg,
  isAdmin: false,
}

const UserDetailsPage = async () => {
  const { session } = await getUserAuth()

  return (
    <div className="flex flex-col gap-2">
      <PageHeader title={`User: New`} />
      <UserForm sessionUserId={session?.user.id} data={defaultUserData} />
    </div>
  )
}

export default UserDetailsPage
