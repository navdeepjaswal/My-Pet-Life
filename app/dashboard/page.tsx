"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"
import Loader from "@/components/loader"
import PawDecoration from "@/components/paw-decoration"
import { Heart, Plus, Album, Flower2, Eye, ArrowRight, Camera, Clock } from "lucide-react"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - in real app this would come from API/database
  const user = {
    name: "Sarah",
    avatar: "/placeholder.svg?height=60&width=60",
  }

  const pet = {
    name: "Luna",
    avatar: "/placeholder.svg?height=80&width=80",
  }

  const recentMemories = [
    {
      id: 1,
      image: "/placeholder.svg?height=100&width=100",
      date: "2024-01-15",
      caption: "Luna's morning walk in the park",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=100&width=100",
      date: "2024-01-14",
      caption: "Playtime with her favorite toy",
    },
    {
      id: 3,
      image: "/placeholder.svg?height=100&width=100",
      date: "2024-01-13",
      caption: "Nap time by the window",
    },
  ]

  const timelineItems = [
    {
      id: 1,
      image: "/placeholder.svg?height=60&width=60",
      date: "January 15, 2024",
      caption: "Luna discovered a new favorite spot in the garden today. She spent the whole afternoon there!",
      type: "memory",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=60&width=60",
      date: "January 14, 2024",
      caption: "Created a new album: 'Winter Adventures' with 12 photos",
      type: "album",
    },
    {
      id: 3,
      image: "/placeholder.svg?height=60&width=60",
      date: "January 13, 2024",
      caption: "Luna's first snow day! She was so excited to see the white fluffy stuff.",
      type: "memory",
    },
    {
      id: 4,
      image: "/placeholder.svg?height=60&width=60",
      date: "January 12, 2024",
      caption: "Added 8 new photos to Luna's profile from our weekend trip",
      type: "memory",
    },
  ]

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <div
        className={`min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 ${isLoading ? "hidden" : "block"}`}
      >

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
                    <AvatarImage src={pet.avatar || "/placeholder.svg"} alt={pet.name} />
                    <AvatarFallback className="bg-rose-100 text-rose-600 text-xl font-semibold">
                      {pet.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Welcome back, {user.name}! 👋</h1>
                    <p className="text-gray-600">Ready to add more precious memories of {pet.name}?</p>
                  </div>
                  <div className="hidden md:flex items-center space-x-2">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="bg-gray-100 text-gray-600">{user.name[0]}</AvatarFallback>
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
              <Button
                size="lg"
                variant="outline"
                className="border-rose-300 text-rose-600 hover:bg-rose-50 rounded-full px-6 py-3 flex items-center space-x-2"
              >
                <Flower2 className="h-5 w-5" />
                <span>Light Memorial</span>
              </Button>
            </div>
          </section>

          {/* Snapshot Cards */}
          <section className="mb-8">
            <div className="grid md:grid-cols-3 gap-6">
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
                    {recentMemories.map((memory) => (
                      <div key={memory.id} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={memory.image || "/placeholder.svg"}
                          alt="Memory"
                          width={100}
                          height={100}
                          className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                        />
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
                    <div className="text-3xl font-bold text-gray-800 mb-2">8</div>
                    <p className="text-gray-600 mb-4">Albums created</p>
                    <Badge variant="secondary" className="bg-rose-100 text-rose-700 mb-4">
                      2 new this month
                    </Badge>
                  </div>
                  <Button variant="ghost" className="w-full text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                    Manage albums
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* Memorial Space Card */}
              <Card className="bg-white/70 backdrop-blur-sm border-rose-100 hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                    <Flower2 className="h-5 w-5 text-rose-500" />
                    <span>Memorial Space</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-8 w-8 text-rose-500" fill="currentColor" />
                    </div>
                    <p className="text-gray-600 mb-4">Create a beautiful memorial space for your beloved companion</p>
                  </div>
                  <Button variant="ghost" className="w-full text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                    Create memorial
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
                <div className="space-y-4">
                  {timelineItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-rose-50/50 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={item.image || "/placeholder.svg"}
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
                              item.type === "memory" ? "bg-rose-100 text-rose-700" : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {item.type === "memory" ? "Memory" : "Album"}
                          </Badge>
                          <span className="text-sm text-gray-500">{item.date}</span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{item.caption}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                    View all activity
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Quick Stats Footer */}
          <section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-white/50 backdrop-blur-sm border-rose-100 text-center p-4">
                <div className="text-2xl font-bold text-gray-800">247</div>
                <div className="text-sm text-gray-600">Total Memories</div>
              </Card>
              <Card className="bg-white/50 backdrop-blur-sm border-rose-100 text-center p-4">
                <div className="text-2xl font-bold text-gray-800">8</div>
                <div className="text-sm text-gray-600">Albums</div>
              </Card>
              <Card className="bg-white/50 backdrop-blur-sm border-rose-100 text-center p-4">
                <div className="text-2xl font-bold text-gray-800">1.2GB</div>
                <div className="text-sm text-gray-600">Storage Used</div>
              </Card>
              <Card className="bg-white/50 backdrop-blur-sm border-rose-100 text-center p-4">
                <div className="text-2xl font-bold text-gray-800">2</div>
                <div className="text-sm text-gray-600">Years Together</div>
              </Card>
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
