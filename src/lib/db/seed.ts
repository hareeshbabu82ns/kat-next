"use server"
import { Events } from "@prisma/client"
import * as data from "./seed-data.json"
import { db } from "."

interface SeedEvents extends Omit<Events, "id" | "dateFrom" | "dateTo"> {
  dateFrom: string
  dateTo: string
}

interface SeedData {
  events: SeedEvents[]
}

export async function uploadSeedData() {
  const seedData = data as SeedData
  const allData = await db.events.findMany()

  if (allData.length === 0) {
    for (const item of seedData.events) {
      const { dateFrom, dateTo, ...restData } = item
      const data = {
        ...restData,
        dateFrom: new Date(dateFrom),
        dateTo: new Date(dateTo),
      }
      await db.events.create({
        data,
      })
    }
  }
}
