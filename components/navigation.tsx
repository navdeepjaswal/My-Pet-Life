"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Heart, LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

export default function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsAuthenticated(!!session)
      setIsLoading(false)
    }

    checkAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      toast.success("Successfully signed out")
      router.push("/")
    } catch (error) {
      toast.error("Error signing out")
      console.error(error)
    }
  }

  if (isLoading) {
    return (
      <nav className="bg-white/80 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-rose-500" fill="currentColor" />
              <span className="text-2xl font-bold text-gray-800">MyPetLife</span>
            </Link>
            <div className="w-24 h-8 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-rose-500" fill="currentColor" />
            <span className="text-2xl font-bold text-gray-800">MyPetLife</span>
          </Link>

          {!isAuthenticated ? (
            // Unauthenticated navigation
            <>
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
                  <Button className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-6 font-semibold text-lg">
                    Get Started
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            // Authenticated navigation
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleSignOut}
                variant="outline" 
                className="border-white text-rose-600 hover:bg-rose-50 font-semibold text-lg flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
