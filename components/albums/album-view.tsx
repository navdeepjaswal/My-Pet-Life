"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

interface AlbumViewProps {
  albumId: string
  isOpen: boolean
  onClose: () => void
}

interface AlbumMemory {
  id: string
  image_url: string
  title: string
  memory_date: string
}

export default function AlbumView({ albumId, isOpen, onClose }: AlbumViewProps) {
  const [memories, setMemories] = useState<AlbumMemory[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAlbumMemories = async () => {
      if (!albumId) return

      const supabase = createClient()
      
      try {
        const { data, error } = await supabase
          .from('album_memories')
          .select(`
            memory_id,
            memories!inner (
              id,
              image_url,
              title,
              memory_date
            )
          `)
          .eq('album_id', albumId)
          .throwOnError()

        if (!data) throw new Error('No data returned')

        // Transform the data into the expected format with type safety
        const albumMemories = data.reduce<AlbumMemory[]>((acc, item) => {
          if (
            item.memories &&
            typeof item.memories === 'object' &&
            'id' in item.memories &&
            'image_url' in item.memories &&
            'title' in item.memories &&
            'memory_date' in item.memories
          ) {
            acc.push({
              id: String(item.memories.id),
              image_url: String(item.memories.image_url),
              title: String(item.memories.title),
              memory_date: String(item.memories.memory_date)
            })
          }
          return acc
        }, [])

        setMemories(albumMemories)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching album memories:', error)
        setMemories([])
        setIsLoading(false)
      }
    }

    if (isOpen && albumId) {
      setIsLoading(true)
      fetchAlbumMemories()
    }

    // Reset state when dialog closes
    return () => {
      setMemories([])
      setCurrentIndex(0)
      setIsLoading(true)
    }
  }, [albumId, isOpen])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? memories.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === memories.length - 1 ? 0 : prev + 1))
  }

  // Only access currentMemory if we have memories
  const currentMemory = memories.length > 0 ? memories[currentIndex] : null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden">
        <DialogTitle asChild>
          <VisuallyHidden>
            {currentMemory?.title || "Album View"}
          </VisuallyHidden>
        </DialogTitle>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500" />
          </div>
        ) : memories.length > 0 && currentMemory ? (
          <div className="relative w-full h-full min-h-[50vh]">
            {/* Main Image */}
            <div className="relative w-full h-[70vh]">
              <Image
                src={currentMemory.image_url}
                alt={currentMemory.title}
                fill
                className="object-contain"
                quality={100}
                priority
              />
            </div>

            {/* Navigation Controls */}
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-black/20 hover:bg-black/40"
                onClick={handlePrevious}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-black/20 hover:bg-black/40"
                onClick={handleNext}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </Button>
            </div>

            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 rounded-full bg-black/20 hover:bg-black/40"
              onClick={onClose}
              aria-label="Close album view"
            >
              <X className="h-4 w-4 text-white" />
            </Button>

            {/* Image Counter */}
            <div className="absolute top-2 left-2 bg-black/20 px-3 py-1 rounded-full">
              <span className="text-white text-sm">
                {currentIndex + 1} / {memories.length}
              </span>
            </div>

            {/* Thumbnail Navigation */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {memories.map((memory, index) => (
                  <button
                    key={memory.id}
                    className={`relative w-16 h-16 flex-shrink-0 cursor-pointer transition-opacity ${
                      index === currentIndex ? 'opacity-100 ring-2 ring-white' : 'opacity-60 hover:opacity-100'
                    }`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`View ${memory.title}`}
                    aria-current={index === currentIndex}
                  >
                    <Image
                      src={memory.image_url}
                      alt={memory.title}
                      fill
                      className="object-cover rounded"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[50vh]">
            <p className="text-gray-500">No images found in this album</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
} 