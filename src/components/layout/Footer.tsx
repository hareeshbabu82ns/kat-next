import React from "react"
import {
  Mail as MailIcon,
  Phone as PhoneIcon,
  Map as MapIcon,
  Globe2 as GlobeIcon,
} from "lucide-react"
import { Icons } from "../shared/icons"
import { siteConfig } from "@/config/site"

// Ref: https://flowbite.com/docs/components/footer/

const Footer = () => {
  return (
    <footer id="timings" className="flex flex-col gap-6 p-4 py-6 lg:py-8">
      <hr className="border-gray-300 dark:border-gray-700" />
      <div className="flex flex-1 flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0 md:px-6">
        <span className="text-center text-sm text-gray-500 dark:text-gray-400">
          © 2024{" "}
          <a href={siteConfig.url} className="hover:underline">
            TerabitsIO™
          </a>
          . All Rights Reserved.
        </span>
        <div className="flex">
          <a
            href={siteConfig.links.facebook}
            target="_blank"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <Icons.facebook className="size-4" />
            <span className="sr-only">Facebook page</span>
          </a>
          <a
            href={`mailto:${siteConfig.links.email}`}
            target="_blank"
            className="ms-5 text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <MailIcon className="size-4" />
            <span className="sr-only">Email: {siteConfig.links.email}</span>
          </a>
          <a
            href={`tel:${siteConfig.links.tel}`}
            target="_blank"
            className="ms-5 text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <PhoneIcon className="size-4" />
            <span className="sr-only">Telephone: {siteConfig.links.tel}</span>
          </a>
          <a
            href={siteConfig.url}
            target="_blank"
            className="ms-5 text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <GlobeIcon className="size-4" />
            <span className="sr-only">Website: {siteConfig.url}</span>
          </a>
          <a
            href={siteConfig.links.map}
            target="_blank"
            className="ms-5 text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <MapIcon className="size-4" />
            <span className="sr-only">Address: {siteConfig.address}</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
