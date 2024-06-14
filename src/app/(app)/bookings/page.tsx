import Bookings from "@/components/bookings/bookings"
import PageHeader from "@/components/layout/PageHeader"

export default async function Home() {
  return (
    <main className="flex flex-col gap-2">
      <PageHeader title="Bookings" showBackButton={false} />
      <Bookings />
    </main>
  )
}
