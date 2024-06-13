import { auth } from "@/lib/auth"
import UserSettings from "./UserSettings"

export default async function Account() {
  const session = await auth()
  if (!session) return null

  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Account</h1>
      <div className="space-y-4">
        <UserSettings session={session} />
      </div>
      <div className=" rounded-sm border p-4 shadow-sm">
        <code className="whitespace-break-spaces break-all">
          {JSON.stringify(session, null, 2)}
        </code>
      </div>
    </main>
  )
}
