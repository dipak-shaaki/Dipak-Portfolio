import type React from "react"
import "@/app/globals.css"
import { cn } from "@/lib/utils"
import ThemeScrollEffect from "@/components/theme-scroll-effect"


// Import Plus Jakarta Sans Variable font
import { Plus_Jakarta_Sans } from "next/font/google"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Dipak Shanki | Portfolio</title>
        <meta name="description" content="Personal portfolio of Dipak Shanki" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", plusJakartaSans.variable)}>
      <ThemeScrollEffect>
          {children}
        </ThemeScrollEffect>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
