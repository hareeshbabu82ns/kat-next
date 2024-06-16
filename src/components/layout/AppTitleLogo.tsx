import { ClassValue } from "clsx"
import MountainIcon from "@/components/layout/MountainIcon"
import { cn } from "@/lib/utils"

const AppTitleLogo = ({ className }: { className?: ClassValue }) => {
  return (
    <div className={cn("mr-4 flex flex-1 items-center space-x-2", className)}>
      <MountainIcon className="text-tertiary-700 dark:text-tertiary-300 size-6 md:size-8" />
      <span className="self-center whitespace-nowrap font-semibold">
        Srithevi Karumariamman
      </span>
    </div>
  )
}

export default AppTitleLogo
