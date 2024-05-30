import {
  Cog,
  HomeIcon,
  Palette as Pooja,
  Users2 as UsersIcon,
} from "lucide-react"
import { SidebarLink } from "@/components/layout/SidebarItems"

type AdditionalLinks = {
  title: string
  links: SidebarLink[]
}

export const getDefaultLinks = (isAdmin: boolean): SidebarLink[] => {
  const links = [
    { href: "/dashboard", title: "Home", icon: HomeIcon },
    {
      href: "/pooja",
      title: "Pooja",
      icon: Pooja,
    },
  ]
  if (isAdmin) {
    links.push({
      href: "/users",
      title: "Users",
      icon: UsersIcon,
    })
  }
  return links
}

export const additionalLinks: AdditionalLinks[] = [
  {
    title: "Extras",
    links: [{ href: "/settings", title: "Settings", icon: Cog }],
  },
]
