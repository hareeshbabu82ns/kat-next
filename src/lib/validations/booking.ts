import * as z from "zod"

export const BookingSchema = z.object({
  id: z.string(),
  eventId: z.string(),
  userEmail: z.string().email(),
  date: z.date(),
  confirmed: z.boolean().default(false),
  paid: z.boolean().default(false),
  paidAmount: z.coerce.number().optional().default(0),
  notes: z.string().max(500).optional(),
})

export const BookingInputSchema = BookingSchema.omit({ id: true })
