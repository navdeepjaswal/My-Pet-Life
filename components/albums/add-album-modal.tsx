"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Album, X, Upload } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

interface AddAlbumModalProps {
  userId: string
  petId: string
  onClose: () => void
  onComplete: () => void
}

export default function AddAlbumModal({ userId, petId, onClose, onComplete }: AddAlbumModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Form data
  const [albumData, setAlbumData] = useState({
    name: "",
    description: ""
  })
  
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // Create preview URLs
    const urls = files.map(file => URL.createObjectURL(file))
    setPreviewUrls(urls)
    setSelectedFiles(files)
  }

  const uploadImages = async () => {
    const supabase = createClient()
    const uploadedUrls: string[] = []

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i]
      const fileExt = file.name.split('.').pop()
      const fileName = `${petId}/${Date.now()}-${i}.${fileExt}`

      const { error } = await supabase.storage
        .from('memories')
        .upload(fileName, file)

      if (error) throw error

      const { data: { publicUrl } } = supabase.storage
        .from('memories')
        .getPublicUrl(fileName)

      uploadedUrls.push(publicUrl)
    }

    return uploadedUrls
  }

  const handleSubmit = async () => {
    if (!albumData.name.trim()) {
      toast.error("Please add a name for your album")
      return
    }

    if (selectedFiles.length === 0) {
      toast.error("Please upload at least one photo")
      return
    }

    setIsSubmitting(true)
    const supabase = createClient()

    try {
      // 1. Upload images
      const imageUrls = await uploadImages()

      // 2. Create album
      const { data: album, error: albumError } = await supabase
        .from('albums')
        .insert([{
          user_id: userId,
          pet_id: petId,
          name: albumData.name,
          description: albumData.description,
          cover_image_url: imageUrls[0]
        }])
        .select()
        .single()

      if (albumError) throw albumError

      // 3. Create memories for each image
      const memoryInserts = imageUrls.map((url) => ({
        user_id: userId,
        pet_id: petId,
        title: `Photo from album: ${albumData.name}`,
        image_url: url,
        memory_date: new Date().toISOString().split('T')[0]
      }))

      const { data: memories, error: memoriesError } = await supabase
        .from('memories')
        .insert(memoryInserts)
        .select()

      if (memoriesError) throw memoriesError

      // 4. Link memories to album
      const albumMemoryInserts = memories.map(memory => ({
        album_id: album.id,
        memory_id: memory.id
      }))

      await supabase
        .from('album_memories')
        .insert(albumMemoryInserts)

      // 5. Create timeline activity
      await supabase
        .from('timeline_activities')
        .insert({
          user_id: userId,
          pet_id: petId,
          activity_type: 'album',
          title: `New Album: ${albumData.name}`,
          description: `Created album with ${imageUrls.length} photos`,
          related_id: album.id,
          image_url: imageUrls[0]
        })

      toast.success("Album created successfully! 🎉")
      onComplete()

    } catch (error) {
      console.error('Error creating album:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Album className="h-6 w-6 text-rose-500" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-800">
            Create New Album
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center">
                Album Name <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="name"
                value={albumData.name}
                onChange={(e) => setAlbumData({...albumData, name: e.target.value})}
                placeholder="e.g., Summer Adventures, Birthday Party"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center">
                Description <span className="text-gray-400 text-sm ml-1">(optional)</span>
              </Label>
              <Textarea
                id="description"
                value={albumData.description}
                onChange={(e) => setAlbumData({...albumData, description: e.target.value})}
                placeholder="Add a description for your album..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center">
                Photos <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelection}
                  className="hidden"
                  id="album-photos"
                />
                <label
                  htmlFor="album-photos"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload photos</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB each</p>
                </label>
              </div>

              {previewUrls.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative aspect-square">
                      <Image
                        src={url}
                        alt={`Preview ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1"
              onClick={handleSubmit}
              disabled={isSubmitting || !albumData.name || selectedFiles.length === 0}
            >
              {isSubmitting ? "Creating..." : "Create Album"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 