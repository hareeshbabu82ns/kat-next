export type SiteConfig = {
  name: string
  description: string
  url: string
  address: string
  links: {
    facebook: string
    email: string
    tel: string
    map: string
  }
  defaultUserImg: string
  defaultEventImg: string
}

export const siteConfig: SiteConfig = {
  name: "Karumariamman Temple",
  description: "Sri Calgary Karumariamman Temple",
  url: "https://karumariamman.ca/",
  address: "55 Westwinds Crescent NE #325, Calgary, AB T3J 5H2",
  links: {
    email: "karumari2007@yahoo.ca",
    tel: "4039732311",
    facebook: "https://www.facebook.com/KarumariAmmanTempleCalgary/",
    map: "https://www.google.com/maps?ll=51.106799,-113.969918&z=13&t=m&hl=en&gl=CA&mapclient=embed&cid=12938557636326659011",
  },
  defaultUserImg: "/default-om_256.png",
  defaultEventImg: "/kat-logo.png",
}
