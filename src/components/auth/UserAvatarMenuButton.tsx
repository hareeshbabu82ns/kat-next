"use client"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { avatarAltName } from "@/lib/utils"
import AuthDropdownMenuItem from "./AuthDropdownMenuItem.client"
import { Icons } from "../shared/icons"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

const UserAvatarMenuButton = () => {
  const { data: session, status } = useSession()
  if (status === "loading" || !session || !session.user) return null
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Avatar className="size-10">
              <AvatarImage src={session.user.image || ""} alt="Avatar" />
              <AvatarFallback>
                {avatarAltName(session.user.name || "~")}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="">
              <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                {session.user.name}
              </span>
              <span className="block truncate text-sm text-primary">
                {session.user.email}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/users/${session.user.id}`} className="flex">
              <Icons.user className="mr-2 size-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AuthDropdownMenuItem />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default UserAvatarMenuButton
