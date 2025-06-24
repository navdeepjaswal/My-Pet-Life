import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MyPetLife - Preserve Your Pet's Precious Memories",
  description:
    "A beautiful and comforting space to save, view, and reflect on memories with your beloved pets. Organize your pet photos and create lasting memorials.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
