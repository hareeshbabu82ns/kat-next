import { UserRole } from "@prisma/client"
import Link from "next/link"
import UserListItem from "@/components/auth/UserListItem"
import PageHeader from "@/components/layout/PageHeader"
import { Icons } from "@/components/shared/icons"
import { buttonVariants } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { getUsers } from "./actions"

export default async function Users() {
  const session = await auth()

  const users = await getUsers()

  return (
    <main className="flex flex-col">
      <PageHeader title="Users" showBackButton={false}>
        <div>
          {session?.user.role === UserRole.ADMIN && (
            <Link
              href="/users/new"
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
            >
              <Icons.add className="size-5" />
            </Link>
          )}
        </div>
      </PageHeader>
      <div className="grid flex-1 grid-cols-1 gap-4 @xl/main:grid-cols-2 @4xl/main:grid-cols-3">
        {users.map((user) => (
          <Link href={`/users/${user.id}`} key={user.id}>
            <UserListItem
              name={user.name || ""}
              email={user.email || ""}
              image={user.image || ""}
              isAdmin={user.role === UserRole.ADMIN}
              telephone={user.telephone || ""}
            />
          </Link>
        ))}
      </div>
    </main>
  )
}
