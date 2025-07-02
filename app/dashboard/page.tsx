"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"
import Loader from "@/components/loader"
import PawDecoration from "@/components/paw-decoration"
import PetOnboardingModal from "@/components/onboarding/pet-onboarding-modal"
import AddMemoryModal from "@/components/memories/add-memory-modal"
import { Heart, Plus, Album, ArrowRight, Camera, Clock } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showAddMemory, setShowAddMemory] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [pet, setPet] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [recentMemories, setRecentMemories] = useState<any[]>([])
  const [timelineItems, setTimelineItems] = useState<any[]>([])

  const router = useRouter()

  const fetchDashboardData = async () => {
    const supabase = createClient()
    
    try {
      // Get authenticated user
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
      if (authError || !authUser) {
        router.push("/auth/login")
        return
      }
      
      setUser(authUser)

      // Get user profile
      const { data: userProfile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', authUser.id)
        .single()
      
      setProfile(userProfile)

      // Check if user has any pets
      const { data: userPets, error: petsError } = await supabase
        .from('pets')
        .select('*')
        .eq('user_id', authUser.id)
        .eq('is_alive', true)

      if (petsError) throw petsError

      if (!userPets || userPets.length === 0) {
        // No pets found, show onboarding
        setShowOnboarding(true)
        setIsLoading(false)
        return
      }

      // User has pets, get the first one and fetch dashboard data
      const primaryPet = userPets[0]
      setPet(primaryPet)

      // Fetch recent memories
      const { data: memories } = await supabase
        .from('memories')
        .select('*')
        .eq('user_id', authUser.id)
        .order('created_at', { ascending: false })
        .limit(3)
      
      setRecentMemories(memories || [])

      // Fetch timeline activities
      const { data: timeline } = await supabase
        .from('timeline_activities')
        .select('*')
        .eq('user_id', authUser.id)
        .order('created_at', { ascending: false })
        .limit(4)
      
      setTimelineItems(timeline || [])

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    // Refresh dashboard data after onboarding
    setIsLoading(true)
    fetchDashboardData()
  }

  const handleAddMemoryComplete = () => {
    setShowAddMemory(false)
    // Refresh dashboard data after adding memory
    setIsLoading(true)
    fetchDashboardData()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (showOnboarding && user) {
    return <PetOnboardingModal userId={user.id} onComplete={handleOnboardingComplete} />
  }

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      {showAddMemory && user && pet && (
        <AddMemoryModal
          userId={user.id}
          petId={pet.id}
          onClose={() => setShowAddMemory(false)}
          onComplete={handleAddMemoryComplete}
        />
      )}

      <div className={`min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 ${isLoading ? "hidden" : "block"}`}>

        {/* Decorative paws */}
        <PawDecoration className="absolute top-20 left-10 rotate-12 opacity-30" size="w-8 h-8" />
        <PawDecoration className="absolute top-40 right-20 -rotate-12 opacity-30" size="w-6 h-6" />

        <div className="container mx-auto px-4 py-8">
          {/* Welcome Header */}
          <section className="mb-8">
            <Card className="bg-white/70 backdrop-blur-sm border-rose-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16 border-2 border-rose-200">
                    <AvatarImage src={pet?.avatar_url || "/placeholder.svg"} alt={pet?.name || "Pet"} />
                    <AvatarFallback className="bg-rose-100 text-rose-600 text-xl font-semibold">
                      {pet?.name?.[0] || "P"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                      Welcome back, {profile?.name || user?.email?.split('@')[0]}! 👋
                    </h1>
                    <p className="text-gray-600">
                      Ready to add more precious memories of {pet?.name || "your pet"}?
                    </p>
                  </div>
                  <Button
                    onClick={() => setShowAddMemory(true)}
                    className="hidden md:flex items-center space-x-2"
                  >
                    <Camera className="h-4 w-4" />
                    <span>Add Memory</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Quick Actions */}
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Add Memory Card */}
              <Card className="bg-white/70 backdrop-blur-sm border-rose-100 hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                    <Camera className="h-5 w-5 text-rose-500" />
                    <span>Add Memory</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Capture and preserve a special moment with {pet?.name}</p>
                  <Button
                    onClick={() => setShowAddMemory(true)}
                    variant="ghost"
                    className="w-full text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                  >
                    Add Photos
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* Create Album Card */}
              <Card className="bg-white/70 backdrop-blur-sm border-rose-100 hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                    <Album className="h-5 w-5 text-rose-500" />
                    <span>Create Album</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Organize your memories into beautiful collections</p>
                  <Button variant="ghost" className="w-full text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                    Create Album
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Recent Memories */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Camera className="h-5 w-5 text-rose-500 mr-2" />
              Recent Memories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentMemories.map((memory) => (
                <Card key={memory.id} className="bg-white/70 backdrop-blur-sm border-rose-100 hover:shadow-md transition-shadow">
                  <div className="aspect-square relative">
                    <Image
                      src={memory.image_url}
                      alt={memory.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">{memory.title}</h3>
                    <p className="text-sm text-gray-500">{formatDate(memory.memory_date)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Recent Timeline Feed */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Clock className="h-5 w-5 text-rose-500 mr-2" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {timelineItems.map((item) => (
                <Card key={item.id} className="bg-white/70 backdrop-blur-sm border-rose-100">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      {item.image_url && (
                        <div className="w-16 h-16 relative flex-shrink-0">
                          <Image
                            src={item.image_url}
                            alt={item.title}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{formatDate(item.created_at)}</p>
                      </div>
                      <Badge variant="outline" className="text-rose-500 border-rose-200">
                        {item.activity_type}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Decorative paws at bottom */}
        <PawDecoration className="absolute bottom-20 left-20 rotate-45 opacity-20" size="w-10 h-10" />
        <PawDecoration className="absolute bottom-10 right-10 -rotate-45 opacity-20" size="w-6 h-6" />
      </div>
    </>
  )
}
