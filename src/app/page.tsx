import MountainIcon from "@/components/layout/MountainIcon"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 items-center px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="#">
          <MountainIcon className="size-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button asChild variant="link">
            <Link href="#features">Features</Link>
          </Button>
          <Button asChild variant="link">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </nav>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-center text-6xl font-bold">
          Welcome to Karumari Amman Temple
        </h1>
        <Image src="/next.svg" alt="Next.js Logo" width={300} height={300} />
      </main>
    </div>
  )
}
