import { Icons } from "@/components/shared/icons"
import { siteConfig } from "@/config/site"
import { formatPhoneNumber } from "@/lib/utils"

const ContactsCard = () => {
  const facebookID = siteConfig.links.facebook
    .split("/")
    .filter((p) => p.trim().length > 0)
    .pop()
  return (
    <div className="flex max-w-[300px] flex-col gap-4">
      <a
        href={siteConfig.links.facebook}
        target="_blank"
        className="group flex items-center gap-3 text-blue-700 dark:text-blue-400 "
      >
        <Icons.facebook className="size-7 min-w-7 transition-all group-hover:-rotate-12 group-hover:scale-110" />
        <span className="text-ellipsis">@{facebookID}</span>
      </a>
      <a
        href={`mailto:${siteConfig.links.email}`}
        target="_blank"
        className="group flex items-center gap-3 text-green-700 dark:text-green-400"
      >
        <Icons.email className="size-7 min-w-7 transition-all group-hover:rotate-12 group-hover:scale-110" />
        <span className="">{siteConfig.links.email}</span>
      </a>
      <a
        href={`tel:${siteConfig.links.tel}`}
        target="_blank"
        className="group flex items-center gap-3 text-red-700 dark:text-red-400"
      >
        <Icons.phone className="size-7 min-w-7 transition-all group-hover:-rotate-12 group-hover:scale-110" />
        <span className="">{formatPhoneNumber(siteConfig.links.tel)}</span>
      </a>
      <a
        href={siteConfig.url}
        target="_blank"
        className="group flex items-center gap-3 text-yellow-600 dark:text-yellow-400"
      >
        <Icons.globe className="size-7 min-w-7 transition-all group-hover:rotate-12 group-hover:scale-110" />
        <span className="">{siteConfig.url}</span>
      </a>
      <a
        href={siteConfig.links.map}
        target="_blank"
        className="group flex items-center gap-3 text-blue-700 dark:text-blue-400"
      >
        <Icons.map className="size-7 min-w-7 transition-all group-hover:-rotate-12 group-hover:scale-110" />
        <span className="">{siteConfig.address}</span>
      </a>
    </div>
  )
}

export default ContactsCard
