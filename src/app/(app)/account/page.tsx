import UserSettings from "./UserSettings"
import { checkAuth, getUserAuth } from "@/lib/auth/utils"

export default async function Account() {
  await checkAuth()
  const { session } = await getUserAuth()

  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Account</h1>
      <div className="space-y-4">
        <UserSettings session={session} />
      </div>
      <div className="hidden rounded-sm border p-4 shadow-sm">
        <code className="whitespace-break-spaces break-all">
          {JSON.stringify(session, null, 2)}
        </code>
      </div>
    </main>
  )
}
