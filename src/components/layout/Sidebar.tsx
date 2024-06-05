import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { getUserAuth } from "@/lib/auth"
import { AuthSession } from "@/lib/auth/utils"
import { avatarAltName } from "@/lib/utils"
import AppTitleLogo from "./AppTitleLogo"
import SidebarItems from "./SidebarItems"

const Sidebar = async () => {
  const session = await getUserAuth()
  if (session.session === null) return null

  return (
    <aside className="flex h-full flex-col justify-between bg-muted">
      <div className="h-full space-y-2">
        <div className="pl-2 md:pl-4">
          <AppTitleLogo />
        </div>
        <div className="py-4 pl-4 pr-6 md:py-6">
          <SidebarItems isAdmin={session.session.user.isAdmin || false} />
        </div>
      </div>
      <div className="p-2">
        <UserDetails session={session as AuthSession} />
      </div>
    </aside>
  )
}

export default Sidebar

const UserDetails = ({ session }: { session: AuthSession }) => {
  if (session.session === null) return null
  const { user } = session.session

  if (!user?.name || user.name.length == 0) return null

  return (
    <Link href={`/users/${user.id}`}>
      <div className="flex w-full items-center justify-between border-t border-border px-2 pt-4">
        <div className="text-primary">
          <p className="text-xs">{user.name ?? ""}</p>
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
