import PageHeader from "@/components/layout/PageHeader"
import Bookings from "./bookings"

export default async function Home() {
  return (
    <main className="flex flex-col gap-2">
      <PageHeader title="Dashboard" showBackButton={false} />
      <Bookings />
    </main>
  )
}
