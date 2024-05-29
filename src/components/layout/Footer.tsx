import React from "react"
import {
  Mail as MailIcon,
  Phone as PhoneIcon,
  Map as MapIcon,
} from "lucide-react"
import { Icons } from "../shared/icons"

// Ref: https://flowbite.com/docs/components/footer/

const Footer = () => {
  return (
    <footer id="timings" className="flex flex-col gap-6 p-4 py-6 lg:py-8">
      <hr className="border-gray-300 dark:border-gray-700" />
      <div className="flex flex-1 flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0 md:px-6">
        <span className="text-center text-sm text-gray-500 dark:text-gray-400">
          © 2024{" "}
          <a href="https://karumariamman.ca/" className="hover:underline">
            TerabitsIO™
          </a>
          . All Rights Reserved.
        </span>
        <div className="flex">
          <a
            href="https://www.facebook.com/KarumariAmmanTempleCalgary/"
            target="_blank"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <Icons.facebook className="size-4" />
            <span className="sr-only">Facebook page</span>
          </a>
          <a
            href="mailto:karumari2007@yahoo.ca"
            target="_blank"
            className="ms-5 text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <MailIcon className="size-4" />
            <span className="sr-only">Email: karumari2007@yahoo.ca</span>
          </a>
          <a
            href="tel:4039732311"
            target="_blank"
            className="ms-5 text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <PhoneIcon className="size-4" />
            <span className="sr-only">Telephone: 403 973 2311</span>
          </a>
          <a
            href="https://karumariamman.ca/"
            target="_blank"
            className="ms-5 text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <svg
              className="h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Website: karumariamman.ca</span>
          </a>
          <a
            href="https://www.google.com/maps?ll=51.106799,-113.969918&z=13&t=m&hl=en&gl=CA&mapclient=embed&cid=12938557636326659011"
            target="_blank"
            className="ms-5 text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <MapIcon className="size-4" />
            <span className="sr-only">
              Address: 55 Westwinds Crescent NE #325, Calgary, AB T3J 5H2
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
