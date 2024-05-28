import { SidebarLink } from "@/components/layout/SidebarItems"
import { Cog, HomeIcon, Palette as Pooja } from "lucide-react"

type AdditionalLinks = {
  title: string
  links: SidebarLink[]
}

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Home", icon: HomeIcon },
  {
    href: "/pooja",
    title: "Pooja",
    icon: Pooja,
  },
]

export const additionalLinks: AdditionalLinks[] = [
  {
    title: "Extras",
    links: [{ href: "/settings", title: "Settings", icon: Cog }],
  },
]
