import SignIn from "@/components/auth/SignIn"

export default async function Home() {
  return (
    <main className="my-4 space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <SignIn />
    </main>
  )
}
