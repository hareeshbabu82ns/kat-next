"use client"

import { LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { additionalLinks, getDefaultLinks } from "@/config/nav"
import { cn } from "@/lib/utils"
import { useSidebarStore } from "./WithNavSidebar"

export interface SidebarLink {
  title: string
  href: string
  icon: LucideIcon
}

const SidebarItems = ({ isAdmin }: { isAdmin: boolean }) => {
  return (
    <>
      <SidebarLinkGroup links={getDefaultLinks(isAdmin)} />
      {additionalLinks.length > 0
        ? additionalLinks.map((l) => (
            <SidebarLinkGroup
              links={l.links}
              title={l.title}
              border
              key={l.title}
            />
          ))
        : null}
    </>
  )
}
export default SidebarItems

const SidebarLinkGroup = ({
  links,
  title,
  border,
}: {
  links: SidebarLink[]
  title?: string
  border?: boolean
}) => {
  const fullPathname = usePathname()
  const pathname = "/" + fullPathname.split("/")[1]
  return (
    <div className={border ? "my-8 border-t border-border pt-4" : ""}>
      {title ? (
        <h4 className="mb-4 px-2 text-sm uppercase tracking-wider text-muted-foreground">
          {title}
        </h4>
      ) : null}
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.title}>
            <SidebarLink link={link} active={pathname === link.href} />
          </li>
        ))}
      </ul>
    </div>
  )
}
const SidebarLink = ({
  link,
  active,
}: {
  link: SidebarLink
  active: boolean
}) => {
  const { isOpen, setOpen } = useSidebarStore()
  return (
    <Link
      href={link.href}
      className={cn(
        "group flex items-center rounded-md p-2 text-base font-medium  hover:bg-popover  dark:hover:bg-gray-700",
        active ? "font-semibold text-primary" : ""
      )}
      onClick={() => {
        isOpen && setOpen(false)
      }}
    >
      <div className="flex items-center gap-3">
        <link.icon className="size-6" />
        <span>{link.title}</span>
      </div>
    </Link>
  )
}
