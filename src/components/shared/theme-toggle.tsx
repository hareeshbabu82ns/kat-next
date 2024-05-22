"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ThemeToggle() {
  const { setTheme } = useTheme()

  const handleSetCustomThemeToHtml = (themeName: string) => {
    if (["light", "dark", "system"].includes(themeName)) {
      setTheme(themeName)
      document.documentElement.dataset.theme = undefined
    } else {
      document.documentElement.dataset.theme = themeName
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="max-h-[500px] overflow-auto scrollbar-none"
      >
        <DropdownMenuItem onClick={() => handleSetCustomThemeToHtml("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSetCustomThemeToHtml("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSetCustomThemeToHtml("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
