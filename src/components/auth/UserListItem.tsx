import React from "react"
import { avatarAltName, cn, formatPhoneNumber } from "@/lib/utils"
import { Icons } from "../shared/icons"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface UserListItemProps {
  name: string
  email: string
  image: string
  isAdmin?: boolean
  telephone?: string
}

const UserListItem = ({
  name,
  email,
  image,
  isAdmin = false,
  telephone,
}: UserListItemProps) => {
  return (
    <div className="flex h-full items-center gap-4 rounded-md border p-2 hover:bg-primary/5">
      <Avatar
        className={cn("flex size-10", isAdmin ? "border border-primary" : "")}
      >
        <AvatarImage src={image} alt="Avatar" />
        <AvatarFallback>{avatarAltName(name)}</AvatarFallback>
      </Avatar>
      <div className="grid gap-1 overflow-auto">
        <p className="flex items-center gap-2 text-sm font-medium leading-none">
          <span>
            <Icons.user className="size-4" />
          </span>
          {name}
        </p>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            <Icons.email className="size-4" />
          </span>
          {email}
        </p>
        {telephone && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              <Icons.phone className="size-4" />
            </span>
            {formatPhoneNumber(telephone)}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserListItem
