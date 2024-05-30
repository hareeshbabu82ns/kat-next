import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import Providers from "@/components/shared/providers"
import { ThemeProvider } from "@/components/shared/theme-provider"

import "./globals.css"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["Calgary", "Karumariamman", "Temple"],
  authors: [
    {
      name: "Hareesh Polla",
      url: "https://hareeshpolla.com/",
    },
  ],
  creator: "hareeshpolla",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/pwa-64x64.png",
    apple: "/apple-touch-icon-180x180.png",
  },
  manifest: `/site.webmanifest`,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "flex min-h-screen justify-center bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
