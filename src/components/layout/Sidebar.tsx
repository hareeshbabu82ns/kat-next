import { UserRole } from "@prisma/client"
import Link from "next/link"
import { Session } from "next-auth"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { auth } from "@/lib/auth"
import { avatarAltName } from "@/lib/utils"
import AppTitleLogo from "./AppTitleLogo"
import SidebarItems from "./SidebarItems"

const Sidebar = async () => {
  const session = await auth()
  if (session === null) return null

  return (
    <aside className="flex h-full flex-col justify-between bg-muted">
      <div className="h-full space-y-2">
        <div className="pl-2 md:pl-4">
          <AppTitleLogo />
        </div>
        <div className="py-4 pl-4 pr-6 md:py-6">
          <SidebarItems isAdmin={session.user.role === UserRole.ADMIN} />
        </div>
      </div>
      <div className="p-2">
        <UserDetails session={session} />
      </div>
    </aside>
  )
}

export default Sidebar

const UserDetails = ({ session }: { session: Session }) => {
  if (session === null) return null
  const { user } = session

  const name = user?.name ?? user?.email ?? ""

  if (!name || name.length == 0) return null

  return (
    <Link href={`/users/${user.id}`}>
      <div className="flex w-full items-center justify-between border-t border-border px-2 pt-4">
        <div className="text-primary">
          {name !== user?.email && <p className="text-xs">{name}</p>}
          <p className="pr-4 text-xs font-light text-blue-900 dark:text-blue-300">
            {user.email ?? ""}
          </p>
        </div>
        <Avatar className="size-10">
          <AvatarImage src={user.image || ""} alt="Avatar" />
          <AvatarFallback>{avatarAltName(user.name || "~")}</AvatarFallback>
        </Avatar>
      </div>
    </Link>
  )
}
