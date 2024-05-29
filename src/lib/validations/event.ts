import * as z from "zod"

export const EventSchema = z.object({
  id: z.string(),
  title: z.string().min(5).max(100),
  description: z.string().max(500).optional(),
  price: z.coerce.number().min(5).default(0),
  duration: z.coerce.number().optional().default(10), // in minutes
  numOfSeats: z.coerce.number().optional().default(0), // 0 means unlimited
  thumbnail: z.string().default("/kat-logo.png").optional(),
  dateFrom: z.date(),
  dateTo: z.date(),
})

export const EventInputSchema = EventSchema.omit({ id: true })
