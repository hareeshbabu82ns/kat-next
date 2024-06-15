import Image from "next/image"
import ContactsCard from "@/components/layout/ContactsCard"
import Timings from "@/components/layout/Timings"
import { siteConfig } from "@/config/site"

export default function Page() {
  return (
    <main className="flex flex-1 flex-col items-center gap-8 pt-10">
      <div className="flex flex-col items-stretch justify-center gap-8 align-middle md:flex-row md:gap-16">
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
  )
}
