"use client"
import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import { uploadSeedData } from "./seed"

const SeedUploadButton = () => {
  return (
    <Button variant="ghost" size="icon" onClick={() => uploadSeedData()}>
      <Icons.upload className="size-5" />
    </Button>
  )
}

export default SeedUploadButton
