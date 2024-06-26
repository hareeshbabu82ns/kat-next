import Image from "next/image"
import Link from "next/link"
// import AuthButton from "@/components/auth/AuthButton.server"
import ContactsCard from "@/components/layout/ContactsCard"
import Footer from "@/components/layout/Footer"
import MountainIcon from "@/components/layout/MountainIcon"
import Timings from "@/components/layout/Timings"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <header className="flex h-14 items-center px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="#">
          <MountainIcon className="size-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button asChild variant="link">
            <Link href="#timings">Timings</Link>
          </Button>
          <Button asChild variant="link">
            <Link href="#contacts">Contact us</Link>
          </Button>
          <Button asChild variant="link">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          {/* <Button asChild variant="link">
            <Link href="/api/auth/signin">Sign In</Link>
          </Button> */}
          {/* <AuthButton /> */}
        </nav>
      </header>
      <main className="flex flex-1 flex-col items-center gap-8 pt-10">
        <h1 className="text-center text-lg font-bold md:text-3xl lg:text-6xl">
          Calgary Srithevi Karumariamman Hindu Temple
        </h1>
        <Image
          src={siteConfig.defaultEventImg}
          alt="Temple Logo"
          width={500}
          height={300}
        />
        <div className="flex flex-col items-stretch justify-center gap-8 align-middle md:flex-row md:gap-16">
          <hr />
          <div className="flex grow flex-col items-center justify-center gap-4">
            <h4
              className="text-center text-xl font-semibold text-secondary"
              id="contacts"
            >
              -: Contacts :-
            </h4>
            <Image
              src={siteConfig.urlQrCode}
              alt="Temple Logo"
              width={300}
              height={300}
            />
            <ContactsCard />
          </div>

          <hr className="block md:hidden" />
          <div id="timings">
            <Timings />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
