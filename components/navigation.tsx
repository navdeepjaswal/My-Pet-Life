"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Heart, LogOut, Menu } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
              <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-rose-500" fill="currentColor" />
              <span className="text-lg sm:text-2xl font-bold text-gray-800">MyPetLife</span>
            </Link>
            <div className="w-20 sm:w-24 h-6 sm:h-8 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-40">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center space-x-2 flex-shrink-0">
            <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-rose-500" fill="currentColor" />
            <span className="text-lg sm:text-2xl font-bold text-gray-800">MyPetLife</span>
          </Link>

          {!isAuthenticated ? (
            // Unauthenticated navigation
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-gray-600 hover:text-rose-500 transition-colors font-medium">
                  Home
                </Link>
                <Link href="/about" className="text-gray-600 hover:text-rose-500 transition-colors font-medium">
                  About
                </Link>
                <Link href="/contact" className="text-gray-600 hover:text-rose-500 transition-colors font-medium">
                  Contact
                </Link>
              </div>

              {/* Desktop Auth Buttons */}
              <div className="hidden md:flex items-center space-x-3">
                <Link href="/signin">
                  <Button variant="ghost" className="text-gray-600 hover:text-rose-500 font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-4 font-medium">
                    Get Started
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu */}
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    alignOffset={0}
                    sideOffset={8} 
                    className="w-48 min-w-[12rem] max-w-[calc(100vw-2rem)]"
                  >
                    <DropdownMenuItem asChild>
                      <Link href="/" className="w-full">
                        Home
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/about" className="w-full">
                        About
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/contact" className="w-full">
                        Contact
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/signin" className="w-full">
                        Sign In
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/signup" className="w-full font-medium text-rose-600">
                        Get Started
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          ) : (
            // Authenticated navigation
            <>
              {/* Desktop Sign Out Button */}
              <div className="hidden md:flex items-center">
                <Button 
                  onClick={handleSignOut}
                  variant="outline" 
                  className="border-rose-200 text-rose-600 hover:bg-rose-50 font-medium flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </div>

              {/* Mobile Menu for Authenticated Users */}
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    alignOffset={0}
                    sideOffset={8} 
                    className="w-48 min-w-[12rem] max-w-[calc(100vw-2rem)]"
                  >
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="w-full">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-rose-600 focus:text-rose-600">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
