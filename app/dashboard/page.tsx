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
import { Heart, Plus, Album, Flower2, Eye, ArrowRight, Camera, Clock } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [pet, setPet] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [recentMemories, setRecentMemories] = useState<any[]>([])
  const [timelineItems, setTimelineItems] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalMemories: 0,
    totalAlbums: 0,
    storageUsed: "0 MB"
  })

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

      // Fetch stats
      const { count: memoriesCount } = await supabase
        .from('memories')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', authUser.id)

      const { count: albumsCount } = await supabase
        .from('albums')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', authUser.id)

      setStats({
        totalMemories: memoriesCount || 0,
        totalAlbums: albumsCount || 0,
        storageUsed: "1.2GB" // This would need to be calculated from actual storage usage
      })

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getYearsTogether = () => {
    if (!pet?.created_at) return 0
    const petCreatedDate = new Date(pet.created_at)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - petCreatedDate.getTime())
    const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365))
    return diffYears
  }

  if (showOnboarding && user) {
    return <PetOnboardingModal userId={user.id} onComplete={handleOnboardingComplete} />
  }

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

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
                  <div className="hidden md:flex items-center space-x-2">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} alt={profile?.name || "User"} />
                      <AvatarFallback className="bg-gray-100 text-gray-600">
                        {profile?.name?.[0] || user?.email?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Quick Actions Bar */}
          <section className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-6 py-3 flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Add Memory</span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-rose-300 text-rose-600 hover:bg-rose-50 rounded-full px-6 py-3 flex items-center space-x-2"
              >
                <Album className="h-5 w-5" />
                <span>Create Album</span>
              </Button>
            </div>
          </section>

          {/* Snapshot Cards */}
          <section className="mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Memories Card */}
              <Card className="bg-white/70 backdrop-blur-sm border-rose-100 hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                    <Camera className="h-5 w-5 text-rose-500" />
                    <span>Recent Memories</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {recentMemories.slice(0, 3).map((memory) => (
                      <div key={memory.id} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={memory.image_url || "/placeholder.svg"}
                          alt="Memory"
                          width={100}
                          height={100}
                          className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                        />
                      </div>
                    ))}
                    {/* Fill empty slots */}
                    {Array.from({ length: Math.max(0, 3 - recentMemories.length) }).map((_, index) => (
                      <div key={`empty-${index}`} className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
                        <Camera className="h-8 w-8 text-gray-400" />
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" className="w-full text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                    See all memories
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* Albums Card */}
              <Card className="bg-white/70 backdrop-blur-sm border-rose-100 hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                    <Album className="h-5 w-5 text-rose-500" />
                    <span>Albums</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <div className="text-3xl font-bold text-gray-800 mb-2">{stats.totalAlbums}</div>
                    <p className="text-gray-600 mb-4">Albums created</p>
                    {stats.totalAlbums > 0 && (
                      <Badge variant="secondary" className="bg-rose-100 text-rose-700 mb-4">
                        Recently added
                      </Badge>
                    )}
                  </div>
                  <Button variant="ghost" className="w-full text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                    Manage albums
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Recent Timeline Feed */}
          <section className="mb-8">
            <Card className="bg-white/70 backdrop-blur-sm border-rose-100">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-rose-500" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>Your latest memories and updates</CardDescription>
              </CardHeader>
              <CardContent>
                {timelineItems.length > 0 ? (
                  <div className="space-y-4">
                    {timelineItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start space-x-4 p-4 rounded-lg hover:bg-rose-50/50 transition-colors"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src={item.image_url || "/placeholder.svg"}
                              alt="Timeline item"
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge
                              variant="secondary"
                              className={`text-xs ${
                                item.activity_type === "memory" ? "bg-rose-100 text-rose-700" : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {item.activity_type === "memory" ? "Memory" : "Album"}
                            </Badge>
                            <span className="text-sm text-gray-500">{formatDate(item.created_at)}</span>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No activities yet. Start by adding some memories!</p>
                  </div>
                )}
                {timelineItems.length > 0 && (
                  <div className="mt-6 text-center">
                    <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                      View all activity
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Decorative paws at bottom */}
        <PawDecoration className="absolute bottom-20 left-20 rotate-45 opacity-20" size="w-10 h-10" />
        <PawDecoration className="absolute bottom-10 right-10 -rotate-45 opacity-20" size="w-6 h-6" />
      </div>
    </>
  )
}
