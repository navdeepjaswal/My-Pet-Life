"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Upload, Camera, Check } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PetOnboardingModalProps {
  userId: string
  onComplete: () => void
}

export default function PetOnboardingModal({ userId, onComplete }: PetOnboardingModalProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Form data
  const [petData, setPetData] = useState({
    name: "",
    type: "",
    breed: "",
    dateOfBirth: "",
    gender: "",
    color: "",
    weight: "",
    specialNotes: ""
  })
  
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(0)

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // Limit to 5 images
    const limitedFiles = files.slice(0, 5)
    setSelectedFiles(limitedFiles)

    // Create preview URLs
    const urls = limitedFiles.map(file => URL.createObjectURL(file))
    setPreviewUrls(urls)
    
    // Reset avatar selection to first image
    setSelectedAvatarIndex(0)
  }

  const uploadImages = async (petId: string) => {
    const supabase = createClient()
    const uploadedUrls: string[] = []

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i]
      const fileExt = file.name.split('.').pop()
      const fileName = `${petId}/${Date.now()}-${i}.${fileExt}`

      const { data, error } = await supabase.storage
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
    if (selectedFiles.length === 0) {
      toast.error("Please upload at least one photo of your pet")
      return
    }

    setIsSubmitting(true)
    const supabase = createClient()

    try {
      // 1. Create pet record
      const { data: pet, error: petError } = await supabase
        .from('pets')
        .insert([{
          user_id: userId,
          name: petData.name,
          type: petData.type,
          breed: petData.breed,
          date_of_birth: petData.dateOfBirth,
          gender: petData.gender,
          color: petData.color,
          weight: petData.weight,
          special_notes: petData.specialNotes,
          avatar_url: '',
          is_alive: true
        }])
        .select()
        .single()

      if (petError) throw petError

      // 2. Upload images
      const imageUrls = await uploadImages(pet.id)

      // 3. Update pet with selected avatar
      await supabase
        .from('pets')
        .update({ avatar_url: imageUrls[selectedAvatarIndex] })
        .eq('id', pet.id)

      // 4. Create "First Upload" album
      const { data: album, error: albumError } = await supabase
        .from('albums')
        .insert([{
          user_id: userId,
          pet_id: pet.id,
          name: "First Upload",
          description: `${petData.name}'s first photos!`,
          cover_image_url: imageUrls[selectedAvatarIndex]
        }])
        .select()
        .single()

      if (albumError) throw albumError

      // 5. Create memories for each image
      const memoryInserts = imageUrls.map((url, index) => ({
        user_id: userId,
        pet_id: pet.id,
        title: index === selectedAvatarIndex ? `Welcome ${petData.name}!` : `${petData.name}'s Photo ${index + 1}`,
        caption: index === selectedAvatarIndex ? `${petData.name}'s first photo on MyPetLife!` : `Another precious moment with ${petData.name}`,
        image_url: url,
        memory_date: new Date().toISOString().split('T')[0]
      }))

      const { data: memories, error: memoriesError } = await supabase
        .from('memories')
        .insert(memoryInserts)
        .select()

      if (memoriesError) throw memoriesError

      // 6. Add memories to album
      const albumMemoryInserts = memories.map(memory => ({
        album_id: album.id,
        memory_id: memory.id
      }))

      await supabase
        .from('album_memories')
        .insert(albumMemoryInserts)

      // 7. Create timeline activities
      const timelineInserts = [
        {
          user_id: userId,
          pet_id: pet.id,
          activity_type: 'memory',
          title: `Welcome ${petData.name}!`,
          description: `Added ${petData.name}'s first photos`,
          related_id: memories[selectedAvatarIndex].id,
          image_url: imageUrls[selectedAvatarIndex]
        },
        {
          user_id: userId,
          pet_id: pet.id,
          activity_type: 'album',
          title: 'Created album: First Upload',
          description: `Created your first album with ${imageUrls.length} photos`,
          related_id: album.id,
          image_url: imageUrls[selectedAvatarIndex]
        }
      ]

      await supabase
        .from('timeline_activities')
        .insert(timelineInserts)

      toast.success(`Welcome ${petData.name} to MyPetLife! 🎉`)
      onComplete()

    } catch (error) {
      console.error('Error during onboarding:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-rose-500" fill="currentColor" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Welcome to MyPetLife! 🐾
          </CardTitle>
          <CardDescription>
            Let's start by adding your beloved companion
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Tell us about your pet</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center">
                    Pet's Name <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={petData.name}
                    onChange={(e) => setPetData({...petData, name: e.target.value})}
                    placeholder="e.g., Luna, Max, Whiskers"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type" className="flex items-center">
                    Type of Pet <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Select
                    value={petData.type}
                    onValueChange={(value) => setPetData({...petData, type: value})}
                    required
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select pet type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dog">Dog</SelectItem>
                      <SelectItem value="Cat">Cat</SelectItem>
                      <SelectItem value="Bird">Bird</SelectItem>
                      <SelectItem value="Fish">Fish</SelectItem>
                      <SelectItem value="Rabbit">Rabbit</SelectItem>
                      <SelectItem value="Hamster">Hamster</SelectItem>
                      <SelectItem value="Guinea Pig">Guinea Pig</SelectItem>
                      <SelectItem value="Reptile">Reptile</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="breed" className="flex items-center">
                    Breed <span className="text-gray-400 text-sm ml-1">(optional)</span>
                  </Label>
                  <Input
                    id="breed"
                    value={petData.breed}
                    onChange={(e) => setPetData({...petData, breed: e.target.value})}
                    placeholder="e.g., Golden Retriever, Persian"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="flex items-center">
                    Date of Birth <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={petData.dateOfBirth}
                    onChange={(e) => setPetData({...petData, dateOfBirth: e.target.value})}
                    max={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender" className="flex items-center">
                    Gender <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Select
                    value={petData.gender}
                    onValueChange={(value) => setPetData({...petData, gender: value})}
                    required
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color" className="flex items-center">
                    Color/Markings <span className="text-gray-400 text-sm ml-1">(optional)</span>
                  </Label>
                  <Input
                    id="color"
                    value={petData.color}
                    onChange={(e) => setPetData({...petData, color: e.target.value})}
                    placeholder="e.g., Black and white, Golden"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight" className="flex items-center">
                    Weight <span className="text-gray-400 text-sm ml-1">(optional)</span>
                  </Label>
                  <Input
                    id="weight"
                    value={petData.weight}
                    onChange={(e) => setPetData({...petData, weight: e.target.value})}
                    placeholder="e.g., 15 lbs, 5 kg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialNotes" className="flex items-center">
                  Special Notes <span className="text-gray-400 text-sm ml-1">(optional)</span>
                </Label>
                <Textarea
                  id="specialNotes"
                  value={petData.specialNotes}
                  onChange={(e) => setPetData({...petData, specialNotes: e.target.value})}
                  placeholder="Any special traits, favorite activities, medical notes, or fun facts about your pet..."
                  rows={3}
                />
              </div>

              <Button 
                onClick={() => setStep(2)} 
                className="w-full"
                disabled={!petData.name || !petData.type || !petData.dateOfBirth || !petData.gender}
              >
                Next: Add Photos
                <Upload className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Share your first photos</h3>
              <p className="text-gray-600">Upload 1-5 photos of {petData.name}. You can choose which one to use as their profile picture.</p>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelection}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Click to upload photos</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB each (max 5 photos)</p>
                </label>
              </div>

              {previewUrls.length > 0 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Profile Picture</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {previewUrls.map((url, index) => (
                        <div 
                          key={index} 
                          className={`relative cursor-pointer border-2 rounded-lg overflow-hidden transition-colors ${
                            selectedAvatarIndex === index ? 'border-rose-500' : 'border-gray-200'
                          }`}
                          onClick={() => setSelectedAvatarIndex(index)}
                        >
                          <Image
                            src={url}
                            alt={`Preview ${index + 1}`}
                            width={150}
                            height={150}
                            className="w-full h-32 object-cover"
                          />
                          {selectedAvatarIndex === index && (
                            <div className="absolute top-2 right-2 bg-rose-500 text-white rounded-full p-1">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                          <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            Photo {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">
                      Selected: Photo {selectedAvatarIndex + 1} will be used as {petData.name}'s profile picture
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  className="flex-1"
                  disabled={selectedFiles.length === 0 || isSubmitting}
                >
                  {isSubmitting ? "Creating Profile..." : `Welcome ${petData.name}!`}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 