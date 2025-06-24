"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export default function Navigation() {
  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-rose-500" fill="currentColor" />
            <span className="text-2xl font-bold text-gray-800">MyPetLife</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8 font-semibold text-lg">
            <Link href="/" className="text-gray-600 hover:text-rose-500 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-rose-500 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-rose-500 transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/signin">
              <Button variant="ghost" className="text-gray-600 hover:text-rose-500 font-semibold text-lg">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-6 font-semibold text-lg">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
