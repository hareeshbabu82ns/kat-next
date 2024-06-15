import { SidebarLink } from "@/components/layout/SidebarItems"
import { Icons } from "@/components/shared/icons"

type AdditionalLinks = {
  title: string
  links: SidebarLink[]
}

export const getDefaultLinks = (isAdmin: boolean): SidebarLink[] => {
  const links = [
    { href: "/dashboard", title: "Home", icon: Icons.home },
    {
      href: "/pooja",
      title: "Pooja",
      icon: Icons.pooja,
    },
    {
      href: "/bookings",
      title: "Bookings",
      icon: Icons.booking,
    },
  ]
  if (isAdmin) {
    links.push({
      href: "/users",
      title: "Users",
      icon: Icons.users,
    })
  }
  return links
}

export const additionalLinks: AdditionalLinks[] = [
  {
    title: "Extras",
    links: [
      { href: "/settings", title: "Settings", icon: Icons.settings },
      { href: "/contacts", title: "Contact us", icon: Icons.phone },
    ],
  },
]
