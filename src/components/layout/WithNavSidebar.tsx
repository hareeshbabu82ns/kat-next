"use client"

import { UserRole } from "@prisma/client"
import { useSession } from "next-auth/react"
import { create } from "zustand"
import UserAvatarMenuButton from "@/components/auth/UserAvatarMenuButton"
import AppTitleLogo from "@/components/layout/AppTitleLogo"
// import Navbar from "@/components/layout/Navbar"
// import Sidebar from "@/components/layout/Sidebar"
import SidebarItems from "@/components/layout/SidebarItems"
import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function WithNavSidebar({
  children,
}: {
  children: React.ReactNode
}) {
  const { status, data: session } = useSession()
  const { isOpen: sidebarOpen, setOpen: setSidbarOpen } = useSidebarStore()

  if (status === "loading") return null

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <AppTitleLogo />
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 py-4 text-sm font-medium lg:px-4">
              <SidebarItems isAdmin={session?.user.role === UserRole.ADMIN} />
            </nav>
          </div>
          {/* <div className="mt-auto p-4">
            <UserDetails session={session} />
          </div> */}
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet open={sidebarOpen} onOpenChange={setSidbarOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Icons.sidebarMenu className="size-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <div className="flex flex-col gap-4">
                <AppTitleLogo />
                <SidebarItems isAdmin={session?.user.role === UserRole.ADMIN} />
              </div>
              {/* <div className="mt-auto">
                <UserDetails session={session} />
              </div> */}
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">{/* middle header nav part */}</div>
          <div>
            {/* actions header nav part */}
            <UserAvatarMenuButton />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pb-8 pt-2 @container/main lg:gap-6 lg:p-6 lg:pt-2">
          {children}
        </main>
      </div>
    </div>
  )
}

interface SidebarState {
  isOpen: boolean
  toggle: () => void
  setOpen: (open: boolean) => void
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ ...state, isOpen: !state.isOpen })),
  setOpen: (open) => set((state) => ({ ...state, isOpen: open })),
}))

// const UserDetails = ({ session }: { session: Session | null }) => {
//   if (session === null) return null
//   const { user } = session

//   const name = user?.name ?? user?.email ?? ""

//   if (!name || name.length == 0) return null

//   return (
//     <Link href={`/users/${user.id}`}>
//       <div className="flex w-full items-center justify-between border-t border-border px-2 pt-2">
//         <div className="text-primary">
//           {name !== user?.email && <p className="text-xs">{name}</p>}
//           <p className="pr-4 text-xs font-light text-blue-900 dark:text-blue-300">
//             {user.email ?? ""}
//           </p>
//         </div>
//         {/* <SignOutBtn variant="ghost" size="icon">
//           <Icons.logout className="size-4" />
//         </SignOutBtn> */}
//         <Avatar className="size-8">
//           <AvatarImage src={user.image || ""} alt="Avatar" />
//           <AvatarFallback>{avatarAltName(user.name || "~")}</AvatarFallback>
//         </Avatar>
//       </div>
//     </Link>
//   )
// }
