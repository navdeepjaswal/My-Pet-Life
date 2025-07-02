"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Plus, Album, ArrowRight, Camera, Clock } from "lucide-react"
import Loader from "@/components/loader"
import PetOnboardingModal from "@/components/onboarding/pet-onboarding-modal"
import AddMemoryModal from "@/components/memories/add-memory-modal"
import AddAlbumModal from "@/components/albums/add-album-modal"
import ImageModal from "@/components/ui/image-modal"
import AlbumView from "@/components/albums/album-view"

interface Memory {
  id: string
  title: string
  caption: string | null
  memory_date: string
  image_url: string
  created_at: string
}

interface Album {
  id: string
  name: string
  description: string | null
  cover_image_url: string
  created_at: string
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showAddMemory, setShowAddMemory] = useState(false)
  const [showAlbumModal, setShowAlbumModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [pet, setPet] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [recentMemories, setRecentMemories] = useState<Memory[]>([])
  const [timelineItems, setTimelineItems] = useState<any[]>([])
  const [albums, setAlbums] = useState<Album[]>([])

  useEffect(() => {
    const fetchDashboardData = async () => {
      const supabase = createClient()

      try {
        // Get authenticated user
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
        if (authError) throw authError
        if (!authUser) {
          return
        }

        setUser(authUser)

        // Fetch user profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single()

        setProfile(profileData)

        // Fetch user's pet
        const { data: petData } = await supabase
          .from('pets')
          .select('*')
          .eq('user_id', authUser.id)
          .single()

        setPet(petData)

        if (!petData) {
          setShowOnboarding(true)
          setIsLoading(false)
          return
        }

        // Fetch recent memories
        const { data: memories } = await supabase
          .from('memories')
          .select('*')
          .eq('user_id', authUser.id)
          .order('created_at', { ascending: false })
          .limit(6)
        
        setRecentMemories(memories || [])

        // Fetch albums
        const { data: albumsData } = await supabase
          .from('albums')
          .select('*')
          .eq('user_id', authUser.id)
          .order('created_at', { ascending: false })
        
        setAlbums(albumsData || [])

        // Fetch timeline activities
        const { data: timeline } = await supabase
          .from('timeline_activities')
          .select('*')
          .eq('user_id', authUser.id)
          .order('created_at', { ascending: false })
          .limit(10)

        setTimelineItems(timeline || [])

      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (isLoading) {
    return <Loader onComplete={() => setIsLoading(false)} />
  }

  return (
    <>
      {showOnboarding && (
        <PetOnboardingModal
          userId={user?.id}
          onComplete={() => {
            setShowOnboarding(false)
            window.location.reload()
          }}
        />
      )}

      {showAddMemory && user && pet && (
        <AddMemoryModal
          userId={user.id}
          petId={pet.id}
          onClose={() => setShowAddMemory(false)}
          onComplete={() => {
            setShowAddMemory(false)
            window.location.reload()
          }}
        />
      )}

      {showAlbumModal && user && pet && (
        <AddAlbumModal
          userId={user.id}
          petId={pet.id}
          onClose={() => setShowAlbumModal(false)}
          onComplete={() => {
            setShowAlbumModal(false)
            window.location.reload()
          }}
        />
      )}

      <ImageModal
        src={selectedImage?.src || ""}
        alt={selectedImage?.alt || ""}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />

      <AlbumView
        albumId={selectedAlbum || ""}
        isOpen={!!selectedAlbum}
        onClose={() => setSelectedAlbum(null)}
      />

      <div className={`min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 ${isLoading ? "hidden" : "block"}`}>
        <div className="container mx-auto px-4 py-8">
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
                  <Button 
                    onClick={() => setShowAlbumModal(true)}
                    variant="ghost" 
                    className="w-full text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                  >
                    Create Album
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Recent Memories */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Camera className="h-5 w-5 text-rose-500 mr-2" />
              Recent Memories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentMemories.map((memory) => (
                <Card 
                  key={memory.id} 
                  className="bg-white/70 backdrop-blur-sm border-rose-100 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedImage({ src: memory.image_url, alt: memory.title })}
                >
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

          {/* Albums Section */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Album className="h-5 w-5 text-rose-500 mr-2" />
              Albums
            </h2>
            {albums.length === 0 ? (
              <Card className="bg-white/70 backdrop-blur-sm border-rose-100 p-8 text-center">
                <div className="flex flex-col items-center gap-4">
                  <Album className="h-12 w-12 text-rose-300" />
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800">No Albums Yet</h3>
                    <p className="text-gray-600">Create your first album to organize your precious memories</p>
                  </div>
                  <Button
                    onClick={() => setShowAlbumModal(true)}
                    className="mt-4"
                  >
                    Create Your First Album
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="overflow-hidden">
                <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-hide">
                  {albums.map((album) => (
                    <Card 
                      key={album.id} 
                      className="flex-shrink-0 w-[300px] cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => setSelectedAlbum(album.id)}
                    >
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg">{album.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={album.cover_image_url}
                            alt={album.name}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        {album.description && (
                          <div className="p-4">
                            <p className="text-sm text-gray-600">{album.description}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Timeline Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Clock className="h-5 w-5 text-rose-500 mr-2" />
              Timeline
            </h2>
            <div className="space-y-4">
              {timelineItems.map((item) => (
                <Card key={item.id} className="bg-white/70 backdrop-blur-sm border-rose-100">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 relative flex-shrink-0">
                      {item.image_url ? (
                        <Image
                          src={item.image_url}
                          alt={item.title}
                          fill
                          className="object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-full bg-rose-100 rounded-lg flex items-center justify-center">
                          <Heart className="h-6 w-6 text-rose-500" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-500">{formatDate(item.created_at)}</p>
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
