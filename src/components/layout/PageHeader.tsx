"use client"

import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import React from "react"
import { Icons } from "../shared/icons"
import { Button } from "../ui/button"

export interface PageHeaderProps {
  showBackButton?: boolean
  title?: string | React.ReactNode
  children?: React.ReactNode
  className?: string
}

const PageHeader = ({
  title,
  children,
  className,
  showBackButton = true,
}: PageHeaderProps) => {
  const router = useRouter()
  return (
    <header className={cn("my-4 flex items-center justify-between", className)}>
      <div className="flex flex-1 flex-row items-center">
        {showBackButton && (
          <Button
            onClick={() => router.back()}
            type="button"
            variant="ghost"
            size="icon"
          >
            <Icons.back className="size-5" />
          </Button>
        )}
        <div>
          {title && typeof title === "string" && (
            <h1 className="font-heading text-xl font-semibold md:text-2xl">
              {title}
            </h1>
          )}
          {title && typeof title !== "string" && title}
        </div>
      </div>
      <>{children}</>
    </header>
  )
}

export default PageHeader
