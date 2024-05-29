import { checkAuth } from "@/lib/auth/utils"
import { Toaster } from "@/components/ui/sonner"
import Navbar from "@/components/layout/Navbar"
import Sidebar from "@/components/layout/Sidebar"
import NextAuthProvider from "@/lib/auth/Provider"
import { cn } from "@/lib/utils"
import { type ClassValue } from "clsx"
import AppTitleLogo from "@/components/layout/AppTitleLogo"
import { Sheet, SheetContent } from "@/components/ui/sheet"
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await checkAuth()
  return (
    <>
      <NextAuthProvider>
        <WithNavSidebar>{children}</WithNavSidebar>
      </NextAuthProvider>

      <Toaster richColors />
    </>
  )
}

function WithNavSidebar({
  children,
  classNamePage,
  classNameSidebar,
  classNameContents,
}: {
  children: React.ReactNode
  classNamePage?: ClassValue
  classNameSidebar?: ClassValue
  classNameContents?: ClassValue
}) {
  return (
    <div
      className={cn(
        "flex flex-1 items-start md:grid md:grid-cols-[260px_minmax(0,1fr)]",
        classNamePage
      )}
    >
      <aside
        className={cn(
          "hidden h-screen w-full min-w-52 shrink-0 border-r border-border shadow-inner md:sticky md:block",
          classNameSidebar
        )}
      >
        <Sidebar />
      </aside>
      <section className="flex h-screen w-full flex-col overflow-hidden">
        <Sheet>
          <Navbar sidebarTrigger>
            <AppTitleLogo className="flex md:hidden" />
          </Navbar>
          <SheetContent side="left" className="w-[260px] overflow-y-auto p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className={cn("md:py px-4 py-2 md:px-6", classNameContents)}>
            {children}
          </div>
        </main>
      </section>
    </div>
  )
}
