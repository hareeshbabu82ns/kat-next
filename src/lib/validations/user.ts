import * as z from "zod"
import { siteConfig } from "@/config/site"

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(5).max(100),
  email: z.string().email(),
  telephone: z.string().min(10).max(15).optional(),
  image: z.string().default(siteConfig.defaultUserImg).optional(),
  isAdmin: z.boolean().default(false),
})

export const UserInputSchema = UserSchema.omit({ id: true })
