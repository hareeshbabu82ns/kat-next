import { SidebarLink } from "@/components/layout/SidebarItems"
import { Cog, Palette as Themes, HomeIcon, Timer as Tracks } from "lucide-react"

type AdditionalLinks = {
  title: string
  links: SidebarLink[]
}

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Home", icon: HomeIcon },
  { href: "/account", title: "Account", icon: Cog },
  { href: "/settings", title: "Settings", icon: Cog },
]

export const additionalLinks: AdditionalLinks[] = [
  {
    title: "Entities",
    links: [
      {
        href: "/tracks",
        title: "Tracks",
        icon: Tracks,
      },
    ],
  },
  {
    title: "Themes",
    links: [
      {
        href: "/theme/colors",
        title: "Colors",
        icon: Themes,
      },
    ],
  },
]
