"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import Navigation from "@/components/navigation"
import Loader from "@/components/loader"
import PawDecoration from "@/components/paw-decoration"
import { Heart, Mail, Lock, User } from "lucide-react"

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign up logic here
    console.log("Sign up:", formData)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <div
        className={`min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 ${isLoading ? "hidden" : "block"}`}
      >

        {/* Decorative paws */}
        <PawDecoration className="absolute top-20 left-10 rotate-12" />
        <PawDecoration className="absolute bottom-20 right-10 -rotate-12" size="w-8 h-8" />

        <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-200px)]">
          <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-rose-100 shadow-lg">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Heart className="h-12 w-12 text-rose-500" fill="currentColor" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">Join MyPetLife</CardTitle>
              <CardDescription className="text-gray-600">
                Create your account and start preserving precious memories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="pl-10 border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10 border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="pl-10 border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className="pl-10 border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                    className="border-rose-300 data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500"
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the{" "}
                    <Link href="/terms" className="text-rose-500 hover:text-rose-600">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-rose-500 hover:text-rose-600">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white rounded-full py-3"
                  disabled={!formData.agreeToTerms}
                >
                  Create Account
                </Button>

                <div className="text-center">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link href="/signin" className="text-rose-500 hover:text-rose-600 font-medium">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="bg-white/50 backdrop-blur-sm border-t border-rose-100 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <Heart className="h-6 w-6 text-rose-500" fill="currentColor" />
                <span className="text-xl font-bold text-gray-800">MyPetLife</span>
              </div>
              <p className="text-gray-600 text-center md:text-right">Made with ❤️ for pet parents everywhere</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
