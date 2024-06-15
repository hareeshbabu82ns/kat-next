import { Icons } from "@/components/shared/icons"
import { siteConfig } from "@/config/site"
import { formatPhoneNumber } from "@/lib/utils"

const ContactsIcons = () => {
  return (
    <div className="flex gap-3">
      <a
        href={siteConfig.links.facebook}
        target="_blank"
        className="text-blue-700 dark:text-blue-400"
      >
        <Icons.facebook className="size-7 transition-all hover:-rotate-12 hover:scale-110" />
        <span className="sr-only">Facebook page</span>
      </a>
      <a
        href={`mailto:${siteConfig.links.email}`}
        target="_blank"
        className="text-green-700 dark:text-green-400"
      >
        <Icons.email className="size-7 transition-all hover:rotate-12 hover:scale-110" />
        <span className="sr-only">Email: {siteConfig.links.email}</span>
      </a>
      <a
        href={`tel:${siteConfig.links.tel}`}
        target="_blank"
        className="text-red-700 dark:text-red-400"
      >
        <Icons.phone className="size-7 transition-all hover:-rotate-12 hover:scale-110" />
        <span className="sr-only">
          Telephone: {formatPhoneNumber(siteConfig.links.tel)}
        </span>
      </a>
      <a
        href={siteConfig.url}
        target="_blank"
        className="text-yellow-600 dark:text-yellow-400"
      >
        <Icons.globe className="size-7 transition-all hover:rotate-12 hover:scale-110" />
        <span className="sr-only">Website: {siteConfig.url}</span>
      </a>
      <a
        href={siteConfig.links.map}
        target="_blank"
        className="text-blue-700 dark:text-blue-400"
      >
        <Icons.map className="size-7 transition-all hover:-rotate-12 hover:scale-110" />
        <span className="sr-only">Address: {siteConfig.address}</span>
      </a>
    </div>
  )
}

export default ContactsIcons
