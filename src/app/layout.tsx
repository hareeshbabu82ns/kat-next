import type { Metadata } from "next"
import { cn } from "@/lib/utils"
import { Inter as FontSans } from "next/font/google"
import { ThemeProvider } from "@/components/shared/theme-provider"
import Providers from "@/components/shared/providers"

import "./globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Karumariamman Temple",
  description: "Sri Calgary Karumariamman Temple",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
