"use client"

import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"

import ThemeToggle from "../shared/theme-toggle"
import { SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"

export default function Navbar({
  children,
  actions,
  sidebarTrigger = false,
  themeToggle = false,
}: {
  children: React.ReactNode
  actions?: React.ReactNode
  sidebarTrigger?: boolean
  themeToggle?: boolean
}) {
  const pathname = usePathname()
  return (
    <header className="border-b-1 flex h-14 items-center justify-between bg-muted p-2 text-muted-foreground md:px-4">
      <div className="flex items-center space-x-4">{children}</div>
      <div className="flex items-center space-x-2">
        {actions}
        {themeToggle && <ThemeToggle />}
        {sidebarTrigger && (
          <SheetTrigger asChild className="flex md:hidden">
            <Button variant="ghost" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
        )}
      </div>
    </header>
  )
}
