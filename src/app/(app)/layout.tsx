import WithNavSidebar from "@/components/layout/WithNavSidebar"
import NextAuthProvider from "@/lib/auth/Provider"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NextAuthProvider>
        <WithNavSidebar>{children}</WithNavSidebar>
      </NextAuthProvider>
    </>
  )
}
