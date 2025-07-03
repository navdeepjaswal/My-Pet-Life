"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, X, Upload } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

interface AddMemoryModalProps {
  userId: string
  petId: string
  onClose: () => void
  onComplete: () => void
}

export default function AddMemoryModal({ userId, petId, onClose, onComplete }: AddMemoryModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Form data
  const [memoryData, setMemoryData] = useState({
    title: "",
    caption: "",
    memoryDate: new Date().toISOString().split('T')[0]
  })
  
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // Limiting to max 5 images
    const limitedFiles = files.slice(0, 5)
    setSelectedFiles(limitedFiles)

    // Create preview URLs
    const urls = limitedFiles.map(file => URL.createObjectURL(file))
    setPreviewUrls(urls)
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
    if (!memoryData.title.trim()) {
      toast.error("Please add a title for your memory")
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

      // 2. Create memories for each image
      const memoryInserts = imageUrls.map(url => ({
        user_id: userId,
        pet_id: petId,
        title: memoryData.title,
        caption: memoryData.caption,
        image_url: url,
        memory_date: memoryData.memoryDate
      }))

      const { data: memories, error: memoriesError } = await supabase
        .from('memories')
        .insert(memoryInserts)
        .select()

      if (memoriesError) throw memoriesError

      // 3. Create timeline activity
      await supabase
        .from('timeline_activities')
        .insert({
          user_id: userId,
          pet_id: petId,
          activity_type: 'memory',
          title: `New Memory: ${memoryData.title}`,
          description: memoryData.caption || `Added ${imageUrls.length} new photos`,
          related_id: memories[0].id,
          image_url: imageUrls[0]
        })

      toast.success("Memory added successfully! 🎉")
      onComplete()

    } catch (error) {
      console.error('Error adding memory:', error)
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
            <Camera className="h-6 w-6 text-rose-500" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-800">
            Add New Memory
          </CardTitle>
          <CardDescription>
            Capture and preserve a special moment
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center">
                Title <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="title"
                value={memoryData.title}
                onChange={(e) => setMemoryData({...memoryData, title: e.target.value})}
                placeholder="e.g., First Beach Day, Birthday Celebration"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="caption" className="flex items-center">
                Caption <span className="text-gray-400 text-sm ml-1">(optional)</span>
              </Label>
              <Textarea
                id="caption"
                value={memoryData.caption}
                onChange={(e) => setMemoryData({...memoryData, caption: e.target.value})}
                placeholder="Describe this special moment..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="memoryDate" className="flex items-center">
                Date <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="memoryDate"
                type="date"
                value={memoryData.memoryDate}
                onChange={(e) => setMemoryData({...memoryData, memoryDate: e.target.value})}
                max={new Date().toISOString().split('T')[0]}
                required
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
                  id="memory-photos"
                />
                <label
                  htmlFor="memory-photos"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload photos (max 5)</p>
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
              disabled={isSubmitting || !memoryData.title || !memoryData.memoryDate || selectedFiles.length === 0}
            >
              {isSubmitting ? "Saving..." : "Save Memory"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 