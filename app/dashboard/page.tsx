"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace("/auth/login")
      }
    }

    checkUser()
  }, [router])

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Your Dashboard</h1>
        <p className="text-gray-600">
          This is your personal dashboard where you can manage your pet memories and profile.
        </p>
      </div>
    </div>
  )
}
