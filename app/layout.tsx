import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { initEmailJS } from "@/lib/emailjs"

const inter = Inter({ subsets: ["latin"] })

// Initialize EmailJS
initEmailJS();

export const metadata: Metadata = {
  title: "MyPetLife - Preserve Your Pet&apos;s Precious Memories",
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
        <ThemeProvider attribute="class" defaultTheme="light">
          <Navigation />
          {children}
          <Footer />
          <Toaster position="bottom-center" />
        </ThemeProvider>
      </body>
    </html>
  )
}
